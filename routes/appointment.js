const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken, appointmentController.createAppointment);
router.get('/', authMiddleware.verifyToken, appointmentController.getAppointments);
router.get('/:id', authMiddleware.verifyToken, appointmentController.getAppointmentById);
router.put('/:id', authMiddleware.verifyToken, appointmentController.updateAppointment);
router.delete('/:id', authMiddleware.verifyToken, appointmentController.deleteAppointment);

module.exports = router;
