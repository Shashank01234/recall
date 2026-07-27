interface DividerProps {
  text?: string;
}

export default function Divider({
  text = "OR",
}: DividerProps) {
  return (
    <div className="my-6 flex items-center gap-4">

      <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

      <span className="whitespace-nowrap text-sm font-medium text-gray-500 dark:text-slate-400">
        {text}
      </span>

      <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

    </div>
  );
}