import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                text: 'You are now logged in.',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });

            // Save JWT token and user info to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to dashboard after successful login
            navigate('/dashboard');

            // Reset form
            setEmail('');
            setPassword('');
        } catch (err) {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Login failed!',
                text: err.response?.data?.message || 'Something went wrong!',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input
                            type="email"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input
                            type="password"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
