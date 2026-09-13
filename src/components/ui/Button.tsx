"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "brand";
type Size = "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-300",
  secondary:
    "border border-surface-border bg-white text-ink hover:bg-surface-muted focus-visible:ring-brand-200",
  ghost:
    "bg-transparent text-ink-muted hover:bg-surface-muted hover:text-ink focus-visible:ring-brand-200",
  danger:
    "bg-red-500/90 text-white hover:bg-red-500 focus-visible:ring-red-300",
  brand:
    "bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-500",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-lg rounded-kiosk",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "lg", loading, className = "", children, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        ].join(" ")}
        {...rest}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
