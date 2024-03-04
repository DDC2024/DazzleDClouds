import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RaffleView = () => {
  const [latestRaffle, setLatestRaffle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestRaffle = async () => {
      try {
        const response = await axios.get('http://localhost:5000/latest');
        setLatestRaffle(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching latest raffle data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchLatestRaffle();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!latestRaffle) {
    return <div>No latest raffle data available</div>;
  }

  return (
    <div className="min-h-screen px-6 flex flex-col items-center bg-gray-200 w-full py-24">
      <h2 className="text-4xl font-bold mb-8">Latest Raffle Event</h2>
      <div className='flex justify-between gap-24'>
        <div className='flex flex-col w-1/2 '>
          <div className="flex flex-col bg-white shadow rounded-lg p-4 text-lg">
            <h3 className="text-2xl font-semibold mb-6">Raffle Details</h3>
            <p><span className="font-semibold">Start Date:</span> {latestRaffle.start_date || 'TBD'}</p>
            <p><span className="font-semibold">End Date:</span> {latestRaffle.end_date || 'TBD'}</p>
            <p><span className="font-semibold">Entry Fee:</span> {latestRaffle.entry_fee || 'TBD'}</p>
            <p><span className="font-semibold">Total Entries Needed:</span> {latestRaffle.total_entries_needed || 'TBD'}</p>
            <p><span className="font-semibold">Status:</span> {latestRaffle.status || 'TBD'}</p>
            <p><span className="font-semibold">Prize 1:</span> {latestRaffle.prize1_product ? latestRaffle.prize1_product.name : 'TBD'}</p>
            <p><span className="font-semibold">Prize 2:</span> {latestRaffle.prize2_product ? latestRaffle.prize2_product.name : 'TBD'}</p>
            <p><span className="font-semibold">Prize 3:</span> {latestRaffle.prize3_product ? latestRaffle.prize3_product.name : 'TBD'}</p>
            <p><span className="font-semibold">Winner 1:</span> {latestRaffle.winner1_id || 'TBD'}</p>
            <p><span className="font-semibold">Winner 2:</span> {latestRaffle.winner2_id || 'TBD'}</p>
            <p><span className="font-semibold">Winner 3:</span> {latestRaffle.winner3_id || 'TBD'}</p>
            <p><span className="font-semibold">Entry Date:</span> {latestRaffle.entry_date || 'TBD'}</p>
            <p><span className="font-semibold">Participants:</span> {latestRaffle.participants ? latestRaffle.participants.length : 'TBD'}</p>
          </div>
        </div>
        <div className="ml-12 w-1/2">
          <h3 className="text-xl font-semibold mb-4">Mechanics and Rules</h3>
          <ul className="list-disc pl-6">
            <li>Payments accepted: Gcash</li>
            <li>Participants must visit our shop to join</li>
            <li>First winner will be the 3rd place</li>
            <li>Second winner will be the 2nd place</li>
            <li>The last winner will get the first Prize</li>
            <li>The raffle will not start until all slots are filled</li>
            <li>Payments accepted: Gcash or bank transfer</li>
            <li>Each participant can only purchase a maximum of 2 raffle tickets</li>
            <li>Winners will be selected randomly using a transparent and audited draw process</li>
            <li>Participants must claim their prize in person at our shop within 7 days of the draw</li>
            <li>Participants must agree to have their name and photo published on our website and social media in case of winning</li>
            <li>The organizer reserves the right to cancel or modify the raffle in case of unforeseen circumstances</li>
          </ul>
        </div>
      </div>

        <div className='flex'>
    <img src={latestRaffle.prize1_product ? latestRaffle.prize1_product.photoUrl : 'placeholder_url_for_prize1_image'} alt="Prize 1" className="prize-image" style={{ width: '250px', height: '300px', marginRight: '10px' }} />
    <img src={latestRaffle.prize2_product ? latestRaffle.prize2_product.photoUrl : 'placeholder_url_for_prize2_image'} alt="Prize 2" className="prize-image" style={{ width: '250px', height: '300px', marginRight: '10px' }} />
    <img src={latestRaffle.prize3_product ? latestRaffle.prize3_product.photoUrl : 'placeholder_url_for_prize3_image'} alt="Prize 3" className="prize-image" style={{ width: '250px', height: '300px' }} />
  </div>


    </div>
  );
};

export default RaffleView;
