import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Sparkles, ExternalLink, Phone } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { siteConfig } from '../../data/siteConfig';
import { categoriesData } from '../../data/categories';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso-900 text-ivory-100 pt-16 pb-12 border-t-2 border-gold-400/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-burgundy-600 flex items-center justify-center text-ivory-100 font-serif font-bold text-xl border border-gold-400/60 shadow-sm transition-transform group-hover:scale-105">
                M
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory-50">
                {siteConfig.brand.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-ivory-300 leading-relaxed max-w-sm font-light">
              Boutique customized gift hampers, sacred plate decor, wedding seer arrangements, and trousseau packing in Salem, Tamil Nadu.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-burgundy-600 border border-gold-400/30 flex items-center justify-center text-ivory-100 transition"
                aria-label="Visit Manha'z Hampers Instagram profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappCatalogueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-emerald-700 border border-gold-400/30 flex items-center justify-center text-ivory-100 transition"
                aria-label="View WhatsApp Catalogue"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
              </a>
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-burgundy-600 border border-gold-400/30 flex items-center justify-center text-ivory-100 transition"
                aria-label="Open Studio Address in Google Maps"
              >
                <MapPin className="w-4 h-4 text-gold-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-300 tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-ivory-300 font-light">
              <li>
                <Link to="/" className="hover:text-gold-200 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/all" className="hover:text-gold-200 transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/category/wedding-seer" className="hover:text-gold-200 transition">
                  Wedding Seer &amp; Trousseau
                </Link>
              </li>
              <li>
                <Link to="/category/personalized-gifts" className="hover:text-gold-200 transition">
                  Personalized Gifts
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold-200 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-gold-200 transition">
                  About the Studio
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-gold-200 transition">
                  Studio Location
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-300 tracking-wide">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-ivory-300 font-light">
              {categoriesData.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-gold-200 transition block truncate"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/category/all"
                  className="text-gold-300 hover:text-white font-medium transition block pt-1"
                >
                  View All 11 Collections →
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Location & Enquiry Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-300 tracking-wide">
              Boutique Studio
            </h4>
            <div className="text-xs text-ivory-300 leading-relaxed space-y-2 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </p>
              <p className="flex items-center gap-2 pt-1 text-ivory-200">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.whatsappBusinessNumber}`} className="hover:text-gold-200 transition">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2 text-ivory-200">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappBusinessNumber}?text=${encodeURIComponent('Hello Manha’z Hampers! ✨ I would like to enquire about your gifting collections.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-200 transition"
                >
                  WhatsApp: {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="text-gold-200/90 text-xs pt-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Primary service in Salem &amp; nearby districts</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-300 hover:text-gold-100 underline underline-offset-4"
              >
                <span>Get directions on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Central Notice & Bottom Bar */}
        <div className="border-t border-espresso-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-400">
          <p className="text-center md:text-left text-ivory-300 max-w-2xl font-light">
            <span className="font-semibold text-gold-300">Note: </span>
            {siteConfig.businessRules.confirmationNotice}
          </p>

          <p className="text-center md:text-right text-ivory-400 font-light">
            © {currentYear} {siteConfig.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
