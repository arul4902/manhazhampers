import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../../data/products';
import { ProductCard } from '../catalogue/ProductCard';
import { Product } from '../../types';
import { GoldDivider } from '../common/GoldDivider';
import { Sparkles, Palette, ArrowRight } from 'lucide-react';

interface PersonalizedGiftsProps {
  onViewProductDetails: (product: Product) => void;
  onOpenCustomEnquiry: () => void;
}

export const PersonalizedGifts: React.FC<PersonalizedGiftsProps> = ({
  onViewProductDetails,
  onOpenCustomEnquiry,
}) => {
  const personalizedList = productsData
    .filter((p) => p.isPersonalizedCollection || p.category === 'personalized-gifts')
    .slice(0, 4);

  return (
    <section id="personalized" className="py-16 sm:py-24 bg-ivory-50 border-b border-espresso-100/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 border border-rose-300 text-burgundy-900 text-xs font-semibold tracking-wider uppercase mb-2">
            <Palette className="w-3.5 h-3.5 text-burgundy-700" />
            <span>Custom Names &amp; Details</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Your Idea. Your Colours. Your Gift.
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Share your inspiration and preferences with us, and enquire about a gift tailored to your occasion.
            From laser-embossed leatherette accessories to customized anniversary plaques and confectionery bouquets.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {personalizedList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
            />
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gold-300/40 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-900">
              Have a unique personalization request?
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700/80 font-light mt-0.5">
              We customize initials, messages, corporate hampers, and specific color schemes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/category/personalized-gifts"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-espresso-200 hover:bg-ivory-50 text-espresso-800 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <span>View All Personalized</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={onOpenCustomEnquiry}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-xs sm:text-sm font-semibold tracking-wide transition shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Customize Your Gift</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
