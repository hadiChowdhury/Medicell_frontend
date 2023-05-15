"use client"
import { Users } from '@/interfaces';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInfo: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (userId: number) => {
    try {
      await axiosInstance.delete(`user/${userId}`);
      toast.success('User deleted.');
  
      // Refresh the product list
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DoB
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
            <a href='/adduser' className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
    Add Users
  </a></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.Id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.FirstName}</td>
              <td className="px-6 py-4 whitespace-nowrap"> { user.Gender === 0 ? "Male" : "Female" }</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(user.DateOfBirth).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.Email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.Phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.Address}</td>

              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDeleteProduct(user.Id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/dashboard" className="flex mt-10 text-sm font-semibold text-indigo-600">
                <svg className="w-4 mr-2 text-indigo-600 fill-current" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Go Back
            </a>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default UserInfo
