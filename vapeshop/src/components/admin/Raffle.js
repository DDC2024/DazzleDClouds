import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddParticipants from '../AddParticipants';

const Raffle = () => {
  const [raffleInfo, setRaffleInfo] = useState({
    start_date: '',
    end_date: '',
    entry_fee: '',
    total_entries_needed: '',
    prize1_product_id: '', // Update prize IDs to product IDs
    prize2_product_id: '', // Update prize IDs to product IDs
    prize3_product_id: '' // Update prize IDs to product IDs
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRaffleInfoChange = (e) => {
    const { name, value } = e.target;
    setRaffleInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/raffles', raffleInfo);
      console.log('Raffle created:', response.data);
      // Handle successful raffle creation
    } catch (error) {
      console.error('Error creating raffle:', error);
      // Handle error
    }
  };
  

  return (
    <div className="raffle-container min-h-screen flex justify-around p-8 ">
      <div className="card" style={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Raffle</h2>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={raffleInfo.start_date}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={raffleInfo.end_date}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="entry_fee">Entry Fee:</label>
          <input
            type="number"
            id="entry_fee"
            name="entry_fee"
            value={raffleInfo.entry_fee}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="total_entries_needed">Total Entries Needed:</label>
          <input
            type="number"
            id="total_entries_needed"
            name="total_entries_needed"
            value={raffleInfo.total_entries_needed}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="prize1">Prize 1:</label>
          <select
            id="prize1"
            name="prize1_product_id"
            value={raffleInfo.prize1_product_id}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Prize 1</option>
            {products.map(product => (
              <option key={product.id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="prize2">Prize 2:</label>
          <select
            id="prize2"
            name="prize2_product_id"
            value={raffleInfo.prize2_product_id}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Prize 2</option>
            {products.map(product => (
              <option key={product.id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="prize3">Prize 3:</label>
          <select
            id="prize3"
            name="prize3_product_id"
            value={raffleInfo.prize3_product_id}
            onChange={handleRaffleInfoChange}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Prize 3</option>
            {products.map(product => (
              <option key={product.id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#623288', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Create Raffle
        </button>
      </div>
      <AddParticipants/>
    </div>
  );
};

export default Raffle;
