const connection = require('../config/db');

// Create Doctor
exports.createDoctor = (req, res) => {
  const { doctor_name, specialization_id, phone_number, email, address } = req.body;

  const sqlGetSpecialization = 'SELECT specialization_name FROM specializations WHERE specialization_id = ?';
  const sqlContact = 'INSERT INTO contactdetails (phone_number, email) VALUES (?, ?)';
  const sqlDoctor = 'INSERT INTO doctors (doctor_name, specialization_id, contact_id, address, phone_number, specialization) VALUES (?, ?, ?, ?, ?, ?)';

  // Fetch the specialization_name
  connection.query(sqlGetSpecialization, [specialization_id], (err, specializationResults) => {
    if (err || specializationResults.length === 0) {
      return res.status(500).json({ message: 'Error fetching specialization', error: err });
    }
    const specializationName = specializationResults[0].specialization_name;

    // Insert contact details
    connection.query(sqlContact, [phone_number, email], (err, contactResults) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating contact details', error: err });
      }
      const contactId = contactResults.insertId;

      // Insert doctor details, including the actual specialization name
      connection.query(sqlDoctor, [doctor_name, specialization_id, contactId, address, phone_number, specializationName], (err, doctorResults) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating doctor', error: err });
        }
        res.status(201).json({ message: 'Doctor created successfully', doctor_id: doctorResults.insertId });
      });
    });
  });
};

// Get all Doctors (Updated to include email)
exports.getDoctors = (req, res) => {
  const sql = `SELECT d.doctor_id, d.doctor_name, s.specialization_name, c.phone_number, c.email, d.address
               FROM doctors d
               JOIN contactdetails c ON d.contact_id = c.contact_id
               JOIN specializations s ON d.specialization_id = s.specialization_id`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching doctors', error: err });
    }
    res.status(200).json(results);
  });
};

// Get Doctor by ID (Updated to include email)
exports.getDoctorById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT d.doctor_id, d.doctor_name, s.specialization_name, c.phone_number, c.email, d.address
               FROM doctors d
               JOIN contactdetails c ON d.contact_id = c.contact_id
               JOIN specializations s ON d.specialization_id = s.specialization_id
               WHERE d.doctor_id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching doctor', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Update Doctor (Updated to include email)
exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { doctor_name, specialization_id, phone_number, email, address } = req.body;

  const sqlUpdateDoctor = `UPDATE doctors SET doctor_name = ?, specialization_id = ?, address = ?, phone_number = ?, specialization = ? 
                           WHERE doctor_id = ?`;
  const sqlUpdateContact = `UPDATE contactdetails SET phone_number = ?, email = ? 
                            WHERE contact_id = ?`;
  const sqlGetContactId = `SELECT contact_id FROM doctors WHERE doctor_id = ?`;
  const sqlGetSpecialization = 'SELECT specialization_name FROM specializations WHERE specialization_id = ?';

  // Fetch specialization name first
  connection.query(sqlGetSpecialization, [specialization_id], (err, specializationResults) => {
    if (err || specializationResults.length === 0) {
      return res.status(500).json({ message: 'Error fetching specialization', error: err });
    }
    const specializationName = specializationResults[0].specialization_name;

    // Get contact_id to update contact details
    connection.query(sqlGetContactId, [id], (err, contactIdResults) => {
      if (err || contactIdResults.length === 0) {
        return res.status(500).json({ message: 'Error fetching contact details', error: err });
      }
      const contactId = contactIdResults[0].contact_id;

      // Prepare to update contact details
      const updateContactParams = [phone_number, email || null, contactId]; // Use null if email is not provided

      // Update contact details
      connection.query(sqlUpdateContact, updateContactParams, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating contact details', error: err });
        }

        // Update doctor details
        connection.query(sqlUpdateDoctor, [doctor_name, specialization_id, address, phone_number, specializationName, id], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error updating doctor', error: err });
          }
          res.status(200).json({ message: 'Doctor updated successfully' });
        });
      });
    });
  });
};

// Delete Doctor
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;
  const sqlDeleteDoctor = 'DELETE FROM doctors WHERE doctor_id = ?';

  // Delete doctor, the trigger will handle contact details deletion
  connection.query(sqlDeleteDoctor, [id], (err, doctorResults) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting doctor', error: err });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};
