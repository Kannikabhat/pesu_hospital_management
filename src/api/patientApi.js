// src/api/patientApi.js
import api from '../services/api';

const getPatients = () => {
  return api.get('/patients');
};

const createPatient = (patientData) => {
  return api.post('/patients', patientData);
};

const updatePatient = (id, patientData) => {
  return api.put(`/patients/${id}`, patientData);
};

const deletePatient = (id) => {
  return api.delete(`/patients/${id}`);
};

export { getPatients, createPatient, updatePatient, deletePatient };
