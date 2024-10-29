// src/components/PatientModal.js
import React, { useEffect, useState } from 'react';
import { createPatient, updatePatient } from '../api/patientApi'; // Change to createPatient

const PatientModal = ({ patient, onClose }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    contact_number: '',
    address: '',
    date_of_birth: '',
    age: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        patient_name: '',
        contact_number: '',
        address: '',
        date_of_birth: '',
        age: '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patient) {
      await updatePatient(patient.patient_id, formData); // Update with patient ID
    } else {
      await createPatient(formData); // Use createPatient
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{patient ? 'Edit Patient' : 'Add Patient'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Patient Name:
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;
