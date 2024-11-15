const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// Patient routes
router.get('/count', patientController.getPatientCount);
router.post('/', patientController.createPatient); // Create a new patient
router.get('/', patientController.getPatients);   // Get all patients
router.get('/:id', patientController.getPatientById); // Get a patient by ID
router.put('/:id', patientController.updatePatient); // Update patient by ID
router.delete('/:id', patientController.deletePatient); // Delete patient by ID


module.exports = router;
