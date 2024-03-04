import React, { useEffect, useRef } from 'react';
import AdminHeader from '../components/AdminHeader';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCloud, faHandshake, faTags, faTruck ,faStar, faSpellCheck, faShoppingCart, faMoneyBill, faUser} from "@fortawesome/free-solid-svg-icons";
import { useAdmin } from '../components/admin/AdminContext'; // Import the useAdmin hook

const AdminStatistic = () => {
  const { users, products, orders, orderCount, deliveredCount } = useAdmin(); // Access users, products, orders, orderCount, and deliveredCount from the context

  // Sample data for statistics
  const statistics = [
    { title: 'Total Sales', value: deliveredCount, icon: <FontAwesomeIcon icon={faSpellCheck} /> }, // Use deliveredCount directly
    { title: 'Orders Pending', value: orderCount, icon: <FontAwesomeIcon icon={faShoppingCart} /> }, // Use orderCount instead of orders.length
    { title: 'Users', value: users.length, icon: <FontAwesomeIcon icon={faUser} /> }, // Display the length of users array
    { title: 'Total Product', value: products.length, icon: <FontAwesomeIcon icon={faStar} /> }, // Display the length of products array
  ];
  // Chart data for line chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  // Chart data for pie chart
  const pieChartData = {
    labels: ['Pending', 'Cancelled', 'Confirmed', 'Delivered'],
    datasets: [{
      label: 'My Dataset',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      hoverOffset: 4
    }]
  };

  // Reference for the line chart canvas
  const lineChartRef = useRef(null);

  // Reference for the pie chart canvas
  const pieChartRef = useRef(null);

  // Effect for line chart
  useEffect(() => {
    let lineChartInstance = null;

    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
 
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }

      // Create a line chart instance
      lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
      });
    }

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, [lineChartData]);

  // Effect for pie chart
  useEffect(() => {
    let pieChartInstance = null;

    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext('2d');
 
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }

      // Create a pie chart instance
      pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: pieChartData,
      });
    }

    return () => {
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
    };
  }, [pieChartData]);
  
  return (
    <div className='w-full min-h-screen py-16 bg-[#f1f5f9]'>
      <AdminHeader />
      {/* Main content */}
      <div className='flex flex-col px-10'>     
        <div className="flex  justify-around mt-8">
        {/* Statistics boxes */}
        {statistics.map((statistic, index) => (
          <div key={index} className="w-72 mx-4 my-2 bg-white rounded-lg shadow-md  py-4 px-6">
             <span className='text-3xl text-[#4697e4]'>{statistic.icon}</span>
            <h2 className="text-lg font-bold ">{statistic.title}</h2>
            <p className="text-xl">{statistic.value}</p>
            <p className='text-gray-500 text-sm'>Total:{statistic.title}</p>
          </div>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="flex justify-around  mt-8">
        <div className="w-1/2 ">
          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <canvas ref={lineChartRef}></canvas>
          </div>
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>
        <div className='w-2/6  bg-white rounded-lg shadow-md p-6'>
          <span>test</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminStatistic;
