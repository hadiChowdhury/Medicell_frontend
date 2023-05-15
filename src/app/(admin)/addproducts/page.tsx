"use client"
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

const AddProductPage: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [Quantity, setQuantity] = useState(0);
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [IsAvailable, setAvailable] = useState(0);
    const [CategoryId, setCategoryId] = useState(0);
    const [CompanyId, setCompanyId] = useState(0);
    const [ImageUrl, setImageUrl] = useState("https://image.similarpng.com/very-thumbnail/2020/07/Medicine-and-capsusls-different-colors-clipart-PNG.png");




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send the product data to the server
            await axiosInstance.post('/product', {
                Name: productName,
                Quantity,
                Description,
                Price,
                IsAvailable,
                CategoryId,
                CompanyId,
                ImageUrl
            });

            // Clear the form fields
            setProductName('');
            setQuantity(0);
            setDescription('');
            setPrice(0);
            setAvailable(0);
            setCategoryId(0);
            setCompanyId(0);

            // Show success message or redirect to product list page
            // You can customize this based on your requirements
            alert('Product added successfully!');
        } catch (error) {
            console.error(error);
            // Show error message or handle the error
            // You can customize this based on your requirements
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="productName" className="block mb-2">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block mb-2">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        value={Quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={Price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="availability" className="block mb-2">
                        Availability
                    </label>
                    <select
                        id="availability"
                        value={IsAvailable}
                        onChange={(e) => setAvailable(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value={1}>In Stock</option>
                        <option value={0}>Out of Stock</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="CategoryId" className="block mb-2">
                        CategoryId:
                    </label>
                    <input
                        type="number"
                        id="CategoryId"
                        value={CategoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="CompanyId" className="block mb-2">
                        CompanyId:
                    </label>
                    <input
                        type="number"
                        id="CompanyId"
                        value={CompanyId}
                        onChange={(e) => setCompanyId(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
