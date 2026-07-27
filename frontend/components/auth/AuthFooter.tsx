import Link from "next/link";

type AuthFooterProps = {
  text: string;
  linkText: string;
  href: string;
};

export default function AuthFooter({
  text,
  linkText,
  href,
}: AuthFooterProps) {
  return (
    <p className="text-center text-sm text-gray-500">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-blue-600 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}