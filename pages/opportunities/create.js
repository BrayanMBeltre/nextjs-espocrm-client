const { CreateOrUpdate } = require("components/opportunities");

export default function create() {
  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Create opportunity
      </h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CreateOrUpdate />
        </div>
        <div className="col-span-4 bg-white w-full h-full rounded-md ">
          <div className="flex items-center justify-center h-full">Sidebar</div>
        </div>
      </div>
    </div>
  );
}
