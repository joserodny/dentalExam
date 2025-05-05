import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

export const BookingPage = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    axios.get('/api/dentists').then(res => setDentists(res.data));
  }, []);

  useEffect(() => {
    if (selectedDentist) {
      axios.get(`/api/appointments/available/${selectedDentist}`)
        .then(res => setAvailableDates(res.data));
    }
  }, [selectedDentist]);

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 h-screen px-6 lg:px-16 xl:px-24
      flex items-center justify-center">

      <div className="w-full h-100">

        <a className='font-bold text-2xl' href='/Dashboard'>
          Home
        </a>

        <h1 className="text-xl md:text-3xl font-bold leading-tight mt-12">Book your appointment with Bright Smiles Dental Care</h1>
        <p className="text-gray-700 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie metus
          turpis. Vivamus mollis diam
          quis erat tincidunt.</p>

        <form className="mt-6" method="POST">
          <div>
            <label className="block text-gray-700">Select Dentists.</label>
            <select 
              className="w-full px-4 py-3 rounded bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none" 
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
              required
              >
                 <option value=''>-- Select Dentist --</option>
              {dentists.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
              </select>
          </div>

          <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded
            px-4 py-3 mt-4">Book Appointment</button>  
        </form>
      </div>
    </div>

    <div className="m-5 mt-5 lg:block w-full md:w-1/2 h-screen">
    <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={availableDates}
        />
    </div>

  </section>
  );
}
