import React, { useState } from 'react';
import axios from 'axios';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
    
        try {
            // Register the user
            await axios.post('/api/register', {
                name,
                email,
                password,
            });
    
            // Automatically log in the user
            const loginResponse = await axios.post('/api/login', {
                email,
                password,
            });
    
            // Store token or set auth context/state as needed
            localStorage.setItem('token', loginResponse.data.token); // or use your preferred method
            setMessage('Registration and login successful!');
    
            // Redirect if needed (e.g., to dashboard)
            // navigate('/dashboard'); <-- if using react-router-dom
    
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
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
