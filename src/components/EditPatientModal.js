import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EditPatientModal = ({ patient, onClose, refreshPatients }) => {
    const [updatedPatient, setUpdatedPatient] = useState({ ...patient });

    useEffect(() => {
        setUpdatedPatient({ ...patient }); // Reset state when patient prop changes
    }, [patient]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/patients/${patient.patient_id}`, updatedPatient);
            refreshPatients(); // Refresh the list after update
            onClose(); // Close the modal
            alert("Patient updated successfully");
        } catch (error) {
            console.error('Error updating patient:', error);
            alert("Error updating patient");
        }
    };

    return (
        <div className="modal">
            <h2>Edit Patient</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={updatedPatient.patient_name} 
                    onChange={(e) => setUpdatedPatient({ ...updatedPatient, patient_name: e.target.value })} 
                    placeholder="Patient Name"
                    required 
                />
                <input 
                    type="text" 
                    value={updatedPatient.phone_number} 
                    onChange={(e) => setUpdatedPatient({ ...updatedPatient, phone_number: e.target.value })} 
                    placeholder="Phone Number"
                    required 
                />
                <input 
                    type="text" 
                    value={updatedPatient.address} 
                    onChange={(e) => setUpdatedPatient({ ...updatedPatient, address: e.target.value })} 
                    placeholder="Address"
                    required 
                />
                <input 
                    type="email" 
                    value={updatedPatient.email || ''} // Fallback to empty string if undefined
                    onChange={(e) => setUpdatedPatient({ ...updatedPatient, email: e.target.value })} 
                    placeholder="Email"
                    required 
                />
                <input 
                    type="number" 
                    value={updatedPatient.age} 
                    onChange={(e) => setUpdatedPatient({ ...updatedPatient, age: e.target.value })} 
                    placeholder="Age"
                    required 
                />
                <button type="submit">Update Patient</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPatientModal;
