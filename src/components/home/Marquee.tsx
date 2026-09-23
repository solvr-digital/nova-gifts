import React from 'react';

export const Marquee: React.FC = () => {
  const phrases = [
    'CURATED WITH LOVE',
    'MADE TO MEMORABLE',
    'GIFT SOMETHING MEANINGFUL',
    'NOVAGIFTS ATELIER',
    'BESPOKE ITALIAN PACKAGING',
    'TIMELESS DEVOTION',
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0A0A09] border-y border-white/[0.07] py-4 select-none">
      {/* Edge Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0A0A09] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0A0A09] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center">
          {phrases.map((phrase, idx) => (
            <div key={`track-1-${idx}`} className="flex items-center">
              <span className="text-xs sm:text-[13px] uppercase tracking-[0.32em] font-light text-[#F7F4EE]/70 font-serif px-8 hover:text-[#C5A059] transition-colors">
                {phrase}
              </span>
              <span className="text-[#C5A059] text-[9px] scale-75 opacity-70">✦</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Infinite duplicate) */}
        <div className="flex items-center">
          {phrases.map((phrase, idx) => (
            <div key={`track-2-${idx}`} className="flex items-center">
              <span className="text-xs sm:text-[13px] uppercase tracking-[0.32em] font-light text-[#F7F4EE]/70 font-serif px-8 hover:text-[#C5A059] transition-colors">
                {phrase}
              </span>
              <span className="text-[#C5A059] text-[9px] scale-75 opacity-70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
