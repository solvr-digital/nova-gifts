import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { useCart } from '../../context/CartContext';

interface GiftFinderProps {
  onQuickView: (product: Product) => void;
}

export const GiftFinder: React.FC<GiftFinderProps> = ({ onQuickView }) => {
  const { addItem } = useCart();
  const [recipient, setRecipient] = useState<string>('Partner');
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [budget, setBudget] = useState<string>('2000-5000');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [recommended, setRecommended] = useState<Product[]>([]);

  const recipients = ['Partner', 'Friend', 'Family', 'Colleague'];
  const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Festival', 'Just Because'];
  const budgets = [
    { label: 'Under ₹1,000', value: 'under-1000' },
    { label: '₹1,000 – ₹2,000', value: '1000-2000' },
    { label: '₹2,000 – ₹5,000', value: '2000-5000' },
    { label: '₹5,000+', value: '5000-plus' },
  ];

  const handleFindGift = () => {
    const scored = PRODUCTS.map((prod) => {
      let score = 0;
      if (prod.recipient.includes(recipient as any)) score += 35;
      if (prod.occasions.some((occ) => occ.toLowerCase() === occasion.toLowerCase())) score += 35;
      if (prod.budgetCategory === budget) score += 30;

      return { product: prod, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 3).map((item) => item.product);

    setRecommended(topMatches.length > 0 ? topMatches : PRODUCTS.slice(0, 3));
    setIsCalculated(true);
  };

  const handleReset = () => {
    setIsCalculated(false);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0A0A09] relative overflow-hidden border-b border-white/[0.07]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A059]/[0.05] rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
              Curated Matchmaking
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] uppercase tracking-tight">
            Not Sure What to Gift?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A39E93] font-light max-w-md mx-auto leading-relaxed">
            Let our concierge identify the quintessential gift. Answer three brief questions to reveal our tailored atelier edit.
          </p>
        </div>

        {/* Questionnaire or Results */}
        <AnimatePresence mode="wait">
          {!isCalculated ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0D0D0C] border border-white/[0.08] rounded-xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto"
            >
              {/* Question 1: Who are you gifting? */}
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-medium block mb-2 font-sans">
                  Step 01
                </span>
                <h3 className="text-lg font-serif text-[#F7F4EE] mb-4">Who are you gifting?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recipients.map((rec) => (
                    <button
                      key={rec}
                      onClick={() => setRecipient(rec)}
                      className={`p-3.5 rounded-sm text-xs uppercase tracking-wider transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                        recipient === rec
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#F7F4EE] shadow-gold-subtle'
                          : 'bg-[#060606] border-white/10 text-[#A39E93] hover:border-white/20'
                      }`}
                    >
                      <span>{rec}</span>
                      {recipient === rec && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Occasion */}
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-medium block mb-2 font-sans">
                  Step 02
                </span>
                <h3 className="text-lg font-serif text-[#F7F4EE] mb-4">What's the occasion?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      className={`p-3.5 rounded-sm text-xs uppercase tracking-wider transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                        occasion === occ
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#F7F4EE] shadow-gold-subtle'
                          : 'bg-[#060606] border-white/10 text-[#A39E93] hover:border-white/20'
                      }`}
                    >
                      <span>{occ}</span>
                      {occasion === occ && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Budget */}
              <div className="mb-10">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A059] font-medium block mb-2 font-sans">
                  Step 03
                </span>
                <h3 className="text-lg font-serif text-[#F7F4EE] mb-4">What is your ideal budget?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {budgets.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setBudget(b.value)}
                      className={`p-3.5 rounded-sm text-xs uppercase tracking-wider transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                        budget === b.value
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#F7F4EE] shadow-gold-subtle'
                          : 'bg-[#060606] border-white/10 text-[#A39E93] hover:border-white/20'
                      }`}
                    >
                      <span>{b.label}</span>
                      {budget === b.value && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Find My Gift Action */}
              <div className="flex justify-center pt-2">
                <MagneticButton variant="gold" onClick={handleFindGift} className="w-full sm:w-auto px-10 py-4">
                  Find My Gift
                  <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            /* Results View */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-between w-full mb-8 pb-4 border-b border-white/10">
                <div className="text-left">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium">
                    Curated For {recipient} • {occasion}
                  </span>
                  <h3 className="text-xl font-serif text-[#F7F4EE] mt-0.5">
                    Highest Recommended Atelier Selections
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A39E93] hover:text-[#C5A059] transition-colors border border-white/10 px-3.5 py-1.5 rounded-sm cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restart Concierge
                </button>
              </div>

              {/* Top Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {recommended.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="bg-[#0D0D0C] border border-[#C5A059]/40 rounded-lg p-5 flex flex-col justify-between shadow-gold-subtle hover:shadow-gold-glow transition-all group"
                  >
                    <div>
                      {/* Match Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9.5px] font-semibold uppercase tracking-wider px-2.5 py-0.5 bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/35 rounded-sm">
                          {98 - idx * 4}% Match Confidence
                        </span>
                        <span className="text-[10px] text-[#A39E93] uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>

                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-4 bg-[#141413]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <h4 className="font-serif text-lg text-[#F7F4EE] group-hover:text-[#C5A059] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#A39E93] font-light mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-serif text-lg text-[#F7F4EE]">
                        {formatPrice(product.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="p-2 rounded-sm border border-white/10 text-[#A39E93] hover:text-[#F7F4EE] hover:border-white/25 transition-colors cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addItem(product, 1)}
                          className="px-3.5 py-2 rounded-sm bg-[#C5A059] text-[#060606] text-[10px] font-semibold uppercase tracking-wider hover:brightness-105 transition-all flex items-center gap-1.5 shadow-gold-subtle cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
