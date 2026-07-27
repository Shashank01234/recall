type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function Spinner({
  size = 20,
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`
        inline-block
        animate-spin
        rounded-full
        border-2
        border-gray-300
        border-t-blue-600

        dark:border-slate-700
        dark:border-t-blue-500

        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}