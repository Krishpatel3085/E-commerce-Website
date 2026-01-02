import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-bold text-gray-900 hover:text-[#0d6efd] transition-colors cursor-pointer">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">Category: {item.category}</p>
        <div className="mt-2 sm:hidden font-bold text-[#0d6efd]">${item.price}</div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="hidden sm:block w-24 text-right">
        <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      {/* Remove Button */}
      <button 
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
      >
        <X size={20} />
      </button>
    </div>
  );
};