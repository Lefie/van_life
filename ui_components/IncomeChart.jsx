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
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );



export default function IncomeChart() {
    const labels = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"];
    
    const options = {
        responsive: true,
        scales: {
            y: {
                suggestedMin: 1000,
                suggestedMax: 2000,
                grid: {
                    lineWidth:2
                }
            },
            x: {
                grid: {
                    display:false,              
                }
            }
        },
        layout: {
         
        },
        plugins: {
            title: {
                display: true,
                text: 'Income'
              }
          }
    };

    const data = {
        labels: labels,
        datasets: [
        {
        label: 'Monthly Income',
        data: [750, 1000, 1000,800,900,3000,1000,4000,2200,1000],
        backgroundColor: '#FF8C38',
        borderRadius:5
        },
    ]
    };

    return (
        <>
        <div className='income-chart'>
            { React.createElement(Bar, { options, data })}
        </div>
        </>
       
    )

}

