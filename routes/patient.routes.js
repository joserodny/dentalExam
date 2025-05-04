// routes/patient.routes.js
import express from 'express';
import { registerPatient } from '../controllers/patient.controller.js'; // This should now correctly import

const router = express.Router();

// Register route
router.post('/register', registerPatient);

export default router;