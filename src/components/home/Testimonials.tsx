import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-28 sm:py-36 bg-[#0A0A09] relative overflow-hidden border-t border-white/[0.07]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A059]/[0.05] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Quote watermark icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/35 flex items-center justify-center text-[#C5A059] shadow-gold-subtle">
            <Quote className="w-5 h-5" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] uppercase tracking-tight mb-3">
          Gifted With Love.
        </h2>

        <p className="text-xs sm:text-[13px] text-[#C5A059] uppercase tracking-[0.28em] mb-14 font-sans font-medium">
          Real Stories & Memorable Unboxings
        </p>

        {/* Animated Testimonial Card */}
        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center max-w-2xl mx-auto"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6 text-[#C5A059]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-[#F7F4EE] italic font-light leading-relaxed mb-6">
                "{current.quote}"
              </blockquote>

              {/* Author Details */}
              <div className="flex flex-col items-center">
                <span className="text-base font-serif text-[#C5A059] tracking-wider uppercase font-medium">
                  — {current.name}
                </span>

                <div className="flex items-center gap-2 mt-1 text-xs text-[#A39E93]">
                  <span>{current.role}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[#DFC287]">
                    <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                    Verified Order: {current.productName}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            onClick={prevReview}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C5A059] hover:text-[#C5A059] text-[#F7F4EE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C5A059] hover:text-[#C5A059] text-[#F7F4EE] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
