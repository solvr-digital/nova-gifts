import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../common/MagneticButton';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreGifts: () => void;
  onShopCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGifts, onShopCollection }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 16;
    const y = (clientY / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060606] pt-24 pb-20 select-none"
    >
      {/* Background Editorial Imagery with Multi-Stop Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{
            scale: [1.12, 1.04],
            x: mousePos.x * -0.6,
            y: mousePos.y * -0.6,
          }}
          transition={{
            scale: { duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            x: { type: 'spring', stiffness: 45, damping: 25 },
            y: { type: 'spring', stiffness: 45, damping: 25 },
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=2200&q=90"
            alt="Haute Gifting arrangements with satin ribbons and candlelight"
            className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.15]"
          />
        </motion.div>

        {/* Cinematic Vignette & Radial Light Bleeds */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/40 to-[#060606]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/85 via-transparent to-[#060606]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#060606_90%)]" />
      </div>

      {/* Floating subtle ambient gold dust particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 7.5) % 100}%`,
              y: `${(i * 11) % 100}%`,
              opacity: 0.15 + (i % 3) * 0.1,
            }}
            animate={{
              y: ['-5%', '105%'],
              x: [`${(i * 7.5) % 100}%`, `${((i * 7.5) % 100) + (i % 2 === 0 ? 4 : -4)}%`],
              opacity: [0.1, 0.45, 0.1],
            }}
            transition={{
              duration: 16 + (i % 5) * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
            className="absolute rounded-full bg-[#C5A059] blur-[0.8px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Warm Golden Core Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A059]/[0.08] rounded-full blur-[160px] pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Curated Luxury Seal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/30 backdrop-blur-md mb-6 shadow-gold-subtle"
        >
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-[#DFC287] font-medium font-sans">
            Atelier Privé • Bespoke Keepsakes
          </span>
        </motion.div>

        {/* Main Heading with Elegant Serif Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-serif font-normal tracking-tight text-[#F7F4EE] uppercase leading-[1.08] sm:leading-[1.04]"
        >
          Make Every Moment
          <br />
          Worth{' '}
          <span className="text-gold-gradient font-serif italic font-medium inline-block drop-shadow-md">
            Remembering.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-[17px] text-[#A39E93] max-w-2xl font-light tracking-wide leading-relaxed"
        >
          Thoughtfully curated gifts for the moments that matter. Handcrafted velvet hampers,
          immortal botanicals, and bespoke brass engravings crafted to linger in memory.
        </motion.p>

        {/* Dual Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <MagneticButton
            variant="gold"
            onClick={onExploreGifts}
            className="w-full sm:w-auto px-9 py-4"
          >
            Explore Gifts
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </MagneticButton>

          <MagneticButton
            variant="outline"
            onClick={onShopCollection}
            className="w-full sm:w-auto px-8 py-4"
          >
            Shop Collection
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('moments')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group cursor-pointer text-[#A39E93] hover:text-[#C5A059] transition-colors focus:outline-none"
        aria-label="Scroll to discover"
      >
        <span className="text-[9.5px] uppercase tracking-[0.28em] font-sans font-medium text-[#A39E93] group-hover:text-[#C5A059] transition-colors">
          Scroll to discover
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-1 rounded-full border border-white/10 group-hover:border-[#C5A059]/50 transition-colors"
        >
          <ArrowDown className="w-3 h-3 text-[#C5A059]" />
        </motion.div>
      </motion.button>
    </section>
  );
};
