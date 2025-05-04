import { Routes, Route } from 'react-router-dom'; // Importing from react-router-dom
import { HomePage } from './pages/HomePage';       // Import HomePage component
import { BookingPage } from './pages/BookingPage'; // Import BookingPage component
import { PatientDashBoardPage } from './pages/PatientDashBoardPage'; // Import PatientDashBoardPage component

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Book" element={<BookingPage />} />
      <Route path="/Dashboard" element={<PatientDashBoardPage />} />
    </Routes>
  );
};
