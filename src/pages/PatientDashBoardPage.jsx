import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogoutComponent } from '../components/logout'; 
import axios from 'axios';


export const PatientDashBoardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage or backend on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        navigate('/login');
      }
    }
  }, [navigate]);

  //user edit function sweet alert
  const handleEditUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit User Details',
      html:
        `<input id="name" class="swal2-input" placeholder="Name" value="${user?.name || ''}">` +
        `<input id="email" class="swal2-input" placeholder="Email" value="${user?.email || ''}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (!name || !email) {
          Swal.showValidationMessage('Both fields are required');
          return false;
        }
        const updatedUser = {
            ...user,
            name, 
            email 
          };
      
          // Store the updated user details in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
        return { 
            id: user.id,
            name, 
            email 
        };
      }
    });
  
    if (formValues) {
        try {
          const res = await axios.put(`/api/patients/${user._id}`, formValues, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (res.status !== 200) throw new Error('Failed to update');
      
          const updatedUser = res.data;
          setUser(updatedUser);

          localStorage.setItem('user', JSON.stringify(updatedUser));

        } catch (error) {
          Swal.fire('Error', 'Failed to update user.', 'error');
        }
      }
  };
  

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="bg-white w-full md:w-1/2 h-screen px-6 lg:px-16 xl:px-24 flex items-center justify-center dark:bg-gray-800">
        <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="Description" 
                                className="w-25 shadow-xl rounded-full h-auto align-middle border-none max-w-xs lg:max-w-sm" 
                                />
                            </div>
                            
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <button onClick={handleEditUser}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {user && user.name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        {user && user.email}
                        </div>
                    </div>
                    <LogoutComponent/>
                </div>
            </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-screen bg-gray-50 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Book Appointment
          </button>
        </div>

        <table className="w-full border-collapse table-auto text-left">
          <thead>
            <tr className="bg-gray-200 bg-gray-700 text-gray-800 text-white">
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this row with dynamic appointment data */}
            <tr className="border-b  hover:bg-gray-100">
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
