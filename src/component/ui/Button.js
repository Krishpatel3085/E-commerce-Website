// components/ui/Button.js
import React from 'react';
import clsx from 'clsx';

export function Button({ variant = 'primary', size = 'medium', children, className, ...props }) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium';
    const sizeStyles = size === 'icon' ? 'p-2' : 'px-4 py-2';
    const variantStyles =
        variant === 'ghost' ? 'bg-transparent hover:bg-gray-100' : 'bg-[#d2691e] text-white hover:bg-[#8b4513]';

    return (
        <button className={clsx(baseStyles, sizeStyles, variantStyles, className)} {...props}>
            {children}
        </button>
    );
}
