import express from "express";
import path from "path";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route first
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const {
      roomType,
      firstName,
      lastName,
      email,
      phone,
      location,
      age,
      hikingExp,
      dietary,
      message
    } = req.body;

    if (roomType !== "shared" && roomType !== "private") {
      return res.status(400).json({ error: "Invalid room type" });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return res.status(400).json({ error: "Missing Stripe key" });
    }

    const stripe = new Stripe(stripeKey);

    const roomPriceNum = roomType === "shared" ? 100 : 100;

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

  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({
      error: "Checkout failed",
      message: err.message
    });
  }
});

// Vite middleware integration
async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const { createServer } = await eval('import("vite")');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
