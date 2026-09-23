import React, { useState, useRef } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const isFavorited = isInWishlist(product.id);

  // Subtle 3D tilt calculation with specular reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.1 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="group relative bg-[#0D0D0C] rounded-md border border-white/[0.08] hover:border-[#C5A059]/50 transition-all duration-400 hover:shadow-gold-subtle flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141413]">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100 group-hover:scale-105'
          }`}
        />

        {/* Secondary Image (Fades/reveals on hover) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} interior view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Dark Vignette Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className={`text-[8.5px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded-sm shadow-sm ${
                product.badge === 'BESTSELLER'
                  ? 'bg-[#C5A059] text-[#060606]'
                  : product.badge === 'LIMITED'
                  ? 'bg-[#7A2121] text-[#F7F4EE]'
                  : 'bg-black/60 backdrop-blur-md text-[#DFC287] border border-[#C5A059]/40'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-[#060606]/65 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#F7F4EE] hover:text-[#C5A059] hover:border-[#C5A059]/50 transition-all duration-200 focus:outline-none cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-[#C5A059] text-[#C5A059] scale-110' : 'stroke-[1.6]'
            }`}
          />
        </button>

        {/* Quick View Button (Desktop Hover) */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 bg-[#060606]/90 backdrop-blur-md border border-white/20 text-[#F7F4EE] text-[9.5px] uppercase tracking-[0.22em] rounded-sm hover:border-[#C5A059] hover:text-[#C5A059] flex items-center gap-1.5 whitespace-nowrap shadow-xl cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View
        </button>

        {/* Add to Bag Button (Slides up from bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={() => addItem(product, 1)}
            className="w-full py-2.5 bg-gradient-to-r from-[#C5A059] via-[#DFC287] to-[#C5A059] text-[#060606] text-[10px] font-semibold uppercase tracking-[0.24em] rounded-sm shadow-gold-subtle hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#0D0D0C]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-[9.5px] text-[#A39E93] uppercase tracking-[0.2em] mb-1.5">
            <span className="text-[#C5A059] font-medium font-sans">{product.category}</span>
            <div className="flex items-center gap-1 text-[#C5A059]">
              <Star className="w-3 h-3 fill-[#C5A059]" />
              <span className="text-[#F7F4EE] font-sans font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-[17px] text-[#F7F4EE] hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1 mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#A39E93] line-clamp-1 mt-1 font-light leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & Mobile Action */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.07] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-normal text-[#F7F4EE]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A39E93]/70 line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Instant Add Button */}
          <button
            onClick={() => addItem(product, 1)}
            className="md:hidden p-2 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#060606] transition-colors cursor-pointer"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
