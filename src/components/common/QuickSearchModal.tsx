import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '../../data/products';
import { categoriesData } from '../../data/categories';
import { handleImageError } from '../../utils/imageFallback';
import type { Product } from '../../types/index.ts';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (product: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onViewProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim().length > 0
    ? productsData.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  const handleSelectProduct = (product: Product) => {
    onClose();
    onViewProduct(product);
  };

  const handleSelectCategory = (slug: string) => {
    onClose();
    navigate(`/category/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-start justify-center" role="dialog" aria-modal="true" aria-labelledby="quick-search-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gold-300/50 overflow-hidden z-10 mt-6 sm:mt-12 animate-dialog-content">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-espresso-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="quick-search-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, hampers, plates, florals, chocolates..."
            className="w-full text-sm sm:text-base bg-transparent text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none"
            aria-label="Search catalogue"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-espresso-400 hover:text-espresso-700"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-espresso-500 hover:text-espresso-900 hover:bg-espresso-100 transition text-xs font-semibold"
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block px-1">
                  Matching Creations ({results.length})
                </span>
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product)}
                    className="w-full p-3 rounded-2xl hover:bg-ivory-100/70 border border-transparent hover:border-gold-300/40 transition flex items-center gap-3.5 text-left group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={handleImageError}
                      className="w-14 h-14 rounded-xl object-cover bg-espresso-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block truncate">
                        {product.categoryName}
                      </span>
                      <h4 className="font-serif text-base font-bold text-burgundy-900 group-hover:text-burgundy-700 transition truncate">
                        {product.name}
                      </h4>
                      <span className="text-xs text-burgundy-800 font-semibold">
                        {product.priceDisplay}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-espresso-400 group-hover:text-burgundy-600 transition group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-espresso-600 text-xs">
                No creations found matching "{query}". Try searching for "wedding", "hampers", or "chocolate".
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block mb-2 px-1">
                  Popular Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {categoriesData.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="px-3.5 py-1.5 rounded-full bg-ivory-100 hover:bg-burgundy-50 border border-espresso-100 hover:border-burgundy-300 text-espresso-800 hover:text-burgundy-900 text-xs font-medium transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold-500" />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

