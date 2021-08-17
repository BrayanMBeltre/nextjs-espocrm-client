import { accountService } from "services";

const { CreateOrUpdate } = require("components/accounts");

export default function create({ account }) {
  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Edit account</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CreateOrUpdate account={account} />
        </div>
        <div className="col-span-4 bg-white w-full h-full rounded-md ">
          <div className="flex items-center justify-center h-full">Sidebar</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const account = await accountService.getById(params.id);
  console.log(account);

  return {
    props: { account },
  };
}
