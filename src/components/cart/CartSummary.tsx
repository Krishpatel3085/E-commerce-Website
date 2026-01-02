import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ShieldCheck, Truck } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Estimated Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-bold" : "font-bold text-gray-900"}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax</span>
          <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Apply Coupon</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Code" 
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0d6efd]"
          />
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 mb-8">
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black text-[#0d6efd]">${total.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/checkout">
        <Button fullWidth className="py-4 text-lg shadow-lg shadow-blue-100 mb-4 uppercase tracking-wider">
          Proceed to Checkout
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="space-y-3 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase">
          <ShieldCheck size={16} className="text-green-500" />
          Secure SSL Encryption
        </div>
        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase">
          <Truck size={16} className="text-[#0d6efd]" />
          Free Shipping Over $100
        </div>
      </div>
    </div>
  );
};