import { ButtonHTMLAttributes } from "react";

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
  ...props
}: ButtonProps) {
  const baseStyle =
    "rounded-lg px-4 py-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ease-in-out hover:-translate-y-1 hover:scale-110";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] hover:bg-indigo-500",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}