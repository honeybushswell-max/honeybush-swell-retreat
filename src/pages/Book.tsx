import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Check, ArrowRight, Sparkles, CreditCard, ShieldCheck, Landmark, Copy, ArrowLeft } from 'lucide-react';

export function Book() {
  const location = useLocation();
  const [roomType, setRoomType] = useState<'shared' | 'private'>('shared');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMockSession, setIsMockSession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank'>('stripe');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    hikingExp: '',
    dietary: '',
    message: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomParam = params.get('room');
    if (roomParam === 'private' || roomParam === 'shared') {
      setRoomType(roomParam);
    }

    const sessionId = params.get('session_id');
    const fName = params.get('firstName');
    const lName = params.get('lastName');
    const emailParam = params.get('email');

    if (sessionId) {
      setIsSubmitted(true);
      if (sessionId.startsWith('mock_session')) {
        setIsMockSession(true);
      }
      if (fName || lName || emailParam) {
        setFormData(prev => ({
          ...prev,
          firstName: fName || '',
          lastName: lName || '',
          email: emailParam || '',
        }));
      }
    }
  }, [location]);

  const pricing = {
    shared: {
      title: "Shared Room",
      price: 999,
      desc: "Share a spacious, cozy room with one other retreat guest. Two twin beds, shared bathroom."
    },
    private: {
      title: "Private Room",
      price: 1109,
      desc: "A peaceful sanctuary to return to. Private room with its own en-suite bathroom."
    }
  };

  const selectedPackage = pricing[roomType];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (paymentMethod === 'bank') {
      try {
        const formspreePayload = new FormData();
        formspreePayload.append("Form Type", "Lapland Sweden Booking - Bank Transfer Option");
        formspreePayload.append("Selected Room", roomType === 'shared' ? "Shared Room (999 EUR)" : "Private Room (1109 EUR)");
        formspreePayload.append("Retreat Date", "August 26 - 30, 2026");
        formspreePayload.append("Payment Method Selected", "Direct Bank Transfer (Revolut)");

        Object.entries(formData).forEach(([key, value]) => {
          formspreePayload.append(key, value as string);
        });

        const response = await fetch("https://formspree.io/f/mkoyljqb", {
          method: 'POST',
          body: formspreePayload,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          alert("Oops! There was a problem submitting your registration. Please check your network and try again.");
        }
      } catch (error: any) {
        alert(`Registration Error: ${error.message || "Something went wrong. Please try again."}`);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      // 1. Invoke full stack session initialization
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          roomType,
          ...formData
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create checkout session");
      }

      const sessionData = await response.json();

      // 2. Log in Formspree for dual database and email-notification support for Natalia and Anna
      try {
        const formspreePayload = new FormData();
        formspreePayload.append("Form Type", "Lapland Sweden Stripe Checkout Redirect");
        formspreePayload.append("Selected Room", roomType === 'shared' ? "Shared Room (999 EUR)" : "Private Room (1109 EUR)");
        formspreePayload.append("Retreat Date", "August 26 - 30, 2026");
        formspreePayload.append("Stripe Checkout URL", sessionData.url || "N/A");
        formspreePayload.append("Stripe Environment Mode", sessionData.sandbox ? "Sandbox Sandbox fallback" : "Production Live");

        Object.entries(formData).forEach(([key, value]) => {
          formspreePayload.append(key, value as string);
        });

        await fetch("https://formspree.io/f/mkoyljqb", {
          method: 'POST',
          body: formspreePayload,
          headers: {
            'Accept': 'application/json'
          }
        });
      } catch (fsErr) {
        console.warn("Duplex Formspree submission skipped background log:", fsErr);
      }

      // 3. Initiate Redirection safely supporting iframe restrictions
      if (sessionData.url) {
        if (sessionData.sandbox) {
          window.location.href = sessionData.url;
        } else {
          // Attempt popup redirection
          try {
            const popup = window.open(sessionData.url, '_blank');
            if (!popup) {
              console.warn("Safari/Chrome popup blocker prevented opening checkout window immediately.");
            }
          } catch (popupErr) {
            console.warn("Could not auto-open payment tab:", popupErr);
          }
          // Set Stripe URL so user sees a beautiful dedicated secure Checkout transition component
          setStripeCheckoutUrl(sessionData.url);
        }
      } else {
        alert("Oops! There was a problem initiating Stripe Checkout. Please verify your connection.");
      }
    } catch (error: any) {
      alert(`Stripe Checkout Error: ${error.message || "Something went wrong. Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-sand">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-honey uppercase tracking-[0.2em] text-xs font-semibold block mb-3"
          >
            Securing Your Experience
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-ocean-dark mb-6"
          >
            Book Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            Secure your spot for the **Lapland, Sweden** retreat (August 26 - 30, 2026). Spaces are limited to strictly 7 women to preserve an authentic, deeply nourishing sisterhood.
          </motion.p>
        </div>

        {stripeCheckoutUrl ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-8 md:p-16 rounded-sm border border-sand-dark shadow-md text-center space-y-8"
          >
            <div className="w-20 h-20 bg-honey/10 text-honey rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={40} className="text-honey" />
            </div>
            
            <div className="space-y-3">
              <span className="text-honey uppercase tracking-[0.15em] text-xs font-semibold">Secure Payment Session Ready</span>
              <h2 className="text-4xl font-serif text-ocean-dark">Complete Secure Checkout</h2>
            </div>
            
            <p className="text-charcoal/80 font-light leading-relaxed max-w-md mx-auto">
              Your secure payment gateway has been initiated! Since browsers prevent secure payment forms from rendering inside iframe previews, please click below to complete your checkout in a new secure window.
            </p>

            <div className="pt-4 max-w-sm mx-auto">
              <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full bg-honey text-ocean-dark hover:bg-white hover:text-ocean-dark uppercase tracking-widest text-xs font-semibold py-5 flex items-center justify-center gap-2 shadow-sm">
                  <span>Open Stripe Secure Payment</span>
                  <ArrowRight size={14} />
                </Button>
              </a>
            </div>

            <p className="text-xs text-charcoal/50 leading-relaxed max-w-sm mx-auto">
              After a successful payment, Stripe will instantly guide you back here to display your pristine confirmation.
            </p>

            <div className="pt-4 border-t border-sand flex justify-center">
              <button 
                type="button"
                onClick={() => setStripeCheckoutUrl(null)} 
                className="text-xs text-charcoal/60 hover:text-ocean-dark underline transition-colors"
              >
                ← Edit registration details or room selection
              </button>
            </div>
          </motion.div>
        ) : isSubmitted ? (
          paymentMethod === 'bank' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-sm border border-sand-dark shadow-md text-left space-y-6"
            >
              <div className="text-center space-y-3 mb-4">
                <div className="w-16 h-16 bg-honey/10 text-honey rounded-full flex items-center justify-center mx-auto mb-2">
                  <Landmark size={32} className="text-honey" />
                </div>
                <span className="text-honey uppercase tracking-[0.15em] text-xs font-semibold block">Spot Reserved - Pending Transfer</span>
                <h2 className="text-3xl font-serif text-ocean-dark">Your Spot is Initiated!</h2>
                <p className="text-sm text-charcoal/70 font-light max-w-sm mx-auto">
                  We are holding your spot for up to 48 hours. Please complete your bank transfer of <strong className="font-semibold text-honey">{selectedPackage.price} EUR</strong> using the bank details below.
                </p>
              </div>

              <div className="bg-sand/40 border border-sand-dark/60 rounded-sm p-6 space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-ocean-dark font-semibold border-b border-sand pb-2 text-center md:text-left">
                  Official Revolut Bank Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">Bank Name</span>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono">
                      <span>REVOLUT BANK UAB</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("REVOLUT BANK UAB");
                          setCopiedField("bankName");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 text-right"
                      >
                        {copiedField === 'bankName' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">Account Holder</span>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono font-medium">
                      <span>Natalia Dominika Golab</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("Natalia Dominika Golab");
                          setCopiedField("holder");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 text-right"
                      >
                        {copiedField === 'holder' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">IBAN / Account Number</span>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono font-semibold text-sm">
                      <span>LT34 3250 0237 2603 1841</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("LT34 3250 0237 2603 1841");
                          setCopiedField("iban");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 text-right"
                      >
                        {copiedField === 'iban' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">BIC</span>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono text-xs">
                      <span>REVOLT21</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("REVOLT21");
                          setCopiedField("bic");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 text-right"
                      >
                        {copiedField === 'bic' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">E-mail</span>
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono text-xs">
                      <span>honeybushswell@gmail.com</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("honeybushswell@gmail.com");
                          setCopiedField("email");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 text-right"
                      >
                        {copiedField === 'email' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <span className="text-charcoal/50 block font-light uppercase tracking-wider text-[10px]">Address</span>
                    <div className="bg-white px-3 py-2 rounded-sm border border-sand-dark/40 font-mono flex items-center justify-between text-xs">
                      <span>Zbozowa 6/7, 81-020, Poland</span>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("Zbozowa 6/7, 81-020, Poland");
                          setCopiedField("address");
                          setTimeout(() => setCopiedField(null), 1500);
                        }}
                        className="text-honey hover:text-ocean-dark text-[10px] uppercase font-semibold underline ml-2 flex-shrink-0"
                      >
                        {copiedField === 'address' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-ocean/10 p-5 rounded-sm border border-sand-dark/40 text-xs font-light leading-relaxed text-charcoal space-y-3">
                <span className="font-semibold text-ocean-dark block uppercase tracking-wider text-[10px]">Next Steps to Finalize Reservation:</span>
                <p>
                  1. Complete the transfer of <strong className="text-honey font-medium">{selectedPackage.price} EUR</strong> directly to the Revolut account above.
                </p>
                <p>
                  2. Save your transfer confirmation (PDF or screenshot) and email it to <a href="mailto:honeybushswell@gmail.com" className="underline hover:text-honey text-ocean-dark font-medium">honeybushswell@gmail.com</a>.
                </p>
                <p>
                  3. We will instantly verify the arrival and dispatch your official Lapland invitation package & travel booklet to <strong className="font-normal text-ocean-dark">{formData.email}</strong>.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="default" className="w-full uppercase tracking-widest text-xs py-4 px-8">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/experience" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full uppercase tracking-widest text-xs py-4 px-8">
                    View Experience
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white p-8 md:p-16 rounded-sm border border-sand-dark shadow-md text-center space-y-8"
            >
              <div className="w-20 h-20 bg-ocean/10 text-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={40} className="text-honey animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <span className="text-honey uppercase tracking-[0.15em] text-xs font-semibold">
                  {isMockSession ? "Sandbox Demo Spot Reserved" : "Payment Secured via Stripe"}
                </span>
                <h2 className="text-4xl font-serif text-ocean-dark">
                  {isMockSession ? "Your Spot is Initiated!" : "Payment Confirmed!"}
                </h2>
              </div>
              
              <div className="border-t border-b border-sand py-6 my-6 text-left space-y-4 max-w-md mx-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Retreat:</span>
                  <span className="font-medium text-ocean-dark">Lapland, Sweden</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Dates:</span>
                  <span className="font-medium text-ocean-dark">August 26 - 30, 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Accommodation:</span>
                  <span className="font-medium text-ocean-dark">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-dashed border-sand pt-4">
                  <span className="font-medium text-charcoal">Total Price:</span>
                  <span className="font-semibold text-honey text-lg">{selectedPackage.price} EUR</span>
                </div>
              </div>

              <p className="text-charcoal/80 font-light leading-relaxed max-w-md mx-auto">
                {isMockSession ? (
                  <>
                    Your mock booking is complete! We have simulation-secured your spot. To run live transactions with credit card checkout, please configure the <strong className="font-normal text-ocean-dark">STRIPE_SECRET_KEY</strong> in your AI Studio dashboard settings.
                  </>
                ) : (
                  <>
                    Thank you! Your payment has been securely processed and verified. Your spot is confirmed! All booking confirmations have been dispatched to <strong className="font-normal text-ocean-dark">{formData.email || "your inbox"}</strong>.
                  </>
                )}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="default" className="uppercase tracking-widest text-xs py-4 px-8 w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/experience">
                  <Button variant="outline" className="uppercase tracking-widest text-xs py-4 px-8 w-full sm:w-auto">
                    View Experience
                  </Button>
                </Link>
              </div>
            </motion.div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Booking Form & Step Selection */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Option Cards */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold">1. Select your accommodation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Shared Room */}
                  <div 
                    onClick={() => setRoomType('shared')}
                    className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col relative ${
                      roomType === 'shared' 
                        ? 'bg-white border-honey shadow-sm ring-1 ring-honey' 
                        : 'bg-white/40 border-sand-dark/60 hover:bg-white/70'
                    }`}
                  >
                    {roomType === 'shared' && (
                      <div className="absolute top-4 right-4 bg-honey text-ocean-dark rounded-full p-1">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                    <span className="text-charcoal/50 uppercase tracking-widest text-[10px] font-semibold block mb-1">Option 1</span>
                    <h4 className="text-xl font-serif text-ocean-dark mb-1">Shared Room</h4>
                    <span className="text-2xl font-light text-honey mb-4">999 EUR</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-4">
                      Share with one other retreat guest. Two twin beds, spacious serene setting, and fully shared amenities.
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-honey font-medium mt-auto flex items-center gap-1.5">
                      ✓ All packages included
                    </span>
                  </div>

                  {/* Private Room */}
                  <div 
                    onClick={() => setRoomType('private')}
                    className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col relative ${
                      roomType === 'private' 
                        ? 'bg-white border-honey shadow-sm ring-1 ring-honey' 
                        : 'bg-white/40 border-sand-dark/60 hover:bg-white/70'
                    }`}
                  >
                    {roomType === 'private' && (
                      <div className="absolute top-4 right-4 bg-honey text-ocean-dark rounded-full p-1">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                    <span className="text-charcoal/50 uppercase tracking-widest text-[10px] font-semibold block mb-1">Option 2</span>
                    <h4 className="text-xl font-serif text-ocean-dark mb-1">Private Room</h4>
                    <span className="text-2xl font-light text-honey mb-4">1109 EUR</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-4">
                      An absolute peaceful sanctuary with its own en-suite bathroom for premium comfort and quiet evenings.
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-honey font-medium mt-auto flex items-center gap-1.5">
                      ✓ All packages included
                    </span>
                  </div>

                </div>
              </div>

              {/* Form Input fields */}
              <div className="bg-white/50 p-8 md:p-10 rounded-sm border border-sand-dark shadow-sm">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold pb-4 border-b border-sand">
                    2. Registration Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+27 61 924 4311"
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Where are you based?</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">What is your age?</label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hikingExp" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Hiking Experience</label>
                    <input
                      type="text"
                      id="hikingExp"
                      name="hikingExp"
                      value={formData.hikingExp}
                      onChange={handleInputChange}
                      placeholder="e.g. Regular hiker, beginner..."
                      className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dietary" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Dietary Requirements</label>
                    <input
                      type="text"
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleInputChange}
                      placeholder="Vegan, Gluten-free, none, etc."
                      className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">A brief note on why you'd like to join us</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-transparent border-b border-sand-dark py-2 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm resize-none"
                      placeholder="What are you hoping to experience or release on this retreat?"
                    ></textarea>
                  </div>

                  {/* Choose Payment Method Section */}
                  <div className="space-y-4 pt-6 border-t border-sand">
                    <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold">
                      3. Choose Payment Method
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Credit Card / Stripe option */}
                      <div 
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col relative ${
                          paymentMethod === 'stripe' 
                            ? 'bg-white border-honey shadow-sm ring-1 ring-honey' 
                            : 'bg-white/40 border-sand-dark/60 hover:bg-white/70'
                        }`}
                      >
                        {paymentMethod === 'stripe' && (
                          <div className="absolute top-4 right-4 bg-honey text-ocean-dark rounded-full p-1">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <span className="text-charcoal/50 uppercase tracking-widest text-[9px] font-semibold block mb-1">Option 1</span>
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard size={18} className="text-honey" />
                          <h4 className="text-md font-serif text-ocean-dark">Pay with Credit Card</h4>
                        </div>
                        <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                          Instant card payment secured by encryption via Stripe gateway. Supports Google Pay & Apple Pay.
                        </p>
                      </div>

                      {/* Bank Transfer option */}
                      <div 
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-5 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col relative ${
                          paymentMethod === 'bank' 
                            ? 'bg-white border-honey shadow-sm ring-1 ring-honey' 
                            : 'bg-white/40 border-sand-dark/60 hover:bg-white/70'
                        }`}
                      >
                        {paymentMethod === 'bank' && (
                          <div className="absolute top-4 right-4 bg-honey text-ocean-dark rounded-full p-1">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <span className="text-charcoal/50 uppercase tracking-widest text-[9px] font-semibold block mb-1">Option 2</span>
                        <div className="flex items-center gap-2 mb-2">
                          <Landmark size={18} className="text-honey" />
                          <h4 className="text-md font-serif text-ocean-dark font-semibold">Direct Bank Transfer</h4>
                        </div>
                        <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                          Direct bank transfer to our secure European Revolut Business account in EUR.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="w-full bg-ocean-dark text-sand hover:bg-sand-dark hover:text-ocean-dark uppercase tracking-widest text-xs py-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Processing Reservation..." : "Confirm Booking & Reserve Spot"}
                      {!isSubmitting && <ArrowRight size={14} />}
                    </Button>
                  </div>
                </form>
              </div>

            </div>

            {/* Right side: Sticky Booking Summary Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <div className="bg-ocean-dark text-sand p-8 rounded-sm shadow-md border border-sand-dark/20 space-y-6">
                <div>
                  <span className="text-honey uppercase tracking-wider text-[10px] font-semibold">Your Package Summary</span>
                  <h3 className="text-2xl font-serif text-sand mt-1">Lapland, Sweden</h3>
                  <p className="text-sm font-light text-sand/70 italic mt-1">August 26 - 30, 2026</p>
                </div>

                <div className="border-t border-b border-sand/10 py-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-honey text-lg">{selectedPackage.title}</h4>
                      <p className="text-xs font-light text-sand/60 max-w-[240px] mt-1">{selectedPackage.desc}</p>
                    </div>
                    <span className="text-lg font-light text-sand">{selectedPackage.price} EUR</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-honey font-semibold">Inclusions:</h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs font-light text-sand/80">
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>4 nights in a cozy mountain lodge</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Daily hikes and immersive nature experiences</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Sauna sessions & lakeside recovery</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Chef-prepared nourishing meals included daily (breakfast, lunch & dinner)</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Daily yoga, breathwork & women’s circle practices</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Northern Lights chasing</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Introduction to Sámi culture and traditions. Learning how to respectfully connect with and honor the Sámi land and way of life</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>Transport included from Gällivare</span></li>
                    <li className="flex items-start gap-2"><span className="text-honey text-sm flex-shrink-0">✓</span> <span>An unforgettable experience in the UNESCO World Heritage region of Laponia</span></li>
                  </ul>
                </div>

                <div className="border-t border-sand/10 pt-5 flex justify-between items-baseline">
                  <span className="text-sm font-medium uppercase tracking-wider text-sand/70">Total Investment</span>
                  <span className="text-3xl font-light text-honey font-mono">{selectedPackage.price} EUR</span>
                </div>

                <div className="bg-ocean/30 p-4 rounded-sm space-y-2 border border-sand/5">
                  <div className="flex items-center gap-2 text-honey text-xs uppercase font-semibold">
                    <ShieldCheck size={16} />
                    <span>Secure Your Spot</span>
                  </div>
                  <p className="text-[11px] text-sand/70 font-light leading-relaxed">
                    Once submitted, we hold this spot for you. Payment layout options will be dispatched to your inbox within 24 hours to finalize your reservation.
                  </p>
                </div>
              </div>
              
              <div className="bg-white/40 p-6 rounded-sm border border-sand-dark shadow-sm text-center">
                <p className="text-xs text-charcoal/60 font-light">
                  Need custom dates or private groups? Or have general questions? <br />
                  <Link to="/contact" className="text-honey font-medium underline hover:text-ocean-dark transition-colors">Contact Anna & Natalia</Link>
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
