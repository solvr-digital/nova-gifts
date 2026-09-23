import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../shop/ProductCard';
import { Product } from '../../types';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
  initialCategory?: string | null;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onQuickView, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);

  const recipients = ['ALL', 'Partner', 'Friend', 'Family', 'Colleague'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'ALL' && p.categorySlug !== selectedCategory) return false;
      if (selectedRecipient !== 'ALL' && !p.recipient.includes(selectedRecipient as any)) return false;
      if (p.price > priceMax) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedRecipient, sortBy, priceMax]);

  return (
    <div className="pt-28 pb-32 bg-[#080808] min-h-screen text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A86A] font-serif block mb-3">
            The Complete Atelier Catalog
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            Curated Gifts
          </h1>
          <p className="mt-3 text-sm text-[#A8A39A] font-light leading-relaxed">
            Every creation is assembled by hand in our private studio, finished with double-faced satin
            and accompanied by your wax-sealed personal missive.
          </p>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="bg-[#121212] border border-white/[0.08] rounded-lg p-5 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-[#C9A86A] text-[#080808] font-semibold'
                  : 'bg-[#181818] text-[#A8A39A] hover:text-[#F5F1E8]'
              }`}
            >
              All Curations
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-[#C9A86A] text-[#080808] font-semibold'
                    : 'bg-[#181818] text-[#A8A39A] hover:text-[#F5F1E8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Recipient Controls */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Recipient Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#A8A39A] uppercase tracking-wider text-[10px]">For:</span>
              <select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="bg-[#181818] border border-white/10 rounded px-2.5 py-1.5 text-xs text-[#F5F1E8] focus:outline-none focus:border-[#C9A86A]"
              >
                {recipients.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#A8A39A] uppercase tracking-wider text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#181818] border border-white/10 rounded px-2.5 py-1.5 text-xs text-[#F5F1E8] focus:outline-none focus:border-[#C9A86A]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[#121212] rounded-lg border border-white/10">
            <Sparkles className="w-8 h-8 text-[#C9A86A] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#F5F1E8] mb-1">No curations match this filter</h3>
            <p className="text-xs text-[#A8A39A]">Try adjusting your category or recipient selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};
