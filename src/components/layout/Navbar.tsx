import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/src/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Dates & Pricing', path: '/dates' },
    { name: 'Retreats', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-ocean-dark/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <img 
            src="/honeylogo.png" 
            alt="Honeybush Swell Logo" 
            className="w-10 h-10 object-contain" 
          />
          <div className="flex flex-col leading-[0.8] font-serif tracking-[0.15em] text-sand">
            <span className="text-xl">HONEYBUSH</span>
            <span className="text-xl">SWELL</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm uppercase tracking-widest transition-colors hover:text-honey whitespace-nowrap',
                location.pathname === link.path ? 'text-honey font-medium' : 'text-sand'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/book">
            <Button className="bg-honey text-ocean-dark hover:bg-white hover:text-ocean-dark font-semibold uppercase tracking-widest text-xs px-5">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-sand"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ocean-dark border-t border-sand-dark shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm uppercase tracking-widest text-sand hover:text-honey py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-sand-dark flex flex-col gap-3">
              <Link to="/book">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-xs font-semibold">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
