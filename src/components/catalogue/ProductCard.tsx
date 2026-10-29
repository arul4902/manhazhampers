import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { handleImageError } from '../../utils/imageFallback';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      navigate(`/product/${product.slug}`);
    }
  };

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1, {
      occasion: product.occasions.length > 0 ? product.occasions[0] : '',
    });
    setIsCartOpen(true);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-espresso-100/70 hover:border-gold-300 shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View ${product.name}`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso-50">
        <img
          src={product.images[0]}
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
          width={400}
          height={500}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-2.5 left-2.5 bg-burgundy-900/90 backdrop-blur-xs text-gold-300 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-gold-400/50 flex items-center gap-1 shadow">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Featured</span>
          </div>
        )}

        {/* Fast Action Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-burgundy-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-gold-300 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-gold-600" />
            <span>Customize &amp; Order</span>
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-gold-600 tracking-wider uppercase block truncate">
            {product.categoryName}
          </span>

          <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-900 line-clamp-1 group-hover:text-burgundy-700 transition mt-0.5">
            {product.name}
          </h3>

          <p className="text-xs text-espresso-700/80 line-clamp-2 mt-1 leading-relaxed font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Primary Actions Row */}
        <div className="pt-2 border-t border-espresso-100/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-espresso-600">
              Pricing
            </span>
            <span className="text-xs sm:text-sm font-semibold text-burgundy-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
              {product.priceDisplay}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleQuickAddToCart}
              className="w-full py-2 px-1.5 sm:px-2 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-[11px] sm:text-xs font-semibold transition flex items-center justify-center gap-1 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
              title="Add 1 to Cart"
              aria-label={`Add ${product.name} to Cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gold-300 flex-shrink-0" />
              <span className="truncate">Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onViewDetails) {
                  onViewDetails(product);
                } else {
                  navigate(`/product/${product.slug}`);
                }
              }}
              className="w-full py-2 px-1.5 sm:px-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-burgundy-900 text-[11px] sm:text-xs font-semibold transition flex items-center justify-center gap-1 border border-espresso-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
              aria-label={`View Details for ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span className="truncate">Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
