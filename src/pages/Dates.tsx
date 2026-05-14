import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

export function Dates() {
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
            Dates & Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            Spaces are limited to 10 women or fewer to ensure an intimate experience.
          </motion.p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            {
              location: "Lapland, Sweden",
              date: "August 26 - 30, 2026",
              status: "Open",
              spots: 10,
            },
            {
              location: "Cape Town, SA",
              date: "November, 2026",
              status: "Open",
              spots: 10,
            }
          ].map((retreat, idx) => (
            <div key={idx} className="bg-sand-dark p-8 rounded-sm border border-sand-dark hover:border-honey/50 transition-colors">
              <span className="text-honey uppercase tracking-widest text-[10px] font-medium block mb-2">{retreat.location}</span>
              <h3 className="text-2xl font-serif text-ocean-dark mb-2">{retreat.date}</h3>
              <p className="text-sm uppercase tracking-widest font-medium mb-6" style={{ color: retreat.spots === 0 ? 'var(--color-sage)' : 'var(--color-honey)' }}>
                {retreat.status}
              </p>
              <Link to={retreat.spots === 0 ? "/contact" : "/contact?date=" + encodeURIComponent(retreat.date)}>
                <Button
                  variant={retreat.spots === 0 ? "outline" : "default"}
                  className="w-full uppercase tracking-widest text-xs"
                  disabled={retreat.spots === 0}
                >
                  {retreat.spots === 0 ? "Join Waitlist" : "Apply Now"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm mb-32">
          <div className="text-center mb-16">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Investment</span>
            <h2 className="text-4xl font-serif text-sand mt-4">Retreat Packages</h2>
            <p className="text-sand text-xl font-light mt-4 italic">Lapland, Sweden</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-sand/20 p-8 rounded-sm flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Shared Room</h3>
              <p className="text-3xl font-light mb-6">999 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8">
                Perfect for solo travelers looking to connect. Share a spacious, room with one other retreat guest. Two twin beds, shared bathroom with other retreat guests.
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Shared bathroom</li>
              </ul>
              <Link to="/contact" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Shared
                </Button>
              </Link>
            </div>
            <div className="border border-sand/20 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Private Room</h3>
              <p className="text-3xl font-light mb-6">1109 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8">
                For those who crave a peaceful sanctuary to return to at the end of each day. A private room with its own en-suite bathroom.
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Private en-suite bathroom</li>
              </ul>
              <Link to="/contact" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Private
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Cape Town */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm mb-16">
          <div className="text-center">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Investment</span>
            <h2 className="text-4xl font-serif text-sand mt-4">Retreat Packages</h2>
            <p className="text-sand text-xl font-light mt-4 italic">Cape Town, South Africa — Coming soon</p>
            <p className="text-honey text-2xl font-light mt-6">prices from 1500 EUR</p>
          </div>
        </div>

        {/* What's Not Included */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif text-ocean-dark mb-6">What's Not Included</h3>
          <ul className="space-y-2 text-charcoal/70 font-light">
            <li>Flights</li>
            <li>Mandatory travel insurance</li>
            <li>Lunches and dinners on our weekend outings (Cape Town)</li>
            <li>Additional wine tastings or personal expenses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
