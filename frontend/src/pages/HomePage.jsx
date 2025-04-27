import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Typewriter } from 'react-simple-typewriter'
import { MapPinned } from "lucide-react"
import IssueReport from "../components/IssueReport";
import Feedback from "../components/Feedback";
import About from "../components/About";


const HomePage = () => {
    const {authUser, isLoggedIn } = useAuthStore();
    
  return (
    <div data data-scroll data-scroll-speed="0.8" className="h-screen overflow-y-scroll scrollbar-hide">
      {/* <Navbar /> */}
      <section id="home overflow-y-hidden">
        <div className='w-full h-screen flex flex-col items-center justify-center lg:px-24 px-4 bg-[url("https://cityrama.qodeinteractive.com/wp-content/uploads/2017/07/l-slider-image2.jpg")]'>
          <h1 className="text-7xl flex flex-row justify-center items-center font-bold leading-none tracking-wide mb-5">
            {" "}
            <MapPinned className="mr-5 size-16 content-center text-blue" />
            <Typewriter typeSpeed={100} words={["Online Reporting"]} />
          </h1>

          <h2 className="w-1/2 text-center font-semibold text-.5xl">
            "Easily report water leaks, waste concerns,and potholes on our
            user-friendly platform.
          </h2>
          <h2 className="w-2/3 text-center font-semibold text-.5xl">
            Stay informed with updates on local initiatives and join a proactive
            community committed to enhancing our neighborhood's infrastructure.
            Together, let's pave the way for a cleaner, safer environment."
          </h2>
        </div>
      </section>

      <section id="reportIssue">
        <IssueReport />
      </section>

      <section id="feedback">
        <Feedback />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  );
};

export default HomePage;
