import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean
}

const variantStyles = {
  filled: "bg-accent hover:bg-white text-white hover:text-accent border-2 border-transparent hover:border-accent transition-all",
  outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors",
};

const sizeStyles = {
  sm: "px-2.5 py-1.25 text-sm rounded-xl",
  md: "px-4 py-2 rounded-xl",
  lg: "px-6 py-3 rounded-xl",
};

export default function Button({ children, onClick, variant = "filled", size = "md", className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}