import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ocean-dark text-sand py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/">
            <img 
              src="/honeylogo.png" 
              alt="Honeybush Swell Logo" 
              className="h-20 w-auto object-contain mb-6" 
            />
          </Link>
          <p className="text-sand/70 mb-6 max-w-md font-light">
            Thank you for visiting our little corner of waves and connection! We can’t wait to welcome you to our intimate retreat and share unforgettable moments of surfing, yoga, hiking, empowerment, and community.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/honeybush.swell/" target="_blank" rel="noopener noreferrer" className="text-sand/70 hover:text-honey transition-colors">
              <Instagram size={20} />
            </a>
            <a href="mailto:honeybushswell@gmail.com" className="text-sand/70 hover:text-honey transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-sand mb-4">Explore</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-sand/80 hover:text-sand transition-colors font-light">Our Story</Link></li>
            <li><Link to="/experience" className="text-sand/80 hover:text-sand transition-colors font-light">The Experience</Link></li>
            <li><Link to="/dates" className="text-sand/80 hover:text-sand transition-colors font-light">Dates & Pricing</Link></li>
            <li><Link to="/faq" className="text-sand/80 hover:text-sand transition-colors font-light">FAQ</Link></li>
            <li><Link to="/terms" className="text-sand/80 hover:text-sand transition-colors font-light">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-sand mb-4">Newsletter</h3>
          <p className="text-sand/70 text-sm mb-4 font-light">
            Join our waitlist for early access to new retreat dates and mindful inspiration.
          </p>
          <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border border-sand/30 rounded-none px-4 py-2 text-sm text-sand placeholder:text-sand/50 focus:outline-none focus:border-honey transition-colors"
            />
            <button
              type="submit"
              className="bg-honey text-ocean-dark uppercase tracking-widest text-xs font-medium py-3 hover:bg-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center text-xs text-sand/50 font-light">
        <p>&copy; {new Date().getFullYear()} Honeybush Swell Retreats. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-sand transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-sand transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
