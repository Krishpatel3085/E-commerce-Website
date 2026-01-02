import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/ui/Button';
import { Heart, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  // Find product by ID from mock data
  const product = products.find(p => p.id === Number(id)) || products[0];

  // Mock additional images for gallery
  const galleryImages = [product.image, product.image, product.image];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Image Gallery */}
          <ProductGallery images={galleryImages} />

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 border-b pb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <RatingStars rating={product.rating} reviews={product.reviews} />
                <span className="h-4 w-[1px] bg-gray-300"></span>
                <span className="text-sm font-bold text-green-600 uppercase tracking-tighter">In Stock</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#0d6efd]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-lg">
                {product.description}
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              {/* Size Selector */}
              <div>
                <h4 className="text-sm font-bold uppercase mb-3">Select Size: {selectedSize}</h4>
                <div className="flex gap-3">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 rounded-lg border-2 font-bold transition-all
                        ${selectedSize === size ? 'border-[#0d6efd] text-[#0d6efd] bg-blue-50' : 'border-gray-100 text-gray-600 hover:border-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border-2 border-gray-100 rounded-xl h-14 bg-gray-50">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-5 h-full hover:text-[#0d6efd] font-bold text-xl">-</button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="px-5 h-full hover:text-[#0d6efd] font-bold text-xl">+</button>
                </div>
                <Button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-14 text-lg shadow-lg shadow-blue-100"
                >
                  ADD TO CART
                </Button>
                <button className="h-14 w-14 flex items-center justify-center border-2 border-gray-100 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-[#0d6efd]" />
                <span className="text-xs font-bold text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="text-[#0d6efd]" />
                <span className="text-xs font-bold text-gray-700">30 Day Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#0d6efd]" />
                <span className="text-xs font-bold text-gray-700">Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs (Description/Reviews) */}
        <div className="mt-20">
          <div className="flex gap-10 border-b">
            <button className="pb-4 border-b-2 border-[#0d6efd] font-bold text-sm uppercase tracking-widest">Description</button>
            <button className="pb-4 text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-gray-600">Reviews ({product.reviews})</button>
            <button className="pb-4 text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-gray-600">Shipping Policy</button>
          </div>
          <div className="py-8 text-gray-600 leading-loose max-w-4xl">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac ante eu eros viverra porta. 
              Maecenas ut justo lectus. Cras varius, nulla at tincidunt venenatis, justo odio sodales ante.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>High-quality materials sourced sustainably.</li>
              <li>Engineered for maximum comfort and long-lasting durability.</li>
              <li>Sleek, modern design that fits any aesthetic.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};