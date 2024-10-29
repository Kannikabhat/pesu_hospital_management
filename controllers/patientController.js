// controllers/patientController.js
const db = require('../config/database'); // Adjust the path to your database config

exports.createPatient = async (req, res) => {
  try {
    const { patient_name, contact_number, address, date_of_birth, age } = req.body;
    const result = await db.query(
      'INSERT INTO patients (patient_name, contact_number, address, date_of_birth, age) VALUES (?, ?, ?, ?, ?)',
      [patient_name, contact_number, address, date_of_birth, age]
    );
    res.status(201).json({ message: 'Patient created successfully', patient_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating patient' });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patients');
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving patients' });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const [patient] = await db.query('SELECT * FROM patients WHERE patient_id = ?', [patientId]);

    if (patient.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving patient' });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { patient_name, contact_number, address, date_of_birth, age } = req.body;

    const result = await db.query(
      'UPDATE patients SET patient_name = ?, contact_number = ?, address = ?, date_of_birth = ?, age = ? WHERE patient_id = ?',
      [patient_name, contact_number, address, date_of_birth, age, patientId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating patient' });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const result = await db.query('DELETE FROM patients WHERE patient_id = ?', [patientId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting patient' });
  }
};
