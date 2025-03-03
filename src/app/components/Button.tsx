import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded-md"
    >
      {children}
    </button>
  );
}