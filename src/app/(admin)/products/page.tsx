"use client"
import { Product } from '@/interfaces';
import axiosInstance from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`product/${productId}`);
      toast.success('Product deleted.');
  
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
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Availability
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
  <a href='/addproducts' className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
    Add Product
  </a>
</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.Id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.Price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.IsAvailable ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product.Id)}
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

export default ProductCard
