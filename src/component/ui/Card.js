// components/ui/Card.js
import React from 'react';

export function Card({ children }) {
  return <div className="border rounded-lg shadow-md bg-white">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b bg-[#f5f0e8]">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold text-[#8b4513]">{children}</h3>;
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
