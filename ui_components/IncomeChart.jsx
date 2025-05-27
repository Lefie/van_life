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



export default function IncomeChart(props) {
    const date_dict = {
        "Jan":"1",
        "Feb":"2",
        "Mar":"3",
        "Apr":"4",
        "May":"5",
        "Jun":"6",
        "Jul":"7",
        "Aug":"8",
        "Sep":"9",
        "Oct":"10",
        "Nov":"11",
        "Dec":"12"
    }
    const transactionData = props.data
    console.log(transactionData)

    function monthlySalary(transactionData) {
        let Jan = transactionData.filter((ele) => ele.date.slice(0,3) === "Jan").reduce((acc, cur ) => acc+cur.amount,0)
        let Feb = transactionData.filter((ele) => ele.date.slice(0,3) === "Feb").reduce((acc, cur ) => acc+cur.amount,0)
        let Mar = transactionData.filter((ele) => ele.date.slice(0,3) === "Mar").reduce((acc, cur ) => acc+cur.amount,0)
        let Apr = transactionData.filter((ele) => ele.date.slice(0,3) === "Apr").reduce((acc, cur ) => acc+cur.amount,0)
        let May = transactionData.filter((ele) => ele.date.slice(0,3) === "May").reduce((acc, cur ) => acc+cur.amount,0)
        let Jun = transactionData.filter((ele) => ele.date.slice(0,3) === "Jun").reduce((acc, cur ) => acc+cur.amount,0)
        let Jul = transactionData.filter((ele) => ele.date.slice(0,3) === "Jul").reduce((acc, cur ) => acc+cur.amount,0)
        let Aug = transactionData.filter((ele) => ele.date.slice(0,3) === "Aug").reduce((acc, cur ) => acc+cur.amount,0)
        let Sep = transactionData.filter((ele) => ele.date.slice(0,3) === "Sep").reduce((acc, cur ) => acc+cur.amount,0)
        let Oct = transactionData.filter((ele) => ele.date.slice(0,3) === "Oct").reduce((acc, cur ) => acc+cur.amount,0)
        let Nov = transactionData.filter((ele) => ele.date.slice(0,3) === "Nov").reduce((acc, cur ) => acc+cur.amount,0)
        let Dec = transactionData.filter((ele) => ele.date.slice(0,3) === "Dec").reduce((acc, cur ) => acc+cur.amount,0)

        return [Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec]
       
    }

    const monthlySalaryArr = monthlySalary(transactionData)

    
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
        data: monthlySalaryArr,
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

