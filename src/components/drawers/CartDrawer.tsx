import React from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExplore }) => {
  const {
    isCartOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    giftMessage,
    setGiftMessage,
  } = useCart();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const progressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#060606]/80 backdrop-blur-sm cursor-pointer"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#0A0A09] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#0E0E0D]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#F7F4EE] uppercase tracking-wider">
                      Your Shopping Bag
                    </h3>
                    <span className="text-[10px] text-[#A39E93] uppercase tracking-widest">
                      {items.reduce((sum, i) => sum + i.quantity, 0)} Items Curated
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-full text-[#A39E93] hover:text-[#F7F4EE] hover:bg-white/[0.05] transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Milestone Meter */}
              <div className="px-6 py-3.5 bg-[#111110] border-b border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-[#A39E93]">
                    {freeShippingRemaining > 0
                      ? `Add ${formatPrice(freeShippingRemaining)} more for Complimentary White-Glove Shipping`
                      : 'You unlocked Complimentary White-Glove Shipping!'}
                  </span>
                  <span className="text-[#C5A059] font-medium">{progressPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C5A059] to-[#DFC287] transition-all duration-500 rounded-full shadow-gold-subtle"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#C5A059] mb-4 shadow-gold-subtle">
                      <ShoppingBag className="w-7 h-7 stroke-1" />
                    </div>
                    <h4 className="font-serif text-xl text-[#F7F4EE] mb-2">
                      Your bag is currently empty
                    </h4>
                    <p className="text-xs text-[#A39E93] max-w-xs leading-relaxed mb-6 font-light">
                      Let our master curators inspire you with bespoke hampers and timeless keepsakes.
                    </p>
                    <button
                      onClick={() => {
                        closeCart();
                        onExplore();
                      }}
                      className="px-6 py-3 bg-[#C5A059] text-[#060606] text-xs font-semibold uppercase tracking-widest rounded-sm hover:brightness-105 transition-all shadow-gold-subtle cursor-pointer"
                    >
                      Explore Curated Gifts
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-white/[0.06] last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 rounded-sm overflow-hidden bg-[#141413] shrink-0 border border-white/10">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm text-[#F7F4EE] leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#A39E93] hover:text-red-400 transition-colors p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-[11.5px] text-[#C5A059] font-serif block mt-0.5">
                            {formatPrice(item.product.price)}
                          </span>

                          {/* Personalization Details */}
                          {item.personalization && (
                            <div className="mt-1.5 p-2 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#A39E93] space-y-0.5">
                              {item.personalization.recipientName && (
                                <p>
                                  <strong className="text-[#DFC287]">Engraving:</strong>{' '}
                                  {item.personalization.recipientName}
                                </p>
                              )}
                              {item.personalization.date && (
                                <p>
                                  <strong className="text-[#DFC287]">Date:</strong>{' '}
                                  {item.personalization.date}
                                </p>
                              )}
                              {item.personalization.boxColor && (
                                <p>
                                  <strong className="text-[#DFC287]">Box Tone:</strong>{' '}
                                  {item.personalization.boxColor}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity Adjusters */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/15 rounded-sm bg-[#060606]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-[#A39E93] hover:text-[#F7F4EE] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-[#F7F4EE]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-[#A39E93] hover:text-[#F7F4EE] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-sm text-[#F7F4EE]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Actions */}
              {items.length > 0 && (
                <div className="p-6 bg-[#0E0E0D] border-t border-white/[0.08] space-y-4">
                  {/* Complimentary Note Input */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C5A059] block mb-1 font-medium font-sans">
                      Complimentary Handwritten Wax Seal Note:
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="e.g. Forever grateful for you. — Alexander"
                      className="w-full bg-[#111110] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F7F4EE] placeholder:text-[#A39E93]/50 focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#A39E93] pt-2 border-t border-white/[0.06]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#F7F4EE] font-serif">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury Packaging & Presentation</span>
                      <span className="text-[#C5A059] uppercase tracking-widest text-[10px]">Complimentary</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Courier</span>
                      <span className="text-[#F7F4EE]">
                        {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-serif text-[#F7F4EE]">
                      <span>Estimated Total</span>
                      <span className="text-base text-gold-gradient font-medium">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        closeCart();
                        onCheckout();
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] via-[#DFC287] to-[#C5A059] text-[#060606] text-xs font-semibold uppercase tracking-[0.24em] rounded-sm hover:brightness-105 transition-all shadow-gold-subtle flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={closeCart}
                      className="w-full py-2.5 bg-transparent border border-white/15 text-[#A39E93] hover:text-[#F7F4EE] hover:border-white/30 text-xs uppercase tracking-[0.2em] rounded-sm transition-colors cursor-pointer"
                    >
                      Continue Exploring
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#A39E93] pt-1 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>256-Bit Encrypted Luxury Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
