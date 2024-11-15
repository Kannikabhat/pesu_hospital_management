// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import './MedicalRecordsPage.css';

// const MedicalRecordsPage = () => {
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [newRecord, setNewRecord] = useState({
//     patient_id: '',
//     doctor_id: '',
//     diagnosis: '',
//     treatment: '',
//     prescription: '',
//     record_date: ''
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch existing medical records
//     const fetchMedicalRecords = async () => {
//       try {
//         const response = await api.get('/api/medical-records');
//         setMedicalRecords(response.data);
//       } catch (error) {
//         console.error('Error fetching medical records:', error);
//       }
//     };

//     // Fetch patients and doctors for dropdowns
//     const fetchDropdownData = async () => {
//       try {
//         const patientsResponse = await api.get('/api/appointments/patients');
//         const doctorsResponse = await api.get('/api/appointments/doctors');
//         setPatients(patientsResponse.data);
//         setDoctors(doctorsResponse.data);
//       } catch (error) {
//         console.error('Error fetching patients or doctors:', error);
//       }
//     };

//     fetchMedicalRecords();
//     fetchDropdownData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newRecord.patient_id || !newRecord.doctor_id || !newRecord.diagnosis) {
//       setError('All fields are required.');
//       return;
//     }
    
//     try {
//       await api.post('/api/medical-records', newRecord);
//       setError('');
//       setNewRecord({
//         patient_id: '',
//         doctor_id: '',
//         diagnosis: '',
//         treatment: '',
//         prescription: '',
//         record_date: ''
//       });
//       setMedicalRecords([...medicalRecords, newRecord]); // Update the records list
//     } catch (error) {
//       setError('Error creating medical record.');
//     }
//   };

//   return (
//     <div className="medical-records-page">
//       <h3>Medical Records</h3>

//       <form onSubmit={handleSubmit}>
//         <h4>Create New Record</h4>
//         <label>Patient:</label>
//         <select
//           value={newRecord.patient_id}
//           onChange={(e) => setNewRecord({ ...newRecord, patient_id: e.target.value })}
//         >
//           <option value="">Select Patient</option>
//           {patients.map((patient) => (
//             <option key={patient.patient_id} value={patient.patient_id}>
//               {patient.patient_name}
//             </option>
//           ))}
//         </select>

//         <label>Doctor:</label>
//         <select
//           value={newRecord.doctor_id}
//           onChange={(e) => setNewRecord({ ...newRecord, doctor_id: e.target.value })}
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((doctor) => (
//             <option key={doctor.doctor_id} value={doctor.doctor_id}>
//               {doctor.doctor_name}
//             </option>
//           ))}
//         </select>

//         <label>Diagnosis:</label>
//         <textarea
//           value={newRecord.diagnosis}
//           onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
//           required
//         />

//         <label>Treatment:</label>
//         <textarea
//           value={newRecord.treatment}
//           onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
//         />

//         <label>Prescription:</label>
//         <textarea
//           value={newRecord.prescription}
//           onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
//         />

//         <label>Record Date:</label>
//         <input
//           type="datetime-local"
//           value={newRecord.record_date}
//           onChange={(e) => setNewRecord({ ...newRecord, record_date: e.target.value })}
//         />

//         <button type="submit">Add Medical Record</button>
//       </form>

//       {error && <p>{error}</p>}

//       <h4>Medical Records List</h4>
//       <table>
//         <thead>
//           <tr>
//             <th>Patient Name</th>
//             <th>Doctor Name</th>
//             <th>Diagnosis</th>
//             <th>Treatment</th>
//             <th>Prescription</th>
//             <th>Record Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicalRecords.map((record) => (
//             <tr key={record.record_id}>
//               <td>{record.patient_name}</td>
//               <td>{record.doctor_name}</td>
//               <td>{record.diagnosis}</td>
//               <td>{record.treatment}</td>
//               <td>{record.prescription}</td>
//               <td>{new Date(record.record_date).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MedicalRecordsPage;


import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './MedicalRecordsPage.css';

const MedicalRecordsPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newRecord, setNewRecord] = useState({
    patient_id: '',
    doctor_id: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    record_date: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing medical records
    const fetchMedicalRecords = async () => {
      try {
        const response = await api.get('/api/medical-records');
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    // Fetch patients and doctors for dropdowns
    const fetchDropdownData = async () => {
      try {
        const patientsResponse = await api.get('/api/appointments/patients');
        const doctorsResponse = await api.get('/api/appointments/doctors');
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching patients or doctors:', error);
      }
    };

    fetchMedicalRecords();
    fetchDropdownData();
  }, []);

  // Get patient name by ID
  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.patient_id === patientId);
    return patient ? patient.patient_name : 'Unknown';
  };

  // Get doctor name by ID
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.doctor_id === doctorId);
    return doctor ? doctor.doctor_name : 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecord.patient_id || !newRecord.doctor_id || !newRecord.diagnosis) {
      setError('All fields are required.');
      return;
    }

    try {
      await api.post('/api/medical-records', newRecord);
      setError('');
      // Fetch updated list after successful record creation
      const response = await api.get('/api/medical-records');
      setMedicalRecords(response.data); // Update the records list
      setNewRecord({
        patient_id: '',
        doctor_id: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        record_date: ''
      });
    } catch (error) {
      setError('Error creating medical record.');
    }
  };

  return (
    <div className="medical-records-page">
      <h3>Medical Records</h3>

      <form onSubmit={handleSubmit}>
        <h4>Create New Record</h4>
        <label>Patient:</label>
        <select
          value={newRecord.patient_id}
          onChange={(e) => setNewRecord({ ...newRecord, patient_id: e.target.value })}
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
          value={newRecord.doctor_id}
          onChange={(e) => setNewRecord({ ...newRecord, doctor_id: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.doctor_name}
            </option>
          ))}
        </select>

        <label>Diagnosis:</label>
        <textarea
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
          required
        />

        <label>Treatment:</label>
        <textarea
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
        />

        <label>Prescription:</label>
        <textarea
          value={newRecord.prescription}
          onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
        />

        <label>Record Date:</label>
        <input
          type="datetime-local"
          value={newRecord.record_date}
          onChange={(e) => setNewRecord({ ...newRecord, record_date: e.target.value })}
        />

        <button type="submit">Add Medical Record</button>
      </form>

      {error && <p>{error}</p>}

      <h4>Medical Records List</h4>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Prescription</th>
            <th>Record Date</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record) => (
            <tr key={record.record_id}>
              <td>{getPatientName(record.patient_id)}</td>
              <td>{getDoctorName(record.doctor_id)}</td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>{record.prescription}</td>
              <td>{new Date(record.record_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordsPage;
