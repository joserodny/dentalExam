import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // for navigation after successful login

    const handleRegister = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
    
        try {
            // Send registration request to the backend
            const response = await axios.post('/api/register', {
                name,
                email,
                password,
            });

    
            // Save JWT token and user info to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.patient));
            // SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You will be redirected to the dashboard.',
                timer: 2000,
                showConfirmButton: false
            });
    
            // Redirect after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
    
            // Reset the form
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            // SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data || 'Something went wrong',
            });
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form onSubmit={handleRegister} className="px-5 py-7">
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
