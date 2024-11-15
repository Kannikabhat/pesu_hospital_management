import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DoctorForm from './DoctorForm';
import EditDoctorModal from './EditDoctorModal'; // Import the edit modal component
import { Link } from 'react-router-dom';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For editing
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      await api.delete(`/api/doctors/${doctorId}`); // Adjust API endpoint as needed
      fetchDoctors(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>Manage Doctors</h1>
      <DoctorForm refreshDoctors={fetchDoctors} />
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>
            {doctor.doctor_name} - {doctor.specialization_name}
            <button onClick={() => openEditModal(doctor)}>Edit</button>
            <button onClick={() => handleDelete(doctor.doctor_id)}>Delete</button>
            <Link to={`/doctor/${doctor.doctor_id}`}>View Details</Link>
          </li>
        ))}
      </ul>

      {showEditModal && (
        <EditDoctorModal 
          doctor={selectedDoctor} 
          onClose={() => setShowEditModal(false)} 
          refreshDoctors={fetchDoctors} 
        />
      )}
    </div>
  );
};

export default DoctorManagement;
