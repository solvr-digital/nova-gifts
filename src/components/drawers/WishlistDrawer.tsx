import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface WishlistDrawerProps {
  onQuickView: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onQuickView, onExplore }) => {
  const { isWishlistOpen, closeWishlist, wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMoveToBag = (product: Product) => {
    addItem(product, 1);
    toggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWishlist}
            className="absolute inset-0 bg-[#080808]/75 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#0D0D0D] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-[#C9A86A] fill-[#C9A86A]/20" />
                  <h3 className="font-serif text-lg text-[#F5F1E8] uppercase tracking-wider">
                    Saved Curations
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] font-medium">
                    {wishlist.length}
                  </span>
                </div>

                <button
                  onClick={closeWishlist}
                  className="p-1.5 rounded-full text-[#A8A39A] hover:text-[#F5F1E8] transition-colors"
                  aria-label="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#C9A86A] mb-4">
                      <Heart className="w-7 h-7 stroke-1" />
                    </div>
                    <h4 className="font-serif text-xl text-[#F5F1E8] mb-2">
                      Your wishlist is pristine
                    </h4>
                    <p className="text-xs text-[#A8A39A] max-w-xs leading-relaxed mb-6 font-light">
                      Save favorite hampers to revisit or prepare for upcoming milestones.
                    </p>
                    <button
                      onClick={() => {
                        closeWishlist();
                        onExplore();
                      }}
                      className="px-6 py-3 bg-[#C9A86A] text-[#080808] text-xs font-semibold uppercase tracking-widest rounded-sm hover:brightness-105 transition-all shadow-gold-sm"
                    >
                      Browse Featured Gifts
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 pb-6 border-b border-white/[0.06] last:border-0"
                    >
                      <div
                        onClick={() => {
                          closeWishlist();
                          onQuickView(product);
                        }}
                        className="w-20 h-24 rounded-sm overflow-hidden bg-[#181818] shrink-0 border border-white/10 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              onClick={() => {
                                closeWishlist();
                                onQuickView(product);
                              }}
                              className="font-serif text-sm text-[#F5F1E8] hover:text-[#C9A86A] cursor-pointer"
                            >
                              {product.name}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-[#A8A39A] hover:text-red-400 transition-colors p-1"
                              aria-label="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-[#C9A86A] font-serif block mt-1">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="pt-3">
                          <button
                            onClick={() => handleMoveToBag(product)}
                            className="w-full py-2 bg-[#1C1C1C] border border-[#C9A86A]/40 text-[#E5D0A6] hover:bg-[#C9A86A] hover:text-[#080808] text-[10px] font-semibold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Close */}
              <div className="p-6 border-t border-white/[0.08] bg-[#0A0A0A]">
                <button
                  onClick={closeWishlist}
                  className="w-full py-3 bg-transparent border border-white/15 text-[#A8A39A] hover:text-[#F5F1E8] text-xs uppercase tracking-widest rounded-sm transition-colors"
                >
                  Close Wishlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
