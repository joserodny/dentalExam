import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const PatientDashBoardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage or backend on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // Check if user is authenticated
    if (!token || !storedUser) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    // Parse and set user data from localStorage
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
    navigate('/login');
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="bg-white w-full md:w-1/2 h-screen px-6 lg:px-16 xl:px-24 flex items-center justify-center dark:bg-gray-800">
        <div className="w-full">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-6 dark:text-white">
            Profile
          </h1>
          {user ? (
            <div className="text-left text-gray-800 dark:text-gray-200 space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Loading patient data...</p>
          )}

<button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4"
        >
          Logout
        </button>
        </div>
        
      </div>

      <div className="w-full md:w-1/2 h-screen bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Appointments</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Book Appointment
          </button>
        </div>

        <table className="w-full border-collapse table-auto text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this row with dynamic appointment data */}
            <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <td className="p-3">2025-05-06</td>
              <td className="p-3">10:30 AM</td>
              <td className="p-3">Dr. Smith</td>
              <td className="p-3 text-green-600 font-semibold">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
