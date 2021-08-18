export function Button({ className, color, children, ...props }) {
  color ? color : "indigo";
  props.className = `${className} flex items-center justify-center px-4 py-2 border-2 border-${color}-600 rounded-md font-semibold text-${color}-600 hover:bg-${color}-700 hover:text-${color}-50 transition duration-300 ease-in-out`;

  return <button {...props}>{children}</button>;
}
