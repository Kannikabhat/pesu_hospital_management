// DoctorForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DoctorForm.css'; // Import the CSS file

const DoctorForm = ({ refreshDoctors }) => {
  const [newDoctor, setNewDoctor] = useState({
    doctor_name: '',
    specialization_id: '',
    phone_number: '',
    email: '',
    address: '',
  });
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await api.get('/api/specializations');
        setSpecializations(response.data);
      } catch (error) {
        console.error('Failed to fetch specializations', error);
      }
    };
    fetchSpecializations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newDoctor.email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await api.post('/api/doctors', newDoctor);
      refreshDoctors();
      setNewDoctor({ doctor_name: '', specialization_id: '', phone_number: '', email: '', address: '' });
      setError('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      setError('Failed to add doctor. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Doctor Name" 
        value={newDoctor.doctor_name} 
        onChange={(e) => setNewDoctor({ ...newDoctor, doctor_name: e.target.value })} 
        required 
      />
      <select 
        value={newDoctor.specialization_id} 
        onChange={(e) => setNewDoctor({ ...newDoctor, specialization_id: e.target.value })} 
        required
      >
        <option value="">Select Specialization</option>
        {specializations.map(spec => (
          <option key={spec.specialization_id} value={spec.specialization_id}>
            {spec.specialization_name}
          </option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={newDoctor.phone_number} 
        onChange={(e) => setNewDoctor({ ...newDoctor, phone_number: e.target.value })} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newDoctor.email} 
        onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={newDoctor.address} 
        onChange={(e) => setNewDoctor({ ...newDoctor, address: e.target.value })} 
        required 
      />
      <button type="submit">Add Doctor</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default DoctorForm;
