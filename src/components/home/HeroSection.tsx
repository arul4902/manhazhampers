import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

interface HeroSectionProps {
  onOpenCustomEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCustomEnquiry }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-6 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200/50"
    >
      {/* Decorative ambient glows */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-gold-200/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Eyebrow & Location badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-50 border border-burgundy-200/60 text-burgundy-900 text-xs sm:text-[13px] font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <span>GIFTS MADE PERSONAL</span>
              <span className="text-burgundy-300">|</span>
              <span className="flex items-center gap-1 text-espresso-700 font-normal">
                <MapPin className="w-3 h-3 text-burgundy-600" />
                <span>Salem, Tamil Nadu</span>
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] leading-[1.08] font-semibold text-burgundy-900">
              Thoughtfully Gifted. <br className="hidden sm:inline" />
              <span className="italic font-normal text-burgundy-700">
                Beautifully Remembered.
              </span>
            </h1>

            {/* Champagne Gold Accent Line */}
            <div className="w-20 h-[2px] bg-gradient-to-r from-gold-400 via-gold-500 to-transparent mx-auto lg:mx-0" />

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-espresso-700/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              From personalized hampers and elegant plate decor to wedding seer and
              trousseau packing, discover thoughtful creations for your most
              meaningful moments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/category/all"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold tracking-wide shadow-luxury hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={onOpenCustomEnquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-burgundy-900 border border-gold-400/80 hover:border-burgundy-600 text-sm font-semibold tracking-wide shadow-soft hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
              >
                <Sparkles className="w-4 h-4 text-gold-500 transition-transform group-hover:rotate-12" />
                <span>Create a Custom Gift</span>
              </button>
            </div>

            {/* Trust highlights under CTA */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-espresso-100/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-burgundy-900">
                  100%
                </p>
                <p className="text-[11px] sm:text-xs text-espresso-700/80">
                  Custom Handcrafted
                </p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-burgundy-900">
                  Salem
                </p>
                <p className="text-[11px] sm:text-xs text-espresso-700/80">
                  Local Boutique Studio
                </p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-burgundy-900">
                  Direct
                </p>
                <p className="text-[11px] sm:text-xs text-espresso-700/80">
                  WhatsApp Consultation
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Luxury Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative golden border frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border border-gold-400/40 -rotate-1 pointer-events-none" />

              {/* Primary Visual with LCP Optimization (fetchpriority="high", NO lazy loading) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-espresso-900 border-2 border-ivory-50">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85"
                  alt="Manha'z Hampers luxury curated gift hampers and wedding trousseau"
                  onError={handleImageError}
                  fetchPriority="high"
                  width={600}
                  height={720}
                  className="w-full h-[400px] sm:h-[480px] lg:h-[530px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/20 to-transparent pointer-events-none" />

                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-gold-300/50 shadow-luxury">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gold-600 tracking-wider uppercase">
                        Featured Craftsmanship
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-burgundy-900">
                        Artisanal Hampers &amp; Plate Decor
                      </h4>
                      <p className="text-xs text-espresso-700/80 mt-0.5">
                        Tailored to your ceremony themes and color palettes
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 border border-burgundy-200 flex items-center justify-center flex-shrink-0 ml-3">
                      <Sparkles className="w-5 h-5 text-burgundy-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative mini badge */}
              <div className="absolute -top-3 -right-3 bg-burgundy-600 text-ivory-50 text-[11px] font-semibold py-1.5 px-3.5 rounded-full shadow-lg border border-gold-300 flex items-center gap-1.5">
                <span>✨ Made in Salem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
