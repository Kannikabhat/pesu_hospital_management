// Doctors.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DoctorForm from '../components/DoctorForm';
import DoctorList from '../components/DoctorList';
import './Doctors.css'; // Import your CSS file

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const refreshDoctors = async () => {
    try {
      const response = await api.get('/api/doctors'); // Adjust URL if needed
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    refreshDoctors();
  }, []);

  return (
    <div className="doctors-container">
      <h2>Doctors</h2>
      <DoctorForm refreshDoctors={refreshDoctors} className="doctor-form" />
      <DoctorList doctors={doctors} refreshDoctors={refreshDoctors} className="doctor-list" />
    </div>
  );
};

export default Doctors;
