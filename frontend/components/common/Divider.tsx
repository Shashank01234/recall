interface DividerProps {
  text?: string;
}

export default function Divider({ text = "OR" }: DividerProps) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="h-px flex-1 bg-gray-300" />

      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
        {text}
      </span>

      <div className="h-px flex-1 bg-gray-300" />
    </div>
  );
}