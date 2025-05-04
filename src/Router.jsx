import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { PatientDashBoardPage } from './pages/PatientDashBoardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
export const RoutesComponent = () => {
    return (
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage/>} />
        <Route path="/Book" element={<BookingPage />} />
        <Route path="/Dashboard" element={<PatientDashBoardPage />} />
        </Routes>
    );
};
