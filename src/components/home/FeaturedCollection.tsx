import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import type { Product } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedCollectionProps {
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

type FilterTag = 'ALL' | 'BESTSELLERS' | 'PERSONALIZED' | 'FOR HER' | 'FOR HIM' | 'COUPLES';

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  onQuickView,
  onViewAll,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('ALL');

  const filterTabs: FilterTag[] = [
    'ALL',
    'BESTSELLERS',
    'PERSONALIZED',
    'FOR HER',
    'FOR HIM',
    'COUPLES',
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'ALL') return true;
    return product.filterTags.includes(activeFilter);
  });

  return (
    <section className="py-28 sm:py-36 bg-[#060606] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle"
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
                The Curated Edit
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] tracking-tight uppercase"
            >
              Featured Gifts
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-sm sm:text-base text-[#A39E93] font-light max-w-lg leading-relaxed"
            >
              Thoughtfully selected. Beautifully presented. Designed to evoke awe and enduring gratitude upon unboxing.
            </motion.p>
          </div>

          {/* View All Catalog CTA */}
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#C5A059] hover:text-[#DFC287] transition-colors self-start md:self-auto group pb-1 border-b border-[#C5A059]/40 cursor-pointer"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Filter Segmented Control Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar select-none">
          {filterTabs.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[10.5px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-[#C5A059] via-[#DFC287] to-[#B89248] text-[#060606] font-semibold shadow-gold-subtle'
                  : 'bg-[#111110] text-[#A39E93] hover:text-[#F7F4EE] border border-white/[0.07] hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Animated Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} onQuickView={onQuickView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
