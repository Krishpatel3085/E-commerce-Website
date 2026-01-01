// src/components/ui/Dialog.js
import React from "react";
import ReactDOM from "react-dom";

// Main Dialog component
export function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg z-10">
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
}

// DialogHeader component
export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

// DialogTitle component
export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

// DialogContent component
export function DialogContent({ children }) {
  return <div className="mt-4">{children}</div>;
}
