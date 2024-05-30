import React from "react";
import Template from "../components/core/Template";
import signupImg from './Sign up-rafiki.svg';

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

