import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 800);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999] bg-[#060606] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Ambient Warm Golden Core Glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#C5A059]/[0.06] blur-[150px] pointer-events-none" />

          <div className="relative flex flex-col items-center z-10">
            {/* Monogram Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 h-10 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif font-medium text-sm tracking-widest mb-6 shadow-gold-subtle"
            >
              N
            </motion.div>

            {/* Brand Logo with deliberate letter-spacing reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-[#F7F4EE] uppercase text-center"
            >
              NOVAGIFTS
            </motion.h1>

            {/* Thin animated champagne gold line underneath */}
            <div className="relative mt-6 h-[1.5px] w-48 sm:w-64 bg-white/[0.08] overflow-hidden rounded-full">
              <motion.div
                initial={{ width: '0%', x: '-50%' }}
                animate={{ width: '100%', x: '0%' }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
              />
            </div>

            {/* Subtext Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[10px] font-sans tracking-[0.28em] text-[#A39E93] uppercase mt-5 font-light"
            >
              Gifts that become memories
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
