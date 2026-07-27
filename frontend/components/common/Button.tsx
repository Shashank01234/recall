import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "border border-gray-300 bg-white text-slate-900 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && <Spinner size={18} />}

      {children}
    </button>
  );
}