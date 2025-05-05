import { dbConfig } from '../dbConfig.js';
export const updatePatient = (req, res) => {

    const { id, name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const sql = 'UPDATE patients SET name = ?, email = ? WHERE id = ?';

    dbConfig.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating patient:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient updated successfully' });
    });
}

export const getAppointments = async(req, res) => {
    const sql = `
      SELECT appointments.*, dentists.name AS dentistName
      FROM appointments
      LEFT JOIN dentists ON appointments.dentistId = dentists.id
      WHERE appointments.patientId = ?
      ORDER BY appointments.date ASC;`;
      

    try {
        const [rows] = await dbConfig.query(sql, [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};