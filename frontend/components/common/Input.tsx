import React from "react";

interface InputProps {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
}: InputProps) {
  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-3
          text-sm
          transition-all
          duration-200
          outline-none

          bg-white
          text-slate-900
          border-gray-300

          hover:border-gray-400

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-200

          dark:bg-slate-900
          dark:text-white
          dark:border-slate-700
          dark:hover:border-slate-500
          dark:focus:border-blue-500
          dark:focus:ring-blue-500/20

          disabled:opacity-50
          disabled:cursor-not-allowed

          ${error ? "border-red-500 focus:ring-red-200" : ""}

          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}