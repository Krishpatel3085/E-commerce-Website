import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Register: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2">Join the NexusStore community today</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" required />
            <Input label="Last Name" placeholder="Doe" required />
          </div>
          <Input label="Email" type="email" placeholder="john@example.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          <div className="flex items-start gap-2 py-2">
            <input type="checkbox" className="mt-1 rounded text-[#0d6efd]" required />
            <span className="text-xs text-gray-500">I agree to the Terms of Service and Privacy Policy.</span>
          </div>
          <Button fullWidth className="py-3 mt-2">REGISTER NOW</Button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-600">
          Already a member? <Link to="/login" className="text-[#0d6efd] font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};