import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConfig } from '../dbConfig.js';

// Register
export const registerPatients = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert patient into the database
        const result = await dbConfig.query(
            `INSERT INTO patients (name, email, password, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())`, [name, email, hashedPassword]
        );

        const patientId = result.insertId; // Get the inserted patient's ID

        // Create JWT token with patient data
        const token = jwt.sign(
            { id: patientId, name, email }, // Include `name`, `id`, and `email` in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        // Send response with the JWT token and patient data
        res.status(201).json({
            token,
            patient: { id: patientId, name, email } // Return patient data as response
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Login
export const loginPatients = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            console.error('Email or password missing');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const [rows] = await dbConfig.query('SELECT * FROM patients WHERE email = ?', [email]);

        if (rows.length === 0) {

            return res.status(400).json({ message: 'User not found' });
        }

        // Extract user from the returned rows
        const user = rows[0];

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        // Send the token and user info in the response
        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};