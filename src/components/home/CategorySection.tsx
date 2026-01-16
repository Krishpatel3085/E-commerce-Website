import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useFilters } from '../../contexts/FilterContext';

// Mock Data within the component or imported from data/
const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300', count: 120 },
  { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300', count: 450 },
  { id: 3, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', count: 85 },
  { id: 4, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513507766391-aa3a70359f4a?w=300', count: 210 },
  { id: 5, name: 'Gadgets', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300', count: 95 },
  { id: 6, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300', count: 150 },
];

export const CategorySection: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, setSearchQuery } = useFilters();

  const handleCategoryClick = (categoryName: string) => {
    // Reset search query and set category to ensure correct filtering
    setSearchQuery('');
    setSelectedCategory(categoryName);
    navigate('/categories');
    window.scrollTo(0, 0); // Scroll to top for better UX
  };

  return (
    <section className="container mx-auto px-4">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
          <div className="h-1.5 w-12 bg-[#0d6efd] mt-2 rounded-full"></div>
        </div>
        <button 
          onClick={() => navigate('/categories')}
          className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0d6efd] transition-colors"
        >
          EXPLORE ALL <ChevronRight size={16} />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group cursor-pointer flex flex-col items-center"
          >
            {/* Round Image Container */}
            <div className="relative w-full aspect-square mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#0d6efd] group-hover:scale-110 transition-all duration-500 z-10"></div>
              <div className="w-full h-full rounded-full overflow-hidden shadow-card group-hover:shadow-xl transition-shadow duration-500 bg-gray-100">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-in-out" 
                />
              </div>
              {/* Badge for Product Count */}
              <div className="absolute -bottom-1 right-2 bg-white px-2 py-1 rounded-full shadow-md border border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <p className="text-[10px] font-black text-[#0d6efd]">{cat.count}</p>
              </div>
            </div>

            {/* Category Labels */}
            <h3 className="font-bold text-gray-800 text-center group-hover:text-[#0d6efd] transition-colors duration-300">
              {cat.name}
            </h3>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Browse
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};