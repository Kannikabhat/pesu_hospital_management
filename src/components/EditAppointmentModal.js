import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EditAppointmentModal = ({ appointment, onClose, refreshAppointments }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState({ ...appointment });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/api/appointments/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch doctors for dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/api/appointments/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/appointments/${appointment.appointment_id}`, updatedAppointment);
      refreshAppointments(); // Refresh the list after update
      onClose(); // Close the modal
      alert("Appointment updated successfully");
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert("Error updating appointment");
    }
  };

  return (
    <div className="modal">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleUpdate}>
        <label>Patient:</label>
        <select 
          value={updatedAppointment.patient_id} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, patient_id: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.patient_name}
            </option>
          ))}
        </select>

        <label>Doctor:</label>
        <select 
          value={updatedAppointment.doctor_id} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, doctor_id: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.doctor_name}
            </option>
          ))}
        </select>

        <label>Appointment Date:</label>
        <input
          type="datetime-local"
          value={updatedAppointment.appointment_date}
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, appointment_date: e.target.value })}
          required
        />

        <label>Status:</label>
        <select 
          value={updatedAppointment.status} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">Update Appointment</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditAppointmentModal;
