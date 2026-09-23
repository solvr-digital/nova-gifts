import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Collections', id: 'collections' },
    { label: 'Occasions', id: 'occasions' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'bg-[#060606]/80 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-2xl'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Monogram Seal */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            aria-label="NOVAGIFTS Home"
          >
            <div className="w-8 h-8 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif font-bold text-sm tracking-wider group-hover:bg-[#C5A059]/20 group-hover:border-[#C5A059] transition-all duration-300 shadow-gold-subtle">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl tracking-[0.25em] text-[#F7F4EE] group-hover:text-white transition-colors uppercase font-medium">
                NOVAGIFTS
              </span>
              <span className="hidden sm:block text-[8.5px] uppercase tracking-[0.32em] text-[#C5A059]/85 font-light -mt-0.5">
                Haute Cadeaux • Paris & Mumbai
              </span>
            </div>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[11.5px] uppercase tracking-[0.22em] transition-all relative py-1 cursor-pointer ${
                  activePage === link.id
                    ? 'text-[#C5A059] font-medium'
                    : 'text-[#F7F4EE]/75 hover:text-[#F7F4EE]'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059] rounded-full shadow-gold-subtle"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#F7F4EE]/80 hover:text-[#C5A059] hover:bg-white/[0.04] rounded-full transition-all focus:outline-none cursor-pointer"
              aria-label="Search catalog"
              title="Search curations"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              className="p-2 text-[#F7F4EE]/80 hover:text-[#C5A059] hover:bg-white/[0.04] rounded-full transition-all relative focus:outline-none cursor-pointer"
              aria-label="View Wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 w-4 h-4 bg-[#C5A059] text-[#060606] font-bold text-[9.5px] rounded-full flex items-center justify-center shadow-gold-subtle">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="p-2 text-[#F7F4EE]/80 hover:text-[#C5A059] hover:bg-white/[0.04] rounded-full transition-all relative focus:outline-none cursor-pointer"
              aria-label="View Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-0.5 w-4 h-4 bg-[#C5A059] text-[#060606] font-bold text-[9.5px] rounded-full flex items-center justify-center shadow-gold-subtle">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F7F4EE]/80 hover:text-[#C5A059] md:hidden focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-serif border-b border-white/[0.08] pb-3">
                Atelier Directory
              </span>
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-2xl font-serif tracking-wider ${
                    activePage === link.id
                      ? 'text-[#C5A059]'
                      : 'text-[#F7F4EE]/85 hover:text-[#F7F4EE]'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="border-t border-white/[0.08] pt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#A39E93]">
                <span>Concierge Salon</span>
                <span className="text-[#C5A059] font-medium">+91 (800) 246-6682</span>
              </div>
              <p className="text-[10px] tracking-widest text-[#A39E93]/60 uppercase">
                "Gifts that become memories."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
