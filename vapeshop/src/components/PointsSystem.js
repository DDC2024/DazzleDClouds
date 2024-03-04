import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCoins, faStar } from "@fortawesome/free-solid-svg-icons";
import background2nd from "../assets/secondBackground.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PointsSystem = () => {
  const secondBackground = {
    backgroundImage: `url(${background2nd})`,
    backgroundSize: "cover",
  };
  useEffect(() => {
    AOS.init({
      duration: 1500, // Increase duration for slower animation
    });
  }, []);

  return (
    <div className="min-h-screen bg-fixed " style={secondBackground}>
      <div className="points-system-container  flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8 text-[#623288] ">Points System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 - Earn Points */}
          <div className="bg-[#1d1d1d] shadow-lg p-4 rounded-lg flex flex-col items-center justify-center text-center md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2" data-aos="fade-right">
            <FontAwesomeIcon icon={faStar} className="text-4xl text-[#623288] mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Earn Points</h3>
            <p className="text-white text-center mb-6">
              Start earning points with every purchase and enjoy exclusive rewards.
            </p>
            <button className="bg-[#623288] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Card 2 - Redeem Points */}
          <div className="bg-[#1d1d1d] shadow-lg p-4 rounded-lg flex flex-col items-center justify-center text-center  md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3" data-aos="fade-up">
            <FontAwesomeIcon icon={faCoins} className="text-4xl text-[#623288] mb-4 " />
            <h3 className="text-xl font-bold mb-2 text-white">Redeem Points</h3>
            <p className="text-white text-center mb-6">
              Redeem your points for exciting rewards and special offers.
              <br />
              <span className="text-sm">Visit our shop to complete your redemption and receive a receipt or QR code.</span>
            </p>
            <button className="bg-[#623288] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300">
              Visit Shop
            </button>
          </div>

          {/* Card 3 - Partner Benefits */}
          <div className="bg-[#1d1d1d] shadow-lg p-4 rounded-lg flex flex-col items-center justify-center text-center md:col-start-3 md:col-end-4 md:row-start-3 md:row-end-4" data-aos="fade-left">
            <FontAwesomeIcon icon={faShoppingBag} className="text-4xl text-[#623288] mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Partners</h3>
            <p className="text-white mb-4">
              Redeem your points at partner businesses for exclusive benefits and rewards.
            </p>
            <button className="bg-[#623288] text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300">
              Explore Partners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSystem;
