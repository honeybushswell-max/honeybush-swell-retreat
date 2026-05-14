import { motion } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carousel1 = [
  "/mainsoul.jpeg",
  "/0soul.jpeg",
  "/1soul.jpeg",
  "/2soul.jpeg",
  "/4soul.jpeg",
  "/5soul.jpeg",
  "/6soul.jpeg",
  "/7soul.jpeg",
  "/surf1.jpg",
  "/surf2.jpg",
  "/surf3.jpg",
  "/surf4.jpg",
  "/surf5.jpg",
  "/surf6.jpg",
  "/surf7.jpg",
  "/surf8.jpg",
  "/surf9.jpg",
  "/surf10.jpg",
  "/surf11.jpg",
  "/surf14.jpg",
];

const carousel2 = [
  "/hike1.jpeg",
  "/hike2.jpeg",
  "/stora10.jpg",
  "/stora3.jpg",
  "/stora5.jpeg",
  "/stora6.jpeg",
  "/stora7.jpg",
  "/stora1.jpg",
  "/hike3.JPG",
  "/hike4.JPG",
  "/hike5.JPG",
  "/stora0.jpg",
];

function FullScreenCarousel({ images, title }: { images: string[], title?: string }) {
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
    <div className="relative group w-full h-[80vh] md:h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          key={index}
          src={images[index]}
          alt={title || "Carousel Image"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {title && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white uppercase tracking-widest drop-shadow-lg">
            {title}
          </h2>
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === i ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <div className="w-full bg-sand">
      {/* Header Section */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif text-ocean-dark mb-6"
            id="gallery-title"
          >
            Our Retreats
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-charcoal/70 font-light max-w-2xl mx-auto"
            id="gallery-subtitle"
          >
            Moments of connection, salt, and soul.
          </motion.p>
        </div>
      </div>

      {/* Full Width Carousels */}
      <div className="w-full flex flex-col">
        <FullScreenCarousel images={carousel1} title="Surf&Soul" />
        <FullScreenCarousel images={carousel2} title="Hike&Soul" />
      </div>
    </div>
  );
}
