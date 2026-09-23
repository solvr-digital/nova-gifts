import React, { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, CheckCircle2, Truck, Gift, Sparkles, Plus, Minus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onBuyNow,
}) => {
  if (!product) return null;

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'inside' | 'perfect' | 'delivery' | 'personalization'>('inside');

  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const isFavorited = isInWishlist(product.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      recipientName || customMessage
        ? { recipientName, customMessage }
        : undefined
    );
  };

  const handleDirectBuy = () => {
    handleAddToCart();
    onClose();
    onBuyNow(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[95] overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060606]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-[#0D0D0C] border border-[#C5A059]/35 rounded-xl shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#060606]/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#F7F4EE] hover:text-[#C5A059] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left: Large Image Gallery */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#111110] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              {/* Main Active Image Frame */}
              <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#161615] border border-white/[0.06] shadow-inner mb-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] font-semibold uppercase tracking-widest px-3 py-1 bg-[#C5A059] text-[#060606] rounded-sm shadow-md">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-16 rounded-sm overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      selectedImage === imgUrl
                        ? 'border-[#C5A059] shadow-gold-subtle scale-105'
                        : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Information & Tabs */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium font-sans">
                    {product.category} Collection
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#C5A059]">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-[#A39E93]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F7F4EE] uppercase tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-1 text-xs text-[#A39E93] italic font-serif">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-serif text-gold-gradient font-medium">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#A39E93] line-through font-light">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] text-[#A39E93] uppercase tracking-wider ml-auto">
                    Taxes Included
                  </span>
                </div>

                {/* Short Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#A39E93] leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Tab Controls */}
                <div className="mt-6 border-b border-white/[0.08] flex gap-4 text-xs">
                  <button
                    onClick={() => setActiveTab('inside')}
                    className={`pb-2.5 uppercase tracking-wider transition-colors relative cursor-pointer ${
                      activeTab === 'inside'
                        ? 'text-[#C5A059] font-medium'
                        : 'text-[#A39E93] hover:text-[#F7F4EE]'
                    }`}
                  >
                    What's Inside
                    {activeTab === 'inside' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('perfect')}
                    className={`pb-2.5 uppercase tracking-wider transition-colors relative cursor-pointer ${
                      activeTab === 'perfect'
                        ? 'text-[#C5A059] font-medium'
                        : 'text-[#A39E93] hover:text-[#F7F4EE]'
                    }`}
                  >
                    Perfect For
                    {activeTab === 'perfect' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2.5 uppercase tracking-wider transition-colors relative cursor-pointer ${
                      activeTab === 'delivery'
                        ? 'text-[#C5A059] font-medium'
                        : 'text-[#A39E93] hover:text-[#F7F4EE]'
                    }`}
                  >
                    Delivery Info
                    {activeTab === 'delivery' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                    )}
                  </button>

                  {product.canPersonalize && (
                    <button
                      onClick={() => setActiveTab('personalization')}
                      className={`pb-2.5 uppercase tracking-wider transition-colors relative flex items-center gap-1 cursor-pointer ${
                        activeTab === 'personalization'
                          ? 'text-[#C5A059] font-medium'
                          : 'text-[#A39E93] hover:text-[#F7F4EE]'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      Personalize
                      {activeTab === 'personalization' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                      )}
                    </button>
                  )}
                </div>

                {/* Tab Panels */}
                <div className="py-4 text-xs text-[#A39E93] min-h-[100px]">
                  {activeTab === 'inside' && (
                    <ul className="space-y-2">
                      {product.whatsInside.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="text-[#F7F4EE] font-light leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'perfect' && (
                    <div className="flex flex-wrap gap-2">
                      {product.perfectFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/30 text-[#DFC287] text-[11px]"
                        >
                          ✦ {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-3">
                      <p className="leading-relaxed">{product.deliveryInfo}</p>
                      <div className="flex items-center gap-2 text-[#DFC287]">
                        <Truck className="w-4 h-4 text-[#C5A059]" />
                        <span>All orders arrive in our signature gift box with velvet ribbon</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'personalization' && (
                    <div className="space-y-3 bg-white/[0.02] p-3 rounded border border-white/[0.06]">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#C5A059] block mb-1 font-medium font-sans">
                          Custom Engraved Name / Monogram:
                        </label>
                        <input
                          type="text"
                          maxLength={30}
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. Evelyn Rose"
                          className="w-full bg-[#060606] border border-white/15 px-3 py-2 rounded-sm text-xs text-[#F7F4EE] focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#C5A059] block mb-1 font-medium font-sans">
                          Handwritten Wax Seal Note:
                        </label>
                        <input
                          type="text"
                          maxLength={80}
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder="e.g. Forever yours, with profound love."
                          className="w-full bg-[#060606] border border-white/15 px-3 py-2 rounded-sm text-xs text-[#F7F4EE] focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-white/20 rounded-sm bg-[#060606] h-11 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-[#A39E93] hover:text-[#F7F4EE] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-[#F7F4EE]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-[#A39E93] hover:text-[#F7F4EE] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-11 bg-transparent border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>

                  {/* Wishlist Toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-11 h-11 border border-white/20 hover:border-[#C5A059] rounded-sm flex items-center justify-center text-[#F7F4EE] hover:text-[#C5A059] transition-colors cursor-pointer"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? 'fill-[#C5A059] text-[#C5A059]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleDirectBuy}
                  className="w-full h-11 bg-gradient-to-r from-[#C5A059] via-[#DFC287] to-[#C5A059] text-[#060606] text-xs font-semibold uppercase tracking-[0.24em] rounded-sm hover:brightness-105 transition-all shadow-gold-subtle flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  Buy Now & Personalize
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
