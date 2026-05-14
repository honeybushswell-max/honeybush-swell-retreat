import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative group w-full h-[400px] md:h-[500px] overflow-hidden rounded-sm shadow-xl">
      <div className="absolute inset-0">
        <img
          src={images[index]}
          alt="Carousel Image"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === i ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const villaImages = [
    "/mainsoul.jpeg", "/0soul.jpeg", "/1soul.jpeg", "/2soul.jpeg", "/4soul.jpeg", 
    "/5soul.jpeg", "/6soul.jpeg", "/7soul.jpeg",
    "/main1.jpg", "/main2.jpg", "/main5.jpg", "/main6.jpg", "/main7.jpg", 
    "/main8.jpg", "/main9.jpg", "/main10.jpg", "/main11.jpg", "/main12.jpg", 
    "/main13.jpg", "/main14.jpg", "/main15.jpg", "/main16.jpg"
  ];
  const lodgeImages = [
    "/stora1.jpg", "/stora0.jpg", "/stora2.jpg", "/stora3.jpg", "/stora4.png", "/stora5.jpeg", 
    "/stora6.jpeg", "/stora7.jpg", "/stora10.jpg"
  ];

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
            The Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
          >
            Immersive experiences designed to nourish the soul, find connection, and embrace adventure in the most breathtaking corners of the world.
          </motion.p>
        </div>

        {/* The Details */}
        <div className="mb-0">
          <div className="text-center mb-16">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">The Details</span>
            <h2 className="text-4xl font-serif text-ocean-dark mt-4">Our Retreats</h2>
          </div>

          <div className="flex flex-col gap-24">
            {/* Lapland */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[16/9] overflow-hidden rounded-sm">
                <img
                  src="/stora1.jpg"
                  alt="Lapland landscape"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-serif text-ocean-dark mb-4">Lapland</h3>
                  <p className="text-charcoal/70 font-light">
                    A 4-night immersion in a mountain lodge set within a nature reserve on sacred Sámi land - the Indigenous people of Sweden.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-honey font-medium mb-4">What's Included</h4>
                  <ul className="space-y-3 text-charcoal/80 font-light">
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>4 nights accommodation in a mountain lodge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Daily adventures (hiking, kayaking, and wild nature exploration)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Daily yoga, breathwork, or meditation sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Contrast therapy sauna rituals with cold river dips</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>All nourishing, chef-prepared meals (breakfast, lunch, dinner)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>An introduction to Sámi traditions, stories, and their deep-rooted connection to the land - offering a richer understanding of the place we are welcomed into</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Airport transfers from Gällivare Airport or Gällivare train station</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cape Town */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[16/9] overflow-hidden rounded-sm lg:order-2">
                <img
                  src="/main16.jpg"
                  alt="Cape Town coast"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 lg:order-1">
                <div>
                  <h3 className="text-3xl font-serif text-ocean-dark mb-4">Cape Town</h3>
                  <p className="text-charcoal/70 font-light">
                    A 9-day, 8-night immersion into surf, soul, and sisterhood in the heart of Cape Town.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-honey font-medium mb-4">What's Included</h4>
                  <ul className="space-y-3 text-charcoal/80 font-light">
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>8 nights in a oceanfront villa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>5 surf coaching sessions for all levels (equipment included) - if ocean conditions are unsuitable, the experience will be replaced with a breathtaking hike instead</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>5 yoga flows + a breathwork session</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>All nourishing, chef-prepared meals (daily breakfasts and dinners except during our weekend outings)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Two guided workshops: Women’s Circle & beading workshop with a local artist</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Professional surf photography package (capturing shared moments in the ocean and beyond)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Weekend adventures around the Cape Peninsula (vineyards, penguin colony, and breathtaking beaches)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-honey mt-1">✦</span>
                      <span>Airport transfers from Cape Town International (CPT)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pb-0">
            <p className="text-xl font-serif text-ocean-dark italic">
              And most importantly: lasting friendships, soul-deep connections, and an unforgettable adventure
            </p>
          </div>
        </div>

        {/* Surf Coaching */}
        <div className="bg-ocean-dark text-sand p-12 md:p-24 rounded-sm mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="/wild.jpg"
                alt="Women, Water & Wilderness"
                className="w-full h-auto rounded-sm object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-honey uppercase tracking-widest text-sm font-medium">In The Water & In The Mountains</span>
              <h2 className="text-4xl font-serif text-sand mt-4 mb-8">Women, Water & Wilderness</h2>
              <div className="space-y-6 text-sand/80 font-light leading-relaxed">
                <p>
                  This retreat is an invitation to reconnect with nature through movement, adventure, and presence, both on the water and deep in the mountains.
                </p>
                <p>
                  In Cape Town, our days flow between the ocean and the shoreline. Guided surf sessions are designed to feel supportive, empowering, and fun, whether it’s your first wave or your hundredth. We focus on building confidence in the water, learning to read the ocean, and embracing the joy of surfing in a relaxed environment.
                </p>
                <p>
                  In Swedish Lapland, we slow down and immerse ourselves in the rhythm of the mountains. Together, we hike through vast valleys, ancient forests, and along breathtaking waterfalls, exploring landscapes shaped by the Arctic wilderness. Along the way, we search for traces of wildlife, from reindeer footprints to birds and other signs of life hidden in nature.
                </p>
                <p>
                  From cold-water dips and quiet mountain trails to salty hair and evenings around the table, this experience is about feeling alive, grounded, and deeply connected to the natural world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wellness & Food */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div>
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Nourish</span>
            <h2 className="text-4xl font-serif text-ocean-dark mt-4 mb-8">Food & Workshops</h2>
            <div className="space-y-6 text-charcoal/80 font-light leading-relaxed">
              <p>
                <strong>The Food:</strong> Our chefs create nourishing meals inspired by the season and the surrounding landscape, using fresh local ingredients whenever possible. From slow breakfasts and energizing lunches to hearty, family-style dinners after a day outdoors, every meal is designed to bring comfort, connection, and balance. We happily cater to all dietary requirements
              </p>
              <p>
                <strong>The Workshops:</strong> Beyond the physical, we create space for connection, creativity, and reflection. Our signature Women’s Circle offers a supportive environment for sharing and slowing down, while creative workshops, such as beading with local artist or watercolor painting inspired by the surrounding nature, invite you to connect more deeply with the place, the community, and yourself.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/food.jpg"
              alt="Nourishing food"
              className="w-full h-64 object-cover rounded-sm"
              referrerPolicy="no-referrer"
            />
            <img
              src="/workshop.jpg"
              alt="Workshop sharing"
              className="w-full h-64 object-cover rounded-sm mt-8"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Accommodation - Cape Town */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <div className="order-2 lg:order-1">
            <ImageCarousel images={villaImages} />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Cape Town</span>
            <h2 className="text-4xl font-serif text-ocean-dark mt-4 mb-8">The Villa</h2>
            <div className="space-y-6 text-charcoal/80 font-light leading-relaxed">
              <p>
                Welcome to Carisbrook House – the breathtaking historic home where our Surf & Soul Retreat comes to life. Built around 1870, this is a true heritage gem, full of character, charm, and stories whispered through its high ceilings and original details. Although historic, the house is styled in a light, modern, and relaxed way, creating the perfect blend of old-world soul and contemporary comfort.
              </p>
              <p>
                We offer two spacious Premium Triple Rooms, each with sweeping ocean views and beautifully high ceilings that make the room feel open, calm, and truly special. For those who prefer something more intimate, we also have two cozy Double Rooms, each with two single beds, located in the quieter part of the house.
              </p>
              <p>
                Step outside onto our beautiful veranda, the heart of the house. From here, you’ll take in the unforgettable views of False Bay, framed by the majestic Hottentots Holland mountains in the distance. Sunrise coffees, ocean breeze, and golden evenings spent here are pure magic.
              </p>
              <p>
                Carisbrook House is more than just a place to sleep – it’s a place to feel and connect with yourself and others. A home with history, warmth, and a soul of its own… waiting to welcome you. We are located in St James, seaside village on the Cape Peninsula.
              </p>
            </div>
          </div>
        </div>

        {/* Accommodation - Lapland */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <span className="text-honey uppercase tracking-widest text-sm font-medium">Swedish Lapland</span>
            <h2 className="text-4xl font-serif text-ocean-dark mt-4 mb-8">The Mountain Lodge</h2>
            <div className="space-y-6 text-charcoal/80 font-light leading-relaxed">
              <p>
                In the heart of the UNESCO World Heritage Site of Laponia, our home in Lapland is a traditional mountain lodge where Arctic wilderness meets warm, rustic comfort. Overlooking the mountains and the lake, it offers a peaceful sanctuary surrounded by ancient landscapes, vast silence, and the grounding rhythm of nature. Come as you are.
              </p>
              <p>
                Our accommodation is designed for rest, connection, and quiet moments. The rooms are located in the peaceful part of the lodge, creating a calm atmosphere after days spent exploring the wild north. We offer a cozy cottage with three double rooms featuring comfortable single beds, a shared bathroom, a small kitchen for evening tea rituals, and a large table where stories, laughter, and slow evenings unfold together.
              </p>
              <p>
                For those seeking more privacy, our single rooms include an ensuite bathroom, a comfortable single bed, and a desk with a chair, the perfect corner for evening journaling, reading, or simply taking in the stillness of the mountains.
              </p>
            </div>
          </div>
          <div className="relative">
            <ImageCarousel images={lodgeImages} />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-serif text-ocean-dark mb-8">Ready to join us?</h2>
          <Link to="/dates">
            <Button size="lg" className="bg-honey text-ocean-dark hover:bg-white uppercase tracking-widest text-sm">
              View Dates & Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
