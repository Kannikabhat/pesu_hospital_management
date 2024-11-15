// // // // import React, { useState, useEffect } from 'react';
// // // // import api from '../services/api';
// // // // import AppointmentForm from '../components/AppointmentForm';

// // // // const Appointments = () => {
// // // //   const [appointments, setAppointments] = useState([]);
// // // //   const [patients, setPatients] = useState([]);
// // // //   const [doctors, setDoctors] = useState([]);
// // // //   const [selectedDoctor, setSelectedDoctor] = useState('');
// // // //   const [loading, setLoading] = useState(true);


// // // //   useEffect(() => {
// // // //     // Fetch appointments, patients, and doctors
// // // //     fetchAppointments();
// // // //     fetchPatients();
// // // //     fetchDoctors();
// // // //   }, []);

// // // //   // Fetch appointments from the backend
// // // //   const fetchAppointments = async () => {
// // // //     try {
// // // //       const response = await api.get('/api/appointments');
// // // //       setAppointments(response.data);
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       console.error('Error fetching appointments:', error);
// // // //     }
// // // //   };

// // // //   // Fetch all patients for the dropdown
// // // //   const fetchPatients = async () => {
// // // //     try {
// // // //       const response = await api.get('/api/patients'); // Make sure this endpoint returns all patients
// // // //       setPatients(response.data);
// // // //     } catch (error) {
// // // //       console.error('Error fetching patients:', error);
// // // //     }
// // // //   };

// // // //   // Fetch all doctors for the dropdown
// // // //   const fetchDoctors = async () => {
// // // //     try {
// // // //       const response = await api.get('/api/doctors'); // Make sure this endpoint returns all doctors
// // // //       setDoctors(response.data);
// // // //     } catch (error) {
// // // //       console.error('Error fetching doctors:', error);
// // // //     }
// // // //   };

// // // //   const handleDoctorChange = (event) => {
// // // //     const doctorId = event.target.value;
// // // //     setSelectedDoctor(doctorId);
// // // //     fetchPatientsForDoctor(doctorId); // Fetch patients when a doctor is selected
// // // //   };
// // // //   // Function to render appointment list
// // // //   const renderAppointments = () => {
// // // //     if (loading) {
// // // //       return <p>Loading appointments...</p>;
// // // //     }

// // // //     return appointments.length ? (
// // // //       <ul>
// // // //         {appointments.map((appointment) => (
// // // //           <li key={appointment.appointment_id}>
// // // //             Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     ) : (
// // // //       <p>No appointments available.</p>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Appointments</h2>
// // // //       <AppointmentForm
// // // //         refreshAppointments={fetchAppointments}
// // // //         patients={patients}
// // // //         doctors={doctors}
// // // //       />
// // // //       {/* Doctor Selection */}
// // // //       <div>
// // // //         <label htmlFor="doctorSelect">Select Doctor: </label>
// // // //         <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
// // // //           <option value="">Select a Doctor</option>
// // // //           {doctors.map((doctor) => (
// // // //             <option key={doctor.doctor_id} value={doctor.doctor_id}>
// // // //               {doctor.doctor_name}
// // // //             </option>
// // // //           ))}
// // // //         </select>
// // // //       </div>

// // // //       {/* Render List of Patients for the Selected Doctor */}
// // // //       <div>
// // // //         <h3>Patients for Doctor {selectedDoctor}</h3>
// // // //         <ul>
// // // //           {patients.map((patient) => (
// // // //             <li key={patient.patient_id}>{patient.patient_name}</li>
// // // //           ))}
// // // //         </ul>
// // // //       </div>

// // // //       {renderAppointments()}
// // // //     </div>

// // // //   );
// // // // };

// // // // export default Appointments;


// // // import React, { useState, useEffect } from 'react';
// // // import api from '../services/api';
// // // import AppointmentForm from '../components/AppointmentForm';

// // // const Appointments = () => {
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [patients, setPatients] = useState([]);
// // //   const [doctors, setDoctors] = useState([]);
// // //   const [filteredPatients, setFilteredPatients] = useState([]); // To store patients for the selected doctor
// // //   const [selectedDoctor, setSelectedDoctor] = useState('');
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     fetchAppointments();
// // //     fetchPatients();
// // //     fetchDoctors();
// // //   }, []);

// // //   const fetchAppointments = async () => {
// // //     try {
// // //       const response = await api.get('/api/appointments');
// // //       setAppointments(response.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error('Error fetching appointments:', error);
// // //     }
// // //   };

// // //   const fetchPatients = async () => {
// // //     try {
// // //       const response = await api.get('/api/patients');
// // //       setPatients(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching patients:', error);
// // //     }
// // //   };

// // //   const fetchDoctors = async () => {
// // //     try {
// // //       const response = await api.get('/api/doctors');
// // //       setDoctors(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching doctors:', error);
// // //     }
// // //   };

// // //   // Function to fetch patients for the selected doctor
// // //   const fetchPatientsForDoctor = async (doctorId) => {
// // //     try {
// // //       const response = await api.get(`/api/patients/${doctorId}`);
// // //       setFilteredPatients(response.data); // Set filtered list for selected doctor
// // //     } catch (error) {
// // //       console.error('Error fetching patients for doctor:', error);
// // //     }
// // //   };
  

// // //   const handleDoctorChange = (event) => {
// // //     const doctorId = event.target.value;
// // //     setSelectedDoctor(doctorId);
// // //     fetchPatientsForDoctor(doctorId);
// // //   };

// // //   const renderAppointments = () => {
// // //     if (loading) {
// // //       return <p>Loading appointments...</p>;
// // //     }

// // //     return appointments.length ? (
// // //       <ul>
// // //         {appointments.map((appointment) => (
// // //           <li key={appointment.appointment_id}>
// // //             Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     ) : (
// // //       <p>No appointments available.</p>
// // //     );
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Appointments</h2>
// // //       <AppointmentForm
// // //         refreshAppointments={fetchAppointments}
// // //         patients={patients}
// // //         doctors={doctors}
// // //       />

// // //       {/* Doctor Selection */}
// // //       <div>
// // //         <label htmlFor="doctorSelect">Select Doctor: </label>
// // //         <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
// // //           <option value="">Select a Doctor</option>
// // //           {doctors.map((doctor) => (
// // //             <option key={doctor.doctor_id} value={doctor.doctor_id}>
// // //               {doctor.doctor_name}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       {/* Render List of Patients for the Selected Doctor */}
// // //       <div>
// // //         <h3>Patients for Doctor {selectedDoctor}</h3>
// // //         <ul>
// // //           {filteredPatients.map((patient) => (
// // //             <li key={patient.patient_id}>{patient.patient_name}</li>
// // //           ))}
// // //         </ul>
// // //       </div>

// // //       {renderAppointments()}
// // //     </div>
// // //   );
// // // };

// // // export default Appointments;




// // import React, { useState, useEffect } from 'react';
// // import api from '../services/api';
// // import AppointmentForm from '../components/AppointmentForm';

// // const Appointments = () => {
// //   const [appointments, setAppointments] = useState([]);
// //   const [patients, setPatients] = useState([]);
// //   const [doctors, setDoctors] = useState([]);
// //   const [filteredPatients, setFilteredPatients] = useState([]); // Ensure it’s always an array
// //   const [selectedDoctor, setSelectedDoctor] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchAppointments();
// //     fetchPatients();
// //     fetchDoctors();
// //   }, []);

// //   const fetchAppointments = async () => {
// //     try {
// //       const response = await api.get('/api/appointments');
// //       setAppointments(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching appointments:', error);
// //     }
// //   };

// //   const fetchPatients = async () => {
// //     try {
// //       const response = await api.get('/api/patients');
// //       setPatients(response.data);
// //     } catch (error) {
// //       console.error('Error fetching patients:', error);
// //     }
// //   };

// //   const fetchDoctors = async () => {
// //     try {
// //       const response = await api.get('/api/doctors');
// //       setDoctors(response.data);
// //     } catch (error) {
// //       console.error('Error fetching doctors:', error);
// //     }
// //   };

// //   // Function to fetch patients for the selected doctor
// //   const fetchPatientsForDoctor = async (doctorId) => {
// //     try {
// //       const response = await api.get(`/api/patients/${doctorId}`);
// //       console.log(response.data); // Log to check response
// //       setFilteredPatients(Array.isArray(response.data) ? response.data : []); // Ensure it’s always an array
// //     } catch (error) {
// //       console.error('Error fetching patients for doctor:', error);
// //       setFilteredPatients([]); // Fallback to empty array
// //     }
// //   };

// //   const handleDoctorChange = (event) => {
// //     const doctorId = event.target.value;
// //     setSelectedDoctor(doctorId);
// //     fetchPatientsForDoctor(doctorId);
// //   };

// //   const renderAppointments = () => {
// //     if (loading) {
// //       return <p>Loading appointments...</p>;
// //     }

// //     return appointments.length ? (
// //       <ul>
// //         {appointments.map((appointment) => (
// //           <li key={appointment.appointment_id}>
// //             Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
// //           </li>
// //         ))}
// //       </ul>
// //     ) : (
// //       <p>No appointments available.</p>
// //     );
// //   };

// //   return (
// //     <div>
// //       <h2>Appointments</h2>
// //       <AppointmentForm
// //         refreshAppointments={fetchAppointments}
// //         patients={patients}
// //         doctors={doctors}
// //       />

// //       {/* Doctor Selection */}
// //       <div>
// //         <label htmlFor="doctorSelect">Select Doctor: </label>
// //         <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
// //           <option value="">Select a Doctor</option>
// //           {doctors.map((doctor) => (
// //             <option key={doctor.doctor_id} value={doctor.doctor_id}>
// //               {doctor.doctor_name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Render List of Patients for the Selected Doctor */}
// //       <div>
// //         <h3>Patients for Doctor {selectedDoctor}</h3>
// //         <ul>
// //           {Array.isArray(filteredPatients) && filteredPatients.length > 0 ? (
// //             filteredPatients.map((patient) => (
// //               <li key={patient.patient_id}>{patient.patient_name}</li>
// //             ))
// //           ) : (
// //             <li>No patients found for this doctor.</li>
// //           )}
// //         </ul>
// //       </div>

// //       {renderAppointments()}
// //     </div>
// //   );
// // };

// // export default Appointments;

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import AppointmentForm from '../components/AppointmentForm';

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]); // To store patients for the selected doctor
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAppointments();
//     fetchPatients();
//     fetchDoctors();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await api.get('/api/appointments');
//       setAppointments(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   const fetchPatients = async () => {
//     try {
//       const response = await api.get('/api/patients');
//       setPatients(response.data);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const response = await api.get('/api/doctors');
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   // Function to fetch patients for the selected doctor
//   const fetchPatientsForDoctor = async (doctorId) => {
//     try {
//       const response = await api.get(`/api/patients/${doctorId}`);
//       setFilteredPatients(Array.isArray(response.data) ? response.data : [response.data]);
//     } catch (error) {
//       console.error('Error fetching patients for doctor:', error);
//     }
//   };
  

//   const handleDoctorChange = (event) => {
//     const doctorId = event.target.value;
//     setSelectedDoctor(doctorId);
//     fetchPatientsForDoctor(doctorId);
//   };

//   const renderAppointments = () => {
//     if (loading) {
//       return <p>Loading appointments...</p>;
//     }

//     return appointments.length ? (
//       <ul>
//         {appointments.map((appointment) => (
//           <li key={appointment.appointment_id}>
//             Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <p>No appointments available.</p>
//     );
//   };

//   return (
//     <div>
//       <h2>Appointments</h2>
//       <AppointmentForm
//         refreshAppointments={fetchAppointments}
//         patients={patients}
//         doctors={doctors}
//       />

//       {/* Doctor Selection */}
//       <div>
//         <label htmlFor="doctorSelect">Select Doctor: </label>
//         <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
//           <option value="">Select a Doctor</option>
//           {doctors.map((doctor) => (
//             <option key={doctor.doctor_id} value={doctor.doctor_id}>
//               {doctor.doctor_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render List of Patients for the Selected Doctor */}
//       <div>
//         <h3>Patients for Doctor {selectedDoctor}</h3>
//         {/* Check if filteredPatients is an array and render */}
//         <ul>
//           {Array.isArray(filteredPatients) && filteredPatients.length > 0 ? (
//             filteredPatients.map((patient) => (
//               <li key={patient.patient_id}>{patient.patient_name}</li>
//             ))
//           ) : (
//             <li>No patients found for this doctor.</li>
//           )}
//         </ul>
//       </div>

//       {renderAppointments()}
//     </div>
//   );
// };

// export default Appointments;



import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AppointmentForm from '../components/AppointmentForm';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); // Ensure it’s always an array
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/api/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Function to fetch patients for the selected doctor
  const fetchPatientsForDoctor = async (doctorId) => {
    try {
      const response = await api.get(`/api/appointments/patients/${doctorId}`);
      setFilteredPatients(Array.isArray(response.data) ? response.data : []); // Confirming the data structure
    } catch (error) {
      console.error('Error fetching patients for doctor:', error);
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
    fetchPatientsForDoctor(doctorId);
  };

  const renderAppointments = () => {
    if (loading) {
      return <p>Loading appointments...</p>;
    }

    return appointments.length ? (
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.appointment_id}>
            Patient ID: {appointment.patient_id}, Doctor ID: {appointment.doctor_id}, Date: {appointment.appointment_date}, Status: {appointment.status}
          </li>
        ))}
      </ul>
    ) : (
      <p>No appointments available.</p>
    );
  };

  return (
    <div>
      <h2>Appointments</h2>
      <AppointmentForm
        refreshAppointments={fetchAppointments}
        patients={patients}
        doctors={doctors}
      />

      {/* Doctor Selection */}
      <div>
        <label htmlFor="doctorSelect">Select Doctor: </label>
        <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.doctor_name}
            </option>
          ))}
        </select>
      </div>

      {/* Render List of Patients for the Selected Doctor */}
      <div>
        <h3>Patients for Doctor {selectedDoctor}</h3>
        <ul>
          {filteredPatients.map((patient) => (
            <li key={patient.patient_id}>{patient.patient_name}</li>
          ))}
        </ul>
      </div>

      {renderAppointments()}
    </div>
  );
};

export default Appointments;



