import axios from "axios";
import { useEffect, useMemo } from "react";
import { FaEdit, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

export default function AccountTable2({
  data,
  filter,
  deleteAccount,
  setAccountToEdit,
  setModalIsOpen,
}) {
  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Website",
      accessor: "website",
      Cell: ({ value }) => {
        return (
          <a href={value} className="text-blue-700 ">
            {value}
          </a>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => (
        <div className="text-xs">
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {value}
          </span>
        </div>
      ),
    },
    {
      Header: "Country",
      accessor: "billingAddressCountry",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex place-content-around">
          <button
            onClick={() => {
              setAccountToEdit(row.original);
              setModalIsOpen(true);
            }}
          >
            <FaEdit className=" w-4 h-4" />
          </button>
          <button
            onClick={() => {
              deleteAccount(row.original.id);
            }}
          >
            <FaTrash className=" w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  useEffect(() => {
    setGlobalFilter(filter);
  }, [filter, setGlobalFilter]);

  return (
    <div className="container mx-auto p-8 w-full mb-8 overflow-hidden rounded-lg">
      <div className="w-full overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup}
                {...headerGroup.getHeaderGroupProps()}
                className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="w-4 h-4" />
                          ) : (
                            <FaSortUp className="w-4 h-4" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row} {...row.getRowProps()} className="text-gray-700">
                  {row.cells.map((cell) => (
                    <td
                      key={cell}
                      {...cell.getCellProps()}
                      className="px-4 py-3 border"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
