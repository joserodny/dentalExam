import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { PatientDashBoardPage } from './pages/PatientDashBoardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PrivateRoute } from './components/privateRoute';
import { GuestRoute } from './components/guestRoute';


export const RoutesComponent = () => {
    return (
        <Routes>
        <Route path="/" element={<HomePage />} />
  
        {/* Guest-only routes */}
        <Route
          path="/Login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/Register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
  
        {/* Protected routes */}
        <Route
          path="/Book"
          element={
              <BookingPage />
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <PatientDashBoardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    );
};
