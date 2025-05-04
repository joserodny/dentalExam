import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // for navigation after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        setError('');
        setMessage('');

        try {
            // Send registration request to the backend
            const response = await axios.post('/api/register', {
                name,
                email,
                password,
            });

            // Save JWT token and user info to localStorage
            localStorage.setItem('token', response.data.token);  // Save the token for future requests
            localStorage.setItem('user', JSON.stringify(response.data.user));  // Save the user info

            navigate('/dashboard');  // Redirect user to the dashboard

            // Reset the form
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            // Handle errors and display error message
            setError(err.response?.data || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form onSubmit={handleSubmit} className="px-5 py-7">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Full Name</label>
                    <input
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

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

                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                    {message && <div className="text-green-600 text-sm mb-2">{message}</div>}

                    <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold"
                    >
                    Register
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};
