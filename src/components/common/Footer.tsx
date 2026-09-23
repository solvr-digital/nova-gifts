import { ArrowUp } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#F5F1E8] border-t border-white/[0.08] pt-20 pb-12 relative overflow-hidden select-none">
      {/* Background subtle radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-sm bg-[#C9A86A]/20 border border-[#C9A86A]/50 flex items-center justify-center text-[#C9A86A] font-serif font-bold text-sm">
                  N
                </div>
                <span className="font-display text-2xl tracking-[0.25em] text-[#F5F1E8] uppercase">
                  NOVAGIFTS
                </span>
              </div>

              <p className="font-serif italic text-lg text-[#C9A86A] mb-3">
                "Gifts that become memories."
              </p>

              <p className="text-xs text-[#A8A39A] leading-relaxed max-w-sm font-light">
                An artisan gifting salon dedicated to the preservation of profound emotion. Handcrafted hampers, bespoke brass engravings, and sensory unboxings designed to outlast the moment.
              </p>
            </div>

            {/* Back to top button */}
            <div className="pt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A8A39A] hover:text-[#C9A86A] transition-colors group"
              >
                <span>Return to Summit</span>
                <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-[#C9A86A] flex items-center justify-center transition-colors">
                  <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A86A] mb-5 font-serif">
              Shop
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A39A]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  All Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Personalized
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('occasions')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Occasions Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A86A] mb-5 font-serif">
              Help
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A39A]">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  White-Glove Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Returns & Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Packaging FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A86A] mb-5 font-serif">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A39A]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F5F1E8] transition-colors"
                >
                  Corporate Gifting
                </button>
              </li>
              <li>
                <span className="text-[#6E6A63] cursor-pointer hover:text-[#A8A39A] transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-[#6E6A63] cursor-pointer hover:text-[#A8A39A] transition-colors">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A86A] mb-5 font-serif">
              Social
            </h4>
            <ul className="space-y-3 text-xs text-[#A8A39A]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  <span>📌</span>
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  <span>✦</span>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A39A]/60">
          <p>© 2026 NOVAGIFTS. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-[#C9A86A]/70">
              India • Luxury Pan-Nation Delivery
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[10px] tracking-wider">Prices inclusive of taxes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
