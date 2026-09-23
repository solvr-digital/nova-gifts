import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { Product } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface OccasionsPageProps {
  onQuickView: (product: Product) => void;
}

export const OccasionsPage: React.FC<OccasionsPageProps> = ({ onQuickView }) => {
  const [activeOccasion, setActiveOccasion] = useState(CATEGORIES[0].slug);

  const currentCategory = CATEGORIES.find((c) => c.slug === activeOccasion) || CATEGORIES[0];
  const matchingProducts = PRODUCTS.filter((p) => p.categorySlug === activeOccasion);

  return (
    <div className="pt-28 pb-32 bg-[#080808] min-h-screen text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A86A] font-serif block mb-3">
            Moments That Matter
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            Occasions
          </h1>
          <p className="mt-3 text-sm text-[#A8A39A] font-light leading-relaxed">
            Every chapter in life warrants celebration. Select a moment to discover hampers tuned to its significance.
          </p>
        </div>

        {/* Occasion Selector Horizontal Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveOccasion(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeOccasion === cat.slug
                  ? 'bg-gradient-to-r from-[#C9A86A] to-[#B38C48] text-[#080808] font-semibold shadow-gold-sm'
                  : 'bg-[#151515] text-[#A8A39A] hover:text-[#F5F1E8] border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Highlight Card for Active Occasion */}
        <div className="relative rounded-xl overflow-hidden border border-[#C9A86A]/30 mb-14 bg-[#121212] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-white/10">
            <img
              src={currentCategory.image}
              alt={currentCategory.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-serif">
              {currentCategory.accentQuote}
            </span>
            <h2 className="text-3xl font-serif text-[#F5F1E8] uppercase">
              {currentCategory.name} Curations
            </h2>
            <p className="text-sm text-[#A8A39A] font-light leading-relaxed">
              {currentCategory.description}
            </p>
            <div className="pt-2">
              <span className="text-xs text-[#E5D0A6]">
                ✦ Complimentary handwritten wax-sealed greetings card included with every hamper.
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid for this Occasion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(matchingProducts.length > 0 ? matchingProducts : PRODUCTS.slice(0, 3)).map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </div>
  );
};
