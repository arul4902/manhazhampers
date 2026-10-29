import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import { handleImageError } from '../../utils/imageFallback';

interface ProductSnippetCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
  onCloseChat?: () => void;
}

export const ProductSnippetCard: React.FC<ProductSnippetCardProps> = ({
  product,
  onSelectProduct,
  onCloseChat,
}) => {
  const handleWhatsAppProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Manha’z Hampers! ✨ I saw "${product.name}" (${product.categoryName}) via your website Gift Assistant and would like to confirm availability and pricing.`
    );
    const url = `https://wa.me/${siteConfig.contact.whatsappBusinessNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-gold-300/60 shadow-xs hover:shadow-soft transition-all overflow-hidden flex flex-col text-left group cursor-pointer"
    >
      {/* Thumbnail + Category badge */}
      <div className="relative aspect-[16/10] bg-espresso-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-burgundy-900/90 text-ivory-50 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-gold-400/40">
          {product.categoryName}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h4 className="font-serif text-sm font-bold text-burgundy-900 line-clamp-1 group-hover:text-burgundy-700 transition">
            {product.name}
          </h4>
          <p className="text-[11px] text-espresso-700/80 line-clamp-2 mt-0.5 font-light leading-snug">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-1.5 border-t border-espresso-100/70 flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-burgundy-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
            {product.priceDisplay}
          </span>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/product/${product.slug}`}
              onClick={onCloseChat}
              className="p-1.5 rounded-lg bg-ivory-100 hover:bg-ivory-200 text-burgundy-900 text-[11px] font-semibold transition flex items-center gap-1 border border-espresso-200/60"
              title="View product details"
              aria-label={`View details for ${product.name}`}
            >
              <Eye className="w-3 h-3 text-gold-600" />
              <span>Details</span>
            </Link>

            <button
              type="button"
              onClick={handleWhatsAppProduct}
              className="p-1.5 rounded-lg bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-[11px] font-semibold transition flex items-center gap-1 shadow-xs"
              title="Ask on WhatsApp"
              aria-label={`Ask about ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-3 h-3 text-emerald-300" />
              <span>Ask</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
