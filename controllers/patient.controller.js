import { dbConfig } from '../dbConfig.js';
import { promisify } from 'util';

const queryAsync = promisify(dbConfig.query).bind(dbConfig);

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
  };

  //show dentists
  export const dentists = async (req, res) => {
  
    // SQL query to select all records from the 'dentists' table
    const sql = 'SELECT * FROM dentists';
    
    try {
      // Execute the SQL query using dbConfig and destructure the result
      const [result] = await dbConfig.query(sql);
      
      // Send the query result as a JSON response
      res.json(result);
    } catch (err) {
      // Send a 500 Internal Server Error response with an error message
      return res.status(500).json({ error: 'Database error' });
    }
  };

  export const getAvailableAppointments = async (req, res) => {
    const dentistId = req.params.dentistId;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    const currentYear = today.getFullYear();
    const futureDates = [];
    
    // Set start date as today and end date as end of current year
    const startDate = new Date(today); // Start from today
    const endDate = new Date(currentYear, 11, 31); // Dec 31st
    
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateOnly = new Date(date); // clone the date
      futureDates.push(dateOnly.toISOString().split('T')[0]); // 'YYYY-MM-DD'
    }
  
  
    try {
      // Fetch appointments for the given dentistId
      const [booked] = await dbConfig.query(
        `SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, status FROM appointments WHERE dentistId = ?`,
        [dentistId]
      );
  
      // Map the data from the database to easily access the status by date
      const bookedMap = {};
      booked.forEach(row => {
        bookedMap[row.date] = row.status;
      });
  
     
      const result = futureDates.map(date => {
        const status = bookedMap[date];
        
        // If the appointment is booked, mark it as not available
        if (status === 'Booked') {
          return { 
            title: 'Not Available', 
            date,
            color: '#FF0000', // Red color for not available
            textColor: '#FFFFFF' // White text for better contrast
          };
        }
        
        // If no appointment for this date or status is Cancelled, it's available
        return { 
          title: 'Available', 
          date,
          color: '#4CAF50', // Green color for available
          textColor: '#FFFFFF' // White text for better contrast
        };
      });
  
      // Send the response with available and not available dates
      res.json(result);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Database error' });
    }
  };
  