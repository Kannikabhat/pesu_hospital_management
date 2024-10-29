import React, { useState } from 'react';
import api from '../services/api';

const AppointmentForm = ({ refreshAppointments }) => {
  const [newAppointment, setNewAppointment] = useState({ patient_id: '', doctor_id: '', appointment_date: '', status: 'Pending' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', newAppointment);
      refreshAppointments(); // Refresh the appointments list
      setNewAppointment({ patient_id: '', doctor_id: '', appointment_date: '', status: 'Pending' }); // Reset form
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        placeholder="Patient ID" 
        value={newAppointment.patient_id} 
        onChange={(e) => setNewAppointment({ ...newAppointment, patient_id: e.target.value })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Doctor ID" 
        value={newAppointment.doctor_id} 
        onChange={(e) => setNewAppointment({ ...newAppointment, doctor_id: e.target.value })} 
        required 
      />
      <input 
        type="datetime-local" 
        placeholder="Appointment Date" 
        value={newAppointment.appointment_date} 
        onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })} 
        required 
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
