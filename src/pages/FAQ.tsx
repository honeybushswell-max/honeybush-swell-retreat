import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need surf experience?",
      answer: "Not at all! Our retreats are designed to cater to all levels, from absolute beginners who have never touched a surfboard to intermediate surfers looking to refine their technique. Our ISA-certified coaches will meet you exactly where you are."
    },
    {
      question: "Is it safe?",
      answer: "Safety is our number one priority. In Cape Town, we carefully select the safest, most beginner-friendly beaches depending on daily ocean conditions, as the waves here can be powerful and ever-changing. Our coaches are trained in ocean rescue and first aid, ensuring you feel supported and secure in the water at all times.\n\nIn the mountains, we follow a similar approach, choosing only well-known, beginner-friendly trails that we know from start to finish. Each route is thoughtfully selected to ensure a safe, enjoyable, and grounding experience in nature."
    },
    {
      question: "What if I come alone?",
      answer: "You are in the right place. About 80% of our guests join us solo. Our retreats are intentionally designed to foster connection, and you'll leave with a new sisterhood of friends from around the world."
    },
    {
      question: "What are the food options?",
      answer: "Our chefs prepare nourishing meals using local ingredients. We happily cater to all dietary requirements including vegan, gluten-free, and allergies. Just let us know when you book! Rest assured, you’ll be well taken care of and never leave the table hungry."
    },
    {
      question: "Are airport transfers included?",
      answer: "Yes! We provide group transfers from Cape Town International Airport (CPT), Gällivare Airport (GEV), and Gällivare Train Station on designated arrival and departure days. All transfer details will be confirmed with you closer to the retreat.\n\nPlease note that in Gällivare there is only one scheduled pick-up time from both the airport and train station on the arrival day."
    },
    {
      question: "What should I bring?",
      answer: "Comfortable activewear, a reusable water bottle, reef-safe sunscreen, a good book, and an open heart. We provide all surf equipment (including premium warm wetsuits) and yoga mats. A detailed packing list will be sent upon booking."
    },
    {
      question: "What is our booking policy?",
      answer: "As our retreats are very intimate (only 10 women or fewer per retreat), we encourage early booking. Be among the first to secure your spot by filling in the pre-registration form - we can’t wait to get to know you and welcome you into our community.\n\nBooking details\n\nA 30% deposit is required to secure your spot. Deposits are non-refundable.*\n\nYou may also choose to pay the full amount at the time of booking.\n\nFull payment for all bookings is required 2 months before the retreat start date.\n\nSecure your place early to ensure your spot in this transformative retreat experience.\n\n*For our Sweden (Lapland) retreat: if we do not reach at least 50% of the minimum number of participants 2 months before the retreat start date, we reserve the right to cancel the retreat. In this case, all payments made will be refunded in full (100%)."
    }
  ];

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-sand">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-ocean-dark mb-6"
          >
            FAQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            Everything you need to know before you go.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-sand-dark bg-white/50 rounded-sm overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-serif text-xl text-ocean-dark">{faq.question}</span>
                <span className="text-honey ml-4 flex-shrink-0">
                  {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              <div
                className={cn(
                  "px-6 overflow-hidden transition-all duration-500 ease-in-out",
                  openIndex === idx ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-charcoal/70 font-light leading-relaxed whitespace-pre-wrap">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
