import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Sparkles, Check, Calendar, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

export const PersonalizationStudio: React.FC = () => {
  const { addItem } = useCart();
  const [recipientName, setRecipientName] = useState('Sophia Montgomery');
  const [customMessage, setCustomMessage] = useState('With all my love, through every season.');
  const [customDate, setCustomDate] = useState('24.10.2026');
  const [boxColor, setBoxColor] = useState<'noir' | 'emerald' | 'burgundy'>('noir');
  const [ribbonColor, setRibbonColor] = useState<'gold' | 'champagne' | 'onyx'>('gold');
  const [hasPhoto, setHasPhoto] = useState(true);

  // Target base product for personalization
  const memoryBoxProduct = PRODUCTS.find((p) => p.id === 'prod-personalized-memory-box') || PRODUCTS[0];

  const handleCreatePersonalizedGift = () => {
    addItem(memoryBoxProduct, 1, {
      recipientName,
      customMessage,
      date: customDate,
      boxColor: boxColor === 'noir' ? 'Midnight Noir' : boxColor === 'emerald' ? 'Velvet Emerald' : 'Royal Burgundy',
      ribbonColor: ribbonColor === 'gold' ? 'Champagne Gold' : ribbonColor === 'champagne' ? 'Blush Pearl' : 'Onyx Silk',
    });
  };

  return (
    <section className="py-28 sm:py-36 bg-[#060606] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-[#C5A059]/[0.05] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle"
          >
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
              Bespoke Atelier
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] tracking-tight uppercase"
          >
            Make It Uniquely Theirs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[#A39E93] font-light max-w-xl mx-auto leading-relaxed"
          >
            Add a name, message, date or memory to create a gift that belongs to one person only.
            Experience our live personalization preview below.
          </motion.p>
        </div>

        {/* Studio Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Realistic 3D Physical Packaging Mockup Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md aspect-[4/5] rounded-xl p-8 sm:p-10 flex flex-col justify-between border shadow-2xl transition-all duration-500 overflow-hidden select-none"
              style={{
                backgroundColor:
                  boxColor === 'noir'
                    ? '#0c0c0b'
                    : boxColor === 'emerald'
                    ? '#08140e'
                    : '#17090c',
                borderColor: 'rgba(197, 160, 89, 0.35)',
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(197, 160, 89, 0.12)',
              }}
            >
              {/* Box Texture & Velvet Depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-white/[0.06] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_65%)] pointer-events-none" />

              {/* Vertical Italian Satin Ribbon Simulation */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 pointer-events-none shadow-2xl"
                style={{
                  backgroundColor:
                    ribbonColor === 'gold'
                      ? '#C5A059'
                      : ribbonColor === 'champagne'
                      ? '#E2CA94'
                      : '#181817',
                  borderLeft: '1px solid rgba(255,255,255,0.25)',
                  borderRight: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-black/25 via-white/[0.08] to-black/25" />
              </div>

              {/* Top Crest Emblem */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#C5A059]/60 flex items-center justify-center text-[#C5A059] text-[10px] font-serif shadow-gold-subtle">
                    N
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-serif">
                    NOVAGIFTS ATELIER
                  </span>
                </div>
                <span className="text-[9.5px] text-[#F7F4EE]/60 font-serif tracking-widest uppercase">
                  Bespoke No. 01
                </span>
              </div>

              {/* Center Engraved Brushed Brass Plaque */}
              <div className="relative z-10 my-auto py-8 px-6 bg-[#080807]/92 backdrop-blur-md rounded-md border border-[#C5A059]/60 shadow-2xl text-center flex flex-col items-center">
                {/* Hairline ornament */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-[1px] w-6 bg-[#C5A059]/40" />
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span className="h-[1px] w-6 bg-[#C5A059]/40" />
                </div>

                {/* Recipient Name in metallic gold foil gradient */}
                <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-medium tracking-wide break-words max-w-full drop-shadow-md">
                  {recipientName || 'Your Recipient'}
                </h3>

                {/* Custom Vow / Sentiment */}
                <p className="mt-3 text-xs sm:text-sm text-[#F7F4EE]/90 font-serif italic max-w-xs leading-relaxed">
                  "{customMessage || 'Your thoughtful words will be etched here.'}"
                </p>

                {/* Date Plate */}
                {customDate && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-black/50 border border-[#C5A059]/30 text-[9.5px] tracking-[0.25em] text-[#C5A059] uppercase font-sans">
                    <Calendar className="w-2.5 h-2.5 text-[#C5A059]" />
                    {customDate}
                  </div>
                )}

                {/* Photo Badge if enabled */}
                {hasPhoto && (
                  <div className="mt-3 flex items-center gap-1.5 text-[9px] text-[#A39E93] uppercase tracking-wider">
                    <ImageIcon className="w-3 h-3 text-[#C5A059]" />
                    Archival Photo Enclosed
                  </div>
                )}
              </div>

              {/* Bottom Packaging Footer Details */}
              <div className="relative z-10 flex items-center justify-between text-[10px] text-[#A39E93]">
                <span>Solid Walnut Keepsake</span>
                <span className="text-[#C5A059]">24k Gold Foil Etched</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#0D0D0C] p-6 sm:p-8 rounded-lg border border-white/[0.08] flex flex-col gap-6 shadow-2xl">
              <div className="border-b border-white/[0.08] pb-4">
                <h3 className="text-xl font-serif text-[#F7F4EE] uppercase tracking-wide">
                  Configure Your Heirloom
                </h3>
                <p className="text-xs text-[#A39E93] mt-1 font-light">
                  Customized with laser brass etching and hand-folded wax sealed card.
                </p>
              </div>

              {/* Option 1: Recipient Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.18em] text-[#C5A059] font-medium flex items-center justify-between">
                  <span>+ Recipient Name</span>
                  <span className="text-[10px] text-[#A39E93] lowercase">laser engraved</span>
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Sophia Montgomery"
                  className="w-full bg-[#060606] border border-white/15 focus:border-[#C5A059] text-[#F7F4EE] px-4 py-3 text-sm rounded-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Option 2: Custom Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-[0.18em] text-[#C5A059] font-medium flex items-center justify-between">
                  <span>+ Personal Message / Vow</span>
                  <span className="text-[10px] text-[#A39E93] lowercase">wax sealed card</span>
                </label>
                <textarea
                  rows={2}
                  maxLength={120}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. With all my love, through every season."
                  className="w-full bg-[#060606] border border-white/15 focus:border-[#C5A059] text-[#F7F4EE] px-4 py-2.5 text-sm rounded-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Option 3: Date & Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-[#C5A059] font-medium">
                    + Inscribed Date
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    placeholder="DD.MM.YYYY"
                    className="w-full bg-[#060606] border border-white/15 focus:border-[#C5A059] text-[#F7F4EE] px-4 py-3 text-sm rounded-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-[#C5A059] font-medium">
                    + Photo Keepsake
                  </label>
                  <button
                    type="button"
                    onClick={() => setHasPhoto(!hasPhoto)}
                    className={`h-[46px] px-4 rounded-sm border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      hasPhoto
                        ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#F7F4EE]'
                        : 'bg-[#060606] border-white/15 text-[#A39E93]'
                    }`}
                  >
                    <span>Include Archival Print</span>
                    {hasPhoto && <Check className="w-4 h-4 text-[#C5A059]" />}
                  </button>
                </div>
              </div>

              {/* Box & Ribbon Tones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A39E93] block mb-2">
                    Box Velvet Tone:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBoxColor('noir')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        boxColor === 'noir'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Noir
                    </button>
                    <button
                      onClick={() => setBoxColor('emerald')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        boxColor === 'emerald'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Emerald
                    </button>
                    <button
                      onClick={() => setBoxColor('burgundy')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        boxColor === 'burgundy'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Burgundy
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A39E93] block mb-2">
                    Italian Satin Ribbon:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRibbonColor('gold')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        ribbonColor === 'gold'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Gold
                    </button>
                    <button
                      onClick={() => setRibbonColor('champagne')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        ribbonColor === 'champagne'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Pearl
                    </button>
                    <button
                      onClick={() => setRibbonColor('onyx')}
                      className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider border cursor-pointer ${
                        ribbonColor === 'onyx'
                          ? 'border-[#C5A059] bg-[#C5A059]/20 text-white'
                          : 'border-white/10 text-[#A39E93]'
                      }`}
                    >
                      Onyx
                    </button>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#A39E93] uppercase tracking-wider block">
                    Bespoke Suite Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-[#F7F4EE]">
                      ₹1,799
                    </span>
                    <span className="text-xs text-[#C5A059] uppercase tracking-wider">
                      (No engraving surcharge)
                    </span>
                  </div>
                </div>

                <MagneticButton
                  variant="gold"
                  onClick={handleCreatePersonalizedGift}
                  className="w-full sm:w-auto px-8 py-3.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                  Create a Personalized Gift
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
