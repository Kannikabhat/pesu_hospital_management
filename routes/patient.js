const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken, patientController.createPatient);
router.get('/', authMiddleware.verifyToken, patientController.getPatients);
router.get('/:id', authMiddleware.verifyToken, patientController.getPatientById);
router.put('/:id', authMiddleware.verifyToken, patientController.updatePatient);
router.delete('/:id', authMiddleware.verifyToken, patientController.deletePatient);

module.exports = router;
