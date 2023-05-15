"use client"
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import ProductCard from '../products/page';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);



  useEffect(() => {
    fetchProductCount();
    fetchUserCount();
    fetchOrderCount();

  }, []);

  const fetchProductCount = async () => {
    try {
      const response = await axiosInstance.get('products');
      const count = response.data.length;
      setProductCount(count);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserCount = async () => {
    try {
      const response = await axiosInstance.get('users');
      const count = response.data.length;
      setUserCount(count);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderCount = async () => {
    try {
      const response = await axiosInstance.get('orders');
      const count = response.data.length;
      setOrderCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
   <div className="container mx-auto mt-8 flex space-x-4">
  <Link href="/products">
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xs cursor-pointer">
      <h1 className="text-2xl font-bold mb-4">Products Count</h1>
      <p className="text-lg">Products in stock: {productCount}</p>
    </div>
  </Link>

  <Link href="/users">
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xs cursor-pointer">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="text-lg">Total Users: {userCount}</p>
    </div>
  </Link>
  <Link href="/orders">
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xs cursor-pointer">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p className="text-lg">Total Users: {orderCount}</p>
    </div>
  </Link>
</div>


    </>
  );
};

export default Dashboard;
