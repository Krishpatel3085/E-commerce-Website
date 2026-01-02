import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Checkout: React.FC = () => {
    const { cart, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        clearCart();
        navigate('/order-success');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Billing Details */}
                <div className="lg:col-span-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="First Name" placeholder="John" required />
                            <Input label="Last Name" placeholder="Doe" required />
                            <Input label="Email Address" type="email" placeholder="john@example.com" className="md:col-span-2" required />
                            <Input label="Street Address" placeholder="123 Main St" className="md:col-span-2" required />
                            <Input label="City" placeholder="New York" required />
                            <Input label="ZIP Code" placeholder="10001" required />
                            <Input label="Phone" type="tel" placeholder="+1 234 567 890" required />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6">Shipping Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="shipping" defaultChecked className="w-4 h-4 text-[#0d6efd]" />
                                    <span className="font-medium">Standard Delivery</span>
                                </div>
                                <span className="font-bold">Free</span>
                            </label>
                            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="shipping" className="w-4 h-4 text-[#0d6efd]" />
                                    <span className="font-medium">Express Shipping (2-3 Days)</span>
                                </div>
                                <span className="font-bold">$15.00</span>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-gray-50 p-6 rounded-xl border sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Your Order</h3>
                        <div className="space-y-4 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                    <span className="font-medium">${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 space-y-2 mb-6">
                            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                            <div className="flex justify-between font-black text-lg pt-2 border-t">
                                <span>Total</span><span>${subtotal}</span>
                            </div>
                        </div>
                        <Button type="submit" fullWidth className="py-4">Place Order</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};