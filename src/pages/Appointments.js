import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AppointmentForm from '../components/AppointmentForm';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div>
      <h2>Appointments</h2>
      <AppointmentForm refreshAppointments={fetchAppointments} />
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.appointment_id}>
            Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
