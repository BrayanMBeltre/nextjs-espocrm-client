import { Button, GlobalFilter, Link, Spinner } from "components";
import { Table } from "components/leads";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { leadService } from "services";

export default function Index() {
  const [leads, setLeads] = useState(undefined);
  const [filter, setFilter] = useState("");

  const fetchLeads = () => {
    leadService.getAll().then((x) => setLeads(x));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await leadService.delete(id);
      toast.success("Lead Deleted");
      fetchLeads();
    }
  };

  return (
    <div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div className="flex justify-end mt-9 px-8">
        <Link href="leads/create">
          <Button>Create lead</Button>
        </Link>
      </div>

      {leads ? (
        <Table
          data={leads.list}
          filter={filter}
          setFilter={setFilter}
          deleteLead={deleteLead}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
