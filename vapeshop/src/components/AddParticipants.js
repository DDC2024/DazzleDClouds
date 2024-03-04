import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyTable from './MyTable';
import CustomModal from './CustomModal';

const AddParticipants = () => {
  const [raffles, setRaffles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRaffleId, setSelectedRaffleId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all raffles from the backend when the component mounts
    const fetchRaffles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/raffles');
        setRaffles(response.data);
      } catch (error) {
        console.error('Error fetching raffles:', error);
        setError('Error fetching raffles');
      }
    };

    fetchRaffles();
  }, []);

  // Function to handle adding a participant
  const handleAddParticipant = async () => {
    setIsLoading(true);
    try {
      // Send POST request to add participant
      await axios.post(`http://localhost:5000/raffles/${selectedRaffleId}/participants`, { participantName });
      setIsLoading(false);
      setParticipantName('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding participant:', error);
      setError('Error adding participant');
      setIsLoading(false);
    }
  };

  const columns = [
    {
      Header: 'Raffle ID',
      accessor: 'raffleId',
    },
    {
      Header: 'Participant Count',
      accessor: row => row.participants.length, // Access the length of participants array
    },
    {
      Header: 'Date Started',
      accessor: 'start_date',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedRaffleId(row.original._id);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Participant
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2>Raffles</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MyTable data={raffles} columns={columns} />
      )}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2>Add Participant</h2>
        <input
          type="text"
          placeholder="Participant Name"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
        <button onClick={handleAddParticipant} className="bg-blue-500 text-white px-4 py-2 rounded">
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </CustomModal>
    </div>
  );
};

export default AddParticipants;
