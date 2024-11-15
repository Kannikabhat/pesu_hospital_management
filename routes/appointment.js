const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');


//router.get('/patients/for-doctor', appointmentsController.getPatientsForDoctor);
// Get patients for dropdown
router.get('/patients/:doctorId', appointmentsController.getPatientsForDoctor);
router.get('/patients', appointmentsController.getPatientsForAppointment); // Don't repeat /api/appointments

// Get doctors for dropdown
router.get('/doctors', appointmentsController.getDoctorsForAppointment); // Don't repeat /api/appointments

// Fetch all appointments
router.get('/', appointmentsController.getAppointments); // Don't repeat /api/appointments

// Create appointment
router.post('/', appointmentsController.createAppointment); // Don't repeat /api/appointments

// Update appointment
router.put('/:id', appointmentsController.updateAppointment); // Don't repeat /api/appointments

// Delete appointment
router.delete('/:id', appointmentsController.deleteAppointment); // Don't repeat /api/appointments

module.exports = router;
