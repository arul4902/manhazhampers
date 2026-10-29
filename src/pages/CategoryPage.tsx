import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesData } from '../data/categories';
import { productsData } from '../data/products';
import { ProductCard } from '../components/catalogue/ProductCard';
import { SEOHead } from '../components/common/SEOHead';
import { siteConfig } from '../data/siteConfig';
import {
  ChevronRight,
  Filter,
  Search,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import type { OccasionId, Product } from '../types/index.ts';

interface CategoryPageProps {
  onViewProductDetails: (product: Product) => void;
  onOpenCustomEnquiry: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onViewProductDetails,
  onOpenCustomEnquiry,
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const isAll = !categoryId || categoryId === 'all';
  const currentCategory = categoriesData.find(
    (c) => c.slug === categoryId || c.id === categoryId
  );

  const [selectedOccasion, setSelectedOccasion] = useState<OccasionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products matching current category (or all)
  const categoryProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category match
      if (!isAll) {
        if (currentCategory) {
          if (product.category !== currentCategory.id) {
            return false;
          }
        } else {
          return false;
        }
      }

      // Occasion filter
      if (selectedOccasion !== 'all') {
        if (!product.occasions.includes(selectedOccasion)) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(q));
        return matchesName || matchesDesc || Boolean(matchesTags);
      }

      return true;
    });
  }, [isAll, currentCategory, selectedOccasion, searchQuery]);

  const pageTitle = isAll ? 'All Gifting Collections' : currentCategory?.name || 'Category';
  const pageTagline = isAll
    ? 'Handcrafted in Salem, Tamil Nadu'
    : currentCategory?.tagline || 'Boutique Collection';
  const pageDescription = isAll
    ? 'Explore our full boutique repertoire: customized hampers, traditional wedding seer, sacred plate decor, and personalized keepsakes in Salem, Tamil Nadu.'
    : currentCategory?.description ||
      'Thoughtfully arranged gifts tailored to your ceremony and celebration.';

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
        name: 'Collections',
        item: `${siteConfig.seo.siteUrl}/category/all`,
      },
      ...(!isAll && currentCategory
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: currentCategory.name,
              item: `${siteConfig.seo.siteUrl}/category/${currentCategory.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory-50 min-h-[75vh]">
      <SEOHead
        title={`${pageTitle} in Salem`}
        description={pageDescription}
        canonicalPath={`/category/${isAll ? 'all' : currentCategory?.slug || categoryId}`}
        schemaData={breadcrumbSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-espresso-700/70 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-burgundy-700 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
          <Link to="/category/all" className="hover:text-burgundy-700 transition">
            Collections
          </Link>
          {!isAll && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-espresso-400" />
              <span className="text-burgundy-900 font-semibold">{pageTitle}</span>
            </>
          )}
        </nav>

        {/* Category Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gold-300/40 shadow-soft mb-8 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-100/40 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/80 border border-gold-300 text-gold-900 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>{pageTagline}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy-900">
              {pageTitle}
            </h1>

            <p className="text-sm sm:text-base text-espresso-700/85 leading-relaxed font-light">
              {pageDescription}
            </p>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="mt-8 pt-6 border-t border-espresso-100/70 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <Link
              to="/category/all"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                isAll
                  ? 'bg-burgundy-600 text-ivory-50 shadow-sm'
                  : 'bg-ivory-100 hover:bg-ivory-200 text-espresso-800 border border-espresso-100'
              }`}
            >
              All Collections
            </Link>

            {categoriesData.map((cat) => {
              const active = !isAll && (currentCategory?.id === cat.id || categoryId === cat.slug);
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    active
                      ? 'bg-burgundy-600 text-ivory-50 shadow-sm'
                      : 'bg-ivory-100 hover:bg-ivory-200 text-espresso-800 border border-espresso-100'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar within Category */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gold-300/40 shadow-soft mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Live Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${isAll ? 'all creations' : pageTitle}...`}
              className="w-full text-xs sm:text-sm rounded-xl border border-espresso-200/80 bg-ivory-50 pl-10 pr-9 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
            />
            <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-espresso-400 hover:text-espresso-700 absolute right-2.5 top-2.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Occasion Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value as OccasionId | 'all')}
              className="text-xs sm:text-sm rounded-xl border border-espresso-200/80 bg-ivory-50 px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition cursor-pointer min-w-[170px]"
              aria-label="Filter by celebration"
            >
              <option value="all">All Celebrations</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="baby-shower">Baby Shower</option>
              <option value="festivals">Festivals</option>
              <option value="return-gifts">Return Gifts</option>
              <option value="personalized-surprises">Personalized</option>
            </select>

            {(selectedOccasion !== 'all' || searchQuery.trim().length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedOccasion('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-burgundy-900 text-xs font-medium hover:bg-rose-100 transition flex items-center gap-1.5 flex-shrink-0"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {categoryProducts.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-espresso-700/80 px-1">
              <span>
                Showing <strong>{categoryProducts.length}</strong> {categoryProducts.length === 1 ? 'creation' : 'creations'}
              </span>
              <span className="text-[11px] italic text-espresso-500">
                100% Custom Handcrafted in Salem
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProductDetails}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-gold-300/40 shadow-soft space-y-4 my-8">
            <div className="w-14 h-14 rounded-full bg-ivory-200 border border-gold-300 text-gold-600 flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6 opacity-60" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-burgundy-900">
              No matching creations found
            </h2>
            <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-light">
              We couldn't find items in this collection matching your filters. You can clear your filters or collaborate with our artisans on a custom gift!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/category/all"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-espresso-300 text-espresso-800 text-xs font-semibold hover:bg-ivory-50 transition"
              >
                Explore Other Collections
              </Link>
              <button
                type="button"
                onClick={onOpenCustomEnquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Create a Custom Gift</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
