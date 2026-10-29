import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { buildCartWhatsAppMessage, getWhatsAppActionUrl, copyToClipboard } from '../utils/whatsapp';
import { handleImageError } from '../utils/imageFallback';

interface CartPageProps {
  onShowToast: (title: string, message?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onShowToast }) => {
  const { items, removeItem, updateQuantity, totalItems, subtotalPriced, hasUnpricedItems, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const message = buildCartWhatsAppMessage(items, subtotalPriced, hasUnpricedItems);
    const action = getWhatsAppActionUrl(message);

    copyToClipboard(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');

    if (action.isTruncatedForUrl) {
      onShowToast(
        'Opening WhatsApp chat!',
        'Your comprehensive order was copied to clipboard. Please paste into WhatsApp if needed.'
      );
    } else {
      onShowToast(
        'Opening WhatsApp chat!',
        'Please tap "Send" in WhatsApp to deliver your prefilled enquiry to Manha’z Hampers.'
      );
    }
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    const ok = window.confirm(
      'Are you sure you want to clear your entire cart? All selected creations and personalizations will be removed.'
    );
    if (ok) {
      clearCart();
      onShowToast('Cart cleared', 'All items have been removed from your cart.');
    }
  };

  const handleCopyOrder = async () => {
    if (items.length === 0) return;
    const message = buildCartWhatsAppMessage(items, subtotalPriced, hasUnpricedItems);
    const ok = await copyToClipboard(message);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      onShowToast('Cart enquiry copied!', 'Paste directly into WhatsApp.');
    }
  };

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory-50 min-h-[70vh]">
      <SEOHead
        title="Your Shopping Cart"
        description="Review your customized hamper and wedding seer items before sending your WhatsApp enquiry to Manha’z Hampers in Salem."
        canonicalPath="/cart"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-espresso-700/70 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-burgundy-700 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
          <span className="text-burgundy-900 font-semibold">Shopping Cart</span>
        </nav>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900">
            Your Gifting Cart ({totalItems})
          </h1>
          <p className="text-xs sm:text-sm text-espresso-700/80 mt-1 font-light">
            Review your selected creations and customizations before proceeding to WhatsApp consultation.
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto border border-gold-300/40 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-ivory-100 border border-gold-300 text-gold-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-burgundy-900">Your cart is empty</h2>
            <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-light">
              You haven't added any gift hampers or plate decor yet. Explore our handcrafted collections to create your celebration ensemble.
            </p>
            <div className="pt-2">
              <Link
                to="/category/all"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs sm:text-sm font-semibold shadow-sm transition"
              >
                <span>Browse All Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-gold-300/40 shadow-soft flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-start sm:items-center flex-1 min-w-0">
                    <Link
                      to={`/product/${item.productSlug}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-espresso-100 flex-shrink-0 border border-espresso-200/80"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block">
                        {item.categoryName}
                      </span>
                      <Link
                        to={`/product/${item.productSlug}`}
                        className="font-serif text-lg sm:text-xl font-bold text-burgundy-900 hover:text-burgundy-700 transition block truncate"
                      >
                        {item.productName}
                      </Link>
                      <span className="text-xs font-semibold text-burgundy-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60 inline-block">
                        {item.priceDisplay}
                      </span>

                      {/* Customization Details */}
                      {(item.customization.occasion ||
                        item.customization.recipientName ||
                        item.customization.colorTheme ||
                        item.customization.budget ||
                        item.customization.deliveryDate) && (
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-espresso-700">
                          {item.customization.occasion && (
                            <span className="bg-ivory-100 px-2 py-0.5 rounded border border-espresso-100">
                              Occasion: {item.customization.occasion}
                            </span>
                          )}
                          {item.customization.colorTheme && (
                            <span className="bg-ivory-100 px-2 py-0.5 rounded border border-espresso-100">
                              Theme: {item.customization.colorTheme}
                            </span>
                          )}
                          {item.customization.recipientName && (
                            <span className="bg-ivory-100 px-2 py-0.5 rounded border border-espresso-100">
                              For: {item.customization.recipientName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Remove Controls */}
                  <div className="flex items-center gap-4 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex items-center border border-espresso-200 rounded-xl bg-ivory-50 p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs sm:text-sm font-bold text-espresso-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-espresso-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Remove item"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/category/all"
                  className="text-xs sm:text-sm text-burgundy-800 hover:text-burgundy-900 font-semibold underline underline-offset-4"
                >
                  ← Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-xs text-espresso-500 hover:text-rose-600 transition"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Order Summary & WhatsApp Checkout (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gold-300/50 shadow-luxury space-y-5 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-burgundy-900 border-b border-espresso-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-espresso-800">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span className="font-bold">{totalItems} creations</span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-espresso-100">
                  <span className="font-medium">Priced Items Subtotal:</span>
                  <span className="font-serif text-xl font-bold text-burgundy-900">
                    {subtotalPriced > 0 ? formatCurrency(subtotalPriced) : 'Price on Enquiry'}
                  </span>
                </div>
                {hasUnpricedItems && (
                  <p className="text-[11px] text-espresso-600 italic font-light pt-1">
                    * Includes bespoke pieces whose final cost will be determined directly by the owner based on chosen materials.
                  </p>
                )}
              </div>

              {/* Business Rules Disclosure Notice */}
              <div className="rounded-2xl bg-ivory-100 p-3.5 border border-gold-300/40 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-espresso-700/80 leading-relaxed font-light">
                  Your enquiry will be sent to WhatsApp. Product availability, final pricing, payment, and delivery will be confirmed by our team.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 px-5 rounded-2xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold transition shadow-md hover:shadow-luxury flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300 transition-transform group-hover:scale-110" />
                  <span>Proceed to WhatsApp ({totalItems})</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="w-full py-2.5 px-4 rounded-xl border border-espresso-200 text-espresso-700 hover:bg-ivory-50 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Formatted Enquiry</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-espresso-500">
                  📍 Handcrafted in Salem, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
