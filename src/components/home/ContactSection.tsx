import React from 'react';
import { MapPin, MessageCircle, ExternalLink, Navigation, Phone } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { siteConfig } from '../../data/siteConfig';
import { GoldDivider } from '../common/GoldDivider';
import { getWhatsAppActionUrl, buildGeneralCustomGiftMessage } from '../../utils/whatsapp';

interface ContactSectionProps {
  onShowToast: (title: string, message?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = buildGeneralCustomGiftMessage();
    const action = getWhatsAppActionUrl(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
    onShowToast('WhatsApp enquiry opened!', 'Chat with our Salem studio.');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-ivory-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs sm:text-[13px] font-semibold text-gold-600 tracking-widest uppercase">
            Salem Studio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Connect With Our Gifting Team
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            We are here to help you design the perfect customized gift hamper, wedding seer,
            or plate decor for your special celebration in Salem and surrounding areas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gold-300/50 shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Contact & Studio Info (7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wider">
                  Boutique Studio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900 mt-1">
                  {siteConfig.brand.fullName}
                </h3>
                <p className="text-xs text-espresso-700/70 mt-1">
                  Handcrafted Gifting, Seer &amp; Trousseau Packing
                </p>
              </div>

              {/* Verified Address */}
              <div className="bg-ivory-100 rounded-2xl p-4 sm:p-5 border border-espresso-100/80 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-burgundy-100 text-burgundy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-burgundy-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-espresso-900">
                      Studio Address
                    </p>
                    <p className="text-xs sm:text-sm text-espresso-700/90 leading-relaxed">
                      {siteConfig.contact.address}
                    </p>
                    <p className="text-[11px] text-gold-700 font-medium pt-1">
                      Landmark: {siteConfig.contact.landmark}
                    </p>
                    <p className="text-xs text-espresso-800 font-medium pt-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-burgundy-700" />
                      <span>Direct Contact: </span>
                      <a href={`tel:${siteConfig.contact.whatsappBusinessNumber}`} className="text-burgundy-700 font-bold hover:underline">
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-ivory-100 hover:bg-gold-50 border border-gold-400 text-burgundy-900 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 group"
                >
                  <Navigation className="w-4 h-4 text-burgundy-600 transition-transform group-hover:scale-110" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={siteConfig.contact.whatsappCatalogueUrl}
                    onClick={handleWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-white hover:bg-rose-50 border border-espresso-200 text-espresso-900 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2"
                  >
                    <InstagramIcon className="w-4 h-4 text-burgundy-600" />
                    <span>Explore Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Map / Direction highlight visual (5 cols) */}
            <div
              className="md:col-span-5 bg-burgundy-900 text-ivory-100 p-6 sm:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gold-500/30 relative overflow-hidden"
              style={{ backgroundColor: '#2A0915' }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold-400/15 blur-xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-4 relative z-10">
                <span className="text-[11px] font-bold text-gold-300 uppercase tracking-widest">
                  Service Area
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Salem &amp; Nearby Districts
                </h4>
                <p className="text-xs sm:text-sm text-ivory-100/90 leading-relaxed font-light">
                  Serving clients across Salem city (Ayyanthirumaligai, Periyakollappatty, Hasthampatti, Fairlands, Ammapet, Suramangalam) and surrounding regions for wedding seer arrangements.
                </p>

                <div className="pt-3 border-t border-gold-400/30 text-xs text-ivory-200/90 space-y-1.5">
                  <p className="text-gold-300 font-semibold text-xs flex items-center gap-1.5">
                    <span>✨ Direct Owner Confirmation</span>
                  </p>
                  <p className="leading-relaxed">
                    All pricing, design availability, and delivery timings are personally finalized on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gold-300 hover:text-white underline underline-offset-4 font-semibold transition"
                >
                  <span>Open 229/1 Natraj Rd on Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
