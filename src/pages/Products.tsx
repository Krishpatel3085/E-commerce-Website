import React from 'react';
import { useFilters } from '../contexts/FilterContext';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';

export const Products: React.FC = () => {
  const { filteredProducts, searchQuery } = useFilters();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <ProductFilters />
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="mb-8 border-b pb-6">
            <h1 className="text-3xl font-black text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'Our Collection'}
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              Found {filteredProducts.length} items
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-3xl">
              <h3 className="text-xl font-bold text-gray-400">No products found matching your filters.</h3>
              <button onClick={() => window.location.reload()} className="mt-4 text-[#0d6efd] font-bold">Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};