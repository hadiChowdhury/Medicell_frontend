"use client"
import { Orders, Product } from '@/interfaces';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (orderId: number) => {
    try {
      await axiosInstance.delete(`order/${orderId}`);
      toast.success('Order deleted.');
  
      // Refresh the product list
      fetchProducts();
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
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Oder Date

            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            OrderedBy
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.Id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.Id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.OderDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.Total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.UserFirstName}</td>

              <td className="px-6 py-4 whitespace-nowrap">
              <Link className='text-blue-500' href={`/order/${order.Id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default OrderPage
