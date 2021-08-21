import { Button, GlobalFilter, Link, Spinner } from "components";
import { Table } from "components/cases";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { caseService } from "services";

export default function Index() {
  const [cases, setCases] = useState(undefined);
  const [filter, setFilter] = useState("");

  const fetchCases = () => {
    caseService.getAll().then((x) => setCases(x));
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const deleteCase = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await caseService.delete(id);
      toast.success("Case Deleted");
      fetchCases();
    }
  };

  return (
    <div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div className="flex justify-end mt-9 px-8">
        <Link href="cases/create">
          <Button>Create case</Button>
        </Link>
      </div>

      {cases ? (
        <Table data={cases.list} filter={filter} deleteCase={deleteCase} />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
