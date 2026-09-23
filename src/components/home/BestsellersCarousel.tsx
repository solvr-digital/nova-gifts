import React, { useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { ProductCard } from '../shop/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface BestsellersCarouselProps {
  onQuickView: (product: Product) => void;
}

export const BestsellersCarousel: React.FC<BestsellersCarouselProps> = ({ onQuickView }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller || p.badge).slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-[#060606] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
                Customer Favorites
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] uppercase tracking-tight">
              Most Loved Gifts
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#A39E93] font-light max-w-md leading-relaxed">
              The signature hampers and bespoke creations most frequently chosen to celebrate life's finest milestones.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-white/15 bg-[#0D0D0C] flex items-center justify-center text-[#F7F4EE] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors focus:outline-none shadow-md cursor-pointer"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-white/15 bg-[#0D0D0C] flex items-center justify-center text-[#F7F4EE] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors focus:outline-none shadow-md cursor-pointer"
              aria-label="Next items"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draggable Carousel */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-7 overflow-x-auto pb-8 pt-2 scroll-smooth cursor-grab active:cursor-grabbing no-scrollbar select-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="min-w-[285px] sm:min-w-[340px] max-w-[340px] shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
