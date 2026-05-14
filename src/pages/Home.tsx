import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="hero2.jpg"
            alt="Women surfers on the beach"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ocean-dark/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-sand mb-6 tracking-tight"
          >
            Hi Honey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-sand/90 font-light tracking-wide mb-10 uppercase"
          >
            A women's surf & soul retreat in Cape Town and beyond
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link to="/dates">
              <Button size="lg" className="bg-ocean text-sand hover:bg-ocean/90 uppercase tracking-widest text-sm">
                Join the Retreat
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Emotional Hook */}
      <section className="pt-24 pb-2 md:pt-32 md:pb-4 bg-sand text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-ocean-dark mb-8 leading-tight">
            Trade the noise for the rhythm of nature.
          </h2>
          <p className="text-lg md:text-xl text-charcoal/80 font-light leading-relaxed">
            This is your invitation to step into nature, movement, and connection. We bring women together to surf, hike, flow, and grow, creating a safe space for empowerment, reflection, and connection. Through yoga, breathwork, and nourishing meals, we cultivate joy, awareness, and sisterhood, while collaborating with local partners and honouring the land and people we learn from.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ 
              opacity: { duration: 1 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" } 
            }}
            className="mt-12 flex justify-center"
          >
            <img 
              src="logobrown.png" 
              alt="Honeybush Logo" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Upcoming Retreats Section */}
      <section className="pt-2 pb-24 md:pt-4 bg-[#f0ddbe] text-[#60483e] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#60483e]/60 uppercase tracking-widest text-sm font-medium">Join Our Sisterhood</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#60483e] mt-4">Upcoming Retreats</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {[
              {
                title: "Lapland, Sweden",
                date: "August 2026",
                desc: "A soul-deep immersion into the raw silence of the North - the last true wilderness. Beneath the northern lights, experience warming saunas, wild adventures, and grounding rituals in the heart of Swedish Lapland.",
                img: "tea2.png"
              },
              {
                title: "Cape Town, South Africa",
                date: "November 2026",
                desc: "Our signature surf and soul experience - crystal waters, golden light, nourishing community meals, and the majestic energy of the Cape mountains blending seamlessly with the ocean.",
                img: "beach.jpeg"
              }
            ].map((retreat, idx) => (
              <div key={idx} className="flex flex-col group items-center">
                <div className="overflow-hidden aspect-[3/2] w-full max-w-md mb-8">
                  <img
                    src={retreat.img}
                    alt={retreat.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[#60483e]/70 uppercase tracking-widest text-xs font-medium mb-2 block">{retreat.date}</span>
                  <h3 className="text-3xl font-serif text-[#60483e] mb-4">{retreat.title}</h3>
                  <p className="text-[#60483e]/80 font-light leading-relaxed max-w-md mx-auto mb-8">{retreat.desc}</p>
                  <Link to="/dates">
                    <Button variant="outline" className="uppercase tracking-widest text-xs border-[#60483e]/30 text-[#60483e] hover:bg-[#60483e] hover:text-[#f0ddbe]">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 bg-ocean-dark text-sand px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-12">Is this for you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">The Beginner</h3>
              <p className="font-light text-sand/80">Never touched a surfboard? Perfect. We specialize in creating a safe, encouraging environment for your first wave.</p>
            </div>
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">The Solo Traveler</h3>
              <p className="font-light text-sand/80">Arrive alone, leave with a sisterhood. Most of our guests join solo and find deep connections instantly.</p>
            </div>
            <div>
              <h3 className="text-honey uppercase tracking-widest text-sm font-medium mb-4">The Seeker</h3>
              <p className="font-light text-sand/80">For the woman needing a reset. Step away from burnout and back into your body, your breath, and your joy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-[800px]">
            <img
              src="slowmorning.jpg"
              alt="Slow morning"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full lg:w-1/2 flex items-center py-24 lg:py-0">
            <div className="px-6 md:px-12 lg:pl-24 max-w-2xl">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Daily Rhythm</span>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-4 mb-8">A Day in the Life</h2>
            <ul className="space-y-8">
              <li className="flex gap-6">
                <span className="text-honey font-serif text-xl italic min-w-[80px]">07:00</span>
                <div>
                  <h4 className="font-medium text-charcoal uppercase tracking-wide text-sm mb-1">Morning Flow</h4>
                  <p className="text-charcoal/70 font-light">Gentle yoga and meditation to awaken the body.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-honey font-serif text-xl italic min-w-[80px]">08:30</span>
                <div>
                  <h4 className="font-medium text-charcoal uppercase tracking-wide text-sm mb-1">Nourish</h4>
                  <p className="text-charcoal/70 font-light">A vibrant, locally-sourced breakfast spread.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-honey font-serif text-xl italic min-w-[80px]">10:00</span>
                <div>
                  <h4 className="font-medium text-charcoal uppercase tracking-wide text-sm mb-1">Salt & Surf</h4>
                  <p className="text-charcoal/70 font-light">Guided surf coaching in the pristine waters of the Cape.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-honey font-serif text-xl italic min-w-[80px]">13:00</span>
                <div>
                  <h4 className="font-medium text-charcoal uppercase tracking-wide text-sm mb-1">Rest & Explore</h4>
                  <p className="text-charcoal/70 font-light">Free time to read, nap, or explore local coastal towns.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-honey font-serif text-xl italic min-w-[80px]">18:30</span>
                <div>
                  <h4 className="font-medium text-charcoal uppercase tracking-wide text-sm mb-1">Sunset Sessions</h4>
                  <p className="text-charcoal/70 font-light">Women's circles, restorative practices, and shared dinners.</p>
                </div>
              </li>
            </ul>
            <div className="mt-12">
              <Link to="/experience">
                <Button variant="outline" className="uppercase tracking-widest text-xs border-honey text-honey hover:bg-honey hover:text-white">
                  View Full Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Social Proof */}
      <section className="pt-24 pb-12 bg-sand px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-ocean-dark">The Stories Within</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-sand-dark p-10 rounded-sm relative flex flex-col">
              <span className="text-6xl font-serif text-honey/30 absolute top-4 left-6">"</span>
              <p className="relative z-10 text-charcoal/80 font-light italic leading-relaxed mb-6 mt-4 flex-grow">
                I didn't know how much I needed this trip until I went on it. Honeybush Swell created a getaway with the perfect mix of planned activities and free time. Just after 2 days I felt like I've been there for weeks. If you are looking to recharge with delightful company, nourishing food and activities to expand your horizon, I would definitely recommend booking a trip with Honeybush Swell.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <p className="font-medium text-ocean-dark text-sm uppercase tracking-wide">Manon</p>
                  <p className="text-xs text-charcoal/50">Netherlands</p>
                </div>
              </div>
            </div>
            <div className="bg-sand-dark p-10 rounded-sm relative flex flex-col">
              <span className="text-6xl font-serif text-honey/30 absolute top-4 left-6">"</span>
              <p className="relative z-10 text-charcoal/80 font-light italic leading-relaxed mb-6 mt-4 flex-grow">
                The perfect mix of adventure and slowing down. Mornings in the water, long sunsets, amazing food, and the kind of conversations that stay with you long after the trip ends. The villa was beautiful, the activities were so much fun, and the whole experience just felt so special.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <p className="font-medium text-ocean-dark text-sm uppercase tracking-wide">Lory</p>
                  <p className="text-xs text-charcoal/50">Austria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="pt-12 pb-8 bg-sand border-t border-sand-dark/30 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-ocean-dark">Our Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-0 md:gap-y-0 items-center justify-items-center">
            {["2.png", "3.png", "4.png", "5.png", "6.png", "7.png"].map((logo, idx) => (
              <img 
                key={idx} 
                src={logo} 
                alt="Partner Logo" 
                className="h-24 md:h-48 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-8 pb-32 bg-ocean relative overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="youare.jpeg"
            alt="Ocean waves"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif text-sand mb-6">Come as you are.</h2>
          <p className="text-sand/80 font-light text-lg mb-10">
            Spaces are limited to 10 women or fewer to ensure an intimate experience.
          </p>
          <Link to="/dates">
            <Button size="lg" className="bg-ocean text-sand hover:bg-ocean/90 uppercase tracking-widest text-sm">
              Reserve Your Spot
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
