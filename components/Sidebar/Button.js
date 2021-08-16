import Link from "next/link";
import React from "react";

export default function Button({
  href = "",
  onClick,
  className,
  Icon,
  active,
  text,
}) {
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`${className} ${
          active ? "text-indigo-600" : "text-gray-900 hover:text-indigo-600"
        } flex items-center text-sm font-semibold transition-all duration-200`}
      >
        <Icon
          className={`h-5 w-5 mr-4 ${
            active ? "text-indigo-600" : "text-gray-500"
          }`}
        />
        {text}
      </a>
    </Link>
  );
}
