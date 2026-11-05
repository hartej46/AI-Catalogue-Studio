"use client";

import React from "react";

export type BadgeVariant =
  | "gold"
  | "champagne"
  | "outline"
  | "dark"
  | "success"
  | "warning";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "champagne",
  children,
  icon,
  size = "md",
  className = "",
}) => {
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]";

  // Restrained tokens: flat parchment surfaces, hairline stone borders, subtle ink/muted/accent
  const variantClasses = {
    gold: "bg-surface text-ink border border-brass",
    champagne: "bg-surface text-ink border border-border",
    outline: "bg-transparent text-muted border border-border",
    dark: "bg-ink text-bg border border-ink",
    success: "bg-surface text-ink border border-border",
    warning: "bg-surface text-ink border border-brass",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans font-semibold tracking-wider uppercase rounded-[4px] select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
