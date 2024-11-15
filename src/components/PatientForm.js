// PatientForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PatientForm.css'; // Import your CSS file

const PatientForm = ({ refreshPatients }) => {
  const [newPatient, setNewPatient] = useState({
    patient_name: '',
    email: '',
    address: '',
    age: '',
  });
  const [phone_number, setPhoneNumber] = useState(''); // Separate state for phone number
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newPatient.email)) {
      setError('Invalid email format');
      return;
    }

    if (isNaN(newPatient.age) || newPatient.age <= 0) {
      setError('Age must be a valid positive number');
      return;
    }

    try {
      // Create a patient with contact details separately
      const response = await api.post('/api/patients', {
        ...newPatient,
        phone_number, // Include phone_number for API logic
      });
      refreshPatients();
      setNewPatient({ patient_name: '', email: '', address: '', age: '' });
      setPhoneNumber(''); // Reset phone number
      setError('');
    } catch (error) {
      console.error('Error adding patient:', error);
      setError('Failed to add patient. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Patient Name" 
        value={newPatient.patient_name} 
        onChange={(e) => setNewPatient({ ...newPatient, patient_name: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phone_number} // Bind phone number state
        onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newPatient.email} 
        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={newPatient.address} 
        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Age" 
        value={newPatient.age} 
        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} 
        required 
      />
      <button type="submit">Add Patient</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PatientForm;
