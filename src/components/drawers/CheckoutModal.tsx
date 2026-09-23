import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, Lock, Gift, CreditCard, Smartphone, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, shipping, total, giftMessage, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerName, setCustomerName] = useState('Devashish Sharma');
  const [email, setEmail] = useState('devashish@luxury.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Villa 14, The Belvedere Greens');
  const [city, setCity] = useState('Mumbai');
  const [postalCode, setPostalCode] = useState('400050');
  const [wrapChoice, setWrapChoice] = useState<'noir' | 'velvet' | 'champagne'>('noir');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    const generatedId = `NG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    clearCart();

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C9A86A', '#E5D0A6', '#FFFFFF', '#9A7A3E'],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#080808]/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl bg-[#0F0F0F] border border-[#C9A86A]/40 rounded-xl shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#121212]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A] text-xs font-serif">
                N
              </div>
              <span className="font-serif text-sm tracking-[0.2em] text-[#F5F1E8] uppercase">
                NOVAGIFTS Private Checkout
              </span>
            </div>

            <button
              onClick={handleClose}
              className="p-1 rounded-full text-[#A8A39A] hover:text-white"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Steps Body */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#F5F1E8] uppercase tracking-wide">
                    Recipient & Delivery Details
                  </h3>
                  <p className="text-xs text-[#A8A39A] mt-1 font-light">
                    Complimentary white-glove courier handling across all Indian metro & destination pin codes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Email for Tracking
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                      Postal PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#080808] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Luxury Packaging Option */}
                <div className="pt-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-2 font-medium">
                    Complimentary Signature Box Presentation:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'noir', label: 'Signature Noir', desc: 'Charcoal box with champagne gold ribbon' },
                      { id: 'velvet', label: 'Velvet Emerald', desc: 'Deep botanical green with satin brass trim' },
                      { id: 'champagne', label: 'Champagne Gilded', desc: 'Lustrous ivory with gold foil monogram' },
                    ].map((wrap) => (
                      <button
                        key={wrap.id}
                        type="button"
                        onClick={() => setWrapChoice(wrap.id as any)}
                        className={`p-3 rounded-sm border text-left transition-all ${
                          wrapChoice === wrap.id
                            ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#F5F1E8]'
                            : 'border-white/10 bg-[#080808] text-[#A8A39A]'
                        }`}
                      >
                        <span className="text-xs font-serif block text-[#F5F1E8]">{wrap.label}</span>
                        <span className="text-[10px] text-[#A8A39A] block mt-0.5 leading-snug">{wrap.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Review Snippet */}
                <div className="p-4 rounded-sm bg-[#121212] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#A8A39A]">Items in Curation: {items.length}</span>
                    {giftMessage && (
                      <p className="text-[11px] text-[#C9A86A] italic mt-0.5">Note: "{giftMessage}"</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A39A] block">Total Payable</span>
                    <span className="text-lg font-serif text-gold-gradient font-medium">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#C9A86A] via-[#DFC287] to-[#C9A86A] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:brightness-105 transition-all shadow-gold-sm"
                  >
                    Proceed to Payment ({formatPrice(total)})
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-[#F5F1E8] uppercase tracking-wide">
                    Select Payment Sanctuary
                  </h3>
                  <p className="text-xs text-[#A8A39A] mt-1 font-light">
                    Direct bank encryption via 256-bit SSL gateway.
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-sm border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#F5F1E8]'
                        : 'border-white/10 bg-[#080808] text-[#A8A39A]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#C9A86A]" />
                    <span className="text-xs font-semibold">Instant UPI / QR</span>
                    <span className="text-[10px] text-[#A8A39A]">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-sm border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#F5F1E8]'
                        : 'border-white/10 bg-[#080808] text-[#A8A39A]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#C9A86A]" />
                    <span className="text-xs font-semibold">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#A8A39A]">Amex, Visa, Mastercard</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 rounded-sm border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#F5F1E8]'
                        : 'border-white/10 bg-[#080808] text-[#A8A39A]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#C9A86A]" />
                    <span className="text-xs font-semibold">Net Banking</span>
                    <span className="text-[10px] text-[#A8A39A]">All Major Banks</span>
                  </button>
                </div>

                {/* Simulated payment detail field */}
                <div className="p-5 rounded bg-[#080808] border border-white/10 space-y-3">
                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                        Virtual Payment Address (UPI ID)
                      </label>
                      <input
                        type="text"
                        defaultValue="devashish@okhdfcbank"
                        className="w-full bg-[#121212] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          defaultValue="•••• •••• •••• 4242"
                          className="w-full bg-[#121212] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8] focus:border-[#C9A86A] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          defaultValue="12/28"
                          placeholder="MM/YY"
                          className="bg-[#121212] border border-white/15 px-3 py-2 rounded-sm text-xs text-[#F5F1E8]"
                        />
                        <input
                          type="password"
                          defaultValue="•••"
                          placeholder="CVV"
                          className="bg-[#121212] border border-white/15 px-3 py-2 rounded-sm text-xs text-[#F5F1E8]"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#C9A86A] block mb-1">
                        Select Financial Institution
                      </label>
                      <select className="w-full bg-[#121212] border border-white/15 px-3 py-2.5 rounded-sm text-xs text-[#F5F1E8]">
                        <option>HDFC Bank Private Banking</option>
                        <option>ICICI Wealth Management</option>
                        <option>Axis Burgundy Bank</option>
                        <option>State Bank of India</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-xs uppercase tracking-wider text-[#A8A39A] hover:text-[#F5F1E8]"
                  >
                    ← Edit Address
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#C9A86A] via-[#DFC287] to-[#C9A86A] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:brightness-105 transition-all shadow-gold-sm flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Authorize Payment of {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-8 text-center flex flex-col items-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/50 flex items-center justify-center text-[#C9A86A] shadow-gold-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#C9A86A] font-serif">
                    Order Confirmed
                  </span>
                  <h3 className="text-3xl font-serif text-[#F5F1E8] uppercase tracking-tight">
                    Thank You, {customerName}
                  </h3>
                  <p className="text-sm text-[#A8A39A] max-w-md mx-auto font-light">
                    Your luxury order <strong className="text-[#C9A86A] font-mono">{orderId}</strong> has been received by our private atelier and is being hand-wrapped in our signature{' '}
                    {wrapChoice} presentation box.
                  </p>
                </div>

                <div className="bg-[#121212] p-5 rounded-md border border-white/10 text-xs text-[#A8A39A] max-w-md w-full text-left space-y-2">
                  <div className="flex justify-between">
                    <span>Order Reference:</span>
                    <span className="text-[#F5F1E8] font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Location:</span>
                    <span className="text-[#F5F1E8]">{city}, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival:</span>
                    <span className="text-[#C9A86A] font-medium">Within 48 Hours via White-Glove Courier</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-[#C9A86A] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:brightness-105 transition-all shadow-gold-sm"
                >
                  Return to Salon
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
