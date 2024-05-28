import React from "react";
import Template from "../components/core/Template";
import signupImg from '../assets/Sign up-rafiki.svg'
{/* <a href="https://storyset.com/user">User illustrations by Storyset</a> */}

export const Signup = () => {
  return (
    <Template
      title="Join the Leading DNS Management Platform"
      desc1="Manage your DNS effortlessly."
      desc2="Reliable, secure, and scalable solutions for all your DNS needs."
      image={signupImg}
      formtype="signup"
    />
  );
};

