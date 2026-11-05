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

  // Size variations - corner radii 4px to 6px (nearly square), no scale bounce
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-[4px]",
    md: "px-4 py-2.5 text-xs gap-2 rounded-[6px]",
    lg: "px-5 py-3 text-sm gap-2 rounded-[6px]",
  }[size];

  // Variant styling - bone on oxblood, stone borders, tone-shift only
  const variantClasses = {
    solid:
      "bg-accent text-bg hover:bg-accent-hover border border-accent transition-colors duration-150 shadow-warm-sm",
    outline:
      "bg-surface text-ink border border-border hover:bg-bg transition-colors duration-150",
    champagne:
      "bg-surface text-ink border border-border hover:bg-bg transition-colors duration-150",
    ghost:
      "bg-transparent text-muted hover:text-ink hover:bg-surface transition-colors duration-150",
  }[variant];

  const disabledClasses =
    "bg-bg text-muted border border-border cursor-not-allowed shadow-none hover:bg-bg";

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`relative inline-flex items-center justify-center font-sans font-semibold tracking-wider uppercase transition-colors duration-150 select-none focus:outline-none ${sizeClasses} ${
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
