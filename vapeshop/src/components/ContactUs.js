import React from 'react'
import  googlemap from '../assets/map.jpg'
import background2nd from '../assets/secondBackground.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook, faEnvelope, faHouse, faPhone, faSmoking, faStar, faTint } from "@fortawesome/free-solid-svg-icons";



const ContactUs = () => {
    const contactbackground = {
        backgroundImage: `url(${background2nd})`,
        backgroundSize: "cover",
      };
  return (
    <div id="contactus" className='min-h-screen flex px-48 py-10 ' style={contactbackground}>


            <div className='w-1/2 flex flex-col space-y-4'>
                {/* map */}
                <div className=' '> <img src={googlemap} alt='map'  className='w-full  '/></div>
                {/* contact */}
                <div>
                    <h1 className='text-3xl text-[#623288] font-bold'>Contact</h1>
                    <p className='text-white text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Maecenas euismod finibus laoreet. Integer a fringilla odio. Pellentesque habitant morbi 
                     tristique senectus et netus et malesuada fames ac turpis egestas.</p> <br/>
                    <p className='text-white text-sm'>Ut sed velit congue, tempus metus vitae, blandit nisl. Quisque ultricies vehicula purus ac posuere. Duis cursus mi laoreet lacus rhoncus, et tincidunt turpis tempus. Phasellus tempus turpis et lorem volutpat.</p>    
                </div>
                {/* lets talk */}
                <div className='mt-5'>
                   <div> <h1 className='text-3xl text-[#623288] font-bold'>Let's Talk</h1></div>
                   <div className='flex justify-around mt-7'>
                    <div className='flex flex-col items-start space-y-1'><FontAwesomeIcon icon={faHouse}  className='text-[#623288] text-5xl'/>
                        <span className='text-white'>Shop Address: </span>
                        <span className='text-gray-400 text-sm'>Balungao Pangasinan</span>
                     </div>
                     <div className='flex flex-col items-start space-y-1'><FontAwesomeIcon icon={faPhone}  className='text-[#623288] text-5xl'/>
                        <span className='text-white'>Call Us: </span>
                        <span className='text-gray-400 text-sm'>9666666666</span>
                     </div>
                     <div className='flex flex-col items-start space-y-1'><FontAwesomeIcon icon={faEnvelope}  className='text-[#623288] text-5xl'/>
                        <span className='text-white'>Mail Us: </span>
                        <span className='text-gray-400 text-sm'>test@gmail.com</span>
                     </div>
                   </div>
                </div>
            </div>

        <div>right</div>


        


    </div>
  )
}

export default ContactUs