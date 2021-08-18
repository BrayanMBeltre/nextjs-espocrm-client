export function Button({ className, color, children, ...props }) {
  props.className = `${className} flex items-center justify-center px-4 py-2 border-2 border-${
    color || "indigo"
  }-600 rounded-md font-semibold text-${color || "indigo"}-600 hover:bg-${
    color || "indigo"
  }-700 hover:text-${color || "indigo"}-50 transition duration-300 ease-in-out`;

  return <button {...props}>{children}</button>;
}
