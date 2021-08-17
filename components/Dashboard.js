import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "utils/fetcher";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export function Dashboard() {
  let data;
  const { data: accounts } = useSWR(
    "http://localhost:3000/api/espocrm/Account",
    fetcher
  );
  const { data: contacts } = useSWR(
    "http://localhost:3000/api/espocrm/Contact",
    fetcher
  );
  const { data: leads } = useSWR(
    "http://localhost:3000/api/espocrm/Lead",
    fetcher
  );
  const { data: opportunities } = useSWR(
    "http://localhost:3000/api/espocrm/Opportunity",
    fetcher
  );
  const { data: cases } = useSWR(
    "http://localhost:3000/api/espocrm/Case",
    fetcher
  );

  if (accounts && contacts && leads && opportunities && cases) {
    const totalCount = [
      accounts.total,
      contacts.total,
      leads.total,
      opportunities.total,
      cases.total,
    ];

    data = {
      labels: ["Account", "Contact", "Leads", "Opportunities", "Cases"],
      datasets: [
        {
          data: totalCount,
          label: "Count",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
