import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { Product } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CollectionsPageProps {
  onQuickView: (product: Product) => void;
  onNavigateToShop: () => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  onQuickView,
  onNavigateToShop,
}) => {
  const collections = [
    {
      title: 'The Noir & Velvet Suite',
      subtitle: 'Moody luxury, dark soy wax, and smoky oud accords',
      cover: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
      products: PRODUCTS.filter((p) => p.categorySlug === 'birthday' || p.categorySlug === 'corporate').slice(0, 3),
    },
    {
      title: 'The Botanical Immortals',
      subtitle: 'Preserved Ecuadorian roses and botanical floral extracts',
      cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
      products: PRODUCTS.filter((p) => p.categorySlug === 'love' || p.categorySlug === 'best-friend').slice(0, 3),
    },
    {
      title: 'The Monogram & Heirloom Vault',
      subtitle: 'Bespoke brass laser etching, solid black walnut, and archival paper',
      cover: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
      products: PRODUCTS.filter((p) => p.canPersonalize).slice(0, 3),
    },
  ];

  return (
    <div className="pt-28 pb-32 bg-[#080808] min-h-screen text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A86A] font-serif block mb-3">
            Bespoke Capsules
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            The Collections
          </h1>
          <p className="mt-3 text-sm text-[#A8A39A] font-light leading-relaxed">
            Curated narratives designed around sensory textures, aesthetic harmonies, and indelible celebrations.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-28">
          {collections.map((col, idx) => (
            <div key={idx} className="space-y-8">
              {/* Editorial Banner */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-white/10 group flex items-end p-8 sm:p-12">
                <img
                  src={col.cover}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-[#C9A86A]/40 mb-3 text-[10px] uppercase tracking-widest text-[#C9A86A]">
                    <Sparkles className="w-3 h-3" />
                    Capsule 0{idx + 1}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#F5F1E8] uppercase">
                    {col.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A8A39A] mt-2 font-light">
                    {col.subtitle}
                  </p>
                </div>
              </div>

              {/* Products in this capsule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {col.products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onQuickView={onQuickView} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
