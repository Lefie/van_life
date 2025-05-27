import React from "react";
import IncomeChart from "../../ui_components/IncomeChart";

export default function Income() {
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
    const transactionsData = [
        { amount: 220, date: "Mar 3, '25", id: "0" },
        { amount: 120, date: "Mar 13, '25", id: "0" },
        { amount: 720, date: "Feb 3, '25", id: "1" },
        { amount: 560, date: "Jan 3, '25", id: "2" },
        { amount: 980, date: "Jan 12, '25", id: "3" },
    ]

    function handleDate(date){
         const date_split = date.split("")
         console.log(date_split)

         let start = 4
         let acc1 = ""
         let year=""

         for (let i = start; i < date_split.length; i++){
            if (Number.isNaN(Number(date_split[i]))){
                console.log("break")
                break
            }else {
                acc1 += date_split[i]
            }
         }

         let year_index_start = date_split.length - 2

         for (let i = year_index_start; i < date_split.length; i++){
            year +=date_split[i]
         }

         let res = `${date_dict[date.slice(0,3)]}/${acc1}/${year}`

         return res
    }

    return (
        <>
        
        <div className="van-details-container">
            <h1 className="income">Income</h1>
            <p className="last">current <span className="bold underline">year</span></p>

            <h1>$2,260</h1>
            <IncomeChart data={transactionsData} />
            <div className="transaction-header">
                <p className="bold">Your transcations ({transactionsData.length}) </p>
                <p className="last">current <span className="bold underline">year</span></p>
            </div>
            
            <div className="transaction-box">
            {transactionsData && transactionsData.map((transction) => (
                <>
                <div className="transaction-details">
                 <p className="bold transaction-amount"> ${transction.amount}</p>
                 <p>{handleDate(transction.date)}</p>
                </div>
                </>
            ))}
            </div>

        </div>
        
        </>
    )
} 