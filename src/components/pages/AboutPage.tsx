import React from 'react';
import { Sparkles, Feather, ShieldCheck, Heart, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-32 bg-[#080808] min-h-screen text-[#F5F1E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A86A] font-serif block mb-3">
            Atelier Origins
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 text-base font-serif italic text-[#C9A86A]">
            "Gifts that become memories."
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85"
              alt="NOVAGIFTS atelier craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 text-sm text-[#A8A39A] leading-relaxed font-light">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F1E8] uppercase leading-snug">
              Born from the belief that true luxury is emotional permanence.
            </h2>
            <p>
              Founded in 2024, NOVAGIFTS emerged from a singular disenchantment with the sterile, mass-produced
              gifting landscape. We observed that modern gifts were quickly unwrapped, discarded, and forgotten within days.
            </p>
            <p>
              We established our atelier with an unwavering devotion to physical craftsmanship. We believe every gift
              must tell an intimate story: the tactile heft of custom-milled rigid boxboard, the intoxicating fragrance of
              natural wood and rare botanical oils upon lifting the lid, and the irreplaceable gravitas of a personalized brass plate.
            </p>
            <p>
              Today, whether honoring a 50th wedding anniversary, congratulating a valued partner, or offering comfort
              across continents, NOVAGIFTS ensures your presence is felt in its most refined expression.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A86A]">Our Commitments</span>
            <h3 className="text-2xl font-serif text-[#F5F1E8] uppercase mt-1">The Four Tenets of Haute Gifting</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-[#121212] border border-white/[0.06] flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] shrink-0">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F5F1E8]">Artisanal Hand-Assembly</h4>
                <p className="text-xs text-[#A8A39A] mt-1 leading-relaxed font-light">
                  No factory conveyor belts. Every ribbon is hand-tied, every wax seal individually poured with 24k gold leaf flakes.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#121212] border border-white/[0.06] flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F5F1E8]">Preserved Botanicals</h4>
                <p className="text-xs text-[#A8A39A] mt-1 leading-relaxed font-light">
                  Our roses are harvested in high-altitude Ecuadorian farms and organically preserved to radiate fresh velvet beauty for 1 to 3 years.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#121212] border border-white/[0.06] flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F5F1E8]">Heavyweight Brass & Hardwood</h4>
                <p className="text-xs text-[#A8A39A] mt-1 leading-relaxed font-light">
                  We use solid black American walnut, genuine brushed brass, and full-grain Italian leather to create keepsakes built for lifetimes.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#121212] border border-white/[0.06] flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F5F1E8]">White-Glove Pan-India Transit</h4>
                <p className="text-xs text-[#A8A39A] mt-1 leading-relaxed font-light">
                  Delivered in temperature-stable, shock-cushioned outer casings to guarantee pristine presentation upon the recipient’s doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
