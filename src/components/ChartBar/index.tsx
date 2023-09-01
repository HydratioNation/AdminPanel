import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { getStatsList } from "@/lib/api";

interface Information {
  sales: number;
}

interface Dates {
  Month: string;
  finalDate: string;
}

const BarChart = () => {
  const [options, setOptions] = useState();
  const [dataOption, setDataOptions] = useState();

  const DataArr = () => {
    let nar: number[] = [];
    data?.map((e) => {
      if (e.sales !== null) nar.push(e.sales);
      else nar.push(0);
    });
    return nar;
  };

  const DatesArr = () => {
    let nar: string[] = [];
    dates?.map((e) => {
      if (e.Month) nar.push(e.Month);
      else nar.push("");
    });
    return nar;
  };

  const [data, setData] = useState<Information[]>();
  const [dates, setDates] = useState<Dates[]>();

  useEffect(() => {
    const getList1 = async () => {
      try {
        await getStatsList()
          .then((res) => res.json())
          .then((json) => {
            setData(json.data);
            setDates(json.dates);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getList1();
  }, []);

  const dataInfo = () => {
    return {
      labels: DatesArr(),
      datasets: [
        {
          label: "Sales $",
          data: DataArr(),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    };
  };

  const OptionsSet = () => {
    const data = {
      labels: DatesArr(),
      datasets: [
        {
          label: "Sales $",
          data: DataArr(),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    };

    const set = {
      plugins: {
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    };
    return <Bar data={dataInfo()} options={set} />;
  };

  useEffect(() => {
    dataInfo();
  }, [data, dates]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        {data && dates && dates.length > 0 ? OptionsSet() : ""}
      </div>
    </>
  );
};

export default BarChart;
