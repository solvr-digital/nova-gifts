import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../common/MagneticButton';
import { useToast } from '../../context/ToastContext';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address to join the private salon.', 'info');
      return;
    }

    setIsSubmitted(true);
    showToast(
      'Welcome to NOVAGIFTS',
      'You are now enrolled in our private circle. Enjoy 10% privilege on your debut curation.',
      'gold'
    );
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0A0A09] relative overflow-hidden border-t border-white/[0.08]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-[#C5A059]/[0.06] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#C5A059]/25 mb-4 shadow-gold-subtle"
        >
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC287] font-medium font-sans">
            Exclusive Atelier Invitations
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif text-[#F7F4EE] uppercase tracking-tight"
        >
          Make Someone's Day.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-[#A39E93] font-light max-w-xl mx-auto leading-relaxed"
        >
          Discover thoughtful gifts, exclusive seasonal collections, and special offers
          delivered discreetly to your inbox.
        </motion.p>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 max-w-lg mx-auto"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A39E93]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#060606] border border-white/15 focus:border-[#C5A059] rounded-sm pl-11 pr-4 py-3.5 text-xs text-[#F7F4EE] placeholder:text-[#A39E93]/60 focus:outline-none transition-colors"
                />
              </div>

              <MagneticButton variant="gold" type="submit" className="shrink-0 px-8 py-3.5">
                Join NOVAGIFTS
              </MagneticButton>
            </form>
          ) : (
            <div className="p-4 rounded-sm bg-[#111110] border border-[#C5A059]/40 text-[#F7F4EE] flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
              <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                Thank you for joining our private circle.
              </span>
            </div>
          )}

          <p className="text-[10px] text-[#A39E93]/65 uppercase tracking-widest mt-4 font-sans">
            Discretion guaranteed • Unsubscribe at any time
          </p>
        </motion.div>
      </div>
    </section>
  );
};
