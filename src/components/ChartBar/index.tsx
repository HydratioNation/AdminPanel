// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { getStatsList } from "@/lib/api";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface Information {
//   sales: number;
// }

// interface Dates {
//   Month: string;
//   finalDate: string;
// }

// const BarChart = () => {
//   const DataArr = () => {
//     let nar: number[] = [];
//     data?.reverse().map((e) => {
//       if (e.sales !== null) nar.push(e.sales);
//       else nar.push(0);
//     });
//     return nar;
//   };

//   const DatesArr = () => {
//     let nar: string[] = [];
//     dates?.reverse().map((e) => {
//       if (e.Month) nar.push(e.Month);
//       else nar.push("");
//     });
//     return nar;
//   };

//   const [chartData, setChartData] = useState({
//     datasets: [
//       {
//         labels: DatesArr(),
//         datasets: [
//           {
//             label: "Sales $",
//             data: DataArr(),
//             borderColor: "rgb(53, 162, 235)",
//             backgroundColor: "rgb(	21,	146,	168, 0.5)",
//           },
//         ],
//       },
//     ],
//   });

//   const [data, setData] = useState<Information[]>();
//   const [dates, setDates] = useState<Dates[]>();

//   const [chartOptions, setChartOptions] = useState({
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Monthly Revenue",
//       },
//     },
//     maintainAspectRatio: false,
//     responsive: true,
//   });

//   useEffect(() => {
//     const getList1 = async () => {
//       try {
//         await getStatsList()
//           .then((res) => res.json())
//           .then((json) => {
//             setData(json.data);
//             setDates(json.dates);
//           });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getList1();
//   }, []);

//   //console.log(DataArr());

//   useEffect(() => {
//     setChartData({
//       datasets: [
//         {
//           labels: DatesArr(),
//           datasets: [
//             {
//               label: "Sales $",
//               data: DataArr(),
//               borderColor: "rgb(53, 162, 235)",
//               backgroundColor: "rgb(	21,	146,	168, 0.5)",
//             },
//           ],
//         },
//       ],
//     });
//     setChartOptions({
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Monthly Revenue",
//         },
//       },
//       maintainAspectRatio: false,
//       responsive: true,
//     });
//   }, [data, dates]);

//   return (
//     <>
//       <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
//         <Bar data={chartData} options={chartOptions} />
//       </div>
//     </>
//   );
// };

// export default BarChart;
