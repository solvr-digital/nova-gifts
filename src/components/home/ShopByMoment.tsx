import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Category } from '../../types';

interface ShopByMomentProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const ShopByMoment: React.FC<ShopByMomentProps> = ({ onSelectCategory }) => {
  return (
    <section id="moments" className="py-28 sm:py-36 bg-[#060606] relative overflow-hidden">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#C5A059]/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#C5A059]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Intentional Spacing */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle"
          >
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
              Occasions & Milestones
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[52px] font-serif text-[#F7F4EE] tracking-tight uppercase"
          >
            Find a Gift for Every Moment
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[#A39E93] font-light max-w-lg mx-auto leading-relaxed"
          >
            Every celebration holds its own emotional cadence. Discover hampers harmonized to the sentiment of life's defining chapters.
          </motion.p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {CATEGORIES.map((category: Category, index: number) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              onClick={() => onSelectCategory(category.slug)}
              className="group relative h-[390px] sm:h-[430px] rounded-lg overflow-hidden cursor-pointer border border-white/[0.07] hover:border-[#C5A059]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-glow flex flex-col justify-end p-6 select-none bg-[#0D0D0C]"
            >
              {/* High-Resolution Visual with Cinematic Zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.08] group-hover:scale-110 group-hover:brightness-[0.4] transition-all duration-700 ease-out"
                />
              </div>

              {/* Multi-Stop Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/55 to-transparent group-hover:via-[#060606]/75 transition-all duration-500" />

              {/* Subtle Gold Hover Sheen */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12),transparent_70%)] transition-opacity duration-500 pointer-events-none" />

              {/* Content Panel */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium font-sans">
                    {category.itemCount} Curations
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#F7F4EE] group-hover:border-[#C5A059] group-hover:text-[#C5A059] group-hover:translate-x-1.5 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-[#F7F4EE] group-hover:text-white transition-colors">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs text-[#A39E93] group-hover:text-[#EDE7DA] line-clamp-2 leading-relaxed transition-colors font-light">
                  {category.description}
                </p>

                {/* Hairline Gold Expansion Indicator */}
                <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#C5A059] via-[#DFC287] to-transparent transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
