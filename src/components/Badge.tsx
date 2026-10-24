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
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]";

  const variantClasses = {
    gold: "bg-[#7A6A2E] text-white border border-[#655724]",
    champagne: "bg-[#F5EEDB] text-[#7A6A2E] border border-[#E8DFBE]",
    outline: "bg-white text-[#57534E] border border-[#E8E6DF]",
    dark: "bg-[#1C1917] text-[#F5EEDB] border border-[#292524]",
    success: "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
    warning: "bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans font-bold tracking-wider uppercase rounded-md shadow-2xs select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
