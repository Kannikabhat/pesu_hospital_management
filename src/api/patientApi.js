// import api from '../services/api';

// // Get all patients
// const getPatients = () => {
//   return api.get('/api/patients');
// };

// // Create a new patient
// const createPatient = async (patientData) => {
//   return api.post('/api/patients', patientData);
// };

// // Update patient details
// const updatePatient = (id, patientData) => {
//   return api.put(`/api/patients/${id}`, patientData);
// };

// // Delete patient
// const deletePatient = (id) => {
//   return api.delete(`/api/patients/${id}`);
// };

// export { getPatients, createPatient, updatePatient, deletePatient };


import axios from 'axios';

const apiUrl = '/api/patients';

export const getPatients = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await axios.post(apiUrl, patientData);
  return response.data;
};

export const updatePatient = async (patientId, patientData) => {
  const response = await axios.put(`${apiUrl}/${patientId}`, patientData);
  return response.data;
};

export const deletePatient = async (patientId) => {
  const response = await axios.delete(`${apiUrl}/${patientId}`);
  return response.data;
};
