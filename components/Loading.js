export default function Loading({ className, size = "16", color = "indigo" }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className={`${className} w-${size} h-${size} border-4 border-${color}-600 border-solid rounded-full animate-spin`}
      />
    </div>
  );
}
