import { dbConfig } from '../dbConfig.js';

// GET all dentists
export const dentists = async(req, res) => {
    const sql = 'SELECT * FROM dentists';
    try {
        const [result] = await dbConfig.query(sql);
        res.json(result);
    } catch (err) {
        console.error('Error fetching dentists:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET available appointments for a dentist
export const getAvailableAppointments = async(req, res) => {
    const dentistId = req.params.dentistId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureDates = [];
    const endDate = new Date(today.getFullYear(), 11, 31);

    for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
        futureDates.push(date.toISOString().split('T')[0]);
    }

    try {
        const [booked] = await dbConfig.query(
            `SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, status FROM appointments WHERE dentistId = ?`, [dentistId]
        );

        const bookedMap = {};
        booked.forEach(row => {
            bookedMap[row.date] = row.status;
        });

        const result = futureDates.map(date => {
            const status = bookedMap[date];
            return {
                title: status === 'Booked' ? 'Not Available' : 'Available',
                date,
                color: status === 'Booked' ? '#FF0000' : '#4CAF50',
                textColor: '#FFFFFF'
            };
        });

        res.json(result);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Database error' });
    }
};


export const createAppointment = (req, res) => {
    const patientId = req.user.id;
    const { dentistId, date } = req.body;

    if (!dentistId || !date) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const sql = `
    INSERT INTO appointments (patientId, dentistId, date, status, createdAt, updatedAt)
    VALUES (?, ?, ?, 'Booked', NOW(), NOW())
    `;

    dbConfig.query(sql, [patientId, dentistId, date], (err, result) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'Failed to book appointment.' });
        }

        return res.status(201).json({
            message: 'Appointment booked successfully.',
            appointmentId: result.insertId
        });
    });
};