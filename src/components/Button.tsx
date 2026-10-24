"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "solid" | "outline" | "ghost" | "champagne";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "right",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Size variations
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-4 py-2.5 text-xs gap-2 rounded-xl",
    lg: "px-5 py-3.5 text-sm gap-2 rounded-xl",
  }[size];

  // Variant styling
  const variantClasses = {
    solid:
      "bg-[#7A6A2E] text-white hover:bg-[#655724] active:bg-[#54481D] shadow-sm hover:shadow-warm-sm border border-[#655724]",
    outline:
      "bg-white text-[#7A6A2E] border border-[#7A6A2E] hover:bg-[#F5EEDB] active:bg-[#E8DFBE] shadow-xs",
    champagne:
      "bg-[#F5EEDB] text-[#7A6A2E] border border-[#DFD5B0] hover:bg-[#E8DFBE] active:bg-[#DFD5B0] shadow-xs",
    ghost:
      "bg-transparent text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5EEDB]/60 active:bg-[#F5EEDB]",
  }[variant];

  const disabledClasses =
    "bg-[#E8E6DF] text-[#8C867A] border border-[#D5D2C7] cursor-not-allowed shadow-none active:scale-100 hover:bg-[#E8E6DF]";

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`relative inline-flex items-center justify-center font-sans font-semibold tracking-wider uppercase transition-all duration-150 select-none focus:outline-none active:scale-[0.98] ${sizeClasses} ${
        isDisabled ? disabledClasses : variantClasses
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
