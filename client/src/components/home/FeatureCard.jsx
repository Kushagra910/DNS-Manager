import React from 'react'

export const FeatureCard = ({Icon,title,feature}) => {
  return (
    <div className='bg-richblack-900 flex flex-col justify-center items-center gap-2 py-3 px-5 rounded-lg hover:scale-[1.04] transition-all duration-300'>
       <div className='text-white self-start pl-8'><Icon size={34}/></div>
       <h3 className='text-xl text-richblack-5 font-bold'>{title}</h3>
       <p className='text-lg text-richblack-100 text-center'>{feature}</p>
    </div>
  )
}
