import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import cors from 'cors';


import { registerPatients, loginPatients } from './controllers/auth.controller.js'


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
    connectionLimit: 10,
    queueLimit: 0
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

//api routes
app.post('/api/register', registerPatients);
app.post('/api/login', loginPatients);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});