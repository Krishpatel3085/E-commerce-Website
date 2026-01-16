import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService'; 
import { useCart } from '../contexts/CartContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/ui/Button';
import { Truck, RefreshCw, ShieldCheck, Loader2, Check } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  // State for selections
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const response: any = await productService.getProductById(id);
          const data = response.data[0] || response.data; // Handles array or object response
          setProduct(data);
          
          if (data.variants?.length > 0) {
            setSelectedVariantIndex(0);
            // Default to the first available size of the first variant
            setSelectedSize(data.variants[0].size[0]?.size || '');
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Derived State: Current Variant Object
  const currentVariant = useMemo(() => {
    return product?.variants?.[selectedVariantIndex] || null;
  }, [product, selectedVariantIndex]);

  // Derived State: Gallery Images (Specific to the chosen color)
  const galleryImages = useMemo(() => {
    if (!currentVariant?.images) return ['/placeholder.png'];
    // Map the array of image objects to just the URL strings
    return currentVariant.images.map((img: any) => img.url);
  }, [currentVariant]);

  // Handle color change: Also reset size to the first available size of that new color
  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
    const newVariant = product.variants[index];
    if (newVariant?.size?.length > 0) {
      setSelectedSize(newVariant.size[0].size);
    }
  };

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <Loader2 className="animate-spin text-[#0d6efd]" size={48} />
    </div>
  );

  if (!product) return <div className="text-center py-20 font-bold">Product not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT: IMAGE GALLERY */}
            <div className="space-y-4">
              <ProductGallery 
                key={currentVariant?._id} // Key forces re-render when variant changes
                images={galleryImages} 
              />
            </div>

            {/* RIGHT: CONTENT */}
            <div className="flex flex-col">
              <div className="mb-6 border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#0d6efd] font-bold text-xs uppercase tracking-widest mb-1">
                      {product.category}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                      {product.productName}
                    </h1>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {product.isActive ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <RatingStars rating={product.rating} reviews={product.reviews} />
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="text-sm text-gray-500 font-medium">{product.reviews} Reviews</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-[#0d6efd]">${product.discountPrice || product.price}</span>
                  {product.discountPrice && (
                    <span className="text-xl text-gray-400 line-through">${product.price}</span>
                  )}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              <div className="space-y-8 mb-8">
                {/* COLOR SELECTOR */}
                <div>
                  <div className="flex justify-between mb-3">
                    <h4 className="text-sm font-bold uppercase">Color</h4>
                    <span className="text-sm font-bold text-gray-900">{currentVariant?.color}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.variants?.map((variant: any, idx: number) => (
                      <button
                        key={variant._id || idx}
                        onClick={() => handleVariantChange(idx)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all shadow-sm
                          ${selectedVariantIndex === idx ? 'border-[#0d6efd] ring-2 ring-blue-100 scale-110' : 'border-gray-200'}`}
                        style={{ backgroundColor: variant.colorCode }}
                        title={variant.color}
                      >
                        {selectedVariantIndex === idx && (
                          <Check size={14} className={variant.colorCode === '#ffffff' ? 'text-black mx-auto' : 'text-white mx-auto'} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIZE SELECTOR */}
                <div>
                  <div className="flex justify-between mb-3">
                    <h4 className="text-sm font-bold uppercase">Size</h4>
                    <button className="text-xs font-bold text-[#0d6efd] underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentVariant?.size.map((s: any) => (
                      <button
                        key={s._id || s.size}
                        disabled={s.stock === 0}
                        onClick={() => setSelectedSize(s.size)}
                        className={`h-11 min-w-[3.5rem] px-4 rounded-xl border-2 font-bold text-sm transition-all
                          ${s.stock === 0 ? 'opacity-30 cursor-not-allowed bg-gray-100 border-gray-200' : ''}
                          ${selectedSize === s.size 
                            ? 'border-[#0d6efd] text-[#0d6efd] bg-blue-50' 
                            : 'border-gray-100 text-gray-600 hover:border-gray-300'}`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUANTITY & ADD TO CART */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl h-14 bg-gray-50 p-1">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q-1))} 
                      className="w-12 h-full flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-colors"
                    >-</button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q+1)} 
                      className="w-12 h-full flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-colors"
                    >+</button>
                  </div>
                  <Button 
                    onClick={() => addToCart({ ...product, selectedVariant: currentVariant, selectedSize }, quantity)}
                    className="flex-1 h-14 text-lg font-bold bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                    disabled={!product.isActive || currentVariant?.size.find((s:any) => s.size === selectedSize)?.stock === 0}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0d6efd]"><Truck size={20}/></div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0d6efd]"><RefreshCw size={20}/></div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">30 Day Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0d6efd]"><ShieldCheck size={20}/></div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">Safe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};