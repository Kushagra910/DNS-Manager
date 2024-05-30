import React from "react";
import { ReviewCard } from "./ReviewCard";

const ReviewData = [
  {
    name:"John Doe",
    desc: "CEO, Acme Inc.",
    review : "The DNS Manager has been a game-changer for our business. It's easy to use, packed with features, and has saved us countless hours of manual DNS management."
  },
  {
    name:"Jane Smith",
    desc: "CTO, Globex Corp.",
    review : "I was hesitant to try a new DNS manager, but the DNS Manager has exceeded all my expectations. The analytics and bulk record management features are invaluable."
  },
  {
    name:"Michael Johnson",
    desc: "IT Manager, Stark Industries",
    review : "The DNS Manager has streamlined our domain management process. The intuitive interface and powerful features make it a must-have tool for any organization."
  }

]

export const Review = () => {
  return (
    <div className="flex  flex-col gap-6 items-center max-h-maxContent w-11/12 mx-auto font-comfortaa ">
      <span className="px-3 py-1 text-richblack-5 rounded-lg bg-richblack-400 font-semibold" >Testimonials</span>
      <h1 className="text-4xl md:text-5xl text-white font-extrabold">What Our Customers Say</h1>
      <p className="text-lg text-richblack-100 font-bold">Hear from our satisfied customers about their experience with our DNS manager.</p>
      {/* reviews */}
      <div className="flex flex-col md:flex-row gap-6">
         {ReviewData.map((data,idx)=>(
            <ReviewCard data={data} key={idx}/>
         ))}
      </div>
    </div>
  );
};
