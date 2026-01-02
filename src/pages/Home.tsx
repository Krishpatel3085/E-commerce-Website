import React from 'react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { products } from '../data/products';
import { ArrowRight, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { FlashDeals } from '../components/product/FlashDeals';

export const Home: React.FC = () => {
    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <section className="relative bg-[#f0f4f8] h-[500px] flex items-center overflow-hidden">
                <div className="container mx-auto px-4 z-10">
                    <div className="max-w-xl">
                        <span className="text-[#0d6efd] font-bold tracking-widest uppercase mb-4 block">Limited Edition Collection</span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
                            SUMMER SALE <br /><span className="text-[#0d6efd]">70% OFF</span>
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">Discover the latest trends in high-performance electronics and premium accessories with exclusive discounts.</p>
                        <Button className="px-10 py-4 text-lg">Shop Now</Button>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 h-full w-1/2 hidden md:block">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" className="object-cover h-full w-full" alt="Hero" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f0f4f8] to-transparent"></div>
                </div>
            </section>
            <FlashDeals />
            {/* Feature Icons */}
            <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <Truck />, title: "Free Shipping", desc: "On all orders over $99" },
                    { icon: <ShieldCheck />, title: "Secure Payment", desc: "100% secure payment processing" },
                    { icon: <Headphones />, title: "24/7 Support", desc: "Contact us anytime you need" },
                ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 bg-white border rounded-xl">
                        <div className="text-[#0d6efd]">{feat.icon}</div>
                        <div>
                            <h4 className="font-bold">{feat.title}</h4>
                            <p className="text-sm text-gray-500">{feat.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <div className="h-1 w-20 bg-[#0d6efd] mt-2"></div>
                    </div>
                    <button className="flex items-center gap-2 text-[#0d6efd] font-bold hover:underline">
                        View All <ArrowRight size={18} />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};