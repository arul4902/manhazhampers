import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Clock } from 'lucide-react';

interface RecentlyViewedProps {
  products: Product[];
  onViewProductDetails: (product: Product) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  products,
  onViewProductDetails,
}) => {
  if (products.length === 0) return null;

  return (
    <aside aria-label="Recently Viewed Creations" className="py-12 bg-ivory-100/70 border-t border-espresso-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-gold-600" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-900">
            Recently Viewed Creations
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

