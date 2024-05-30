import React from 'react'
import Template from '../components/core/Template'
import loginImg from '/6333043.jpg'

export const Signin = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Easily manage your domains and DNS settings."
      desc2="Secure, efficient, and reliable access to your DNS dashboard."
      image={loginImg}
      formtype="login"
    />
  )
}

