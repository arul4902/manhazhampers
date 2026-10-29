import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { getWhatsAppActionUrl, buildGeneralCustomGiftMessage } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = buildGeneralCustomGiftMessage();
    const action = getWhatsAppActionUrl(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp quick assistance" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 flex items-center gap-3">
      {/* Tooltip on Desktop hover */}
      {showTooltip && (
        <div
          role="tooltip"
          className="hidden md:flex items-center gap-2 bg-espresso-900 text-ivory-100 text-xs py-2 px-3.5 rounded-full shadow-luxury border border-gold-400/40 animate-dialog-content"
        >
          <span>Chat with Manha’z Hampers</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-ivory-300 hover:text-white ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={siteConfig.contact.whatsappCatalogueUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-luxury hover:shadow-2xl flex items-center justify-center transition-all duration-300 border-2 border-ivory-50 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
        aria-label="Order or enquire directly on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 transition-transform group-hover:scale-110" />
        <span className="sr-only">Enquire on WhatsApp</span>
        {/* Subtle ping indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-500 border border-white"></span>
        </span>
      </a>
    </aside>
  );
};

