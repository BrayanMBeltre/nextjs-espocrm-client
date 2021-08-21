import { Button, GlobalFilter, Link, Spinner } from "components";
import { Table } from "components/accounts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { accountService } from "services";

export default function Index() {
  const [accounts, setAccounts] = useState(undefined);
  const [filter, setFilter] = useState("");

  const fetchAccounts = () => {
    accountService.getAll().then((x) => setAccounts(x));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const deleteAccount = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await accountService.delete(id);
      toast.success("Account Deleted");
      fetchAccounts();
    }
  };

  return (
    <div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <div className="flex justify-end mt-9 px-8">
        <Link href="accounts/create">
          <Button>Create account</Button>
        </Link>
      </div>

      {accounts ? (
        <Table
          data={accounts.list}
          filter={filter}
          deleteAccount={deleteAccount}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
