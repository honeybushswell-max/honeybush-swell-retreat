import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';

export function Contact() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dateParam = params.get('date');
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [location]);

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-sand">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-ocean-dark mb-6"
          >
            Apply Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            We’re so happy you feel called to join one of our upcoming retreats. Please fill in the form below to pre-register your interest, we’ll be in touch with dates, availability, and next steps.
          </motion.p>
        </div>

        {/* Form */}
        <div className="bg-white/60 p-8 md:p-12 rounded-sm border border-sand-dark shadow-sm">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Where are you based?</label>
                <input
                  type="text"
                  id="location"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">What is your age?</label>
                <input
                  type="text"
                  id="age"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Preferred Retreat Date</label>
                <select
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal appearance-none"
                  required
                >
                  <option value="" disabled>Select a date...</option>
                  <option value="August 2026">August 2026</option>
                  <option value="November 2026">November 2026</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="roomType" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Which room would you like to book?</label>
                <select
                  id="roomType"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal appearance-none"
                  required
                >
                  <option value="" disabled selected>Select room type...</option>
                  <option value="shared">Shared Room</option>
                  <option value="private">Private Room</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="surfLevel" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Surf Experience Level</label>
                <select
                  id="surfLevel"
                  className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal appearance-none"
                  required
                >
                  <option value="" disabled selected>Select your level...</option>
                  <option value="beginner">Absolute Beginner (Never surfed)</option>
                  <option value="novice">Novice (Had a few lessons, catching white water)</option>
                  <option value="intermediate">Intermediate (Paddling out, catching green waves)</option>
                  <option value="advanced">Advanced (Comfortable in overhead waves)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="hiking" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Do you have experience with hiking?</label>
              <input
                type="text"
                id="hiking"
                placeholder="e.g. Occasional hiker, regular mountain explorer, none..."
                className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dietary" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Dietary Requirements</label>
              <input
                type="text"
                id="dietary"
                placeholder="e.g. Vegan, Gluten-free, None"
                className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="referral" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">How did you hear about us? *</label>
              <select
                id="referral"
                className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal appearance-none"
                required
              >
                <option value="" disabled selected>Select option...</option>
                <option value="instagram">Instagram</option>
                <option value="friend">Friend</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm uppercase tracking-widest text-ocean-dark font-medium">Why do you want to join us?</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-transparent border-b border-sand-dark py-3 focus:outline-none focus:border-honey transition-colors font-light text-charcoal resize-none"
                placeholder="Tell us a little about yourself and what you hope to get out of this retreat..."
                required
              ></textarea>
            </div>

            <div className="pt-6">
              <Button type="submit" size="lg" className="w-full bg-ocean-dark text-sand hover:bg-sand-dark hover:text-ocean-dark uppercase tracking-widest text-sm">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
