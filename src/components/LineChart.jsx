// "use client"
// import React from "react";
// import { Line } from "react-chartjs-2";
// import { 
//   Chart as ChartJS, 
//   LineElement, 
//   PointElement, 
//   LinearScale, 
//   CategoryScale, 
//   Tooltip, 
//   Legend 
// } from "chart.js";

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// const LineChart = () => {
//   const data = {
//     labels: ["21 Aug", "22 Aug", "23 Aug", "24 Aug", "25 Aug", "26 Aug", "27 Aug"],
//     datasets: [
//       {
//         label: "New User",
//         data: [30, 35, 45, 50, 40, 35, 30],
//         borderColor: "#0461A6",
//         backgroundColor: "rgba(4, 97, 166, 0.1)",
//         tension: 0.4,
//         pointRadius: 0, // Remove circles on graph line
//         pointHoverRadius: 6, // Show circle only on hover
//       },
//       {
//         label: "Active User",
//         data: [20, 15, 18, 25, 20, 15, 12],
//         borderColor: "#EF4444",
//         backgroundColor: "rgba(239, 68, 68, 0.1)",
//         tension: 0.4,
//         pointRadius: 0, // Remove circles on graph line
//         pointHoverRadius: 6, // Show circle only on hover
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { 
//         display: false // Hide default legend
//       },
//       tooltip: { 
//         mode: "index", 
//         intersect: false,
//         displayColors: false // Hide color boxes in tooltip
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false // Remove vertical lines
//         }
//       },
//       y: { 
//         beginAtZero: true, 
//         max: 60,
//         grid: {
//           color: "rgba(0, 0, 0, 0.1)" // Light grid lines for Y axis
//         }
//       },
//     },
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     hover: {
//       mode: 'index',
//       intersect: false
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Custom Legend */}
//       <div className="absolute top-0 left-0 flex gap-6 mb-4">
//         <div className="flex items-center gap-2">
//           <div className="w-5 h-5 rounded-full bg-[#0461A6]"></div>
//           <span className="text-sm font-medium">New User</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-5 h-5 rounded-full bg-[#EF4444]"></div>
//           <span className="text-sm font-medium">Active User</span>
//         </div>
//       </div>

//       {/* Chart */}
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default LineChart;
"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale, 
  Tooltip, 
  Legend 
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ["21 Aug", "22 Aug", "23 Aug", "24 Aug", "25 Aug", "26 Aug", "27 Aug"],
    datasets: [
      {
        label: "New User",
        data: [30, 35, 45, 50, 40, 35, 30],
        borderColor: "#0461A6",
        backgroundColor: "rgba(4, 97, 166, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Active User",
        data: [20, 15, 18, 25, 20, 15, 12],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        display: false
      },
      tooltip: { 
        mode: "index", 
        intersect: false,
        displayColors: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        }
      },
      y: { 
        beginAtZero: true, 
        max: 60,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5],
          drawBorder: false,
        },
        border: {
          display: false
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="relative">
      {/* Custom Legend - Fixed positioning */}
      <div className="absolute left-4 z-10 flex  gap-2">
        <div className="flex items-center gap-1  pb-2">
          <div className="w-2 h-2 rounded-full bg-[#0461A6]"></div>
          <span className="text-xs font-medium text-gray-500">New User</span>
        </div>
        <div className="flex items-center gap-1 pb-2 ">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
          <span className="text-xs font-medium text-gray-500">Active User</span>
        </div>
      </div>

      {/* Chart with padding to avoid overlap */}
      <div className="pt-8">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;