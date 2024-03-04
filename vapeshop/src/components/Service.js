import React, { useEffect } from "react";
import AOS from "aos";
import background2nd from "../assets/secondBackground.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCloud,
  faHandshake,
  faTags,
  faTruck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Service = () => {
  const secondBackground = {
    backgroundImage: `url(${background2nd})`,
    backgroundSize: "cover",
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration of the animation
    });
  }, []);

  return (
    <div className="min-h-screen bg-fixed " style={secondBackground}>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-16">
        {/* left*/}
        <div
          className="flex flex-col items-center space-x-4  md:py-32 order-2 md:order-1 md:flex-row"
          data-aos="fade-right"
          data-aos-offset="600"
          data-aos-easing="ease-in-sine"
          data-aos-duration="2000"
        >
          <div className="flex flex-col space-y-4 ">
            <div className=" group h-56 p-6 bg-[#1d1d1d] rounded-md w-64 transition-all duration-300 ease-in-out transform hover:translate-y-2 hover:bg-[#623288] hover:text-black
            hover:scale-105 hover:delay-100">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-[#623288] text-4xl transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100"
                />
                <h1 className="text-3xl text-white font-bold transition-all duration-300 ease-in-outtransform group-hover:text-black group-hover:delay-100">
                  Free Shipping
                </h1>
                <p className="text-gray-300 mt-2 font-semibold transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100">
                  Enjoy complimentary shipping on your orders when you make a
                  purchase of 1000 pesos or more
                </p>
              </div>
            </div>
            <div
              className="group h-56 p-6 bg-[#623288] rounded-md w-64 transition-all duration-300 ease-in-out transform hover:translate-y-2
 hover:bg-[#1d1d1d] hover:text-[#623288] hover:scale-105 hover:delay-100"
            >
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faHandshake}
                  className="text-4xl transition-all duration-300 ease-in-out group-hover:text-[#623288] group-hover:delay-100"
                />
                <h1 className="text-3xl text-black font-bold group-hover:text-white group-hover:delay-100">
                  Epic Deals
                </h1>
                <p className="text-black mt-2 font-semibold group-hover:text-gray-300 group-hover:delay-100">
                  Discover unbeatable prices on top-quality products. Shop with
                  confidence and enjoy the best deals in town!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-10 ">
          <div className=" group h-56 p-6 bg-[#1d1d1d] rounded-md w-64 transition-all duration-300 ease-in-out transform hover:translate-y-2 hover:bg-[#623288] hover:text-black
            hover:scale-105 hover:delay-100">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-[#623288] text-4xl transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100"
                />
                <h1 className="text-3xl text-white font-bold transition-all duration-300 ease-in-outtransform group-hover:text-black group-hover:delay-100">
                  Warranty
                </h1>
                <p className="text-gray-300 mt-2 font-semibold transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100">
                  Shop with Confidence: Our Products Come with a Solid 60-Day
                  Warranty. Your Assurance of Quality.
                </p>
              </div>
            </div>
            <div className=" group h-56 p-6 bg-[#1d1d1d] rounded-md w-64 transition-all duration-300 ease-in-out transform hover:translate-y-2 hover:bg-[#623288] hover:text-black
            hover:scale-105 hover:delay-100">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faTags}
                  className="text-[#623288] text-4xl transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100"
                />
                <h1 className="text-3xl text-white font-bold transition-all duration-300 ease-in-outtransform group-hover:text-black group-hover:delay-100">
                  Special Offers
                </h1>
                <p className="text-gray-300 mt-2 font-semibold transition-all duration-300 ease-in-out transform group-hover:text-black group-hover:delay-100">
                  Unlock exclusive savings! Elevate your vaping experience with
                  special deals on premium products
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* right */}

        <div className="flex flex-col px-3  py-8 order-1 md:order-2 md:py-32  md:w-1/3 md:space-y-4 md:ml-auto"     data-aos="fade-left"
          data-aos-offset="600"
          data-aos-easing="ease-in-sine"
          data-aos-duration="2000">
  <span className="text-xl text-[#623288] font-bold">OUR SERVICE</span>
  <span className="text-5xl font-bold text-white">
    {" "}
    Best<span className="text-[#623288]"> Service</span> DazzleD
    <br /> Clouds
  </span>
  <p className="text-gray-300 text-wrap">
    Explore a world of excellence where your satisfaction is our top
    priority. Elevate your vaping journey with Best Service DazzleD,
    where clouds meet exceptional service.
  </p>
  <p className="text-gray-300 mt-5">
    Experience the pinnacle of customer service at Best Service DazzleD.
    Our commitment goes beyond just products; it's about creating an
    unparalleled experience for you. From expert advice on choosing the
    perfect vape to swift and hassle-free support, we're here for you
    every step of the way.
  </p>

  <span>
    <button className="bg-[#623288]  mt-3 py-3 px-6 rounded-full text-xl font-semibold transition-all duration-300 ease-in-out hover:text-white delay-100">
      View All
    </button>
  </span>
</div>

      </div>
    </div>
  );
};

export default Service;
