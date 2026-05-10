import { motion } from 'motion/react';

export function Terms() {
  return (
    <div className="pt-32 pb-24 bg-sand">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-serif text-ocean-dark mb-4">Terms & Conditions</h1>
          
          <div className="mb-12 space-y-4 text-charcoal/80 font-light leading-relaxed">
            <h2 className="text-2xl font-serif text-ocean-dark">Honeybush Swell - Surf & Soul Retreat</h2>
            <p>
              Welcome to Honeybush Swell! These Terms & Conditions outline the rules for booking and participating in our Surf & Soul Retreat. By booking with us, you agree to the terms below.
            </p>
            <p className="text-sm italic">Last updated: May 2026</p>
          </div>

          <div className="space-y-8 text-charcoal/80 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">1. Booking and Payments</h2>
              <p>
                To secure your place on a Honeybush Swell retreat, a non-refundable deposit of 30% is required at the time of booking. The remaining balance must be paid in full at least 60 days before the retreat start date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">2. Cancellation Policy</h2>
              <p>
                Because retreat planning requires fixed accommodation, food, and activity commitments: All payments (deposit or full) are non-refundable. If you are unable to attend, you may transfer your booking to another person at no additional cost. Please inform us of the name and contact details of the new participant.
              </p>
              <p className="mt-4">
                If the retreat must be cancelled by us (e.g., due to unforeseen circumstances), all payments will be fully refunded.
              </p>
              <p className="mt-4">
                *For our Sweden (Lapland) retreat: if we do not reach at least 50% of the minimum number of participants 2 months before the retreat start date, we reserve the right to cancel the retreat. In this case, all payments made will be refunded in full (100%).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">3. Travel Insurance</h2>
              <p>
                Comprehensive travel insurance is mandatory for all guests. Your insurance should cover trip cancellation, medical expenses, personal accident, and personal liability. We recommend insurance that specifically covers "adventure activities" including surfing and hiking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">4. Liability</h2>
              <p>
                Honeybush Swell Retreats and its staff shall not be held responsible for any damage, loss, or injury incurred during the retreat. Surfing and outdoor activities involve inherent risks which guests accept by participating.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">5. Health and Fitness</h2>
              <p>
                Guests are responsible for ensuring they are in good health and have a reasonable level of fitness for the activities described. Please inform us of any medical conditions or dietary requirements at the time of booking.
              </p>
              <p className="mt-4">
                We always prioritise safety and will never push you beyond your comfort zone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">6. Media Release</h2>
              <p>
                During the retreat, photos and videos may be taken for promotional purposes. By attending, you grant Honeybush Swell the right to use this media. If you prefer not to be photographed, please let us know before the retreat begins.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">7. Changes to the Program</h2>
              <p>
                Small adjustments to the schedule, instructors, or activities may occur due to weather or availability. We will always try to offer an equal or better experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">8. Personal Data</h2>
              <p>
                We collect only the information necessary to process your booking and prepare your retreat experience (such as name, email, phone number, and payment details).
              </p>
              <p className="mt-4">
                Your data is handled according to our Privacy Policy. We do not share personal information with third parties except as required to provide the service (e.g., accommodation partners).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">9. About us</h2>
              <p>
                Honeybush Swell is a retreat experience focused on connection, wellbeing, adventure, and community. If you have any questions or concerns about this Privacy Policy or your personal data, please contact us.
              </p>
              <div className="mt-6 flex flex-col space-y-2 text-sm font-medium">
                <p>Our website address is: <a href="http://honeybushswell.com" className="hover:text-honey transition-colors">http://honeybushswell.com</a></p>
                <p>Our e-mail address is: <a href="mailto:honeybushswell@gmail.com" className="hover:text-honey transition-colors">honeybushswell@gmail.com</a></p>
                <p>Our phone number is: <a href="tel:+27619244311" className="hover:text-honey transition-colors">+27 (0) 619244311</a></p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
