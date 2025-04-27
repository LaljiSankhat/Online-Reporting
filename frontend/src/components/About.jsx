import React, { useState } from "react";

const About = () => {
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <div>
      <div className="w-full h-screen flex lg:flex-row flex-col ">
        <div className="left w-1/2 h-screen">
          <div className="py-20 px-24">
            <h1 className="text-5xl font-bold mb-16 ">
              About <span className="text-blue">us</span>
            </h1>
            <h2 className="text-start leading-7 font-semibold mb-15 ">
              Welcome to{" "}
              <span className="text-blue">Online Reporting System</span>, your
              go-to platform for reporting potholes, water, and related issues
              directly to the government authorities. We are dedicated to
              fostering a proactive approach to community welfare by providing a
              seamless channel for citizens to voice their concerns and
              contribute to the betterment of their surroundings.
            </h2>

            <h2 className="text-xl text-start leading-7 font-bold mb-1 mt-10">
              Our Mission
            </h2>
            <h2 className="text-start leading-7 font-semibold mt-5">
              At <span className="text-blue">Online Reporting System</span>, our
              mission is to bridge the gap between citizens and government
              agencies, facilitating efficient and transparent communication for
              the timely resolution of infrastructure issues. We strive to
              empower individuals to play an active role in shaping their
              communities by providing them with a user-friendly platform to
              report and track issues effectively. {" "}
              {!readMore && (<button onClick={() => setReadMore(!readMore)} className="ml-2 text-white border px-2 rounded-lg border-gray-200 bg-blue ">  Read more...</button>)}
            </h2>

            
          </div>
        </div>
        <div className="right w-1/2 h-screen px-10 py-2 flex items-center justify-center">
          <div className=" w-3/4 h-3/4">
            <img
              src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-639.jpg?w=740&t=st=1714295738~exp=1714296338~hmac=adc037cadb74a7d75f12e80e795bede5b849fbebaa17633673c19862f6f0d8a4"
              alt=""
            />
          </div>
        </div>
        
      </div>
      {readMore && (<div className="px-24 mb-10">
        <h2 className="text-xl text-start leading-7 font-bold mb-1">
          How It Works
        </h2>
        <h2 className="text-start leading-7 font-semibold mb-10">
          Our platform simplifies the process of reporting infrastructure
          issues. Users can easily submit complaints by providing precise
          location details, descriptions, and relevant information about the
          problem they have encountered. Once submitted, these complaints are
          swiftly forwarded to the respective government authorities for prompt
          action.
        </h2>

        <h2 className="text-xl text-start leading-7 font-bold mb-1">
          Why Choose Us
        </h2>
        <h2 className="text-start leading-7 font-semibold mb-10">
          Transparency: We believe in transparency and accountability. All
          submitted complaints are tracked, and users can monitor the progress
          of their reports until the issue is resolved. Efficiency: With our
          streamlined reporting system, citizens can report issues within
          minutes, ensuring timely intervention by the authorities. Community
          Engagement: By actively engaging citizens in the process of civic
          governance, we foster a sense of ownership and responsibility towards
          maintaining public infrastructure
        </h2>

        <h2 className="text-xl text-start leading-7 font-bold mb-1">
        Our Team
        </h2>
        <h2 className="text-start leading-7 font-semibold mb-10">
        Our website is powered by a dedicated team committed to enhancing civic participation and driving positive change in society. From developers to community managers, each member plays a crucial role in ensuring the smooth functioning of our platform and delivering an unparalleled user experience.
        </h2>

        <h2 className="text-xl text-start leading-7 font-bold mb-1">
        Get Involved
        </h2>
        <h2 className="text-start leading-7 font-semibold mb-10">
        Join us in our mission to create cleaner, safer, and more sustainable communities. Whether you're a concerned citizen or a government official, your involvement is essential in driving impactful change. Together, we can make a difference, one report at a time.
        </h2>

        <h2 className="text-start leading-7 font-semibold mb-2">Thank you for choosing <span className="text-blue">Online Reporting System</span> as your trusted partner in building a better tomorrow. {readMore && (<button onClick={() => setReadMore(!readMore)} className="ml-2 text-white border px-2 rounded-lg border-gray-200 bg-blue">  Read less...</button>)}</h2>
        
      </div>
    
    )}
      {/* <div className="px-24 mb-5">
      <button
              onClick={handleReadMore}
              className="py-2 px-4 bg-blue text-white rounded-md"
            >
              Read {readMore? "less" : "more"}
            </button>
        
      </div>
      <p>Read {readMore? "less" : "more"}</p> */}

      
    </div>
  );
};

export default About;
