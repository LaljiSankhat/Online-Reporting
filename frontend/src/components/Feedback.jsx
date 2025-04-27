import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const Feedback = () => {
    const {authUser, isLoggedIn } = useAuthStore();
    
  return (
    <div className='w-full h-screen flex lg:flex-row flex-col'>
        <div className='right w-1/2 h-screen px-10 py-2 flex items-center justify-center'>
            <div className=' w-4/5 h-2/3'>
                <img src="feedback.png" alt="" />
            </div>
        </div>
        <div className='left w-1/2 h-screen'>
            <div className='py-20 px-24' >
                <h1 className='text-5xl font-bold mb-16 '>Submit your <span className='text-blue'>Response</span></h1>
                <h2 className='text-xl text-start leading-7 font-semibold mb-10 '>"Provide Feedback Effortlessly: Our platform facilitates seamless communication for sharing your insights and concerns. Capture and document issues with ease using photos or videos, ensuring clarity for effective resolution. Quickly access contact details for relevant authorities, guaranteeing your feedback is acknowledged and acted upon promptly. Join us in shaping a proactive community dedicated to continuous improvement and well-being, one valuable feedback at a time."</h2>
                <h1 className='font-semibold text-[1.1vw]'>Give you opinion To cultivate a more thriving, secure, and adaptable urban environment...</h1>

                {
                    (isLoggedIn && authUser.role === "user")  && 
                    (isLoggedIn === true ? (<Link to={"/feedback"}><button className='py-2 px-4 mt-10 bg-blue text-white rounded-lg font-semibold'>Feedback form</button></Link>) : (<Link to={"/login"}>
                        <button className='py-2 px-4 mt-10 bg-blue text-white rounded-lg font-semibold'>Feedback form</button>
                    </Link>))
                }
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Feedback