import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";

const Card = ({ hostedZone, records }) => {
  const [data, setData] = useState(records);

  const chartData = {
    labels: data?.map((record) => record.Name),
    datasets: [
      {
        label: "TTL",
        data: data.map((record) => (record.TTL > 2000 ? 2000 : record.TTL)),
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor : 'rgb(255, 159, 64)',
        borderWidth : 1
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white", // White text for x-axis ticks
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // White text for y-axis ticks
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // White text for legend labels
        },
      },
      title: {
        display: true,
        text: 'TTL Values',
        color: "white", // White text for the title
      },
    },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-richblack-500 rounded-xl font-inter shadow-md space-y-4 dark:bg-richblack-800 h-[400px] w-[500px] text-white">
      <h1 className="text-2xl font-bold text-center text-white">Domains</h1>
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-300">Hosted Zone: {hostedZone.Name}</p>
        <p className="text-lg text-gray-300">Total Records: {records.length}</p>
      </div>
      <div className="mt-4 w-full h-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Card;
