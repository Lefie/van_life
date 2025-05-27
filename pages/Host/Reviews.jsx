import React from "react";
import { useState } from "react";
import  ReviewChart  from "../../ui_components/ReviewChart"
import Rating from '@mui/material/Rating';


export default function Reviews() {

    function calculateAverageRating(reviewArr) {
        let total = 0
        if (reviewArr.length > 0) {
            reviewArr.forEach((item) => {
                total += item.rating
            })
            const res = (Math.round(total / reviewsData.length * 10) / 10).toFixed(1)
            console.log(res)
            return res
        }else {
            return 0
        }
    }
    
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 4,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
        {
            rating: 3,
            name: "Jelly",
            date: "December 10, 2022",
            text: "Wasn't the best experience. Have stayed at a cleaner place",
            id: "3",
        },
        {
            rating: 3,
            name: "Neil",
            date: "December 7, 2022",
            text: "The staff is not as friendly. Overall a good experience though",
            id: "4",
        },
    ]

    const [reviewAvg, setReviewAvg] = useState( () => calculateAverageRating(reviewsData)) 
   

    return (
        <>
        <div className="van-details-container">
        <div className="review-container-header">
            <h1 className="your-reviews">Your reviews</h1>
            <p className="last">last <span className="bold underline"> 30 days</span></p>
        </div>
        <p className="rating"><span className="bold score">{reviewAvg}</span>Overall Raitng</p>

        <ReviewChart data={reviewsData} />
        
        <p className="bold reviews-header">Reviews({reviewsData.length})</p>
            {reviewsData && reviewsData.length >0 && 
                reviewsData.map((review)=>(<>
                    <div className="review-content-box">
                        <Rating defaultValue={review.rating} readOnly />
                        <p className="bold">{review.name} <span className="gray normal">{review.date}</span></p>
                        <p className="review-text">{review.text}</p>
                    </div>
                </>))
            }
        </div>
        </>
    )
}