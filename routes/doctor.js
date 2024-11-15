const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor routes
router.post('/', doctorController.createDoctor);   // Create a new doctor
router.get('/', doctorController.getDoctors);      // Get all doctors
router.get('/:id', doctorController.getDoctorById); // Get a doctor by ID
router.put('/:id', doctorController.updateDoctor); // Update doctor by ID
router.delete('/:id', doctorController.deleteDoctor); // Delete doctor by ID

module.exports = router;
