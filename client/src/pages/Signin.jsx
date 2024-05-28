import React from 'react'
import Template from '../components/core/Template'
import loginImg from '../assets/6333043.jpg'
{/* <a href="https://www.freepik.com/free-vector/computer-login-concept-illustration_20602919.htm#query=login%20register&position=11&from_view=keyword&track=ais_user&uuid=ff469942-54c6-4bee-9c40-3fe7601916eb">Image by storyset</a> on Freepik */}

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

