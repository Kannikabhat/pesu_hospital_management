import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await api.get(`/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <div>
      <h1>Doctor Details</h1>
      <p>Name: {doctor.doctor_name}</p>
      <p>Specialization: {doctor.specialization_name}</p>
      <p>Phone Number: {doctor.phone_number}</p>
      <p>Address: {doctor.address}</p>
      {/* Add any additional details you want to show */}
    </div>
  );
};

export default DoctorDetails;
