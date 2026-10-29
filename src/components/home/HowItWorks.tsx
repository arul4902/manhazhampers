import React from 'react';
import { Compass, Palette, MessageCircle } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Explore',
      desc: 'Browse our collections and discover gifts for your occasion.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Personalize',
      desc: 'Tell us your preferred design, colours, budget, and customization ideas.',
      icon: Palette,
    },
    {
      num: '03',
      title: 'Confirm on WhatsApp',
      desc: 'Discuss availability, final pricing, payment, and delivery directly with our team.',
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-50 border-y border-espresso-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-[13px] font-semibold text-gold-600 tracking-widest uppercase">
            Boutique Experience
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            How Custom Gifting Works
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            No rigid e-commerce checkouts. We work closely with you on WhatsApp
            to craft each gift to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connection line for desktop */}
          <div
            className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-gold-300/30 via-gold-400 to-gold-300/30 z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-white rounded-3xl p-7 sm:p-8 border border-gold-300/40 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-burgundy-50 border border-burgundy-200/70 text-burgundy-900 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-burgundy-600 group-hover:text-ivory-50 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-current" />
                </div>

                <span className="font-serif text-xs font-bold text-gold-600 tracking-widest uppercase mb-1">
                  Step {step.num}
                </span>

                <h3 className="font-serif text-2xl font-bold text-burgundy-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

