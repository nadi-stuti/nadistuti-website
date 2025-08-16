import React from 'react';
import type { ProductFilters } from '../../types/shop';

interface SearchAndFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  translations: {
    searchPlaceholder: string;
    allCategories: string;
    allPrices: string;
    featured: string;
    priceLowToHigh: string;
    priceHighToLow: string;
    highestRated: string;
    newestFirst: string;
    categories: {
      books: string;
      pooja: string;
      idols: string;
      jewelry: string;
      clothing: string;
      home: string;
    };
    priceRanges: {
      under500: string;
      range500to1000: string;
      range1000to2500: string;
      above2500: string;
    };
  };
}

export default function SearchAndFilters({ 
  filters, 
  onFiltersChange, 
  translations 
}: SearchAndFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, priceRange: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sortBy: e.target.value });
  };

  return (
    <section className="py-8 bg-white border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={filters.search || ''}
                onChange={handleSearchChange}
                placeholder={translations.searchPlaceholder}
                className="w-full px-6 py-4 pr-12 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                aria-label="Search products"
              />
              <button
                className="absolute right-3 top-3 text-gray-400 hover:text-orange-500"
                aria-label="Search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={filters.category || 'all'}
              onChange={handleCategoryChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Filter by category"
            >
              <option value="all">{translations.allCategories}</option>
              <option value="books">{translations.categories.books}</option>
              <option value="pooja">{translations.categories.pooja}</option>
              <option value="idols">{translations.categories.idols}</option>
              <option value="jewelry">{translations.categories.jewelry}</option>
              <option value="clothing">{translations.categories.clothing}</option>
              <option value="home">{translations.categories.home}</option>
            </select>

            <select
              value={filters.priceRange || 'all'}
              onChange={handlePriceChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Filter by price"
            >
              <option value="all">{translations.allPrices}</option>
              <option value="0-500">{translations.priceRanges.under500}</option>
              <option value="500-1000">{translations.priceRanges.range500to1000}</option>
              <option value="1000-2500">{translations.priceRanges.range1000to2500}</option>
              <option value="2500+">{translations.priceRanges.above2500}</option>
            </select>

            <select
              value={filters.sortBy || 'featured'}
              onChange={handleSortChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Sort products"
            >
              <option value="featured">{translations.featured}</option>
              <option value="price-low">{translations.priceLowToHigh}</option>
              <option value="price-high">{translations.priceHighToLow}</option>
              <option value="rating">{translations.highestRated}</option>
              <option value="newest">{translations.newestFirst}</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}