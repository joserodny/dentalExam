import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { registerPatients, loginPatients, logout } from './controllers/auth.controller.js'
import { dentists, getAvailableAppointments, createAppointment } from './controllers/booking.controller.js';
import { updatePatient, getAppointments } from './controllers/patient.controller.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
});
// Test database connection
(async() => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

//api routes
app.post('/api/register', registerPatients);
app.post('/api/login', loginPatients);
app.post('/api/logout', logout);

// book appointment routes
app.get('/api/dentists', dentists);
app.get('/api/appointments/available/:dentistId', getAvailableAppointments);
app.post('/api/appointments', authenticateToken, createAppointment);
// user/patient routes
app.put('/api/patients/:id', authenticateToken, updatePatient);
app.get('/api/my-appointments', authenticateToken, getAppointments);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});