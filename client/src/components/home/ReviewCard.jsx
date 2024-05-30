import React from 'react'

export const ReviewCard = ({data}) => {
  return (
    <div className='flex gap-2 flex-col bg-richblack-700 p-5 rounded-xl transition-all duration-200 hover:scale-[1.05]'>
       {/* img and name */}
       <div className='flex justify-center items-center gap-4'>
          <div className=' rounded-full h-12 w-12 bg-white'></div>
          <div className='flex flex-col'>
              <span className='text-lg text-white font-bold'>{data.name}</span>
              <span className='text-richblack-300 font-semibold'>{data.desc}</span>
          </div>
       </div>
       {/* review */}
       <p className='font-bold text-richblack-200'>{data.review}</p>
    </div>
  )
}
