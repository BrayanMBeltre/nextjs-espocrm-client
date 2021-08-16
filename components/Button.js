import Link from "next/link";

export default function Button({
  href = "",
  onClick,
  className,
  color,
  children,
}) {
  color ? color : (color = "indigo");
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`${className} flex items-center justify-center px-4 py-2 border-2 border-${color}-600 rounded-md font-semibold text-${color}-600 hover:bg-${color}-700 hover:text-${color}-50 transition duration-300 ease-in-out`}
      >
        {children}
      </a>
    </Link>
  );
}
