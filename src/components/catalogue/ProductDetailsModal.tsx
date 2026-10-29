import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product, EnquiryFormData } from '../../types';
import {
  X,
  MessageCircle,
  ShoppingBag,
  Copy,
  Share2,
  Check,
  Calendar,
  Sparkles,
  ShieldAlert,
  Palette,
  User,
  DollarSign,
  Plus,
  Minus,
  ExternalLink,
} from 'lucide-react';
import {
  buildProductWhatsAppMessage,
  getWhatsAppActionUrl,
  copyToClipboard,
} from '../../utils/whatsapp';
import { handleImageError } from '../../utils/imageFallback';
import { useCart } from '../../context/CartContext';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onShowToast: (title: string, message?: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onShowToast,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { addItem, setIsCartOpen } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState<EnquiryFormData>({
    quantity: 1,
    occasion: '',
    recipientName: '',
    colorTheme: '',
    budget: '',
    deliveryDate: '',
    instructions: '',
  });

  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setFormData({
        quantity: 1,
        occasion: product.occasions.length > 0 ? product.occasions[0] : '',
        recipientName: '',
        colorTheme: '',
        budget: '',
        deliveryDate: '',
        instructions: '',
      });

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
  }, [product]);

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

  if (!product) return null;

  const handleQuantityChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, Math.min(100, prev.quantity + delta)),
    }));
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product, formData.quantity, {
      occasion: formData.occasion,
      recipientName: formData.recipientName,
      colorTheme: formData.colorTheme,
      budget: formData.budget,
      deliveryDate: formData.deliveryDate,
      instructions: formData.instructions,
    });
    onShowToast('Added to Cart!', `${formData.quantity} × ${product.name}`);
    handleClose();
    setIsCartOpen(true);
  };

  const handleWhatsAppEnquiry = () => {
    const message = buildProductWhatsAppMessage(product, formData);
    const action = getWhatsAppActionUrl(message);
    copyToClipboard(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
    onShowToast(
      'Opening WhatsApp chat!',
      'Please tap "Send" in WhatsApp to deliver your prefilled enquiry to Manha’z Hampers.'
    );
  };

  const handleCopyMessage = async () => {
    const message = buildProductWhatsAppMessage(product, formData);
    const ok = await copyToClipboard(message);
    if (ok) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
      onShowToast('Enquiry message copied!', 'You can paste it directly into WhatsApp.');
    }
  };

  const handleShareLink = async () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      onShowToast('Product link copied!', 'Share it with family or friends.');
    }
  };

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as Record<string, string>)}
      onClick={handleDialogClick}
      onCancel={handleClose}
      aria-labelledby="product-dialog-title"
      className="m-auto rounded-3xl p-0 max-w-4xl w-[95vw] max-h-[92vh] bg-ivory-50 text-espresso-900 shadow-modal border border-gold-300/50 backdrop:bg-espresso-900/70 backdrop:backdrop-blur-sm animate-dialog-content overflow-hidden focus:outline-none"
    >
      <div className="flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-ivory-50/95 backdrop-blur-md px-5 py-3.5 border-b border-espresso-100/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
              {product.categoryName}
            </span>
            <span className="text-xs text-espresso-700/60 hidden sm:inline">•</span>
            <Link
              to={`/product/${product.slug}`}
              onClick={handleClose}
              className="text-xs text-burgundy-800 hover:text-burgundy-900 font-medium hidden sm:flex items-center gap-1 underline underline-offset-2"
            >
              <span>Open Dedicated Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareLink}
              className="p-2 text-espresso-700/70 hover:text-burgundy-600 hover:bg-espresso-100/50 rounded-full transition"
              title="Share product link"
              aria-label="Share product link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="p-2 text-espresso-700/70 hover:text-burgundy-600 hover:bg-espresso-100/50 rounded-full transition"
              title="Copy enquiry text"
              aria-label="Copy enquiry message text"
            >
              {copiedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-espresso-700/70 hover:text-espresso-900 hover:bg-espresso-100 rounded-full transition"
              aria-label="Close product details dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-7">
          {/* Left: Gallery & Product Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] max-h-[300px] sm:max-h-[380px] md:max-h-none w-full mx-auto rounded-2xl overflow-hidden bg-espresso-100 border border-gold-300/40 shadow-sm">
              <img
                src={currentImage}
                alt={product.name}
                onError={handleImageError}
                loading="lazy"
                width={500}
                height={625}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-burgundy-900/90 text-ivory-50 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gold-400/40">
                {product.priceDisplay}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-burgundy-600 ring-2 ring-gold-400'
                        : 'border-espresso-200/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Craftsmanship Highlights */}
            {product.craftsmanshipNotes && product.craftsmanshipNotes.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-espresso-100/80 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-burgundy-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Artisan Details</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-espresso-700/80">
                  {product.craftsmanshipNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-gold-500 font-bold mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Details & Customization Form (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h2
                id="product-dialog-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900"
              >
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-semibold text-burgundy-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                  {product.priceDisplay}
                </span>
                <span className="text-xs text-espresso-700/70 font-light">
                  Confirmed directly on WhatsApp
                </span>
              </div>
              <p className="text-xs sm:text-sm text-espresso-700/85 leading-relaxed mt-3 font-light">
                {product.fullDescription}
              </p>
            </div>

            {/* Customization Form */}
            <form
              onSubmit={handleAddToCart}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gold-300/40 shadow-soft space-y-4"
            >
              <div className="border-b border-espresso-100/60 pb-2">
                <h3 className="font-serif text-lg font-bold text-burgundy-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-gold-600" />
                  <span>Personalize &amp; Add to Cart</span>
                </h3>
                <p className="text-[11px] text-espresso-700/70 mt-0.5">
                  Choose your quantity and preferences. You can review all items in your cart.
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold text-espresso-900 mb-1.5">
                  Quantity / Sets
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-xl border border-espresso-200 bg-ivory-50 p-1">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={formData.quantity <= 1}
                      className="p-1.5 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 disabled:opacity-30 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-semibold text-espresso-900 min-w-[2rem] text-center">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="p-1.5 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-espresso-700/70">
                    {formData.quantity > 1 ? 'items / sets' : 'item / set'}
                  </span>
                </div>
              </div>

              {/* Occasion & Theme Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-occasion" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Occasion (Optional)
                  </label>
                  <select
                    id="modal-occasion"
                    value={formData.occasion}
                    onChange={(e) =>
                      setFormData({ ...formData, occasion: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 px-3 py-2 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  >
                    <option value="">Select an occasion...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Festival">Festival (Diwali / Eid / Pongal)</option>
                    <option value="Return Gifts">Return Gifts</option>
                    <option value="Other">Other Celebration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-theme" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Preferred Colours / Theme
                  </label>
                  <input
                    id="modal-theme"
                    type="text"
                    maxLength={100}
                    value={formData.colorTheme}
                    onChange={(e) =>
                      setFormData({ ...formData, colorTheme: e.target.value })
                    }
                    placeholder="e.g. Burgundy & Gold, Pastel Mint"
                    className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 px-3 py-2 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  />
                </div>
              </div>

              {/* Recipient Name & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-recipient" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Recipient Name / Monogram
                  </label>
                  <div className="relative">
                    <input
                      id="modal-recipient"
                      type="text"
                      maxLength={100}
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientName: e.target.value })
                      }
                      placeholder="e.g. Priya & Karthik, Rahul"
                      className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 pl-8 pr-3 py-2 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                    />
                    <User className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-budget" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Budget Preference (Approx)
                  </label>
                  <div className="relative">
                    <select
                      id="modal-budget"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 pl-8 pr-3 py-2 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                    >
                      <option value="">Flexible / Discuss on WhatsApp</option>
                      <option value="Under ₹1,500">Under ₹1,500</option>
                      <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000</option>
                      <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                      <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                      <option value="₹10,000+ (Grand / Wedding)">₹10,000+ (Grand / Wedding)</option>
                    </select>
                    <DollarSign className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label htmlFor="modal-date" className="block text-xs font-semibold text-espresso-900 mb-1">
                  Preferred Delivery / Event Date
                </label>
                <div className="relative">
                  <input
                    id="modal-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.deliveryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryDate: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 pl-8 pr-3 py-2 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  />
                  <Calendar className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label htmlFor="modal-instructions" className="block text-xs font-semibold text-espresso-900 mb-1">
                  Customization Details &amp; Ideas
                </label>
                <textarea
                  id="modal-instructions"
                  rows={2}
                  maxLength={600}
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder={
                    product.customizationConfig?.customizationPlaceholder ||
                    'Add any specific preferences, chocolate choices, flowers, or delivery notes...'
                  }
                  className="w-full text-xs rounded-xl border border-espresso-200/80 bg-ivory-50 px-3 py-2 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                />
              </div>

              {/* Primary: Add to Cart & Secondary: Fast Enquire on WhatsApp */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold transition shadow-md hover:shadow-luxury flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300 transition-transform group-hover:scale-110" />
                  <span>Add to Cart ({formData.quantity})</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-2.5 px-3 rounded-xl border border-espresso-200 hover:bg-ivory-100 text-espresso-800 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enquire on WhatsApp Directly</span>
                </button>
              </div>

              {/* Required Business Notice */}
              <div className="rounded-xl bg-ivory-100 p-3 border border-espresso-100 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-espresso-700/80 leading-relaxed font-light">
                  Your enquiry will be sent to WhatsApp. Product availability, final pricing, payment, and delivery will be confirmed by our team.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};
