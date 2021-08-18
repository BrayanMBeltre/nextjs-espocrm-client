import { contactService } from "services";

const { CreateOrUpdate } = require("components/contacts");

export default function create({ contact }) {
  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Edit contact</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CreateOrUpdate contact={contact} />
        </div>
        <div className="col-span-4 bg-white w-full h-full rounded-md ">
          <div className="flex items-center justify-center h-full">Sidebar</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const contact = await contactService.getById(params.id);

  return {
    props: { contact },
  };
}
