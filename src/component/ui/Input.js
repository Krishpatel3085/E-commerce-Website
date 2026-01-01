// components/ui/Input.js
import React from 'react';

export function Input({ className, ...props }) {
    return (
        <input
            className={`border border-[#d2691e] rounded-md p-2 focus:ring-2 focus:ring-[#8b4513] ${className}`}
            {...props}
        />
    );
}
