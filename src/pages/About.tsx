import { motion } from 'motion/react';

export function About() {
  return (
    <div className="w-full pt-32 pb-24 px-6 bg-sand">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-ocean-dark mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            Born from a desire to create a space where women can find strength in the ocean, softness in community, and grounding in mountains and wild nature.
          </motion.p>
        </div>

        {/* Founder Story */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">The founders</span>
            <h2 className="text-4xl font-serif text-ocean-dark mt-4">Meet Anna & Natalia</h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <img
                src="anna.jpg"
                alt="Founder Anna"
                className="w-full h-auto rounded-sm"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src="natalia.jpg"
                alt="Founder Natalia"
                className="w-full h-auto rounded-sm"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-xl md:text-2xl text-charcoal/80 font-light leading-relaxed">
              We are Anna and Natalia, two creatives who met five years ago in Cape Town and instantly clicked. While working in the humanitarian world, we learned how powerful connection and collaboration can be – and we wanted to create a space that lives and breathes those values.
            </p>
            <p className="text-xl md:text-2xl text-charcoal/80 font-light leading-relaxed">
              That’s how Honeybush Swell was born: a women’s surf and yoga retreat in Cape Town where we flow, explore, move, and build real community. It’s a place rooted in friendship, nature, and the belief that connection can transform lives.
            </p>
            <div className="pt-8">
              <span className="font-serif italic text-2xl text-ocean-dark">
                From love of the ocean and mountains to love of people and adventure.
              </span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-sand">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">Safety First, Always</h3>
              <p className="font-light text-sand/80 leading-relaxed">
                Physical and emotional safety are our foundation. Our coaches are ISA certified, and our spaces are designed for you to show up exactly as you are, without judgment.
              </p>
            </div>
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">Authentic Connection</h3>
              <p className="font-light text-sand/80 leading-relaxed">
                We prioritize real conversations over small talk. Through women's circles and shared meals, we foster a sisterhood that lasts long after the retreat ends.
              </p>
            </div>
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">Radical Presence</h3>
              <p className="font-light text-sand/80 leading-relaxed">
                In a world of constant distraction, we invite you to slow down. To feel the salt on your skin, taste your food, and be fully present in your body.
              </p>
            </div>
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">Nature as Healer</h3>
              <p className="font-light text-sand/80 leading-relaxed">
                We believe the ocean has a unique ability to wash away what we no longer need. We respect the environment and integrate nature into every aspect of our days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
