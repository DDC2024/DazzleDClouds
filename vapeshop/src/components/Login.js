import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Register from "./Register";



import loginbg from "../assets/kres.jpg";

const gif ="https://cdn.discordapp.com/attachments/1107578040084598844/1207236299883544677/bobo.gif?ex=65dee96b&is=65cc746b&hm=f70af9e26aed78d6b94c062576cb761042d6e443c9b6ec7f2ec3a3a7e83748d9&";
const Login = ({onLoginSuccess}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] =useState(false);
  const [toggle ,setToggle]=useState(false);

  const toggleHandler =()=>{
    setToggle(!toggle);
  }
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem("jwtToken", token);

      // Update isLoggedIn state if needed
      setIsLoggedIn(true);

      if (decodedToken.role === "admin" || decodedToken.role === "staff" ) {
        // Redirect to admin page if the user is an admin
        navigate("/admin");
      } else {
        console.log("User logged in successfully");
      }

      // Check if onLoginSuccess is provided before invoking it
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }
    } else {
      setError("Invalid username or password.");
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    setError("An error occurred during login. Please try again later.");
  }
};


  const loginBack = {
    minHeight: "60vh",
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      {!isLoggedIn ? <div className="flex justify-center items-center  bg-gray-200 rounded" data-aos="zoom-in">
        <div
          className="w-3/5 item flex flex-col justify-center  items-center"
          style={loginBack}
        >
          <span className="text-4xl font-bold text-gradient ">
            DazzleD Clouds
          </span>
        </div>
          {!toggle ?     <div className="w-2/5 p-8 m-4 ">
          <h2 className="text-xl text-center text-[#623288] font-bold mb-4">
            Login <span className="text-gray-800">Your Account</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3  text-[#623288]"
                />
                <span className="ml-2 text-gray-800">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#623288] text-sm hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex flex-col items-center space-y-2 mt-10">
              <button
                type="submit"
                className="bg-[#623288] hover:bg-[#793daa] w-full text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>

              <span className="text-md cursor-pointer hover:text-[#623288]">
              <button onClick={toggleHandler}> Create Account </button>
              </span>
            </div>
          </form>
        </div> :  <Register toggleHandler={toggleHandler} /> }
        []
      </div> : <div className="flex flex-col items-center justify-center text-green-500 p-2">
  {/* <FontAwesomeIcon icon={faCheckCircle} className="text-4xl mr-2 animate-bounce" /> */}
  <span className="text-[#623288] text-5xl font-bold " data-aos="zoom-in">Login successful</span>
  <img src={gif} alt="Check Circle" className="text-4xl mr-2 " data-aos="zoom-in"/>

</div>
 }
    </>
  );
};

export default Login;
