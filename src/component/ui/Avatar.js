// components/ui/Avatar.js
import React from 'react';

export function Avatar({ className, children }) {
    return <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>;
}

export function AvatarImage({ src, alt }) {
    return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

export function AvatarFallback({ children }) {
    return <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-semibold">{children}</div>;
}
