import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'gold' | 'outline' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'gold',
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Subtly pull up to 6px in cursor direction for premium feel
    const deltaX = (clientX - centerX) * 0.18;
    const deltaY = (clientY - centerY) * 0.18;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return 'bg-gradient-to-r from-[#C9A86A] via-[#DFC287] to-[#C9A86A] text-[#080808] font-medium shadow-gold-sm hover:shadow-gold-md hover:brightness-105 border border-[#E5D0A6]/40';
      case 'outline':
        return 'bg-transparent text-[#F5F1E8] border border-[#C9A86A]/50 hover:border-[#C9A86A] hover:bg-[#C9A86A]/10 hover:text-[#FFFFFF]';
      case 'ghost':
        return 'bg-white/5 text-[#F5F1E8] hover:bg-white/10 border border-white/10 hover:border-white/20';
      default:
        return '';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm overflow-hidden select-none disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Subtle shine sweep */}
      <span className="absolute inset-0 -translate-x-full hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transition-transform" />
    </motion.button>
  );
};
