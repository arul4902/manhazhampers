import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I place an enquiry or order?',
      a: 'Browse our catalogue, select any product, customize your preferences (such as preferred colours, quantity, and budget), and click "Enquire on WhatsApp". This creates a prefilled message directly to our team, where we confirm availability, final price, payment options, and delivery details.',
    },
    {
      q: 'Why are prices listed as "Price on Enquiry"?',
      a: 'Every gift at Manha’z Hampers is bespoke. The final cost depends on your selected items, specific chocolate brands, fresh vs. preserved flowers, plate counts, and custom name engravings. Providing price on enquiry guarantees transparency tailored directly to your budget and preferences.',
    },
    {
      q: 'How much advance notice should I give for my order?',
      a: 'For individual hampers, chocolate bouquets, and personalized gifts, we recommend contacting us 3 to 7 days before your celebration. For wedding seer plate sets (such as 11 plates) and bridal trousseau packing, 2 to 3 weeks notice is recommended to source materials and coordinate colors perfectly.',
    },
    {
      q: 'Can you match the colors of my wedding seer plates to my saree or mandap?',
      a: 'Yes, absolutely! Color customization is our specialty. You can share photographs of your bridal saree, engagement attire, or mandap decor on WhatsApp, and we will style the fabrics, laces, and floral accents to match your palette.',
    },
    {
      q: 'Do you deliver in and around Salem?',
      a: 'Yes, we are based at Ayyanthirumaligai, Salem, Tamil Nadu. We personally coordinate deliveries and pickups within Salem and discuss options for surrounding locations on WhatsApp based on product fragility.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-100 border-b border-espresso-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold tracking-wider uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Frequently Asked Questions
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Everything you need to know about our customized gifting and wedding seer process.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gold-300/40 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-burgundy-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-light border-t border-espresso-50 animate-dialog-content">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

