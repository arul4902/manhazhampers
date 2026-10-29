import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Sparkles, ShieldAlert, Copy, Check } from 'lucide-react';
import { getWhatsAppActionUrl, copyToClipboard } from '../../utils/whatsapp';

interface CustomEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const CustomEnquiryModal: React.FC<CustomEnquiryModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [formData, setFormData] = useState({
    occasion: '',
    giftType: '',
    budget: '',
    theme: '',
    details: '',
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialogRef.current && dialogRef.current.open) {
        dialogRef.current.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInsideDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInsideDialog) {
      handleClose();
    }
  };

  const handleClose = () => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    onClose();
  };

  const buildCustomMessage = () => {
    const lines: string[] = [
      'Hello Manha’z Hampers! ✨',
      '',
      "I'd like to create a bespoke customized gift from your Salem studio.",
      '',
    ];

    if (formData.occasion.trim()) {
      lines.push(`Occasion: ${formData.occasion.trim()}`);
    }
    if (formData.giftType.trim()) {
      lines.push(`Preferred Style: ${formData.giftType.trim()}`);
    }
    if (formData.budget.trim()) {
      lines.push(`Budget: ${formData.budget.trim()}`);
    }
    if (formData.theme.trim()) {
      lines.push(`Preferred Theme/Colours: ${formData.theme.trim()}`);
    }
    if (formData.details.trim()) {
      lines.push(`Additional Details: ${formData.details.trim()}`);
    }

    lines.push('');
    lines.push('Please help me explore the available designs, themes, and Salem delivery options.');
    lines.push('');
    lines.push('Thank you!');

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildCustomMessage();
    const action = getWhatsAppActionUrl(message);

    copyToClipboard(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');

    onShowToast(
      'Opening WhatsApp chat!',
      'Please tap "Send" in WhatsApp to deliver your custom enquiry to Manha’z Hampers.'
    );
    handleClose();
  };

  const handleCopy = async () => {
    const message = buildCustomMessage();
    const ok = await copyToClipboard(message);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      onShowToast('Custom enquiry copied!', 'Paste directly into WhatsApp.');
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as Record<string, string>)}
      onClick={handleDialogClick}
      onCancel={handleClose}
      aria-labelledby="custom-dialog-title"
      className="m-auto rounded-3xl p-0 max-w-xl w-[92vw] max-h-[90vh] bg-ivory-50 text-espresso-900 shadow-modal border border-gold-300/60 backdrop:bg-espresso-900/70 backdrop:backdrop-blur-sm animate-dialog-content overflow-hidden focus:outline-none"
    >
      <div className="flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-ivory-50/95 backdrop-blur-md px-6 py-4 border-b border-espresso-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-burgundy-100 text-burgundy-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-600" />
            </div>
            <div>
              <h2 id="custom-dialog-title" className="font-serif text-xl font-bold text-burgundy-900">
                Design a Bespoke Gift
              </h2>
              <p className="text-[11px] text-espresso-700/70">
                Collaborate with our Salem gifting artisans
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-espresso-700/60 hover:text-espresso-900 rounded-full hover:bg-espresso-100 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="custom-occasion-select" className="block text-xs font-semibold text-espresso-900 mb-1">
              What is the Occasion?
            </label>
            <select
              id="custom-occasion-select"
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              className="w-full text-xs rounded-xl border border-espresso-200 bg-white px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
            >
              <option value="">Select an occasion...</option>
              <option value="Wedding / Seer">Wedding / Seer Arrangements</option>
              <option value="Engagement">Engagement Gifting</option>
              <option value="Birthday">Birthday Surprise</option>
              <option value="Anniversary">Anniversary Celebration</option>
              <option value="Baby Shower / Welcome">Baby Shower / Newborn Welcome</option>
              <option value="Festival">Festival (Diwali / Eid / Pongal)</option>
              <option value="Return Gifts">Return Gifts (Bulk sets)</option>
              <option value="Personalized Surprise">Personalized Surprise</option>
            </select>
          </div>

          <div>
            <label htmlFor="custom-gift-select" className="block text-xs font-semibold text-espresso-900 mb-1">
              Preferred Gift Type
            </label>
            <select
              id="custom-gift-select"
              value={formData.giftType}
              onChange={(e) => setFormData({ ...formData, giftType: e.target.value })}
              className="w-full text-xs rounded-xl border border-espresso-200 bg-white px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
            >
              <option value="">Select preferred style...</option>
              <option value="Customized Hamper Box">Customized Hamper Box</option>
              <option value="Plate Decor / Seer Trays">Plate Decor / Seer Trays</option>
              <option value="Trousseau Trunk Packing">Trousseau Trunk Packing</option>
              <option value="Flower Bouquet">Fresh / Preserved Flower Bouquet</option>
              <option value="Chocolate Bouquet / Tower">Chocolate Bouquet or Tower</option>
              <option value="Personalized Keepsake">Personalized Keepsake (Wallet, Plaque)</option>
              <option value="Wooden Tray / Basket">Wooden Tray or Cane Basket</option>
              <option value="Mix of Hampers & Plate Decor">Full Ceremony Ensemble (Mix)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="custom-budget-select" className="block text-xs font-semibold text-espresso-900 mb-1">
                Estimated Budget Range
              </label>
              <select
                id="custom-budget-select"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full text-xs rounded-xl border border-espresso-200 bg-white px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
              >
                <option value="">Flexible / Discuss with team</option>
                <option value="Under ₹1,500">Under ₹1,500</option>
                <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000</option>
                <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                <option value="₹10,000+ (Grand / Wedding)">₹10,000+ (Grand / Wedding)</option>
              </select>
            </div>

            <div>
              <label htmlFor="custom-theme-input" className="block text-xs font-semibold text-espresso-900 mb-1">
                Preferred Theme / Colours
              </label>
              <input
                id="custom-theme-input"
                type="text"
                maxLength={100}
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                placeholder="e.g. Royal Maroon, Blush & Sage"
                className="w-full text-xs rounded-xl border border-espresso-200 bg-white px-3 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="custom-details-textarea" className="block text-xs font-semibold text-espresso-900 mb-1">
              Additional Details or Ideas
            </label>
            <textarea
              id="custom-details-textarea"
              rows={3}
              maxLength={800}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us about the recipient, delivery date in Salem, or specific items you wish to include..."
              className="w-full text-xs rounded-xl border border-espresso-200 bg-white px-3 py-2 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold transition shadow-md flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300 transition-transform group-hover:scale-110" />
              <span>Send Enquiry on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto py-3 px-4 rounded-xl border border-espresso-200 text-espresso-800 hover:bg-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Message</span>
            </button>
          </div>

          <div className="rounded-xl bg-ivory-100 p-3 border border-espresso-100 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-espresso-700/80 leading-relaxed font-light">
              Your custom enquiry will open in WhatsApp. Availability, design ideas, final price, and delivery in Salem will be confirmed directly with the owner.
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
};
