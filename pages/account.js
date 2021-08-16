import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";
import AccountForm from "../components/AccountForm";
import AccountForm2 from "../components/AccountForm2";
import AccountTable from "../components/AccountTable";
import AccountTable2 from "../components/AccountTable2";
import Button from "../components/Button";
import ConfirmWindows from "../components/ConfirmWindows";
import Error from "../components/Error";
import GlobalFilter from "../components/GlobalFilter";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import fetcher from "../utils/fetcher";

export default function Account() {
  const { data, error, revalidate } = useSWR("/api/espocrm/Account", fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(undefined);
  const [filter, setFilter] = useState("");

  const createAccount = async (payload) => {
    try {
      setIsLoading(true);

      await axios.post("/api/espocrm/Account", payload);

      revalidate();
      setIsLoading(false);
      toast.success("Account Created!");
      setModalIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const editAccount = async (id, payload) => {
    try {
      setIsLoading(true);

      await axios.put(`/api/espocrm/Account/${id}`, payload);

      revalidate();
      setIsLoading(false);
      toast.success("Account Updated!");
      setModalIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const deleteAccount = async (id) => {
    const confirmDelete = confirm(`Delete ${id}?`);

    if (confirmDelete === true) {
      await axios.delete(`/api/espocrm/Account/${id}`);
      toast.success("Account Deleted", {
        closeOnClick: false,
        autoClose: false,
      });
      revalidate();
    }
  };

  return (
    <div>
      <ToastContainer />

      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <AccountForm2
          setAccountToEdit={setAccountToEdit}
          accountToEdit={accountToEdit}
          editAccount={editAccount}
          createAccount={createAccount}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          title="Create Account"
        />
      </Modal>

      <GlobalFilter filter={filter} setFilter={setFilter} />

      <div className="flex justify-end mt-9 px-8">
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          Add account
        </Button>
      </div>

      {error ? (
        <Error />
      ) : !data ? (
        <Loading />
      ) : (
        <div>
          <AccountTable2
            data={data.list}
            filter={filter}
            setFilter={setFilter}
            deleteAccount={deleteAccount}
            isLoading={isLoading}
            setAccountToEdit={setAccountToEdit}
            setModalIsOpen={setModalIsOpen}
          />
          <AccountTable data={data.list} />
        </div>
      )}
    </div>
  );
}
