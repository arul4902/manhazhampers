import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../data/products';
import { categoriesData } from '../data/categories';
import { siteConfig } from '../data/siteConfig';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  ChevronRight,
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  Sparkles,
  ShieldAlert,
  Palette,
  Calendar,
  User,
  DollarSign,
  Share2,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  buildProductWhatsAppMessage,
  getWhatsAppActionUrl,
  copyToClipboard,
} from '../utils/whatsapp';
import { ProductCard } from '../components/catalogue/ProductCard';
import { handleImageError } from '../utils/imageFallback';
import type { CartCustomization, Product } from '../types/index.ts';

interface ProductDetailPageProps {
  onShowToast: (title: string, message?: string) => void;
  onViewProductDetails?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onShowToast,
  onViewProductDetails,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();

  const product = productsData.find((p) => p.slug === slug || p.id === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Customization fields
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState<CartCustomization>({
    occasion: '',
    recipientName: '',
    colorTheme: '',
    budget: '',
    deliveryDate: '',
    instructions: '',
  });

  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    if (product) {
      setQuantity(1);
      setCustomization({
        occasion: product.occasions.length > 0 ? product.occasions[0] : '',
        recipientName: '',
        colorTheme: '',
        budget: '',
        deliveryDate: '',
        instructions: '',
      });
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-20 bg-ivory-50 text-center min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-3xl font-bold text-burgundy-900 mb-2">Product Not Found</h2>
        <p className="text-xs sm:text-sm text-espresso-700/80 mb-6 max-w-md font-light">
          The requested creation may have been renamed or updated. Browse our collections to find your perfect gift.
        </p>
        <Link
          to="/category/all"
          className="px-6 py-2.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs sm:text-sm font-semibold transition"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  const category = categoriesData.find((c) => c.id === product.category);

  // Related products
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityDelta = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product, quantity, customization);
    onShowToast(`Added to cart!`, `${quantity} × ${product.name}`);
    setIsCartOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const message = buildProductWhatsAppMessage(product, {
      quantity,
      occasion: customization.occasion || '',
      recipientName: customization.recipientName || '',
      colorTheme: customization.colorTheme || '',
      budget: customization.budget || '',
      deliveryDate: customization.deliveryDate || '',
      instructions: customization.instructions || '',
    });
    const action = getWhatsAppActionUrl(message);
    copyToClipboard(message);
    window.open(action.url, '_blank', 'noopener,noreferrer');
    onShowToast(
      'Opening WhatsApp chat!',
      'Please tap "Send" in WhatsApp to deliver your prefilled enquiry to Manha’z Hampers.'
    );
  };

  const handleShareLink = async () => {
    const url = window.location.href;
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      onShowToast('Product link copied!', 'Share it with family or friends.');
    }
  };

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    sku: product.id,
    category: category?.name || product.categoryName,
    brand: {
      '@type': 'Brand',
      name: siteConfig.brand.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.unitPriceNumeric ?? 0,
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.seo.siteUrl}/product/${product.slug}`,
      description: product.priceDisplay,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.seo.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || 'Collections',
        item: `${siteConfig.seo.siteUrl}/category/${category?.slug || 'all'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteConfig.seo.siteUrl}/product/${product.slug}`,
      },
    ],
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, productSchema],
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory-50">
      <SEOHead
        title={`${product.name} | Customized Gift in Salem`}
        description={product.shortDescription}
        canonicalPath={`/product/${product.slug}`}
        ogImage={product.images[0]}
        schemaData={pageSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-espresso-700/70 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-burgundy-700 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
          <Link to="/category/all" className="hover:text-burgundy-700 transition">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-burgundy-700 transition">
                {category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
            </>
          )}
          <span className="text-burgundy-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Visual Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-espresso-100 border border-gold-300/40 shadow-luxury">
              <img
                src={currentImage}
                alt={product.name}
                onError={handleImageError}
                loading="eager"
                fetchPriority="high"
                width={600}
                height={750}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-burgundy-900/90 text-ivory-50 text-xs font-semibold px-3 py-1 rounded-full border border-gold-400/50 shadow">
                {product.priceDisplay}
              </div>

              <button
                type="button"
                onClick={handleShareLink}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-espresso-700 hover:text-burgundy-700 rounded-full shadow border border-gold-300/60 transition"
                aria-label="Share product"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-burgundy-600 ring-2 ring-gold-400'
                        : 'border-espresso-200/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Craftsmanship notes */}
            {product.craftsmanshipNotes && product.craftsmanshipNotes.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gold-300/40 shadow-soft space-y-2.5">
                <h3 className="text-xs font-bold text-burgundy-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Artisan Craftsmanship Highlights</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-espresso-700/85">
                  {product.craftsmanshipNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-500 font-bold mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Information & Customization Form (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
                {product.categoryName}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900 mt-1">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-base font-semibold text-burgundy-900 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                  {product.priceDisplay}
                </span>
                <span className="text-xs text-espresso-700/70 font-light">
                  Direct artisan confirmation on WhatsApp
                </span>
              </div>

              <p className="text-sm text-espresso-700 leading-relaxed mt-4 font-light">
                {product.fullDescription}
              </p>
            </div>

            {/* Customization Form */}
            <form
              onSubmit={handleAddToCart}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gold-300/50 shadow-soft space-y-5"
            >
              <div className="border-b border-espresso-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-burgundy-900 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gold-600" />
                    <span>Personalize This Gift</span>
                  </h2>
                  <p className="text-xs text-espresso-700/70 mt-0.5 font-light">
                    Select your quantity and custom preferences for the order.
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold text-espresso-900 mb-1.5">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-xl border border-espresso-200 bg-ivory-50 p-1">
                    <button
                      type="button"
                      onClick={() => handleQuantityDelta(-1)}
                      disabled={quantity <= 1}
                      className="p-2 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 disabled:opacity-30 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-espresso-900 min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityDelta(1)}
                      className="p-2 rounded-lg text-espresso-700 hover:bg-white hover:text-burgundy-900 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-espresso-700/70">
                    {quantity > 1 ? 'items / sets' : 'item / set'}
                  </span>
                </div>
              </div>

              {/* Occasion & Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p-occasion" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Occasion (Optional)
                  </label>
                  <select
                    id="p-occasion"
                    value={customization.occasion}
                    onChange={(e) => setCustomization({ ...customization, occasion: e.target.value })}
                    className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  >
                    <option value="">Select celebration...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Festival">Festival (Diwali / Eid / Pongal)</option>
                    <option value="Return Gifts">Return Gifts</option>
                    <option value="Personalized Surprise">Personalized Surprise</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="p-theme" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Preferred Colours / Theme
                  </label>
                  <input
                    id="p-theme"
                    type="text"
                    maxLength={100}
                    value={customization.colorTheme}
                    onChange={(e) => setCustomization({ ...customization, colorTheme: e.target.value })}
                    placeholder="e.g. Maroon & Gold, Pastel Mint"
                    className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 px-3 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  />
                </div>
              </div>

              {/* Recipient Name & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p-recipient" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Recipient Name / Monogram
                  </label>
                  <div className="relative">
                    <input
                      id="p-recipient"
                      type="text"
                      maxLength={100}
                      value={customization.recipientName}
                      onChange={(e) => setCustomization({ ...customization, recipientName: e.target.value })}
                      placeholder="e.g. Priya & Karthik, Rahul"
                      className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 pl-8 pr-3 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                    />
                    <User className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div>
                  <label htmlFor="p-budget" className="block text-xs font-semibold text-espresso-900 mb-1">
                    Approx Budget (Optional)
                  </label>
                  <div className="relative">
                    <select
                      id="p-budget"
                      value={customization.budget}
                      onChange={(e) => setCustomization({ ...customization, budget: e.target.value })}
                      className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 pl-8 pr-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                    >
                      <option value="">Flexible / Discuss on WhatsApp</option>
                      <option value="Under ₹1,500">Under ₹1,500</option>
                      <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000</option>
                      <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                      <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                      <option value="₹10,000+ (Grand / Wedding)">₹10,000+ (Grand / Wedding)</option>
                    </select>
                    <DollarSign className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-3" />
                  </div>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label htmlFor="p-date" className="block text-xs font-semibold text-espresso-900 mb-1">
                  Preferred Delivery / Celebration Date
                </label>
                <div className="relative">
                  <input
                    id="p-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={customization.deliveryDate}
                    onChange={(e) => setCustomization({ ...customization, deliveryDate: e.target.value })}
                    className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 pl-8 pr-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                  />
                  <Calendar className="w-3.5 h-3.5 text-espresso-700/40 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label htmlFor="p-instructions" className="block text-xs font-semibold text-espresso-900 mb-1">
                  Customization Details &amp; Notes
                </label>
                <textarea
                  id="p-instructions"
                  rows={2}
                  maxLength={600}
                  value={customization.instructions}
                  onChange={(e) => setCustomization({ ...customization, instructions: e.target.value })}
                  placeholder="Specify floral preferences, chocolate types, specific dimensions, or notes..."
                  className="w-full text-xs rounded-xl border border-espresso-200 bg-ivory-50 px-3 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                />
              </div>

              {/* Actions: Add to Cart (Primary) + Enquire on WhatsApp (Secondary) */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 text-sm font-semibold transition shadow-md hover:shadow-luxury flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy-600"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300 transition-transform group-hover:scale-110" />
                  <span>Add to Cart ({quantity})</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3 px-4 rounded-xl border border-espresso-200 hover:bg-ivory-100 text-espresso-900 text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enquire Directly on WhatsApp (Fast Ask)</span>
                </button>
              </div>

              {/* Business Rule Notice */}
              <div className="rounded-2xl bg-ivory-100 p-3 border border-espresso-100 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-espresso-700/80 leading-relaxed font-light">
                  Your enquiry will be sent to WhatsApp. Product availability, final pricing, payment, and delivery will be confirmed by our team.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-espresso-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900">
                  More in {product.categoryName}
                </h2>
                <p className="text-xs text-espresso-700/80 mt-0.5">
                  Complementary handcrafted creations for your celebration
                </p>
              </div>

              {category && (
                <Link
                  to={`/category/${category.slug}`}
                  className="text-xs sm:text-sm font-semibold text-burgundy-700 hover:text-burgundy-900 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onViewDetails={onViewProductDetails || ((p) => navigate(`/product/${p.slug}`))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
