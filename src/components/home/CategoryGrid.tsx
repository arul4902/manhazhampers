import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../data/categories';
import { GoldDivider } from '../common/GoldDivider';
import { Sparkles, ArrowRight } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

export const CategoryGrid: React.FC = () => {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-[13px] font-semibold text-gold-600 tracking-widest uppercase">
            Artisanal Offerings
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Explore Our Collections
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Every creation is assembled with care, using premium materials, fresh
            florals, and ceremonial craftsmanship. Click any collection to view full designs.
          </p>
        </div>

        {/* Editorial Grid: 1 col on XS, 2 on SM, 3 on LG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-3xl overflow-hidden border border-espresso-100/70 hover:border-gold-300 shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <Link
                to={`/category/${category.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-espresso-100 block"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  onError={handleImageError}
                  loading="lazy"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {category.featured && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-burgundy-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gold-300/80 flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    <span>Signature</span>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-gold-600 tracking-wider uppercase">
                    {category.tagline}
                  </span>
                  <Link
                    to={`/category/${category.slug}`}
                    className="font-serif text-xl font-bold text-burgundy-900 mt-0.5 group-hover:text-burgundy-700 transition block"
                  >
                    {category.name}
                  </Link>
                  <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed mt-2 font-light line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 border-t border-espresso-100/60">
                  <Link
                    to={`/category/${category.slug}`}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-ivory-50 group-hover:bg-burgundy-50 text-burgundy-900 text-xs sm:text-sm font-semibold transition flex items-center justify-between"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 text-gold-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
