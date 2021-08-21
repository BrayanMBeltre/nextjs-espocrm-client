import { Button, GlobalFilter, Link, Spinner } from "components";
import { Table } from "components/contacts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { contactService } from "services";

export default function Index() {
  const [contacts, setContacts] = useState(undefined);
  const [filter, setFilter] = useState("");

  const fetchContacts = () => {
    contactService.getAll().then((x) => setContacts(x));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await contactService.delete(id);
      toast.success("Contact Deleted");
      fetchContacts();
    }
  };

  return (
    <div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div className="flex justify-end mt-9 px-8">
        <Link href="contacts/create">
          <Button>Create contact</Button>
        </Link>
      </div>
      {contacts ? (
        <Table
          data={contacts.list}
          filter={filter}
          deleteContact={deleteContact}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
