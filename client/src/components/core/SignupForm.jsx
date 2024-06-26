import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import { signUp } from "../../services/operations/authApi";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword, firstName, lastName } = formData;

  // Handling input fields, when some value changes
  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do not Match");
      return;
    }

     dispatch(signUp(firstName, lastName, email, password, confirmPassword, navigate));
    // toast.success("Account Created");
    console.log("inside submitHandler");


    // ACUUMULATING DATA
    const signupData = {
      ...formData,
    };

    //set the signup data to state so that it can be used after OTP verification
    dispatch(setSignupData(signupData));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex gap-x-4 mt-[10px[">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
              className="bg-richblack-800 rounded-lg w-full p-[12px] shadow-[0px_2px_2px_-1px_white] text-white"
            />
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
              className="bg-richblack-800 rounded-lg w-full p-[12px] shadow-[0px_2px_2px_-1px_white] text-white"
            />
          </label>
        </div>

        <div className="mt-[5px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              value={formData.email}
              className="bg-richblack-800 rounded-lg w-full p-[12px] shadow-[0px_2px_2px_-1px_white] text-white"
            />
          </label>
        </div>
        <div className="flex gap-x-4 mt-2">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className="bg-richblack-800 rounded-lg w-full p-[12px] shadow-[0px_2px_2px_-1px_white] text-white"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mt-1 leading-[1.375rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword1 ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="bg-richblack-800 rounded-lg w-full p-[12px] shadow-[0px_2px_2px_-1px_white] text-white"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
