import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag, ShieldAlert, Copy, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { buildCartWhatsAppMessage, getWhatsAppActionUrl, copyToClipboard } from '../../utils/whatsapp';
import { handleImageError } from '../../utils/imageFallback';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  onShowToast: (title: string, message?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onShowToast }) => {
  const { items, removeItem, updateQuantity, totalItems, subtotalPriced, hasUnpricedItems, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const message = buildCartWhatsAppMessage(items, subtotalPriced, hasUnpricedItems);
    const action = getWhatsAppActionUrl(message);

    // Copy to clipboard as safe backup
    copyToClipboard(message);

    window.open(action.url, '_blank', 'noopener,noreferrer');

    if (action.isTruncatedForUrl) {
      onShowToast(
        'Opening WhatsApp chat!',
        'Your complete order details were copied to clipboard. Paste into your chat if needed.'
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
      onShowToast('Cart cleared', 'All items have been removed.');
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
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-ivory-50 shadow-2xl flex flex-col border-l border-gold-300/40 animate-slideLeft">
          {/* Header */}
          <div className="p-5 border-b border-espresso-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-burgundy-600" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif text-xl font-bold text-burgundy-900">
                  Your Gifting Cart
                </h2>
                <p className="text-xs text-espresso-700/70">
                  {totalItems} {totalItems === 1 ? 'creation' : 'creations'} selected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-espresso-700 hover:text-espresso-900 hover:bg-espresso-100/60 rounded-full transition"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-200 border border-gold-300 text-gold-600 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-burgundy-900">Your cart is empty</h3>
                  <p className="text-xs text-espresso-700/80 max-w-xs font-light">
                    Explore our curated hampers, plate decor, and personalized wedding gifts to begin your enquiry.
                  </p>
                </div>
                <Link
                  to="/category/all"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs font-semibold shadow-sm transition flex items-center gap-2"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-espresso-100/80 shadow-xs space-y-3"
                >
                  <div className="flex gap-3.5">
                    {/* Thumbnail */}
                    <Link
                      to={`/product/${item.productSlug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-espresso-100 flex-shrink-0 border border-espresso-200/60"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block truncate">
                        {item.categoryName}
                      </span>
                      <Link
                        to={`/product/${item.productSlug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-base font-bold text-burgundy-900 hover:text-burgundy-700 line-clamp-1 block transition"
                      >
                        {item.productName}
                      </Link>
                      <span className="text-xs font-semibold text-burgundy-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60 inline-block mt-1">
                        {item.priceDisplay}
                      </span>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-espresso-400 hover:text-rose-600 p-1.5 rounded transition self-start"
                      title="Remove from cart"
                      aria-label={`Remove ${item.productName} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customization Details Summary */}
                  {(item.customization.occasion ||
                    item.customization.recipientName ||
                    item.customization.colorTheme ||
                    item.customization.budget ||
                    item.customization.deliveryDate ||
                    item.customization.instructions) && (
                    <div className="bg-ivory-50 rounded-xl p-2.5 text-[11px] text-espresso-800 border border-espresso-100 space-y-1">
                      <span className="font-bold text-gold-700 uppercase tracking-wider text-[9px] block">
                        Customization:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.customization.occasion && (
                          <span className="bg-white px-2 py-0.5 rounded border border-espresso-100 text-espresso-700">
                            Occasion: <strong>{item.customization.occasion}</strong>
                          </span>
                        )}
                        {item.customization.recipientName && (
                          <span className="bg-white px-2 py-0.5 rounded border border-espresso-100 text-espresso-700">
                            For: <strong>{item.customization.recipientName}</strong>
                          </span>
                        )}
                        {item.customization.colorTheme && (
                          <span className="bg-white px-2 py-0.5 rounded border border-espresso-100 text-espresso-700">
                            Theme: <strong>{item.customization.colorTheme}</strong>
                          </span>
                        )}
                        {item.customization.budget && (
                          <span className="bg-white px-2 py-0.5 rounded border border-espresso-100 text-espresso-700">
                            Budget: <strong>{item.customization.budget}</strong>
                          </span>
                        )}
                        {item.customization.deliveryDate && (
                          <span className="bg-white px-2 py-0.5 rounded border border-espresso-100 text-espresso-700">
                            Date: <strong>{item.customization.deliveryDate}</strong>
                          </span>
                        )}
                      </div>
                      {item.customization.instructions && (
                        <p className="text-[10px] text-espresso-600 italic pt-0.5 line-clamp-2">
                          "{item.customization.instructions}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quantity Controller */}
                  <div className="flex items-center justify-between pt-1 border-t border-espresso-100/60">
                    <span className="text-xs text-espresso-700/70 font-medium">Quantity:</span>
                    <div className="flex items-center border border-espresso-200 rounded-lg bg-ivory-50 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-espresso-900 min-w-[1.75rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-espresso-100 bg-white space-y-3.5">
              {/* Pricing Subtotal */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-espresso-700">Priced Items Subtotal:</span>
                  <span className="font-serif text-lg font-bold text-burgundy-900">
                    {subtotalPriced > 0 ? formatCurrency(subtotalPriced) : 'Price on Enquiry'}
                  </span>
                </div>
                {hasUnpricedItems && (
                  <p className="text-[11px] text-espresso-600 font-light italic">
                    Includes bespoke items whose final price will be confirmed by the owner.
                  </p>
                )}
              </div>

              {/* Business Confirmation Notice */}
              <div className="rounded-xl bg-ivory-100 p-2.5 border border-gold-300/40 flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-espresso-700/80 leading-relaxed font-light">
                  Your enquiry will be sent to WhatsApp. Product availability, final pricing, payment, and delivery will be confirmed by our team.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold transition shadow-md hover:shadow-luxury flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300 transition-transform group-hover:scale-110" />
                  <span>Proceed to WhatsApp ({totalItems})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="w-full py-2 px-3 rounded-lg border border-espresso-200 text-espresso-700 hover:bg-ivory-50 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 px-3 rounded-lg border border-espresso-200 text-espresso-700 hover:bg-ivory-50 text-xs font-semibold transition text-center"
                  >
                    Continue Browsing
                  </button>
                </div>

                <div className="text-center pt-0.5">
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-[11px] text-espresso-400 hover:text-rose-600 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
