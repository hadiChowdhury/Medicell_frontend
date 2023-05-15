"use client"
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Gender: 0,
        DateOfBirth: '',
        Email: '',
        Phone: '',
        ProfilePicture: "",
        Address: '',
        Password: '',
        Role: 2, // 2 for Admin
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };



    const handleSubmit = (e: any) => {
        e.preventDefault();
        axiosInstance.post('user', formData)
            .then(response => {
                window.location.href = '/users';
            })
            .catch(error => {
                // Handle registration error
                console.error(error);
            });
    };

    return (
        <div className="max-w-md p-4 mx-auto mt-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Add Users</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block font-medium">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="FirstName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block font-medium">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="LastName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1/2 mb-4">
                        <label htmlFor="gender" className="block mb-2 font-medium">Gender</label>
                        <select
                            id="gender"
                            name="Gender"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.Gender}
                            onChange={handleChange}
                            required
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                    </div>
                    <div className="w-1/2 mb-4">
                        <label htmlFor="dob" className="block mb-2 font-medium">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="DateOfBirth"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.DateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block font-medium">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="Phone"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.Phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block font-medium">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="Address"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.Address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePicture" className="block font-medium">Profile Picture</label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="ProfilePicture"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.ProfilePicture}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-6">
  <div className="flex flex-col space-y-2">
    <button
      type="submit"
      className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Register
    </button>
    <a href="/users" className="flex mt-10 text-sm font-semibold text-indigo-600">
                <svg className="w-4 mr-2 text-indigo-600 fill-current" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Go Back
            </a>
  </div>
</div>
            </form>
        </div>
    );
};

export default RegistrationForm;
