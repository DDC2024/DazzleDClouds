import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUserCircle, faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Mainlogo from "../assets/latestlogo.png";
import CustomModal from "./CustomModal";
import Login from "./Login";
import CartIcon from "./CartIcon";
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode'; 

const MainNavigation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userPoints, setUserPoints] = useState(0); // State to store user's points
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowDropdown(true);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }

    // Fetch cart item count from the database
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); 
        if (!token) {
          throw new Error('User not authenticated.');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; 

        const response = await axios.get(`http://localhost:5000/cartItems?userId=${userId}`);
        setCartItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
      }
    };

    // Fetch user's points
    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); 
        if (!token) {
          throw new Error('User not authenticated.');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; 

        const response = await axios.get(`http://localhost:5000/api/users/${userId}/points`);
        setUserPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching user points:', error.message);
      }
    };

    fetchCartItems();
    fetchUserPoints();

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate('/');
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex justify-around items-center  py-3 bg-[#1d1d1d] text-white fixed top-0 z-50 w-full">
      <div className="text-[#623288] font-bold mb-1">
        <img
          src={Mainlogo}
          alt="logo"
          style={{ width: "100px", height: "auto" }}
        />
      </div>
      <div className="md:hidden">
        <FontAwesomeIcon
          icon={faBars}
          className="text-[#623288] text-2xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>
      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1d1d1d] z-50">
          <ul className="flex flex-col ">
            <li>
              <Link
                exact
                to="/"
                activeClassName="active"
                className="font-semibold hover:text-[#623288] px-4 py-2 block"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              
            </li>
            <li>
              <Link
                to="/shop"
                activeClassName="active"
                className="font-semibold text-white hover:text-[#623288] px-4 py-2 block"
                onClick={handleLinkClick}
              >
                Shop
              </Link>
            </li>
          
            <li>
              
            </li>
            <li>
              <Link
                to="/register"
                activeClassName="active"
                className="font-semibold text-white hover:text-[#623288] px-4 py-2 block border-b border-[#bbbbbb]"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/myorder"
                    className="font-semibold hover:text-[#623288] px-4 py-2 block"
                    onClick={handleLinkClick}
                  >
                    My Order
                  </Link>
                </li>
                <li>
                <li>
              <Link
                to="/cart"
                className="font-semibold hover:text-[#623288] px-4 py-2 block"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Cart ({cartItemCount})
              </Link>
            </li>
                  <Link
                    to="/profile"
                    className="font-semibold hover:text-[#623288] px-4 py-2 block"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <span
                    className="font-semibold hover:text-[#623288] px-4 py-2 block cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li>
                <span
                  className="font-semibold hover:text-[#623288] px-4 py-2 block cursor-pointer"
                  onClick={openModal}
                >
                  Please Login
                </span>
              </li>
            )}
           
          </ul>
        </div>
      )}
      <div className="hidden md:block">
        <ul className="flex space-x-8">
          <li className="font-semibold hover:text-[#623288]">
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="text-white font-semibold hover:text-[#623288]">
            <NavLink to="/shop" activeClassName="active">
              Shop
            </NavLink>
            
          </li>
          <li className="text-white font-semibold hover:text-[#623288]">
            <NavLink to="/aboutus" activeClassName="active">
              About Us
            </NavLink>
          </li>
         
          <li className="text-white font-semibold hover:text-[#623288]">
            <NavLink to="/register" activeClassName="active">
              Contact Us
            </NavLink>
          </li>
          <li className="text-white font-semibold hover:text-[#623288]">
            <NavLink to="/raffleview" activeClassName="active">
              Event
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex items-center space-x-5">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <FontAwesomeIcon
              icon={faUserCircle}
              onClick={handleDropdownToggle}
              className="text-[#623288] text-2xl cursor-pointer"
            />
            {showDropdown && (
              <ul className="absolute right-0 top-full bg-white rounded-lg shadow-lg mt-2 py-1 w-36">
                <li>
                  <NavLink
                    to="/myorder"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    My Order
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <span
                    onClick={logout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>

                <li>
                  <span className="block px-4 py-2 text-gray-800">Points: {userPoints}</span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <span onClick={openModal}>
            <FontAwesomeIcon
              icon={faSignIn}
              className="text-[#623288] text-2xl cursor-pointer"
            />
          </span>
        )}
        {isLoggedIn ? (
          <NavLink to="/cart">
            <CartIcon />
          </NavLink>
        ) : (
          <span className="text-gray-500">Please sign in</span>
        )}
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </CustomModal>
    </nav>
  );
};

export default MainNavigation;
