import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, HeartHandshake } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';
import { getWhatsAppActionUrl, buildWeddingEnquiryMessage } from '../../utils/whatsapp';
import { handleImageError } from '../../utils/imageFallback';

interface WeddingSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const WeddingSection: React.FC<WeddingSectionProps> = ({ onShowToast }) => {
  const handleWeddingEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = buildWeddingEnquiryMessage();
    const action = getWhatsAppActionUrl(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
    onShowToast(
      'Wedding consultation enquiry started!',
      action.isDirectChat
        ? 'Opening WhatsApp chat with wedding enquiry details.'
        : 'WhatsApp catalogue opened! Connect with our team for wedding seer designs.'
    );
  };

  const weddingPillars = [
    {
      title: 'Ceremonial Wedding Seer',
      desc: 'Grand 11-plate or 21-plate seer sets adorned with Banarasi silk, kundan, and coordinated florals.',
      categoryId: 'wedding-seer',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Engagement Platters & Seer',
      desc: 'Romance-inspired ring trays, acrylic domes, and curated sweet platters for the auspicious engagement.',
      categoryId: 'engagement-seer',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Bridal Trousseau Packing',
      desc: 'Couture fabric wrapping, velvet chests, and crystal saree boxes styled to preserve your wedding silks.',
      categoryId: 'trousseau-packing',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    },
    {
      title: 'Sacred Plate Decor',
      desc: 'Artisanal Aarathi plates, garland presentation platters, and kundan-embellished puja trays.',
      categoryId: 'plate-decor',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <section id="wedding" className="py-16 sm:py-24 bg-gradient-to-b from-ivory-100 via-rose-50/40 to-ivory-100 border-b border-espresso-100/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-burgundy-100/80 border border-burgundy-200 text-burgundy-900 text-xs font-semibold tracking-wider uppercase mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-burgundy-700" />
            <span>Bridal &amp; Ceremony Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Beautiful Details for Your Big Day
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Explore elegant seer arrangements, engagement gifting, plate decor, and
            thoughtfully arranged trousseau creations for your special celebrations.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {weddingPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-gold-300/40 shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/category/${pillar.categoryId}`}
                  className="relative aspect-[4/3] overflow-hidden bg-espresso-100 block"
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    onError={handleImageError}
                    loading="lazy"
                    width={350}
                    height={260}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </Link>
                <div className="p-5">
                  <Link
                    to={`/category/${pillar.categoryId}`}
                    className="font-serif text-xl font-bold text-burgundy-900 group-hover:text-burgundy-700 transition block"
                  >
                    {pillar.title}
                  </Link>
                  <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed mt-2 font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/category/${pillar.categoryId}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-ivory-100 hover:bg-burgundy-50 text-burgundy-900 text-xs font-semibold transition text-center block"
                >
                  View Collection
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Wedding Consultation Banner */}
        <div className="bg-burgundy-900 text-ivory-100 rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-gold-400/50 shadow-2xl relative overflow-hidden" style={{ backgroundColor: '#2A0915' }}>
          <div
            className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gold-400/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase">
              Salem Wedding Consultation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory-50 mt-1 mb-3">
              Planning an Auspicious Wedding or Engagement in Salem?
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light mb-6">
              Connect with our dedicated wedding team directly on WhatsApp to coordinate
              your plate counts, mandap matching themes, saree trousseau timelines, and personal Salem delivery arrangements.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleWeddingEnquiry}
                className="px-7 py-3.5 rounded-full bg-ivory-100 hover:bg-white active:bg-ivory-200 text-burgundy-900 text-xs sm:text-sm font-bold tracking-wide shadow-lg transition-all flex items-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 transition-transform group-hover:scale-110" />
                <span>Enquire About Wedding Gifting</span>
              </button>

              <span className="text-xs text-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct artisan consultation • Bespoke themes</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
