import React from 'react';
import { Link } from 'react-router-dom';
import { occasionsData } from '../../data/categories';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowRight } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

export const OccasionGrid: React.FC = () => {
  return (
    <section id="occasions" className="py-16 sm:py-24 bg-ivory-50 border-y border-espresso-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs sm:text-[13px] font-semibold text-gold-600 tracking-widest uppercase">
            Curated For Every Milestone
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Find the Perfect Gift for Every Occasion
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Select a celebration below to discover handcrafted hampers, plate decor,
            and personalized arrangements designed to match your special moments.
          </p>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {occasionsData.map((occ) => (
            <Link
              key={occ.id}
              to={`/category/${occ.categoryFilter || 'all'}`}
              className="group relative rounded-3xl overflow-hidden text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 hover:shadow-luxury hover:-translate-y-1 block"
            >
              {/* Image Container with fixed aspect ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-espresso-100">
                <img
                  src={occ.image}
                  alt={occ.name}
                  onError={handleImageError}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/30 to-transparent" />

                {/* Card Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-ivory-50">
                  <span className="text-[10px] sm:text-xs font-semibold text-gold-300 tracking-wider uppercase mb-0.5">
                    Celebration
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-gold-200 transition">
                    {occ.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-ivory-300 line-clamp-1 mt-0.5 font-light">
                    {occ.subtitle}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-gold-300 group-hover:text-white transition">
                    <span>Explore gifts</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
