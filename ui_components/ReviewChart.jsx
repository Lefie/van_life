import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function ReviewChart() {
  const rawData = [1, 2, 3, 4, 5];
  const total = rawData.reduce((a, b) => a + b, 0);
  const percentageData = rawData.map((value) =>
    ((value / total) * 100).toFixed(1)
  );

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: false
      }
    }, 
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 5,
      },
    },
    responsive: true,
    aspectRatio: 3.5,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Review Rating',
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        color: '#000',
        formatter: function ( value,context) {
          console.log("what is this context?",context)
          return percentageData[context.dataIndex] + '%';
        },
      },
    },
  };

  const labels = ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'];

  const data = {
    labels,
    datasets: [
      {
        label: 'stars',
        data: rawData,
        borderColor: '#FF8C38',
        backgroundColor: '#FF8C38',
      },
    ],
  };

  return (
    <div className='review-chart' >
      <Bar options={options} data={data} />
    </div>
  );
}