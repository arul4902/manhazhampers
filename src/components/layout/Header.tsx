import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  Menu,
  X,
  Search,
  ShoppingBag,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useCart } from '../../context/CartContext';
import { getWhatsAppActionUrl, buildGeneralCustomGiftMessage } from '../../utils/whatsapp';
import { categoriesData } from '../../data/categories';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGeneralEnquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGeneralEnquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll for sticky backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = buildGeneralCustomGiftMessage();
    const action = getWhatsAppActionUrl(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-soft border-b border-gold-300/30 py-3'
          : 'bg-ivory-100/95 backdrop-blur-sm border-b border-espresso-100/70 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ========================================================= */}
          {/* 1. BRAND LOGO (Left)                                       */}
          {/* ========================================================= */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 rounded-lg flex-shrink-0 min-w-0"
            aria-label={`${siteConfig.brand.name} - Home`}
          >
            {/* Monogram emblem */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-burgundy-600 flex items-center justify-center text-ivory-100 font-serif font-bold text-lg sm:text-2xl shadow-sm border border-gold-400/60 transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              <span>M</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-burgundy-900 group-hover:text-burgundy-700 transition leading-tight truncate">
                {siteConfig.brand.name}
              </span>
              <span className="text-[9px] sm:text-[11px] tracking-wider uppercase text-espresso-700/70 font-medium truncate">
                Plate Decor &amp; Gifting • Salem
              </span>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION (Center)                             */}
          {/* ========================================================= */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors py-1 ${
                location.pathname === '/'
                  ? 'text-burgundy-900 font-semibold border-b-2 border-gold-500'
                  : 'text-espresso-700 hover:text-burgundy-700'
              }`}
            >
              Home
            </Link>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <Link
                to="/category/all"
                className={`text-sm font-medium transition-colors py-1 flex items-center gap-1 ${
                  location.pathname.startsWith('/category')
                    ? 'text-burgundy-900 font-semibold'
                    : 'text-espresso-700 hover:text-burgundy-700'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {/* Flyout panel */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-luxury border border-gold-300/40 p-2 z-50 animate-dialog-content">
                  <div className="text-[10px] font-bold text-gold-600 tracking-wider uppercase px-3 py-1.5">
                    Browse by Category
                  </div>
                  <Link
                    to="/category/all"
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-burgundy-900 hover:bg-ivory-100 transition"
                  >
                    All Collections ({categoriesData.length})
                  </Link>
                  <div className="h-[1px] bg-espresso-100 my-1" />
                  {categoriesData.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="block px-3 py-1.5 rounded-lg text-xs text-espresso-800 hover:text-burgundy-700 hover:bg-ivory-100 transition truncate"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/category/wedding-seer"
              className={`text-sm font-medium transition-colors py-1 ${
                location.pathname === '/category/wedding-seer'
                  ? 'text-burgundy-900 font-semibold border-b-2 border-gold-500'
                  : 'text-espresso-700 hover:text-burgundy-700'
              }`}
            >
              Wedding Gifts
            </Link>

            <Link
              to="/category/personalized-gifts"
              className={`text-sm font-medium transition-colors py-1 ${
                location.pathname === '/category/personalized-gifts'
                  ? 'text-burgundy-900 font-semibold border-b-2 border-gold-500'
                  : 'text-espresso-700 hover:text-burgundy-700'
              }`}
            >
              Personalized
            </Link>

            <a
              href="/#about"
              className="text-sm font-medium text-espresso-700 hover:text-burgundy-700 transition-colors py-1"
            >
              About
            </a>

            <a
              href="/#contact"
              className="text-sm font-medium text-espresso-700 hover:text-burgundy-700 transition-colors py-1"
            >
              Contact
            </a>
          </nav>

          {/* ========================================================= */}
          {/* 3. RESPONSIVE ACTIONS: Search, Cart, WhatsApp, Hamburger   */}
          {/* ========================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 flex-shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-espresso-700 hover:text-burgundy-700 hover:bg-espresso-100/60 rounded-full transition flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
              title="Search catalogue"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Trigger with Visible Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-espresso-800 hover:text-burgundy-900 hover:bg-ivory-200/80 rounded-full transition flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
              title="View Cart"
              aria-label={`View Cart, ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy-700" />
              <span className="hidden xl:inline text-xs font-semibold text-burgundy-900">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-burgundy-600 text-ivory-50 text-[10px] font-bold flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp Enquiry Button - visible on sm and up (tablets and desktops) */}
            <a
              href={siteConfig.contact.whatsappCatalogueUrl}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-xs lg:text-sm font-medium px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow transition items-center gap-1.5 sm:gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600 flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300 transition-transform group-hover:scale-110" />
              <span>WhatsApp</span>
            </a>

            {/* Hamburger Menu Button - visible on all screens < lg (mobile & tablet) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-espresso-700 hover:text-burgundy-700 hover:bg-espresso-100/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MOBILE & TABLET ACCESSIBLE DRAWER (< lg: 1024px)        */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-50 border-b border-gold-300/40 shadow-luxury max-h-[calc(100dvh-4.5rem)] overflow-y-auto animate-dialog-content">
          <div className="px-5 pt-3 pb-6 space-y-2.5">
            <span className="text-[10px] font-bold text-gold-600 tracking-wider uppercase block">
              Menu Navigation
            </span>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              Home
            </Link>

            <Link
              to="/category/all"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              All Categories &amp; Collections
            </Link>

            <Link
              to="/category/wedding-seer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              Wedding Seer &amp; Trousseau
            </Link>

            <Link
              to="/category/personalized-gifts"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              Personalized Gifts
            </Link>

            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              About the Studio
            </a>

            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-espresso-900 border-b border-espresso-100/40"
            >
              Contact &amp; Location
            </a>

            {/* Actions in Mobile Menu */}
            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGeneralEnquiry();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-burgundy-300 text-burgundy-800 text-xs font-semibold flex items-center justify-center gap-2 bg-rose-50/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Create a Custom Gift</span>
              </button>

              <a
                href={siteConfig.contact.whatsappCatalogueUrl}
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-burgundy-600 text-ivory-50 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Enquire on WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-espresso-700 font-medium pt-1">
                📞 Call / WhatsApp: <a href={`tel:${siteConfig.contact.whatsappBusinessNumber}`} className="text-burgundy-700 font-bold hover:underline">{siteConfig.contact.phoneDisplay}</a>
              </p>
              <p className="text-center text-[10px] text-espresso-500 pt-0.5">
                📍 229/1 Natraj Rd, Ayyanthirumaligai, Salem
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
