import React from "react";
import { HeroSection1 } from "../components/home/HeroSection1";
import { HeroSection2 } from "../components/home/HeroSeciton2";
import { Review } from "../components/home/Review";
import { Footer } from "../components/home/Footer"; 

const Home = () => {
  return (
    <div className="flex flex-col w-full ">
      <div>
        {/* hero section-1 */}
          <div className="bg-richblack-900 pt-20"><HeroSection1 /></div>
        {/* hero section-2 */}
        <HeroSection2 />
        {/* hero section-3 */}
        <div className="bg-richblack-900 pt-20 pb-20"><Review/></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
