"use client"
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Modern", "Minimalist", "Industrial", "Scandinavian", "Vintage"],
    datasets: [
      {
        label: "Total view",
        data: [40, 35, 25, 45, 38],
        backgroundColor: "#0461A6",
        borderRadius: 8,
      },
      {
        label: "Unique view",
        data: [30, 28, 20, 35, 30],
        backgroundColor: "#E5E7EB",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        display: false // Hide default legend
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false // Remove vertical lines
        },
        border: {
          display: false // Remove x-axis line
        }
      },
      y: { 
        beginAtZero: true, 
        max: 60,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5], // Dashed horizontal lines
          drawBorder: false, // Remove y-axis line
        },
        border: {
          display: false
        }
      },
    },
  };

  return (
    <div className="relative">
      {/* Custom Legend */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="flex items-center gap-1 py-2">
          <div className="w-2 h-2 rounded-full bg-[#0461A6]"></div>
          <span className="text-xs font-medium text-gray-500">Total view</span>
        </div>
        <div className="flex items-center gap-1 py-2">
          <div className="w-2 h-2 rounded-full bg-[#E5E7EB] border border-gray-300"></div>
          <span className="text-xs font-medium text-gray-500">Unique view</span>
        </div>
      </div>

      {/* Chart with padding */}
      <div className="pt-12">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

