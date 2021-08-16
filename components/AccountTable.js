import axios from "axios";
import { useState } from "react";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import AccountForm from "./AccountForm";
import Modal from "./Modal";
import Link from "next/link";
export default function Table({ data }) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  console.log(data);
  return (
    <section className="container mx-auto p-8 font-mono">
      <Modal isOpen={modalIsOpen} setIsOpen={setmodalIsOpen} title="Account">
        <AccountForm editingData={edit} />
      </Modal>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Web Site</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((item) => (
                <tr key={item.id} className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <FaUserCircle className=" w-8 h-8 mr-3 rounded-full " />
                      <p className=" text-black">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {item.website}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.billingAddressCountry}
                  </td>
                  <td className="px-4 py-3 text-sm border align-items-center">
                    <div className="flex place-content-around">
                      <button
                        onClick={() => {
                          setEdit(item);
                          setmodalIsOpen(true);
                        }}
                      >
                        <FaEdit className=" w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          const { data } = await axios.delete(
                            `/api/espocrm/Account/${item.id}`
                          );

                          console.log(data);
                        }}
                      >
                        <FaTrash className=" w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
