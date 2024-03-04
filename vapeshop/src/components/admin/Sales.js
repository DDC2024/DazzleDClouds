import React, { useState, useEffect } from 'react';
import MyTable from '../MyTable';
import { Line } from 'react-chartjs-2';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/delivered-sales');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSales(data);
        setFilteredSales(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    // Calculate total profit
    const profit = filteredSales.reduce((acc, sale) => {
      const totalAmount = parseFloat(sale.totalAmount);
      const totalWholesalePrice = sale.products.reduce(
        (total, product) => total + product.quantity * product.product.wholesaleprice,
        0
      );
      return acc + (totalAmount - totalWholesalePrice);
    }, 0);
    setTotalProfit(profit.toFixed(2));

    // Calculate total sale
    const saleTotal = filteredSales.reduce((acc, sale) => acc + parseFloat(sale.totalAmount), 0);
    setTotalSale(saleTotal.toFixed(2));
  }, [filteredSales]);

  // Define columns for MyTable
  const columns = [
    {
      Header: 'Product Name',
      accessor: 'products',
      Cell: ({ value }) => value.map(product => product.product.name).join(', '),
    },
    {
      Header: 'Quantity Sold',
      accessor: 'productsQuantity',
      Cell: ({ row }) =>
        row.original.products.reduce((total, product) => total + product.quantity, 0),
    },
    {
      Header: 'Price',
      accessor: 'totalAmount',
    },
    {
      Header: 'Total Wholesale Price',
      accessor: 'totalWholesalePrice',
      Cell: ({ row }) =>
        row.original.products.reduce(
          (total, product) => total + product.quantity * product.product.wholesaleprice,
          0
        ),
    },
    {
      Header: 'Total Profit',
      accessor: 'totalProfit',
      Cell: ({ row }) => {
        const totalAmount = parseFloat(row.original.totalAmount);
        const totalWholesalePrice = row.original.products.reduce(
          (total, product) => total + product.quantity * product.product.wholesaleprice,
          0
        );
        return (totalAmount - totalWholesalePrice).toFixed(2);
      },
    },
  ];

  // Filter sales by date range
  const filterByDateRange = (startDate, endDate) => {
    const filtered = sales.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= startDate && saleDate <= endDate;
    });
    setFilteredSales(filtered);
  };

  // Filter sales for specific duration
  const filterByDuration = (duration) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - duration);
    filterByDateRange(startDate, today);
  };

  // Filter sales for today
  const filterToday = () => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
    filterByDateRange(startOfToday, endOfToday);
  };

  // Filter sales for yesterday
  const filterYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    const endOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);
    filterByDateRange(startOfYesterday, endOfYesterday);
  };

  // Filter sales for last 7 days
  const filterLast7Days = () => {
    filterByDuration(7);
  };

  // Filter sales for last 14 days
  const filterLast14Days = () => {
    filterByDuration(14);
  };

  // Filter sales for last 30 days
  const filterLast30Days = () => {
    filterByDuration(30);
  };

  // Filter all sales
  const filterAll = () => {
    setFilteredSales(sales);
  };

  // Prepare data for line chart
  const chartData = {
    labels: filteredSales.map(sale => new Date(sale.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Total Profit',
        data: filteredSales.map(sale => {
          const totalAmount = parseFloat(sale.totalAmount);
          const totalWholesalePrice = sale.products.reduce(
            (total, product) => total + product.quantity * product.product.wholesaleprice,
            0
          );
          return (totalAmount - totalWholesalePrice).toFixed(2);
        }),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Sales Information</h2>
        <div className="mt-4 flex space-x-4 mb-4" >
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterToday}>Today</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterYesterday}>Yesterday</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterLast7Days}>Last 7 Days</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterLast14Days}>Last 14 Days</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterLast30Days}>Last 30 Days</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700" onClick={filterAll}>All</button>
        </div>
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <MyTable columns={columns} data={filteredSales} />
        </div>
        
        

        <div className="mt-2 font-bold">
          Total sale: <span className='text-blue-500 font-semibold'>{totalSale}</span>
        </div>
        <div className="mt-2 font-bold">
          Net Income: <span className='text-orange-500 font-semibold'>{totalSale - totalProfit}</span>
        </div>
        <div className="mt-4 font-bold">
          Total profit: <span className='text-green-500 font-semibold'>{totalProfit}</span>
        </div>
      
        <div className="mt-32">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Sales;
