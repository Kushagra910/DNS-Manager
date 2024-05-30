import React from 'react';


export const Footer = () => {
  return (
    <footer className="bg-richblack-700 text-gray-300 py-8 px-4 md:px-16 lg:px-24 text-white">
      <div className="container mx-auto flex flex-col md:flex-row  justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span>© 2024 DNS Manager by Kushagra. All rights reserved.</span>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <div className="flex  flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center">
         
           <a href="https://www.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_13789697.htm#query=free%20svg&position=0&from_view=keyword&track=ais_user&uuid=bb696738-d897-4e94-9522-6439f240c633">Image by julos</a> on Freepik
          </div>
          <div className="flex flex-col items-center">
             <a href="https://www.freepik.com/free-vector/computer-login-concept-illustration_20602919.htm#query=login%20register&position=11&from_view=keyword&track=ais_user&uuid=ff469942-54c6-4bee-9c40-3fe7601916eb">Image by storyset</a> on Freepik 
          </div>
        </div>
      </div>
    </footer>
  );
}
