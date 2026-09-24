import express from "express";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();

  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));

  // Only run Vite dev middleware if --dev flag is passed or dist does not exist
  const isDev = process.argv.includes("--dev") || (process.env.NODE_ENV === "development" && !hasDist);

  // External traffic reaches Nginx on container port 8080, which reverse-proxies to Node on port 3000.
  const PORT = Number(process.env.APP_PORT || 3000);

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // API route
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { roomType } = req.body;

      if (roomType !== "shared" && roomType !== "private") {
        return res.status(400).json({ error: "Invalid room type" });
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY;

      if (!stripeKey) {
        return res.status(400).json({ error: "Missing Stripe key" });
      }

      const stripe = new Stripe(stripeKey);
      const roomPriceNum = 100;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: roomType === "shared" ? "Shared Room" : "Private Room",
              },
              unit_amount: roomPriceNum,
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:3000/book?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/book`,
      });

      return res.json({ url: session.url });

    } catch (err: any) {
      console.error("Stripe error:", err);
      return res.status(500).json({
        error: "Checkout failed",
        message: err?.message || String(err)
      });
    }
  });

  // Vite middleware for dev vs static file serving for production
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (isDev: ${isDev})`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

