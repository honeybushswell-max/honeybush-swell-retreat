import { motion } from 'motion/react';

export function Privacy() {
  return (
    <div className="pt-32 pb-24 bg-sand">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-serif text-ocean-dark mb-4">Privacy Policy</h1>
          
          <div className="mb-12 space-y-4 text-charcoal/80 font-light leading-relaxed">
            <p>
              At honeybush.swell we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or participate in our retreats.
            </p>
            <p className="text-sm italic">Last updated: May 2026</p>
          </div>

          <div className="space-y-8 text-charcoal/80 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some parts of the website may not function properly without them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-ocean-dark mb-2 text-lg">a. Personal Information:</h3>
                  <p className="mb-2">When you contact us, make a booking, or register for a retreat, we may collect personal details such as:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing address</li>
                    <li>Emergency contact details</li>
                    <li>Health or dietary information (only when necessary for retreat participation)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-ocean-dark mb-2 text-lg">b. Non-Personal Information:</h3>
                  <p>
                    We may automatically collect data such as your browser type, IP address, and browsing activity on our website through cookies or similar technologies.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process retreat bookings and payments</li>
                <li>Communicate with you about your reservation or inquiries</li>
                <li>Personalize your retreat experience</li>
                <li>Send updates, offers, or newsletters (only if you’ve opted in)</li>
                <li>Improve our website, services, and retreat programs</li>
                <li>Comply with legal or safety requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Legal Basis for Processing</h2>
              <p className="mb-4">We process your personal data based on:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your consent</li>
                <li>The necessity to perform a contract (e.g., retreat booking)</li>
                <li>Our legitimate interest in improving services and maintaining communication</li>
                <li>Compliance with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Data Sharing</h2>
              <p className="mb-4">We do not sell or rent your personal information. We may share your data only with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Retreat partners, instructors, or service providers (when necessary for your booking)</li>
                <li>Payment processors to complete transactions securely</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p className="mt-4">
                All third-party partners are required to keep your data secure and use it only for the purpose it was provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access, correct, or delete your personal data</li>
                <li>Withdraw consent at any time</li>
                <li>Object to processing or request data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:honeybushswell@gmail.com" className="hover:text-honey transition-colors">honeybushswell@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Security</h2>
              <p>
                We use appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated “last revised” date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ocean-dark mb-4">Who we are</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or your personal data, please contact us.
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
