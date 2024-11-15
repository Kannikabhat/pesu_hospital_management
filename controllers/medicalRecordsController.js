const connection = require('../config/db');

// Get all medical records
exports.getAllRecords = (req, res) => {
    connection.query('SELECT * FROM medical_records', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching medical records' });
        }
        res.json(results);
    });
};

// Get medical records by patient
exports.getRecordsByPatient = (req, res) => {
    const patientId = req.params.patientId;
    connection.query('SELECT * FROM medical_records WHERE patient_id = ?', [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching medical records for patient' });
        }
        res.json(results);
    });
};

// Create new medical record
// exports.createRecord = (req, res) => {
//     const { patient_id, doctor_id, diagnosis, treatment, prescription, record_date } = req.body;
//     const query = 'INSERT INTO medical_records (patient_id, doctor_id, diagnosis, treatment, prescription, record_date) VALUES (?, ?, ?, ?, ?, ?)';
//     connection.query(query, [patient_id, doctor_id, diagnosis, treatment, prescription, record_date], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error creating medical record' });
//         }
//         res.status(201).json({ message: 'Medical record created successfully' });
//     });
// };

// Create new medical record using stored procedure
exports.createRecord = (req, res) => {
    const { patient_id, doctor_id, diagnosis, treatment, prescription, record_date } = req.body;
    const query = 'CALL AddMedicalRecords(?, ?, ?, ?, ?, ?)';

    connection.query(
        query,
        [patient_id, doctor_id, diagnosis, treatment, prescription, record_date],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating medical record' });
            }
            res.status(201).json({ message: 'Medical record created successfully, and corresponding appointment deleted.' });
        }
    );
};


// Update medical record
exports.updateRecord = (req, res) => {
    const { diagnosis, treatment, prescription, record_date } = req.body;
    const recordId = req.params.recordId;
    const query = 'UPDATE medical_records SET diagnosis = ?, treatment = ?, prescription = ?, record_date = ? WHERE record_id = ?';
    connection.query(query, [diagnosis, treatment, prescription, record_date, recordId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating medical record' });
        }
        res.json({ message: 'Medical record updated successfully' });
    });
};

// Delete medical record
exports.deleteRecord = (req, res) => {
    const recordId = req.params.recordId;
    connection.query('DELETE FROM medical_records WHERE record_id = ?', [recordId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting medical record' });
        }
        res.json({ message: 'Medical record deleted successfully' });
    });
};
