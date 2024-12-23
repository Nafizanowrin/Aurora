const express = require('express');
const {
    bookAppointment,
    getAppointments,
    getAppointmentById,
    approveAppointment,
    getAppointmentsByEmail
} = require('../controllers/appointmentController');

const router = express.Router();

// POST route for booking an appointment
router.post('/', bookAppointment);

// GET route to fetch appointments by email
router.get('/email/:email', getAppointmentsByEmail);

// GET route to fetch all appointments
router.get('/', getAppointments);

// GET route to fetch a specific appointment by ID
router.get('/:id', getAppointmentById);

router.put('/:id',approveAppointment);



module.exports = router;
