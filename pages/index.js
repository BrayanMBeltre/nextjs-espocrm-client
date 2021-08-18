import { Dashboard } from "components";

export default function Home() {
  return (
    <div className="container mx-auto p-8 w-full mb-8 overflow-hidden rounded-lg">
      <div>
        <h4 className="text-sm font-bold text-indigo-600">
          Hi Sierra Ferguson,
        </h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">
          Welcome to EspoCRM!
        </h1>
      </div>

      <div className="p-4">
        <Dashboard />
      </div>
    </div>
  );
}
