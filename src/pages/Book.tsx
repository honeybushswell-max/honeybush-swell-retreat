import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Check, ArrowRight, ShieldCheck, Landmark, Copy } from 'lucide-react';

export function Book() {
  const location = useLocation();
  const [retreat, setRetreat] = useState<'lapland' | 'capetown'>('lapland');
  const [roomType, setRoomType] = useState<string>('shared');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    hikingExp: '',
    surfingExp: '',
    dietary: '',
    message: ''
  });

  const pricingData = {
    lapland: {
      title: "Lapland, Sweden",
      date: "August 26 - 30, 2026",
      spacesLeft: 7, 
      options: {
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
      } as Record<string, { title: string; price: number; desc: string }>,
      inclusions: [
        "4 nights in a cozy mountain lodge",
        "Daily hikes and immersive nature experiences",
        "Sauna sessions & lakeside recovery",
        "Chef-prepared nourishing meals included daily (breakfast, lunch & dinner)",
        "Daily yoga, breathwork & women’s circle practices",
        "Northern Lights chasing",
        "Introduction to Sámi culture and traditions. Learning how to respectfully connect with and honor the Sámi land and way of life",
        "Transport included from Gällivare. Gällivare pick-up is at 2:50 PM on arrival, and lodge to Gällivare drop-off is at 10:00 AM on departure day."
      ],
      emailFactory: (fName: string, lName: string, email: string, rType: string, customPrice?: number) => {
        const isShared = rType === 'shared';
        const basePrice = customPrice !== undefined ? customPrice : (isShared ? 999 : 1109);
        const depositAmount = (basePrice * 0.3).toFixed(2);
        const fullAmount = basePrice.toFixed(2);
        const firstPaymentOption = `€${depositAmount}`;
        const secondPaymentOption = `€${fullAmount}`;
        return `Hi! Thank you so much for booking your spot on our Lapland Sweden Retreat. We are incredibly excited to welcome you to this special experience in the heart of Swedish Lapland. We love that you are joining us with an open heart, hoping to make lifelong friends and reconnect with nature. That is exactly the spirit of this retreat.

Your spot is now reserved for 48 hours. Once we receive your bank transfer, we will send you a booking confirmation email.

Our booking policy is as follows:
• A 30% deposit is required to secure your spot. Deposits are non-refundable.
• You may also choose to pay the full amount at the time of booking.
• Full payment for all bookings is due two months before the retreat start date, which is 26 June.

The payment options are:
• 30% deposit: ${firstPaymentOption}
• Full payment: ${secondPaymentOption}

This is a women’s-only Hike & Soul Retreat, a chance to immerse yourself in calmness and Arctic magic. Think northern lights instead of beach clubs, hot saunas instead of heatwaves, and the raw silence of Swedish Lapland, the last true wilderness in Europe.

We are located approximately two hours from Gällivare, the heart of Swedish Lapland, and all transportation between Gällivare and the lodge is included. There are direct flights from Stockholm with PopulAir and scenic train journeys from Stockholm with SJ.

We will arrange:
• One pickup from Gällivare at 2:50 PM on 26 August
• One drop-off back in Gällivare at 12:00 PM on 30 August

In our next email, we will share more detailed travel information to help you plan your journey.

Lots of love,
Natalia & Anna`;
      }
    },
    capetown: {
      title: "Cape Town, South Africa",
      date: "November 18 - 26, 2026",
      spacesLeft: 10,
      options: {
        triple: {
          title: "Triple Ocean View Room",
          price: 1500,
          desc: "Share a beautiful, spacious oceanfront room with scenic ocean views with two other retreat guests. Three single beds, shared bathroom."
        },
        double: {
          title: "Double Quiet Oasis Room",
          price: 1650,
          desc: "Share a tranquil, comfortable oasis room with one other retreat guest. Two twin beds, shared bathroom."
        }
      } as Record<string, { title: string; price: number; desc: string }>,
      inclusions: [
        "8 nights in a beautiful oceanfront villa with breathtaking views and direct access to the ocean",
        "5 professionally guided surf coaching sessions for all levels, including surfboard and wetsuit rental. If ocean conditions are unsuitable, sessions will be replaced with scenic hikes",
        "Guided waterfall hike through some of the Cape's most stunning natural landscapes",
        "5 yoga sessions and a restorative breathwork experience",
        "Nourishing chef-prepared meals, including daily breakfasts and dinners, crafted with fresh local ingredients (excluding dinners during our Cape Peninsula weekend adventures)",
        "2 workshops: Women's Circle & Cacao Ceremony and Traditional Beading Workshop with a local artist",
        "Professional surf photography package (capturing shared moments and group experiences in the ocean)",
        "Visit to a local market in a charming surf village",
        "Weekend adventures around the Cape Peninsula, including coastal viewpoints, vineyards, the famous penguin colony, and stunning beaches",
        "All transportation throughout the retreat, including airport transfers to and from Cape Town International Airport",
        "A thoughtfully curated goodie bag"
      ],
      emailFactory: (fName: string, lName: string, email: string, rType: string, customPrice?: number) => {
        const isTriple = rType === 'triple';
        const basePrice = customPrice !== undefined ? customPrice : (isTriple ? 1500 : 1650);
        const depositAmount = (basePrice * 0.3).toFixed(2);
        const fullAmount = basePrice.toFixed(2);
        const firstPaymentOption = `€${depositAmount}`;
        const secondPaymentOption = `€${fullAmount}`;
        return `Hi! Thank you so much for booking your spot on our Cape Town South Africa Retreat. We are incredibly excited to welcome you to this special experience on the pristine shores of the Cape Peninsula. We love that you are joining us with an open heart, hoping to make lifelong friends and reconnect with nature. That is exactly the spirit of this retreat.

Your spot is now reserved for 48 hours. Once we receive your bank transfer, we will send you a booking confirmation email.

Our booking policy is as follows:
• A 30% deposit is required to secure your spot. Deposits are non-refundable.
• You may also choose to pay the full amount at the time of booking.
• Full payment for all bookings is due two months before the retreat start date, which is 18 September.

The payment options are:
• 30% deposit: ${firstPaymentOption}
• Full payment: ${secondPaymentOption}

This is a women’s-only Hike, Surf & Soul Retreat, a chance to immerse yourself in beautiful coastal nature, surf coaching, wellness workshops, and supportive ocean sisterhood.

All transportation throughout the retreat, including airport transfers to and from Cape Town International Airport (CPT), is included.

In our next email, we will share more detailed travel information to help you plan your journey.

Lots of love,
Natalia & Anna`;
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const retreatParam = params.get('retreat');
    const roomParam = params.get('room');

    let activeRetreat: 'lapland' | 'capetown' = 'lapland';
    if (retreatParam === 'capetown') {
      activeRetreat = 'capetown';
    }
    setRetreat(activeRetreat);

    // Reset promo code states on retreat change
    setPromoCodeInput('');
    setAppliedPromoCode(null);
    setPromoError(null);
    setPromoSuccess(null);

    if (activeRetreat === 'capetown') {
      if (roomParam === 'triple' || roomParam === 'double') {
        setRoomType(roomParam);
      } else {
        setRoomType('triple');
      }
    } else {
      if (roomParam === 'private' || roomParam === 'shared') {
        setRoomType(roomParam);
      } else {
        setRoomType('shared');
      }
    }

    const sessionId = params.get('session_id');
    const fName = params.get('firstName');
    const lName = params.get('lastName');
    const emailParam = params.get('email');

    if (sessionId) {
      setIsSubmitted(true);
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

  const activePricing = pricingData[retreat];
  const selectedPackage = activePricing.options[roomType] || Object.values(activePricing.options)[0];

  const discountPercent = 
    (appliedPromoCode === 'HELLOCAPETOWN10' && retreat === 'capetown') ? 0.10 : 
    (appliedPromoCode === 'LAPLANDPILATES' && retreat === 'lapland') ? 0.20 : 
    (appliedPromoCode === 'LASTMINUTELAPLAND' && retreat === 'lapland') ? 0.15 : 0;
  const discountAmount = Math.round(selectedPackage.price * discountPercent);
  const finalPrice = selectedPackage.price - discountAmount;

  const handleApplyPromoCode = (codeToApply?: string) => {
    const code = (codeToApply !== undefined ? codeToApply : promoCodeInput).trim().toUpperCase();
    if (code === '') {
      setPromoError('Please enter a promo code.');
      setPromoSuccess(null);
      return;
    }
    if (code === 'HELLOCAPETOWN10') {
      if (retreat !== 'capetown') {
        setPromoError('This promo code is only valid for the Cape Town, South Africa retreat.');
        setPromoSuccess(null);
        setAppliedPromoCode(null);
      } else {
        setAppliedPromoCode('HELLOCAPETOWN10');
        setPromoSuccess('Promo code "HELLOCAPETOWN10" applied! 10% discount has been activated.');
        setPromoError(null);
      }
    } else if (code === 'LAPLANDPILATES') {
      if (retreat !== 'lapland') {
        setPromoError('This promo code is only valid for the Lapland, Sweden retreat.');
        setPromoSuccess(null);
        setAppliedPromoCode(null);
      } else {
        setAppliedPromoCode('LAPLANDPILATES');
        setPromoSuccess('Promo code "LAPLANDPILATES" applied! 20% discount has been activated.');
        setPromoError(null);
      }
    } else if (code === 'LASTMINUTELAPLAND') {
      if (retreat !== 'lapland') {
        setPromoError('This promo code is only valid for the Lapland, Sweden retreat.');
        setPromoSuccess(null);
        setAppliedPromoCode(null);
      } else {
        setAppliedPromoCode('LASTMINUTELAPLAND');
        setPromoSuccess('Promo code "LASTMINUTELAPLAND" applied! 15% discount has been activated.');
        setPromoError(null);
      }
    } else {
      setPromoError('Invalid promo code.');
      setPromoSuccess(null);
      setAppliedPromoCode(null);
    }
  };

  const handleRemovePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoCodeInput('');
    setPromoSuccess(null);
    setPromoError(null);
  };

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
    
    try {
      // Auto-apply promo code if typed but not explicitly applied yet
      let currentPromo = appliedPromoCode;
      let currentDiscountAmount = discountAmount;
      let currentFinalPrice = finalPrice;
      
      const potentialCode = promoCodeInput.trim().toUpperCase();
      if (!appliedPromoCode) {
        if (potentialCode === 'HELLOCAPETOWN10' && retreat === 'capetown') {
          currentPromo = 'HELLOCAPETOWN10';
          currentDiscountAmount = Math.round(selectedPackage.price * 0.10);
          currentFinalPrice = selectedPackage.price - currentDiscountAmount;
          setAppliedPromoCode('HELLOCAPETOWN10');
          setPromoSuccess('Promo code "HELLOCAPETOWN10" applied! 10% discount has been activated.');
          setPromoError(null);
        } else if (potentialCode === 'LAPLANDPILATES' && retreat === 'lapland') {
          currentPromo = 'LAPLANDPILATES';
          currentDiscountAmount = Math.round(selectedPackage.price * 0.20);
          currentFinalPrice = selectedPackage.price - currentDiscountAmount;
          setAppliedPromoCode('LAPLANDPILATES');
          setPromoSuccess('Promo code "LAPLANDPILATES" applied! 20% discount has been activated.');
          setPromoError(null);
        } else if (potentialCode === 'LASTMINUTELAPLAND' && retreat === 'lapland') {
          currentPromo = 'LASTMINUTELAPLAND';
          currentDiscountAmount = Math.round(selectedPackage.price * 0.15);
          currentFinalPrice = selectedPackage.price - currentDiscountAmount;
          setAppliedPromoCode('LASTMINUTELAPLAND');
          setPromoSuccess('Promo code "LASTMINUTELAPLAND" applied! 15% discount has been activated.');
          setPromoError(null);
        }
      }

      const emailContent = activePricing.emailFactory(
        formData.firstName,
        formData.lastName,
        formData.email,
        roomType,
        currentFinalPrice
      );
      
      const formspreePayload = new FormData();
      formspreePayload.append("Form Type", `${retreat === 'capetown' ? "Cape Town South Africa" : "Lapland Sweden"} Booking - Bank Transfer Option`);
      formspreePayload.append("Selected Room", `${selectedPackage.title} (${selectedPackage.price} EUR)`);
      if (currentPromo) {
        formspreePayload.append("Promo Code Applied", currentPromo);
        formspreePayload.append("Discount Amount", `${currentDiscountAmount} EUR`);
        formspreePayload.append("Final Price", `${currentFinalPrice} EUR`);
      } else {
        formspreePayload.append("Final Price", `${selectedPackage.price} EUR`);
      }
      formspreePayload.append("Retreat Date", activePricing.date);
      formspreePayload.append("Payment Method Selected", "Direct Bank Transfer (Revolut)");
      formspreePayload.append("_subject", `Booking Received - Thank you for reserving your ${retreat === 'capetown' ? 'Cape Town' : 'Lapland'} Spot!`);
      formspreePayload.append("_replyto", formData.email);
      formspreePayload.append("Confirmation Email Body", emailContent);

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
            Secure your spot for the <strong className="font-semibold text-ocean-dark">{activePricing.title}</strong> retreat ({activePricing.date}). Spaces are limited to strictly {activePricing.spacesLeft} women to preserve an authentic, deeply nourishing sisterhood.
          </motion.p>
        </div>

        {isSubmitted ? (
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
              <p className="text-sm text-charcoal/70 font-light max-w-md mx-auto">
                Thank you so much for booking with us! We are holding your spot for up to 48 hours. Please complete your bank transfer of <strong className="font-semibold text-honey">{finalPrice} EUR</strong> using the bank details below. {appliedPromoCode && <span className="block text-xs text-emerald-600 font-normal mt-1">{appliedPromoCode === 'LAPLANDPILATES' ? '20%' : appliedPromoCode === 'LASTMINUTELAPLAND' ? '15%' : '10%'} Promo Code "{appliedPromoCode}" successfully applied!</span>} A copy of these transfer details and instructions has been emailed to you at <strong className="font-semibold text-honey">{formData.email}</strong>.
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

                <div className="space-y-1 flex-1">
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
                1. Complete the transfer of <strong className="text-honey font-medium">{finalPrice} EUR</strong> directly to the Revolut account above.
              </p>
              <p>
                2. Save your transfer confirmation (PDF or screenshot) and email it to <a href="mailto:honeybushswell@gmail.com" className="underline hover:text-honey text-ocean-dark font-medium">honeybushswell@gmail.com</a>.
              </p>
              <p>
                3. We will instantly verify the arrival and dispatch your official invitation package & travel booklet to <strong className="font-normal text-ocean-dark">{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-white border border-sand-dark/80 rounded-sm p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-honey"></div>
              <div className="flex items-center justify-between border-b border-sand pb-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-ocean-dark uppercase tracking-wider">Your Booking Confirmation Email has been sent!</span>
                </div>
                <span className="text-[10px] font-mono text-charcoal/50">To: {formData.email || 'your-email@domain.com'}</span>
              </div>
              <div className="text-xs text-charcoal/80 font-light leading-relaxed whitespace-pre-line space-y-3 font-serif italic bg-sand/10 p-5 rounded-sm border border-sand">
                {activePricing.emailFactory(formData.firstName, formData.lastName, formData.email, roomType, finalPrice)}
              </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Booking Form & Step Selection */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Option Cards */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold">1. Select your accommodation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {Object.entries(activePricing.options).map(([key, rawItem], idx) => {
                    const item = rawItem as { title: string; price: number; desc: string };
                    const isSelected = roomType === key;
                    return (
                      <div 
                        key={key}
                        onClick={() => setRoomType(key)}
                        className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col relative ${
                          isSelected 
                            ? 'bg-white border-honey shadow-sm ring-1 ring-honey' 
                            : 'bg-white/40 border-sand-dark/60 hover:bg-white/70'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 bg-honey text-ocean-dark rounded-full p-1">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                        <span className="text-charcoal/50 uppercase tracking-widest text-[10px] font-semibold block mb-1">Option {idx + 1}</span>
                        <h4 className="text-xl font-serif text-ocean-dark mb-1">{item.title}</h4>
                        <span className="text-2xl font-light text-honey mb-4">{item.price} EUR</span>
                        <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <span className="text-[10px] uppercase tracking-widest text-honey font-medium mt-auto flex items-center gap-1.5">
                          ✓ All packages included
                        </span>
                      </div>
                    );
                  })}

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

                  {retreat === 'capetown' && (
                    <div className="space-y-2">
                      <label htmlFor="surfingExp" className="text-xs uppercase tracking-widest text-ocean-dark font-medium">Surfing Experience</label>
                      <input
                        type="text"
                        id="surfingExp"
                        name="surfingExp"
                        value={formData.surfingExp}
                        onChange={handleInputChange}
                        placeholder="e.g. Complete beginner, some experience, advanced..."
                        className="w-full bg-transparent border-b border-sand-dark py-2.5 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm"
                        required={retreat === 'capetown'}
                      />
                    </div>
                  )}

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

                  {/* Promo Code Block */}
                  <div className="space-y-4 pt-6 border-t border-sand">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold">
                        Promo Code
                      </h3>
                      {appliedPromoCode && (
                        <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">
                          {appliedPromoCode === 'LAPLANDPILATES' ? '20% Off Applied' : appliedPromoCode === 'LASTMINUTELAPLAND' ? '15% Off Applied' : '10% Off Applied'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 items-end bg-sand/10 p-4 border border-sand-dark/30 rounded-sm">
                      <div className="flex-1 space-y-1">
                        <label htmlFor="promoCode" className="text-[10px] uppercase tracking-widest text-charcoal/50 font-medium font-sans">
                          Enter Code
                        </label>
                        <input
                          type="text"
                          id="promoCode"
                          placeholder="Enter promo code"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          className="w-full bg-transparent border-b border-sand-dark py-2 focus:outline-none focus:border-honey transition-colors font-light text-charcoal text-sm uppercase font-mono"
                          disabled={!!appliedPromoCode}
                        />
                      </div>
                      {appliedPromoCode ? (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleRemovePromoCode}
                          className="uppercase tracking-widest text-[10px] h-9 px-4 border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button 
                          type="button" 
                          onClick={() => handleApplyPromoCode()}
                          className="uppercase tracking-widest text-[10px] h-9 px-4 bg-honey text-ocean-dark hover:bg-honey/80 font-semibold"
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {promoError && (
                      <p className="text-xs text-rose-600 font-light font-sans">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="text-xs text-emerald-600 font-light font-sans">{promoSuccess}</p>
                    )}
                  </div>

                  {/* Bank Transfer Information Block */}
                  <div className="space-y-4 pt-6 border-t border-sand">
                    <h3 className="text-sm uppercase tracking-widest text-ocean-dark font-semibold">
                      3. Payment Method
                    </h3>
                    <div className="p-5 rounded-sm border border-sand-dark/40 bg-sand/20 space-y-3">
                      <div className="flex items-center gap-2">
                        <Landmark size={18} className="text-honey" />
                        <h4 className="text-sm font-serif text-ocean-dark font-semibold">Direct Bank Transfer</h4>
                      </div>
                      <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                        To secure your spot, make a direct bank transfer to our account. Official bank wire details (IBAN, BIC, Account Name) will be displayed on the screen immediately upon submitting this booking form. We will also hold your spot for up to 48 hours while your transfer is processed. We can't wait to meet you!
                      </p>
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
                  <h3 className="text-2xl font-serif text-sand mt-1">{activePricing.title}</h3>
                  <p className="text-sm font-light text-sand/70 italic mt-1">{activePricing.date}</p>
                </div>

                <div className="border-t border-b border-sand/10 py-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-honey text-lg">{selectedPackage.title}</h4>
                      <p className="text-xs font-light text-sand/60 max-w-[240px] mt-1">{selectedPackage.desc}</p>
                    </div>
                    <span className="text-lg font-light text-sand">{selectedPackage.price} EUR</span>
                  </div>

                  {appliedPromoCode && (
                    <div className="flex justify-between items-center text-xs text-sand/80 bg-honey/10 p-2.5 rounded-sm border border-honey/20">
                      <div>
                        <span className="block font-semibold text-honey">Promo Code applied:</span>
                        <span className="font-mono text-[10px]">{appliedPromoCode} ({appliedPromoCode === 'LAPLANDPILATES' ? '20%' : appliedPromoCode === 'LASTMINUTELAPLAND' ? '15%' : '10%'} Off)</span>
                      </div>
                      <span className="text-honey font-medium font-mono">-{discountAmount} EUR</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-honey font-semibold">Inclusions:</h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs font-light text-sand/80">
                    {activePricing.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-honey text-sm flex-shrink-0">✓</span>
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-sand/10 pt-5 flex justify-between items-baseline">
                  <span className="text-sm font-medium uppercase tracking-wider text-sand/70">Total Investment</span>
                  <div className="text-right">
                    {appliedPromoCode ? (
                      <div className="flex flex-col items-end">
                        <span className="text-xs line-through text-sand/50 font-mono mb-1">{selectedPackage.price} EUR</span>
                        <span className="text-3xl font-light text-honey font-mono">{finalPrice} EUR</span>
                      </div>
                    ) : (
                      <span className="text-3xl font-light text-honey font-mono">{selectedPackage.price} EUR</span>
                    )}
                  </div>
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
