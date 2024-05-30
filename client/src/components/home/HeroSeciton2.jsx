import React from "react";
import { FeatureCard } from "./FeatureCard";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { RiSpeedUpLine } from "react-icons/ri";


const featureData = [
  {
    Icon : RiSpeedUpLine,
    title : "Fast DNS Propagation",
    feature : "Enjoy lightning-fast DNS updates across your domains."
  },
  {
    Icon : FaRegClock,
    title : "Bulk Record Management",
    feature : "Easily manage DNS records for multiple domains at once."
  },
  {
    Icon : GrAnalytics,
    title : "Advanced Analytics",
    feature : "Gain deep insights into your DNS performance and usage."
  },
  {
    Icon : MdOutlineSecurity,
    title : "Robust Security",
    feature : "Protect your domains with our secure DNS infrastructure."
  },
]

export const HeroSection2 = () => {
  return (
    <div className="flex items-center md:flex-row md:justify-evenly flex-col md:max-h-maxContemt w-11/12 mx-auto font-comfortaa mt-20 mb-20 gap-5 md:gap-2">
      {/* subsection-1 */}
      <div className="flex flex-col gap-4 md:w-[49%] justify-center">
           <div className="text-richblack-25 bg-richblack-500 px-3 py-2 rounded-lg w-fit">Key Features</div>
           <h1 className=" text-4xl md:text-5xl font-extrabold text-white">Powerful DNS Management</h1>
           <p className="md:text-lg font-semibold text-richblack-25">Our DNS manager provides a comprehensive set of tools to streamline your domain management. From bulk record updates to advanced analytics, we've got you covered.</p>
      </div>
      {/* subection-2 features */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:w-[46%] gap-4">
          {featureData.map((data,index) => (
            <FeatureCard key={index} Icon={data.Icon} title={data.title} feature={data.feature}/>
          ))}
      </div>
    </div>
  );
};
