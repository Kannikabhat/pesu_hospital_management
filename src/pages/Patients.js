
// import React, { useState, useEffect } from 'react';
// import { getPatients, createPatient } from '../api/patientApi'; // Correct import
// import PatientModal from '../components/PatientModal';


// const Patients = () => {
//   const [patients, setPatients] = useState([]);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await getPatients();
//       setPatients(response.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//       setError('Failed to fetch patients. Please try again later.');
//     }
//   };

//   const handleAddPatient = async (patientData) => {
//     try {
//       await createPatient(patientData); // This uses the correct function
//       fetchPatients();
//       setShowModal(false);
//     } catch (error) {
//       console.error('Error adding patient:', error);
//       setError('Failed to add patient. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h2>Patients</h2>
//       <button onClick={() => setShowModal(true)}>Add Patient</button>
//       {error && <div className="error">{error}</div>}
//       <ul>
//         {patients.length > 0 ? (
//           patients.map(patient => (
//             <li key={patient.patient_id}>{patient.patient_name}</li>
//           ))
//         ) : (
//           <li>No patients found.</li>
//         )}
//       </ul>
//       {showModal && (
//         <PatientModal 
//           onClose={() => setShowModal(false)} 
//           onAddPatient={handleAddPatient} 
//         />
//       )}
//     </div>
//   );
// };

// export default Patients;

// Patients.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';
import './Patients.css'; // Import your CSS file

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [patientCount, setPatientCount] = useState(0);

  const refreshPatients = async () => {
    try {
      const response = await api.get('/api/patients'); // Adjust URL if needed
      setPatients(response.data);
      const countResponse = await api.get('/api/patients/count'); 
      setPatientCount(countResponse.data.patient_count);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  return (
    <div className="patients-container">
      <h2>Patients</h2>
      <p>Total Patients: {patientCount}</p>
      <PatientForm refreshPatients={refreshPatients} className="patient-form" />
      <PatientList patients={patients} refreshPatients={refreshPatients} className="patient-list" />
    </div>
  );
};

export default Patients;
