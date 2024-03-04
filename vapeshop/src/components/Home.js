import React, { useEffect } from "react";
import AOS from "aos";
import background from "../assets/back2.png";

import Footer from "../components/footer";
import "aos/dist/aos.css";
import alien from "../assets/alien1.png";
import vaping from "../assets/vaping.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCloud, faHandshake, faTags, faTruck ,faStar} from "@fortawesome/free-solid-svg-icons";
import YoutubeVideo from "../components/YoutubeVideo";
import FeatureProduct from "./FeatureProduct";
import Service from "./Service";
import ContactUs from "./ContactUs";
import PointsSystem from "./PointsSystem"
import Partners from "./Partners";

const Home = () => {
  const firstBackground = {
    minHeight: "100vh", 
    backgroundImage: `url(${background})`, 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", 
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);
  return (
    <main className="flex flex-col mt-16 min-h-screen ">
    {/* first */}
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col md:flex-row justify-center items-center bg-fixed" style={firstBackground}>
      {/* left */}
      <div className="flex flex-col md:w-1/3 lg:w-1/4 md:ml-8 lg:ml-16">
        <span>
          <h3 className="text-[#623288] font-bold text-lg md:text-xl lg:text-2xl">DAZZLED CLOUDS PRESENT</h3>
        </span>
        <span>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white">
            Let's <br />
            <span className="text-[#623288]">Vaping!</span>
          </h1>
        </span>
        <span>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non neque placerat, mattis mi quis, fermentum mauris. Ut dictum nibh quis nisl mollis.</p>
        </span>
        <span>
          <button className="bg-[#623288] py-2 px-4 md:py-3 md:px-6 rounded-full text-lg md:text-xl lg:text-2xl font-semibold hover:text-white">Learn More</button>
        </span>
      </div>
  
      {/* mid */}
      <div className="flex items-center justify-center mb-8 md:mb-0 md:w-1/3">
        <img src={alien} alt="" style={{ height: "auto", maxWidth: "100%", transform: "rotate(-10deg)" }} className="object-cover" />
      </div>
  
      {/* right */}
      <div className="flex flex-col md:w-1/3 lg:w-1/4">
        <span>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Watch Reviews</h2>
        </span>
        <div>
          <YoutubeVideo videoId="XHOmBV4js_E" thumbnailUrl={vaping} />
        </div>
  
        <div className="flex flex-col space-y-2 md:space-y-3">
          <div className="flex space-x-2 md:space-x-3 items-center">
            <FontAwesomeIcon icon={faCloud} className="text-[#623288] text-lg md:text-xl lg:text-3xl" />
            <div>
              <span className="text-white text-base p-5  sm:text-lg lg:text-xl font-bold">Vaporezoo E41</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
          </div>
  
          <div className="flex space-x-2 md:space-x-3 items-center">
            <FontAwesomeIcon icon={faCloud} className="text-[#623288] text-lg md:text-xl lg:text-3xl" />
            <div>
              <span className="text-white text-base md:text-lg lg:text-xl font-bold">Vaporezoo E41</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* second */}
    <Service/>
  
    {/* 3rd */}
    <FeatureProduct/>
    <PointsSystem/>
    <Partners/>
    <ContactUs />
  </main>
  
  );
};

export default Home;

