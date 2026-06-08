import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

export function Dates() {
  return (
    <div className="w-full pt-32 pb-8 px-6 bg-sand">
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
              type: "book"
            },
            {
              location: "Cape Town, SA",
              date: "November 18-26, 2026",
              status: "Open",
              spots: 10,
              type: "book"
            }
          ].map((retreat, idx) => (
            <div key={idx} className="bg-sand-dark p-8 rounded-sm border border-sand-dark hover:border-honey/50 transition-colors">
              <span className="text-honey uppercase tracking-widest text-[10px] font-medium block mb-2">{retreat.location}</span>
              <h3 className="text-2xl font-serif text-ocean-dark mb-2">{retreat.date}</h3>
              <p className="text-sm uppercase tracking-widest font-medium mb-6" style={{ color: retreat.spots === 0 ? 'var(--color-sage)' : 'var(--color-honey)' }}>
                {retreat.status}
              </p>
              <Link to={retreat.spots === 0 ? "/contact" : (retreat.location.includes("Cape Town") ? "/book?retreat=capetown" : "/book")}>
                <Button
                  variant={retreat.spots === 0 ? "outline" : "default"}
                  className="w-full uppercase tracking-widest text-xs"
                  disabled={retreat.spots === 0}
                >
                  {retreat.spots === 0 ? "Join Waitlist" : "Book Now"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm mb-12">
          <div className="text-center mb-16">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Investment</span>
            <h2 className="text-4xl font-serif text-sand mt-4">Retreat Packages</h2>
            <p className="text-sand text-xl font-light mt-4 italic">Lapland, Sweden</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-sand/20 p-8 rounded-sm flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Shared Room</h3>
              <p className="text-3xl font-light mb-6">999 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8 flex-1">
                Perfect for solo travelers looking to connect. Share a spacious, room with one other retreat guest. Two twin beds, shared bathroom with other retreat guests.
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Shared bathroom</li>
              </ul>
              <Link to="/book?room=shared" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Shared
                </Button>
              </Link>
            </div>
            <div className="border border-sand/20 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Private Room</h3>
              <p className="text-3xl font-light mb-6">1109 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8 flex-1">
                For those who crave a peaceful sanctuary to return to at the end of each day. A private room with its own en-suite bathroom.
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Private en-suite bathroom</li>
              </ul>
              <Link to="/book?room=private" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Private
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Cape Town */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm mb-12">
          <div className="text-center mb-16">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Investment</span>
            <h2 className="text-4xl font-serif text-sand mt-4">Retreat Packages</h2>
            <p className="text-sand text-xl font-light mt-4 italic">Cape Town, South Africa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border border-sand/20 p-8 rounded-sm flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Triple Ocean View Room</h3>
              <p className="text-3xl font-light mb-6">1500 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8 flex-1">
                Share a beautiful, spacious oceanfront room with scenic ocean views with two other retreat guests. Three single beds, shared bathroom. Perfect for solo travelers wanting to connect!
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All Cape Town retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Oceanfront room view</li>
              </ul>
              <Link to="/book?retreat=capetown&room=triple" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Triple Room
                </Button>
              </Link>
            </div>
            <div className="border border-sand/20 p-8 rounded-sm relative overflow-hidden flex flex-col">
              <h3 className="text-2xl font-serif text-honey mb-2">Double Quiet Oasis Room</h3>
              <p className="text-3xl font-light mb-6">1650 EUR</p>
              <p className="font-light text-sand/80 leading-relaxed mb-8 flex-1">
                For those looking for a tranquil, comfortable oasis. Share a peaceful quiet oasis room with one other retreat guest. Two twin beds, shared bathroom.
              </p>
              <ul className="space-y-3 text-sm font-light text-sand/80 mb-8">
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> All Cape Town retreat inclusions</li>
                <li className="flex items-center gap-2"><span className="text-honey">✓</span> Comfort and tranquility</li>
              </ul>
              <Link to="/book?retreat=capetown&room=double" className="mt-auto">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs">
                  Select Double Room
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* What's Not Included */}
        <div className="text-center max-w-2xl mx-auto pb-2">
          <h3 className="text-2xl font-serif text-ocean-dark mb-4">What's Not Included</h3>
          <ul className="space-y-2 text-charcoal/70 font-light text-sm max-w-lg mx-auto list-none text-center">
            <li>Flights</li>
            <li>Mandatory travel insurance</li>
            <li>Additional wine tastings or personal expenses</li>
            <li>One-time entry fee to a nature reserve, approximately R200 / €10 (Cape Town)</li>
            <li>Private surf photography sessions and personalized action-shot package (Cape Town)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
