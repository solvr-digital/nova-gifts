import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { MagneticButton } from '../common/MagneticButton';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Personal Gifting Concierge');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'Concierge Inquiry Received',
      'A personal gifting advisor will connect with you within 4 hours.',
      'gold'
    );
  };

  return (
    <div className="pt-28 pb-32 bg-[#080808] min-h-screen text-[#F5F1E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A86A] font-serif block mb-3">
            Atelier Client Relations
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            Contact Concierge
          </h1>
          <p className="mt-3 text-sm text-[#A8A39A] font-light leading-relaxed">
            Whether inquiring regarding large corporate commissions, custom brass engraving proofs,
            or bespoke event favors, our gifting specialists are at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-xl p-8 space-y-8 shadow-xl">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A86A] font-serif block mb-2">
                Private Salon
              </span>
              <h3 className="text-2xl font-serif text-[#F5F1E8]">
                NOVAGIFTS Mumbai Atelier
              </h3>
              <p className="text-xs text-[#A8A39A] mt-2 font-light leading-relaxed">
                By private appointment only for bridal trousseau curation and luxury corporate suites.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#A8A39A] border-t border-white/[0.08] pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                <span>The Heritage Promenade, Nariman Point, Mumbai 400021, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span className="text-[#F5F1E8]">+91 (800) 246-6682 (Concierge Line)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>concierge@novagifts.luxury</span>
              </div>
            </div>

            <div className="p-4 rounded-md bg-white/[0.03] border border-[#C9A86A]/30">
              <span className="text-[10px] uppercase tracking-wider text-[#C9A86A] block font-medium">
                Corporate & Bulk Orders
              </span>
              <p className="text-[11px] text-[#A8A39A] mt-1 font-light">
                Custom company logo metal plates, curated client executive kits, and custom volume pricing available.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-xl p-8 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-serif text-[#F5F1E8] uppercase tracking-wide">
                  Send a Discreet Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alistair Ross"
                      className="w-full bg-[#080808] border border-white/15 px-4 py-3 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alistair@domain.com"
                      className="w-full bg-[#080808] border border-white/15 px-4 py-3 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#080808] border border-white/15 px-4 py-3 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                  >
                    <option>Personal Gifting Concierge</option>
                    <option>Corporate & Executive Gifting</option>
                    <option>Wedding & Bridal Favors</option>
                    <option>Custom Engraving / Monogram Query</option>
                    <option>Order Status & White Glove Tracking</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                    Your Requirements & Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the recipient, preferred timeline, and any special requests..."
                    className="w-full bg-[#080808] border border-white/15 px-4 py-3 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none resize-none"
                  />
                </div>

                <MagneticButton variant="gold" type="submit" className="w-full sm:w-auto">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Dispatch Inquiry
                </MagneticButton>
              </form>
            ) : (
              <div className="py-12 text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/50 flex items-center justify-center text-[#C9A86A]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#F5F1E8]">Message Received</h3>
                <p className="text-xs text-[#A8A39A] max-w-sm leading-relaxed">
                  Thank you, {name}. A dedicated gifting director will review your requirements and respond via {email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-wider text-[#C9A86A] hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
