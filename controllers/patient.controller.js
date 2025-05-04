import bcrypt from 'bcryptjs';
import { dbConfig } from '../dbConfig.js';

export const registerPatients = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await dbConfig.query(
            `INSERT INTO patients (name, email, password, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())`, [name, email, hashedPassword]
        );

        res.status(201).send('User registered successfully!');
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).send('Internal Server Error');
    }
};