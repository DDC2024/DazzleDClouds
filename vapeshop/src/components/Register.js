import React, { useState } from 'react';
import axios from 'axios';

const Register = ({toggleHandler }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    number: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        number: ''
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="w-2/5 m-4 px-4">
     <h2 className="text-xl text-center text-[#623288] font-bold mb-4">
            Register <span className="text-gray-800">Your Account</span>
          </h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex space-x-4'>
          
        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.firstname ?  'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder="Firstname "
          />
        </div>

        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.lastname ?  'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder="Lastname "
          />
        </div>
        </div>
        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.username ? 'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder=" Username"
          />
        </div>

        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.email ?  'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder="EMail "
          />
        </div>

        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.password ?  'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder=" Password"
          />
        </div>


        <div className="mb-4 relative">
          <label
            className={`absolute transition-all ${
              formData.number ? 'text-md font-bold text-black top-[-10px]' : 'hidden'
            }`}
            htmlFor="number"
          >
            Number
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border-b-2 border-[#623288] p-2 bg-transparent"
            placeholder="Number "
          />
        </div>

        <button
          type="submit"
          className="bg-[#623288] hover:bg-[#793daa] text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <button onClick={toggleHandler} >Sign in</button>
      </form>

      {error && <div className='text-red-500 font-bold text-sm'>Error: {error}</div>}
      {successMessage && <div className='text-green-500 font-bold text-sm'>Success: {successMessage}</div>}
    </div>
  );
}

export default Register;
