import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
        </div>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email Address" type="email" placeholder="name@company.com" required />
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs text-[#0d6efd] font-bold hover:underline">Forgot?</a>
            </div>
            <Input type="password" placeholder="••••••••" required />
          </div>
          <Button fullWidth className="py-3 shadow-lg shadow-blue-100 mt-4">SIGN IN</Button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-[#0d6efd] font-bold hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
};