import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  // Reset query on open
  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  // Keyboard shortcut Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickTags = ['Anniversary', 'Preserved Rose', 'Birthday', 'Personalized', 'Candle', 'Corporate'];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#080808]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-[#0F0F0F] border border-[#C9A86A]/35 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#C9A86A] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search luxury gifts, occasions, collections..."
                className="w-full bg-transparent text-sm sm:text-base text-[#F5F1E8] placeholder:text-[#A8A39A]/60 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#A8A39A] hover:text-[#F5F1E8] uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#A8A39A] hover:text-[#F5F1E8] transition-colors ml-1"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions if no query */}
            {!query.trim() && (
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A86A] block mb-3 font-medium">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full text-xs bg-white/[0.04] hover:bg-[#C9A86A]/15 border border-white/10 hover:border-[#C9A86A]/40 text-[#A8A39A] hover:text-[#E5D0A6] transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results List */}
            {query.trim() && (
              <div className="overflow-y-auto p-4 space-y-3 flex-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A39A] px-2 block">
                  {searchResults.length} {searchResults.length === 1 ? 'Curated Match' : 'Curated Matches'}
                </span>

                {searchResults.length === 0 ? (
                  <div className="text-center py-12 text-[#A8A39A] text-xs">
                    No matching luxury gifts found. Try searching for "Anniversary", "Roses", or "Bestseller".
                  </div>
                ) : (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group border border-transparent hover:border-white/[0.08]"
                    >
                      <div className="w-14 h-16 rounded overflow-hidden bg-[#181818] shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-[#C9A86A] block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm text-[#F5F1E8] group-hover:text-[#C9A86A] transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#A8A39A] truncate font-light">
                          {product.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-sm text-[#F5F1E8] block">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-[#C9A86A] flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
