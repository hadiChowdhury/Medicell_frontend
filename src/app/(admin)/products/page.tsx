"use client"
import { Product } from '@/interfaces';
import axiosInstance from '@/lib/axiosInstance';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axiosInstance.get('products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDeleteProduct = (productId: number) => {
        // Retrieve the cart data from sessionStorage
        const cartData = sessionStorage.getItem('cart');
        let cartItems = cartData ? JSON.parse(cartData) : [];

        // Check if the product is already in the cart
        const existingProduct = cartItems.find((item: { id: number }) => item.id === productId);

        if (existingProduct) {
            // Product already exists in the cart, increase the quantity
            existingProduct.quantity += 1;

            // Update the cart data in sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
            toast.success('Quantity of product increased in the cart.');

        } else {
            // Product doesn't exist in the cart, add it as a new item
            const newProduct = { id: productId, quantity: 1 };
            cartItems = [...cartItems, newProduct];

            // Update the cart data in sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
            toast.success('Product added to cart.');
        }
        setTimeout(() => {
            // Reload the page
            // This is the worst way to do it, but for now it's the only way. I'll fix it later when I learn more about React redux and context
            window.location.reload();
        }, 500);
    };

    return (
        <div className="flex flex-wrap justify-center">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map(product => (
                        <tr key={product.Id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.Name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.Quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.Description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${product.Price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {product.IsAvailable ? (
                                    <span className="text-green-500">In Stock</span>
                                ) : (<span className="text-red-500">Out of Stock</span>
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
            <ToastContainer position="bottom-left" />
        </div>
    );
};

export default ProductCard;

