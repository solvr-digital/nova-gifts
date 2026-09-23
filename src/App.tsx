import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { Hero } from './components/home/Hero';
import { Marquee } from './components/home/Marquee';
import { ShopByMoment } from './components/home/ShopByMoment';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { ProductShowcase } from './components/home/ProductShowcase';
import { PersonalizationStudio } from './components/home/PersonalizationStudio';
import { GiftFinder } from './components/home/GiftFinder';
import { BestsellersCarousel } from './components/home/BestsellersCarousel';
import { Testimonials } from './components/home/Testimonials';
import { InstagramGrid } from './components/home/InstagramGrid';
import { Newsletter } from './components/home/Newsletter';

import { ShopPage } from './components/pages/ShopPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { OccasionsPage } from './components/pages/OccasionsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

import { CartDrawer } from './components/drawers/CartDrawer';
import { WishlistDrawer } from './components/drawers/WishlistDrawer';
import { SearchModal } from './components/drawers/SearchModal';
import { ProductModal } from './components/shop/ProductModal';
import { CheckoutModal } from './components/drawers/CheckoutModal';

import type { Product } from './types';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | null>(null);

  const handleSelectMomentCategory = (slug: string) => {
    setShopCategoryFilter(slug);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBuyNow = (_product: Product) => {
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#F7F4EE] font-sans selection:bg-[#C5A059]/30 selection:text-[#DFC287] relative">
      {/* Cinematic Film Grain Noise Texture Overlay */}
      <div className="film-grain-overlay" />

      {/* Bespoke Champagne Gold Trailing Cursor (Desktop) */}
      <CustomCursor />

      {/* Cinematic Loading Animation */}
      <LoadingScreen />

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          if (page === 'shop') setShopCategoryFilter(null);
          setActivePage(page);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Router */}
      <main>
        {activePage === 'home' && (
          <>
            <Hero
              onExploreGifts={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onShopCollection={() => {
                setActivePage('collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <Marquee />

            <ShopByMoment onSelectCategory={handleSelectMomentCategory} />

            <FeaturedCollection
              onQuickView={handleOpenProduct}
              onViewAll={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ProductShowcase
              onDiscover={() => {
                setActivePage('collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <PersonalizationStudio />

            <GiftFinder onQuickView={handleOpenProduct} />

            <BestsellersCarousel onQuickView={handleOpenProduct} />

            <Testimonials />

            <InstagramGrid />

            <Newsletter />
          </>
        )}

        {activePage === 'shop' && (
          <ShopPage
            onQuickView={handleOpenProduct}
            initialCategory={shopCategoryFilter}
          />
        )}

        {activePage === 'collections' && (
          <CollectionsPage
            onQuickView={handleOpenProduct}
            onNavigateToShop={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'occasions' && (
          <OccasionsPage onQuickView={handleOpenProduct} />
        )}

        {activePage === 'about' && <AboutPage />}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={(page) => {
        setActivePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Drawers & Modals */}
      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
        onExplore={() => {
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <WishlistDrawer
        onQuickView={handleOpenProduct}
        onExplore={() => {
          setActivePage('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleOpenProduct}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
