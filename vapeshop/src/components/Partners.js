import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUtensils, faTint, faLaptop, faEgg, faBreadSlice, faWrench ,faClock,faPhone,faWineBottle,faBowlFood,faShoppingBag} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal"; // Import the CustomModal component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partners = () => {
  // Updated partner data
  const partners = [
    { id: 1, name: "Dingle Generals Merchandise", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faShoppingBag, address: "123 Main St, Balungao", contactNumber: "123-456-7890", openTime: "8:00 AM", closingTime: "6:00 PM" },
    { id: 2, name: "Prime Resto", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faWineBottle, address: "456 Oak St, Balungao", contactNumber: "456-789-1234", openTime: "10:00 AM", closingTime: "10:00 PM" },
    { id: 3, name: "The Neyths Yard", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faUtensils, address: "789 Maple St, Balungao", contactNumber: "789-123-4567", openTime: "11:00 AM", closingTime: "11:00 PM" },
    { id: 4, name: "Aqua Water Refilling", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faTint, address: "321 Pine St, Balungao", contactNumber: "321-654-9870", openTime: "9:00 AM", closingTime: "5:00 PM" },
    { id: 5, name: "KKB Computer Shop", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faLaptop, address: "987 Cedar St, Balungao", contactNumber: "987-654-3210", openTime: "8:30 AM", closingTime: "7:00 PM" },
    { id: 6, name: "Joping Eggs", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faEgg, address: "654 Elm St, Balungao", contactNumber: "654-321-9870", openTime: "7:00 AM", closingTime: "4:00 PM" },
    { id: 7, name: "Rolan Pinapaitan", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faBowlFood, address: "147 Walnut St, Balungao", contactNumber: "147-258-3690", openTime: "10:30 AM", closingTime: "8:00 PM" },
    { id: 8, name: "Luvies Bakery", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faBreadSlice, address: "369 Birch St, Balungao", contactNumber: "369-258-1470", openTime: "6:00 AM", closingTime: "3:00 PM" },
    { id: 9, name: "Bornok Vulchanizing shop", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: faWrench, address: "852 Oak St, Balungao", contactNumber: "852-963-7410", openTime: "8:30 AM", closingTime: "5:30 PM" },
  ];


  const [selectedPartner, setSelectedPartner] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Function to handle opening the modal with partner details
  const handleOpenModal = (partner) => {
    setSelectedPartner(partner);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedPartner(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 py-4 px-8 md:px-36">
      <span className="mt-10 font-bold text-[#623288] text-3xl mb-4">Our Partners</span>
      <div className="text-gray-800 text-lg mb-4">
        <p className="w-2/5 text-gray-600 text-sm">
          To redeem your points, visit the shops of our partners below. Explore the exclusive offers and rewards available from our partners.
        </p>
   
        <span className="mt-10 items-center flex justify-center text-xl font-bold">Our Partners in Balungao</span>
      </div>

      <div className="partners-carousel">
        
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className="partner-container">
              <div
                className="partner bg-white rounded-md p-8 flex flex-col items-center justify-center"
                style={{ margin: "0 10px" }}
              >
                <FontAwesomeIcon
                  icon={partner.icon}
                  className="text-5xl text-[#623288] mb-4"
                />
                <span className="text-2xl font-bold text-gray-800 mb-2">
                  {partner.name}
                </span>
                <p className="text-md text-center text-gray-700">
                  {partner.description}
                </p>
                <button onClick={() => handleOpenModal(partner)} className="mt-4 px-6 py-2 text-[#623288] border border-[#623288] rounded-md hover:bg-[#623288] hover:text-white transition-colors duration-300">
                  See More Details
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Render the modal with partner details */}
      <CustomModal isOpen={!!selectedPartner} onRequestClose={handleCloseModal}>
        <div className="bg-[#1d1d1d] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">{selectedPartner?.name}</h2>
          <p className="text-lg text-gray-300 mb-4">{selectedPartner?.description}</p>
          <div className="flex flex-col">
            <div className="flex items-center text-gray-300 mb-2">
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              <span>{selectedPartner?.address}</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>{selectedPartner?.contactNumber}</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{selectedPartner?.openTime} - {selectedPartner?.closingTime}</span>
            </div>
          </div>
          <button 
            className="mt-6 px-6 py-2 bg-[#623288] text-white rounded-md hover:bg-[#8244b6] transition-colors duration-300"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Partners;
