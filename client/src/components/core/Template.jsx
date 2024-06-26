import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import {FcGoogle} from 'react-icons/fc'

const Template = ({title,desc1,desc2,image,formtype}) => {
  return (
    <div className='flex flex-col-reverse md:flex-row w-11/12 max-w-[1160px] py-20 mx-auto gap-y-12  gap-x-12 justify-between overflow-hidden'>
      <div className='w-11/12 max-w-[450px]'>
        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
        <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
          <span className='text-richblack-100'>{desc1}</span>
          <br></br>
          <span className='text-blue-100 italic'>{desc2}</span>
        </p>

        {formtype === "signup"?
        (<SignupForm  />):
        (<LoginForm />)}

        <div className='flex w-full items-center my-4 gap-x-2'>
          <div className='h-[1px] bg-richblack-200 w-full'></div>
          <p className='text-richblack-200 font-medium leading-[1.375rem]'>OR</p>
          <div className='h-[1px] bg-richblack-200 w-full'></div>
        </div>

        <button className='w-full flex justify-center items-center rounded-lg font-medium text-richblack-100
        border border-richblack-200 px-[12px] py-[8px] gap-x-2 mt-3'>
        <FcGoogle/>
          <p >Sign Up With Google</p>
        </button>
      </div>
      <div className='relative w-11/12 max-w-[450px] rounded-lg hidden md:block '> 
          <img 
            src={image}
            alt="pics" 
            width={558}
            loading="lazy"
            className='absolute top-5 right-3 rounded-2xl'
          />
        </div>
    </div>
  )
}

export default Template