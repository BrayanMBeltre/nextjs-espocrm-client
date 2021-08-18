import { Button, GlobalFilter, Link, Spinner } from "components";
import { Table } from "components/opportunities";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { opportunityService } from "services";

export default function Index() {
  const [opportunities, setOpportunities] = useState(undefined);
  const [filter, setFilter] = useState("");

  const fetchOpportunities = () => {
    opportunityService.getAll().then((x) => setOpportunities(x));
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const deleteOpportunity = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await opportunityService.delete(id);
      toast.success("Opportunity Deleted");
      fetchOpportunities();
    }
  };

  return (
    <div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div className="flex justify-end mt-9 px-8">
        <Link href="opportunities/create">
          <Button>Create opportunity</Button>
        </Link>
      </div>

      {opportunities ? (
        <Table
          data={opportunities.list}
          filter={filter}
          setFilter={setFilter}
          deleteOpportunity={deleteOpportunity}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
