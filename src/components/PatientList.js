import React, { useState } from 'react';
import api from '../services/api';
import EditPatientModal from './EditPatientModal';
import './PatientList.css'; // Import the CSS file for styling

const PatientList = ({ patients, refreshPatients }) => {
  const [editPatient, setEditPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.delete(`/api/patients/${patientId}`);
        refreshPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setShowModal(true);
  };

  return (
    <div className="table-container">
      <h3>Patient List</h3>
      {showModal && editPatient && (
        <EditPatientModal 
          patient={editPatient} 
          onClose={() => setShowModal(false)} 
          refreshPatients={refreshPatients} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>{patient.patient_name}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.address}</td>
              <td>{patient.email || 'N/A'}</td>
              <td>{patient.age}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;


