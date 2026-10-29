import React from 'react';
import { MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { handleImageError } from '../../utils/imageFallback';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-ivory-100 border-b border-espresso-100/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold-300/60 shadow-luxury bg-white">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                alt="Manha'z Hampers artisan workshop craft detail"
                onError={handleImageError}
                loading="lazy"
                width={500}
                height={600}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-gold-300/40">
                <p className="text-xs font-bold text-burgundy-900 uppercase tracking-wider">
                  Boutique Craftsmanship
                </p>
                <p className="text-xs text-espresso-700/80 mt-0.5">
                  Handcrafted in Ayyanthirumaligai, Salem, Tamil Nadu
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: About Copy & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>About the Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 leading-tight">
              Thoughtful Gifting, Handcrafted with Care
            </h2>

            <p className="text-base sm:text-lg text-espresso-700 leading-relaxed font-light">
              {siteConfig.brand.description}
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-espresso-900">
                    Bespoke Personalization
                  </h4>
                  <p className="text-xs sm:text-sm text-espresso-700/80 font-light mt-0.5">
                    Colors, sizes, names, and product combinations are tailored to each customer’s celebration requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-espresso-900">
                    Traditional &amp; Modern Harmony
                  </h4>
                  <p className="text-xs sm:text-sm text-espresso-700/80 font-light mt-0.5">
                    Respecting sacred South Indian seer traditions while introducing modern aesthetic packaging and floral styling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-espresso-900">
                    Direct Artisan Communication
                  </h4>
                  <p className="text-xs sm:text-sm text-espresso-700/80 font-light mt-0.5">
                    Discuss directly with the creator on WhatsApp to verify design samples, plate numbers, and delivery timings.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-espresso-100 flex items-center gap-2 text-xs text-espresso-700/80">
              <MapPin className="w-4 h-4 text-burgundy-600 flex-shrink-0" />
              <span>Studio located in Periyakollappatty, Salem, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
