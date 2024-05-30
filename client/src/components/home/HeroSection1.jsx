import React from "react";

export const HeroSection1 = () => {
  return (
    <div className="flex items-center md:flex-row md:justify-evenly flex-col gap-6 md:gap-2 md:max-h-[600px] w-11/12 mx-auto font-comfortaa">
      {/* sub-section-1 */}
      <div className="text-richblack-5 flex flex-col gap-5 md:max-w-[39%]">
        <h1 className="text-4xl md:text-5xl font-extrabold">Effortless DNS Management</h1>
        <p className="text-richblack-200 text-lg font-semibold">
          Streamline your domain management with our powerful DNS platform.
          Easily configure, monitor, and optimize your DNS records across
          multiple domains.
        </p>
        <div className="flex flex-row gap-3">
          <div className="cursor-pointer px-6 py-2 md:px-9 md:py-3 bg-richblack-25 text-richblack-900 rounded-lg">Get Started</div>
          <div className="cursor-pointer px-6 py-2  md:px-9 md:py-3  border border-richblack-25 rounded-lg hover:bg-richblack-5 hover:text-richblack-700 transition-all duration-200">Learn More</div>
        </div>
      </div>
      {/* sub-section-2 */}
      <div className=" animate-slow-bounce">
        <img
          src="/freepik-export-20240529231815leSL.png "
          alt="image"
          className="h-[450px] "
        />
      </div>
    </div>
  );
};
