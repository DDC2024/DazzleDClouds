import React, { useState, useEffect } from 'react';
import MyTable from './MyTable';
import axios from 'axios';
import AdminHeader from './AdminHeader';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); 
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'First Name',
        accessor: 'firstname',
      },
      {
        Header: 'Last Name',
        accessor: 'lastname',
      },
      {
        Header: 'Number',
        accessor: 'number',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    []
  );

  return (
    <div className='w-full min-h-screen py-16 ]'>
    <AdminHeader />
    <div className="p-8 bg-white shadow-md">
      <h1 className="text-3xl font-semibold mb-4"> User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <MyTable columns={columns} data={users} />
      )}
    </div>
    </div>
  );
};

export default AdminUserList;
