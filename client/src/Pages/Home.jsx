import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { Typewriter } from 'react-simple-typewriter'
import { GrMapLocation } from "react-icons/gr";
import ReportAnIssue from '../Components/ReportAnIssue';
import Feedback from '../Components/Feedback';
import About from '../Components/About';
import UserContext from '../Context/UserContext';


const Home = () => {
  
  const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <div data data-scroll data-scroll-speed="0.8">
    {/* <Navbar /> */}
    <section id='home'>
       
      

      <div className='w-full h-screen flex flex-col items-center justify-center lg:px-24 px-4 bg-[url("https://cityrama.qodeinteractive.com/wp-content/uploads/2017/07/l-slider-image2.jpg")]'>
       
        <h1 className='text-7xl flex flex-row font-bold leading-none tracking-wide mb-5'> <GrMapLocation className='mr-5 text-blue' /><Typewriter typeSpeed={100} words={["Online Reporting"]} /></h1>

        
        <h2 className='w-1/2 text-center font-semibold text-.5xl'>"Easily report water leaks, waste concerns,and potholes on our user-friendly platform.</h2>
        <h2 className='w-2/3 text-center font-semibold text-.5xl'>
        Stay informed with updates on local initiatives and join a proactive community committed to enhancing our neighborhood's infrastructure. Together, let's pave the way for a cleaner, safer environment."
          </h2>
      </div>
    </section>

    <section id='reportIssue'>
      <ReportAnIssue/>
    </section>

    <section id='feedback'>
      <Feedback  />
    </section>

    <section id='about'>
      <About />
    </section>
    </div>
    
    
  )
}

export default Home