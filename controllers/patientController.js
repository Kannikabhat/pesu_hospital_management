const connection = require('../config/db');

// Create Patient with transaction
exports.createPatient = (req, res) => {
  const { patient_name, phone_number, email, address, age } = req.body;

  if (!patient_name || !phone_number || !email || !address || age === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sqlContact = 'INSERT INTO contactdetails (phone_number, email) VALUES (?, ?)';
  const sqlPatient = 'INSERT INTO patients (patient_name, contact_id, address, age) VALUES (?, ?, ?, ?)';

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error starting transaction', error: err });
    }

    // Insert contact details
    connection.query(sqlContact, [phone_number, email], (err, contactResults) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ message: 'Error inserting into contactdetails', error: err });
        });
      }
      const contactId = contactResults.insertId;

      // Insert patient details
      connection.query(sqlPatient, [patient_name, contactId, address, age], (err, patientResults) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ message: 'Error inserting into patients', error: err });
          });
        }

        // Commit transaction
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ message: 'Error committing transaction', error: err });
            });
          }

          res.status(201).json({ message: 'Patient created successfully', patient_id: patientResults.insertId });
        });
      });
    });
  });
};

// Get all Patients (including contact details)
exports.getPatients = (req, res) => {
  const sql = `SELECT p.patient_id, p.patient_name, c.phone_number, c.email, p.address, p.age
               FROM patients p
               JOIN contactdetails c ON p.contact_id = c.contact_id`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching patients', error: err });
    }
    res.status(200).json(results);
  });
};

// Get Patient by ID
exports.getPatientById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT p.patient_id, p.patient_name, c.phone_number, c.email, p.address, p.age
               FROM patients p
               JOIN contactdetails c ON p.contact_id = c.contact_id
               WHERE p.patient_id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching patient', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Update Patient with transaction
exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const { patient_name, phone_number, email, address, age } = req.body;

  const sqlUpdatePatient = `UPDATE patients SET patient_name = ?, address = ?, age = ? WHERE patient_id = ?`;
  const sqlUpdateContact = `UPDATE contactdetails SET phone_number = ?, email = ? WHERE contact_id = ?`;
  const sqlGetContactId = `SELECT contact_id FROM patients WHERE patient_id = ?`;

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error starting transaction', error: err });
    }

    // Get contact_id to update contact details
    connection.query(sqlGetContactId, [id], (err, contactIdResults) => {
      if (err || contactIdResults.length === 0) {
        return connection.rollback(() => {
          res.status(500).json({ message: 'Error fetching contact details', error: err });
        });
      }

      const contactId = contactIdResults[0].contact_id;

      // Update contact details
      connection.query(sqlUpdateContact, [phone_number, email || null, contactId], (err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ message: 'Error updating contact details', error: err });
          });
        }

        // Update patient details
        connection.query(sqlUpdatePatient, [patient_name, address, age, id], (err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ message: 'Error updating patient', error: err });
            });
          }

          // Commit transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: 'Error committing transaction', error: err });
              });
            }

            res.status(200).json({ message: 'Patient updated successfully' });
          });
        });
      });
    });
  });
};

// Delete Patient
exports.deletePatient = (req, res) => {
  const { id } = req.params;
  const sqlDeletePatient = `DELETE FROM patients WHERE patient_id = ?`;

  connection.query(sqlDeletePatient, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting patient', error: err });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  });
};

// Get count of patients
exports.getPatientCount = (req, res) => {
  const sql = 'SELECT COUNT(*) AS patient_count FROM patients';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching patient count', error: err });
    }
    res.status(200).json(results[0]);  // Return the count
  });
};





