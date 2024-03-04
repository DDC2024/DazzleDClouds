import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmoking, faStar, faTint } from "@fortawesome/free-solid-svg-icons";
import "../components/style.css";

const FeatureProduct = () => {
  return (
    <div className="min-h-screen flex flex-col  bg-black py-4 px-36">
      <div className="flex flex-col justify-center items-center space-y-2">
        <span className="text-[#623288] text-xl font-bold">
          PUFF CLOUDS CATAGORIES
        </span>
        <span className="text-white text-5xl font-bold">
          Featured{" "}
          <span className="text-[#623288] text-5xl font-bold">Product</span>
        </span>
        <p className="text-gray-300 text-sm text-wrap text-center w-1/2  py-4 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non
          neque placerat, mattis mi quis, fermentum mauris. Ut dictum nibh quis
          nisl mollis, at fermentum lacus laoreet. Pellentesque imperdiet
          malesuada urna eu dapibus. Sed ut dui lectus. Quisque imperdiet
          dignissim nisi at tempus.
        </p>
      </div>

      <div className="mt-6 flex space-x-4 justify-center">
        <div className="flex flex-col space-y-4">
          <div className=" flex  space-x-5">
            <div
              className="group starterkit bg-[#623288] transition-all duration-500 ease-in-out rounded-md p-8 flex flex-col space-y-6 hover:delay-100"
              style={{
                position: "relative",
                height: "300px",
                width: "1000px",
                overflow: "hidden",
                zIndex: 0,
                transition: "background-color 0.5s ease-in-out",
              }}
            >
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-5xl transition-all duration-500 ease-in-out group-hover:text-[#623288] hover:delay-100"
                />
              </span>
              <span className="text-2xl font-bold transition-all duration-500 ease-in-out group-hover:text-white hover:delay-100">
                Starter Kit Bundle
              </span>
              <p className="text-md  w-2/3 transition-all duration-500 ease-in-out group-hover:text-gray-300 hover:delay-100">
                A perfect combination of essentials for beginners. Unbeatable
                value, stylish device, and diverse flavors all in one package.
                Elevate your start to vaping with ease.
              </p>
            </div>
            <div
              className="flex flex-col justify-center items-center bg-[#1d1d1d]  w-2/5 rounded-md space-y-4"
              style={{
                height: "320px",
              }}
            >
              <span>
                <FontAwesomeIcon
                  icon={faSmoking}
                  className="text-5xl transition-all duration-500 ease-in-out text-[#623288] hover:delay-100"
                />
              </span>
              <span className="text-2xl font-bold transition-all duration-500 ease-in-out text-white hover:delay-100">
                Disposable
              </span>
              <p className="text-md  w-2/3 transition-all duration-500 ease-in-out text-gray-300 hover:delay-100">
                A perfect combination of essentials for beginners. Unbeatable
                value, stylish device, and diverse flavors all in one package.
                Elevate your start to vaping with ease.
              </p>
            </div>
          </div>
          <div className=" flex   space-x-5">
          <div
              className="flex flex-col justify-center items-center bg-[#1d1d1d]  w-2/5 rounded-md space-y-4"
              style={{
                height: "320px",
              }}
            >
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-5xl transition-all duration-500 ease-in-out text-[#623288] hover:delay-100"
                />
              </span>
              <span className="text-2xl font-bold transition-all duration-500 ease-in-out text-white hover:delay-100">
                Starter Kit Bundle
              </span>
              <p className="text-md  w-2/3 transition-all duration-500 ease-in-out text-gray-300 hover:delay-100">
                A perfect combination of essentials for beginners. Unbeatable
                value, stylish device, and diverse flavors all in one package.
                Elevate your start to vaping with ease.
              </p>
            </div>

            <div
              className="group starterkit bg-[#1d1d1d] transition-all duration-500 ease-in-out rounded-md p-8 flex flex-col space-y-6 hover:delay-100"
              style={{
                position: "relative",
                height: "300px",
                width: "1000px",
                overflow: "hidden",
                zIndex: 0,
                transition: "background-color 0.5s ease-in-out",
              }}
            >
              <span>
                <FontAwesomeIcon
                  icon={faTint}
                  className="text-5xl transition-all duration-500 ease-in-out text-[#623288] hover:delay-100"
                />
              </span>
              <span className="text-2xl font-bold transition-all duration-500 ease-in-out text-white hover:delay-100">
                E-Liquids
              </span>
              <p className="text-md  w-2/3 transition-all duration-500 ease-in-out text-gray-300 hover:delay-100">
                A perfect combination of essentials for beginners. Unbeatable
                value, stylish device, and diverse flavors all in one package.
                Elevate your start to vaping with ease.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center bg-[#1d1d1d] rounded-md space-y-4 "
            style={{
              height: "630px",
              width: "320px",
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faStar}
                className="text-5xl transition-all duration-500 ease-in-out text-[#623288] hover:delay-100"
              />
            </span>
            <span className="text-2xl font-bold transition-all duration-500 ease-in-out text-white hover:delay-100">
              Starter Kit Bundle
            </span>
            <p className="text-md  w-2/3 transition-all duration-500 ease-in-out text-gray-300 hover:delay-100">
              A perfect combination of essentials for beginners. Unbeatable
              value, stylish device, and diverse flavors all in one package.
              Elevate your start to vaping with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
