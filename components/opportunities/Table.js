import { Link } from "components/Link";
import { useEffect, useMemo } from "react";
import { FaEdit, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

export function Table({ data, filter, deleteOpportunity }) {
  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Account",
      accessor: "accountName",
    },
    {
      Header: "Stage",
      accessor: "stage",
      Cell: function tableStage({ value }) {
        let color = "indigo";

        value === "Prospecting" ? (color = "green") : "";
        value === "Qualification" ? (color = "pink") : "";
        value === "Proposal" ? (color = "yellow") : "";
        value === "Negotiation" ? (color = "indigo") : "";
        value === "Closed Won" ? (color = "blue") : "";
        value === "Closed Lost" ? (color = "red") : "";

        return (
          <div className="text-xs">
            <span
              className={`px-2 py-1 font-semibold leading-tight text-${color}-700 bg-${color}-100 rounded-sm`}
            >
              {value}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Assigned User",
      accessor: "assignedUserId",
    },
    {
      Header: "Close Date",
      accessor: "closeDate",
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: function tableAmount({ value }) {
        return <div>${value}</div>;
      },
    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: function tableId({ value }) {
        return (
          <div className="flex place-content-around">
            <Link href={`opportunities/edit/${value}`}>
              <FaEdit className=" w-4 h-4 hover:text-yellow-600 transition-all duration-200" />
            </Link>
            <button
              onClick={() => {
                deleteOpportunity(value);
              }}
            >
              <FaTrash className=" w-4 h-4 hover:text-red-600 transition-all duration-200" />
            </button>
          </div>
        );
      },
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
