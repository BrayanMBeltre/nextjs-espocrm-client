export function Badge({ title, qty, Icon }) {
  return (
    <div className="grid items-center justify-center p-4 bg-white rounded-xl shadow-lg">
      <Icon className="w-16 h-16" />
      <h1 className="text-2xl font-bold">{qty}</h1>
    </div>
  );
}
