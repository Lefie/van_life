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

export default function ReviewChart(props) {
  const reviewsData = props.data
  
  console.log("can I have access? ",reviewsData)

  function collectStars() {
    const fiveStarArr = reviewsData.filter(( ele )=> ele.rating === 5)
    const fourStarArr = reviewsData.filter(( ele )=> ele.rating === 4)
    const threearArr = reviewsData.filter(( ele )=> ele.rating === 3)
    const twoStarArr = reviewsData.filter(( ele )=> ele.rating === 2)
    const oneStarArr = reviewsData.filter(( ele )=> ele.rating === 1)
  
    const starArr = [fiveStarArr.length,fourStarArr.length,threearArr.length,twoStarArr.length,oneStarArr.length]
    
    return starArr
  
  }

  const rawData = collectStars();
  const total = rawData.reduce((a, b) => a + b, 0);
  console.log("total", total)
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
        align: 'end',
        color: '#911',
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