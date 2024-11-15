const express = require('express');
const router = express.Router();
const medicalRecordsController = require('../controllers/medicalRecordsController');

// Get all medical records
router.get('/', medicalRecordsController.getAllRecords);

// Get medical records by patient
router.get('/patient/:patientId', medicalRecordsController.getRecordsByPatient);

// Create new medical record
router.post('/', medicalRecordsController.createRecord);

// Update medical record
router.put('/:recordId', medicalRecordsController.updateRecord);

// Delete medical record
router.delete('/:recordId', medicalRecordsController.deleteRecord);

module.exports = router;
