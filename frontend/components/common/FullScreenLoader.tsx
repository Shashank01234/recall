import Spinner from "./Spinner";

interface FullScreenLoaderProps {
  text: string;
}

export default function FullScreenLoader({
  text,
}: FullScreenLoaderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={40} />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {text}
        </p>
      </div>
    </main>
  );
}