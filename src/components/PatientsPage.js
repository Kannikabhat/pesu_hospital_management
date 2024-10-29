// src/components/PatientsPage.js
import React, { useEffect, useState } from 'react';
import PatientModal from './PatientModal';
import { fetchPatients, deletePatient } from '../api/patientApi';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const patientsData = await fetchPatients();
    setPatients(patientsData);
  };

  const handleDelete = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      await deletePatient(patientId);
      loadPatients();
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    loadPatients();
  };

  return (
    <div className="patients-page">
      <h1>Patients</h1>
      <button onClick={handleAdd}>Add Patient</button>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_name}</td>
              <td>{patient.contact_number}</td>
              <td>{patient.address}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.age}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PatientsPage;
