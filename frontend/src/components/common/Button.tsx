import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25",
  secondary: "bg-gray-800 text-white hover:bg-gray-900 shadow-lg shadow-gray-800/25",
  outline:
    "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm min-h-[36px]",
  md: "px-5 py-2.5 text-sm min-h-[44px]",
  lg: "px-8 py-3.5 text-base min-h-[48px]",
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
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
