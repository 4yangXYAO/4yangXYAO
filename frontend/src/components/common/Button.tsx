import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-amber text-ink hover:bg-amber-deep",
  secondary: "bg-ink-card text-paper border border-ink-line hover:border-amber/40",
  outline: "border border-amber/60 text-amber hover:bg-amber-soft",
  danger: "bg-red-600/90 text-white hover:bg-red-600",
  ghost: "text-paper-dim hover:text-paper hover:bg-ink-card",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm min-h-[34px]",
  md: "px-5 py-2.5 text-sm min-h-[42px]",
  lg: "px-7 py-3 text-base min-h-[48px]",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium
                  transition-all duration-200 ease-smooth active:scale-[0.98]
                  ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed active:scale-100" : "cursor-pointer"
        } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
