import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrderComplete: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
                <CheckCircle size={40} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-10 max-w-md mx-auto">
                Your order has been placed successfully. We'll send you a confirmation email with tracking details shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Button>Download Invoice</Button>
            </div>
        </div>
    );
};