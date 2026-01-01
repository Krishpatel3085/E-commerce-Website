// src/components/ui/Select.js

export function Select({ children }) {
  return <div className="relative">{children}</div>;
}

export function SelectTrigger({ onClick, children }) {
  return (
    <div
      className="w-full border px-4 py-2 cursor-pointer rounded-md text-gray-700 bg-white"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function SelectValue({ value }) {
  return <span>{value || "Select an option"}</span>;
}

export function SelectContent({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg  max-h-40 overflow-y-auto">
    {children}
  </div>
  );
}

export function SelectItem({ value, onSelect }) {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
      onClick={() => onSelect(value)}
    >
      {value}
    </div>
  );
}
