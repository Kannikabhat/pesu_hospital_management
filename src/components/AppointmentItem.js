import React, { useState } from 'react';
import api from '../services/api';
import EditAppointmentForm from './EditAppointmentModal';

const AppointmentItem = ({ appointment, refreshAppointments }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteAppointment = async () => {
    try {
      await api.delete(`/appointments/${appointment.appointment_id}`);
      refreshAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <EditAppointmentForm appointment={appointment} refreshAppointments={refreshAppointments} />
      ) : (
        <>
          <p>
            Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteAppointment}>Delete</button>
        </>
      )}
    </li>
  );
};

export default AppointmentItem;
