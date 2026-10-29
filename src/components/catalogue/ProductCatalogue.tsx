import React, { useState, useMemo } from 'react';
import { productsData } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Product, CategoryId, OccasionId } from '../../types';
import { Search, X, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

interface ProductCatalogueProps {
  onViewProductDetails: (product: Product) => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
  selectedOccasion: OccasionId | 'all';
  onSelectOccasion: (occasionId: OccasionId | 'all') => void;
  onOpenCustomEnquiry: () => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onViewProductDetails,
  selectedCategory,
  onSelectCategory,
  selectedOccasion,
  onSelectOccasion,
  onOpenCustomEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Primary category filter tabs
  const categoryTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'customized-hampers', label: 'Hampers' },
    { id: 'plate-decor', label: 'Plate Decor' },
    { id: 'wedding-seer', label: 'Wedding Seer' },
    { id: 'engagement-seer', label: 'Engagement Seer' },
    { id: 'trousseau-packing', label: 'Trousseau' },
    { id: 'flower-bouquets', label: 'Flowers' },
    { id: 'chocolate-bouquets', label: 'Chocolate Gifts' },
    { id: 'chocolate-towers', label: 'Chocolate Towers' },
    { id: 'personalized-gifts', label: 'Personalized Gifts' },
    { id: 'return-gifts', label: 'Return Gifts' },
    { id: 'wooden-trays-baskets', label: 'Wooden Trays' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'chocolate-bouquets') {
          if (
            product.category !== 'chocolate-bouquets' &&
            product.category !== 'chocolate-towers'
          ) {
            return false;
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Occasion match
      if (selectedOccasion !== 'all') {
        if (!product.occasions.includes(selectedOccasion)) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query) ||
          product.fullDescription.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCategory || Boolean(matchesTags);
      }

      return true;
    });
  }, [selectedCategory, selectedOccasion, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedOccasion !== 'all' ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSelectOccasion('all');
    setSearchQuery('');
  };

  return (
    <section id="catalogue" className="py-16 sm:py-24 bg-ivory-50 border-t border-espresso-100/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-[13px] font-semibold text-gold-600 tracking-widest uppercase">
            Curated Gifting Catalogue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            Handcrafted Creations for Salem &amp; Beyond
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Browse our artisanal hampers, traditional plates, and personalized gifts.
            Every item can be customized in colour, size, and packaging to your exact preference.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gold-300/40 shadow-soft mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category, or gift type..."
                className="w-full text-xs sm:text-sm rounded-xl border border-espresso-200/80 bg-ivory-50 pl-10 pr-9 py-2.5 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
              />
              <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-espresso-400 hover:text-espresso-700 absolute right-2.5 top-2.5"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Occasion Filter Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative min-w-[170px]">
                <select
                  value={selectedOccasion}
                  onChange={(e) => onSelectOccasion(e.target.value as OccasionId | 'all')}
                  className="w-full text-xs sm:text-sm rounded-xl border border-espresso-200/80 bg-ivory-50 px-3 py-2.5 text-espresso-900 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition cursor-pointer"
                  aria-label="Filter by occasion"
                >
                  <option value="all">All Occasions</option>
                  <option value="wedding">Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="festivals">Festivals</option>
                  <option value="return-gifts">Return Gifts</option>
                  <option value="personalized-surprises">Personalized</option>
                </select>
              </div>

              {/* Reset button if active */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-burgundy-900 text-xs font-medium transition flex items-center gap-1.5 flex-shrink-0"
                  title="Clear all active filters"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-burgundy-600" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs Pill Bar */}
          <div className="overflow-x-auto pb-1 pt-1 no-scrollbar flex items-center gap-2">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectCategory(tab.id as CategoryId | 'all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? 'bg-burgundy-600 text-ivory-50 shadow-sm ring-1 ring-gold-400'
                      : 'bg-ivory-50 hover:bg-ivory-200 text-espresso-800 border border-espresso-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Filter Badges & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-espresso-100/60 text-xs text-espresso-700/80">
            <div className="flex items-center gap-2">
              <span className="font-medium text-espresso-900">
                Showing <strong className="text-burgundy-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'creation' : 'creations'}
              </span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-burgundy-50 text-burgundy-900 px-2 py-0.5 rounded-full border border-burgundy-200 text-[11px]">
                  Category: {selectedCategory.replace(/-/g, ' ')}
                  <button
                    onClick={() => onSelectCategory('all')}
                    className="hover:text-burgundy-700 ml-0.5"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedOccasion !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-900 px-2 py-0.5 rounded-full border border-gold-200 text-[11px]">
                  Occasion: {selectedOccasion.replace(/-/g, ' ')}
                  <button
                    onClick={() => onSelectOccasion('all')}
                    className="hover:text-gold-700 ml-0.5"
                    aria-label="Remove occasion filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <p className="text-[11px] text-espresso-700/60 italic">
              All items custom handcrafted in Salem
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProductDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-espresso-100 shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-burgundy-700">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-burgundy-900">
              No matching creations found
            </h3>
            <p className="text-xs sm:text-sm text-espresso-700/80 leading-relaxed font-light">
              We couldn't find products matching your exact filters. You can clear your
              filters or ask our artisans to customize a bespoke gift just for you!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-espresso-300 text-espresso-800 text-xs font-semibold hover:bg-ivory-50 transition"
              >
                Clear Filters
              </button>
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
    </section>
  );
};
