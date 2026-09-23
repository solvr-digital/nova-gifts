import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowRight, Feather, ShieldCheck, Gift } from 'lucide-react';

interface ProductShowcaseProps {
  onDiscover: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onDiscover }) => {
  return (
    <section className="py-28 sm:py-36 bg-[#0A0A09] relative overflow-hidden border-y border-white/[0.07]">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Masked Image Reveal */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#C5A059]/30 shadow-2xl group bg-[#111110]"
            >
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=90"
                alt="Haute Gifting Craftsmanship"
                className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Gold Foil Emblem Seal */}
              <div className="absolute bottom-6 left-6 p-4 sm:p-5 bg-[#060606]/85 backdrop-blur-md border border-[#C5A059]/40 rounded-sm shadow-2xl">
                <span className="block text-[9px] uppercase tracking-[0.28em] text-[#C5A059] font-medium font-sans">
                  Bespoke Atelier Standard
                </span>
                <span className="block text-base font-serif text-[#F7F4EE] mt-0.5">
                  Hand-Tied Italian Silk & 24k Gold
                </span>
              </div>
            </motion.div>

            {/* Decorative Hairline Border Accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C5A059]/20 rounded-md -z-10 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10.5px] uppercase tracking-[0.32em] text-[#C5A059] font-serif block mb-3">
                The Art of Gifting
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-serif text-[#F7F4EE] leading-[1.1] uppercase tracking-tight">
                Some gifts are opened.
                <br />
                <span className="text-gold-gradient italic font-normal">
                  Some gifts are remembered.
                </span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#A39E93] leading-relaxed font-light">
                At NOVAGIFTS, gifting is not a transactional formality; it is an architecture of emotion.
                From double-faced silk ribbons measured to perfection to custom heavy-gauge brass plates
                laser-etched with your personal vows, every element is curated to evoke a permanent
                feeling of being treasured.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 py-6 border-y border-white/[0.08]">
                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-1">
                    <Feather className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-[#F7F4EE] font-medium">Bespoke Foil</h4>
                  <p className="text-[11px] text-[#A39E93] font-light leading-normal">
                    Precision brass plate & wax seal stamping.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-1">
                    <Gift className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-[#F7F4EE] font-medium">White-Glove</h4>
                  <p className="text-[11px] text-[#A39E93] font-light leading-normal">
                    Multi-sensory unboxing with velvet lining.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs uppercase tracking-wider text-[#F7F4EE] font-medium">Pure Sourcing</h4>
                  <p className="text-[11px] text-[#A39E93] font-light leading-normal">
                    Ecuadorian roses, French glass, artisan cocoa.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <MagneticButton variant="gold" onClick={onDiscover} className="px-8 py-4">
                  Discover the Collection
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
