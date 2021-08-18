import { caseService } from "services";

const { CreateOrUpdate } = require("components/cases");

export default function create({ _case }) {
  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Edit case</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CreateOrUpdate _case={_case} />
        </div>
        <div className="col-span-4 bg-white w-full h-full rounded-md ">
          <div className="flex items-center justify-center h-full">Sidebar</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const _case = await caseService.getById(params.id);

  return {
    props: { _case },
  };
}
