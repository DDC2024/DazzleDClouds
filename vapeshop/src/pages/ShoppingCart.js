import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import background from "../assets/back2.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faPesoSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md">
        <p className="text-lg mb-4">
          Are you sure you want to proceed with the purchase?
        </p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4">
            Cancel
          </button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const { handleRemoveItemFromCart, handleBuyItems, cartItemCount } = useAuth();

  const firstBackground = {
    minHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmPurchase = () => {
    toggleModal();
    const totalPriceWithFee = totalPrice + deliveryFee;
    
    // Call handleBuyItems with the updated total price
    handleBuyItems(totalPriceWithFee);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("User not authenticated.");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(
          `http://localhost:5000/cartItems?userId=${userId}`
        );
        setItems(response.data);

        const totalPrice = response.data.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
        setTotalPrice(totalPrice);

        const subtotal = response.data.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        setSubtotal(subtotal);

        let fee = 0;
        const selectedBarangay = document.getElementById("area").value;
        if (totalPrice <= 10000) {
          if (selectedBarangay === "Kita-kita") {
            fee = 21;
          } else if (selectedBarangay === "Poblacion") {
            fee = 31;
          } else if (selectedBarangay === "Pugaro") {
            fee = 51;
          }
        }
        setDeliveryFee(fee);

        const total = totalPrice + fee;
        setTotal(total);
      } catch (error) {
        console.error(
          "An error occurred while fetching cart items:",
          error.message
        );
      }
    };

    fetchCartItems();
  }, [items, totalPrice]);

  const handleRemoveFromCart = (productId) => {
    handleRemoveItemFromCart(productId);
  };

  const handleQuantityChange = async (index, newQuantity) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const itemId = items[index]._id;

      const response = await axios.put(
        `http://localhost:5000/cartItems/${itemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update quantity");
      }

      // If the update was successful, update the quantity in the local state
      const updatedItems = [...items];
      updatedItems[index].quantity = newQuantity;
      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="h-screen flex justify-center items-center p-12 "
      style={firstBackground}
    >
      <div className="h-4/5 w-2/3 flex rounded-md bg-black">
        <div className="w-2/3 bg-white h-full">
          {items.length === 0 ? null : <div className="flex justify-between items-center  py-2 px-8 font-bold">
              <span className="w-2/5">Product</span>
              <span className="w-1/5">Price</span>
              <span className="w-1/5">Quantity</span>
              <span className="w-1/5">Total Price</span>
              <span className="w-1/8">Action</span>
            </div>
           
          }
          <div className="flex flex-col p-4">
            {currentItems.map((item, index) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 px-4"
              >
                <div className="w-2/5">
                  <span>{item.product?.name}</span>
                  {item.product?.photoUrl && (
                    <img
                      src={item.product.photoUrl}
                      alt={item.product.name}
                      className="w-16 h-16"
                    />
                  )}
                </div>
                <span className="w-1/5">
                  <FontAwesomeIcon icon={faPesoSign} /> {item.product?.price}
                </span>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                </div>
                <span className="w-1/5">
                  {item.product?.price !== undefined && item.quantity !== undefined
                    ? `P ${(item.product.price * item.quantity).toFixed(2)}`
                    : ""}
                </span>
                <button onClick={() => handleRemoveFromCart(item.product._id)}>
                  <FontAwesomeIcon icon={faTrash} />{" "}
                </button>
              </div>
            ))}
            {items.length >= 6 && (
              <div className="flex justify-center items-center space-x-4">
                {Array.from(
                  { length: Math.ceil(items.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 border font-semibold border-[#623288] text-[#623288] hover:bg-[#d19cfc] ${
                        currentPage === index + 1
                          ? "bg-[#d19cfc] text-white"
                          : ""
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center p-20">
            {items.length === 0 && (
              <div className="flex flex-col space-y-2">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-6xl text-[#623288] animate-bounce"
                />
                <Link to="/your-link" className="py-2 px-4 border font-semibold border-[#623288] text-[#623288] hover:bg-[#d19cfc]">
                  SHOP HERE!
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5 bg-[#623288] h-full py-10">
        {items.length === 0 ? null : <div className=" flex flex-col items-center">
          <div>
            <div className="flex justify-between items-center space-x-5">
              <span className="text-gray-200 font-semibold text-sm">
                Product Price:
              </span>
              <span className="text-xl font-semibold ">
                <FontAwesomeIcon icon={faPesoSign} /> {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center space-x-5">
              <span className="text-gray-200 font-semibold text-sm">
                Subtotal:
              </span>
              <span className="text-xl font-semibold">{subtotal}</span>
            </div>
            <div className="flex justify-between items-center space-x-5">
              <span className="text-gray-200 font-semibold text-sm">
                Delivery Fee:
              </span>
              <span className="text-xl font-semibold">{deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center space-x-5">
              <span className="text-gray-200 font-semibold text-sm">
                Total:
              </span>
              <span className="text-xl font-semibold">{total}</span>
            </div>
          </div>
          <div className="mt-4 w-full px-12">
            <label htmlFor="houseNumber" className="text-gray-200 block mb-1">
              House Number:
            </label>
            <input
              type="text"
              id="houseNumber"
              className="px-4 py-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4 w-full px-12">
            <label htmlFor="area" className="text-gray-200 block mb-1">
              Barangay:
            </label>
            <select
              id="area"
              className="px-4 py-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Kita-kita">Kita-kita</option>
              <option value="Poblacion">Poblacion</option>
              <option value="Pugaro">Pugaro</option>
            </select>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-[#1d1d1d] text-gray-200 rounded-xl"
            onClick={toggleModal}
          >
            Check out
          </button>
          </div>}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onConfirm={handleConfirmPurchase}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
