import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AppointmentForm = ({ refreshAppointments }) => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/api/appointments/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId || !doctorId || !appointmentDate) {
      setError('All fields are required');
      return;
    }

    try {
      await api.post('/api/appointments', {
        patient_id: patientId,
        doctor_id: doctorId,
        appointment_date: appointmentDate,
        status: status,
      });
      setError('');
      setPatientId('');
      setDoctorId('');
      setAppointmentDate('');
      refreshAppointments(); // Refresh the appointments list after adding
    } catch (error) {
      setError('Error creating appointment');
      console.error(error);
    }
  };

  // Show loading message until data is fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Appointment</h3>

      <label>Patient:</label>
      <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient.patient_id} value={patient.patient_id}>
            {patient.patient_name}
          </option>
        ))}
      </select>

      <label>Doctor:</label>
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
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
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        min={new Date().toISOString().slice(0, 16)} // Prevent selecting past dates
      />

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button type="submit">Create Appointment</button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default AppointmentForm;
