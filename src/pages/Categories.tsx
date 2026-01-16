import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../contexts/FilterContext';
import { categories } from '../data/categories';
import { ChevronRight } from 'lucide-react';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, setSearchQuery } = useFilters();

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery('');
    setSelectedCategory(categoryName);
    navigate('/products');
  };

  return (
    <div className="bg-gray-50  py-6">
 

      {/* Categories Grid */}
      <div className="container mx-auto  px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                    <p className="text-sm font-medium opacity-80">{cat.count} Products Available</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full group-hover:bg-[#0d6efd] transition-colors">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};