import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  accountService,
  caseService,
  contactService,
  leadService,
  opportunityService,
} from "services";

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
  const [totalCount, setTotalCount] = useState([0, 0, 0, 0, 0]);

  const getCounts = async () => {
    const accountsCount = await accountService.count();
    const contactsCount = await contactService.count();
    const leadsCount = await leadService.count();
    const opportunitiesCount = await opportunityService.count();
    const casesCount = await caseService.count();

    setTotalCount([
      accountsCount,
      contactsCount,
      leadsCount,
      opportunitiesCount,
      casesCount,
    ]);
  };

  useEffect(() => {
    getCounts();
  }, []);

  let data = {
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

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
