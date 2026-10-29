import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../../data/products';
import { ProductCard } from '../catalogue/ProductCard';
import { Product } from '../../types';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  onViewProductDetails: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onViewProductDetails,
}) => {
  const featuredList = productsData.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-ivory-100 border-b border-espresso-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/80 border border-gold-300 text-gold-800 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Artisan Highlights</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900">
            Made for Moments That Matter
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Our most requested bespoke hampers, handcrafted ceremonial seer plates,
            and personalized creations loved by families in Salem.
          </p>
        </div>

        {/* 3 columns on desktop, 2 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/category/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-sm font-semibold tracking-wide shadow-luxury hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
          >
            <span>View All Creations in Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
