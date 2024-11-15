import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EditDoctorModal = ({ doctor, onClose, refreshDoctors }) => {
    const [updatedDoctor, setUpdatedDoctor] = useState({ ...doctor }); // Spread doctor to initialize
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await api.get('/api/specializations');
                setSpecializations(response.data);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        };

        fetchSpecializations();
    }, []);

    useEffect(() => {
        setUpdatedDoctor({ ...doctor }); // Reset state when doctor prop changes
    }, [doctor]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/doctors/${doctor.doctor_id}`, updatedDoctor);
            refreshDoctors(); // Refresh the list after update
            onClose(); // Close the modal
            alert("Doctor updated successfully");
        } catch (error) {
            console.error('Error updating doctor:', error);
            alert("Error updating doctor");
        }
    };

    return (
        <div className="modal">
            <h2>Edit Doctor</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={updatedDoctor.doctor_name} 
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, doctor_name: e.target.value })} 
                    placeholder="Doctor Name"
                    required 
                />
                <select 
                    value={updatedDoctor.specialization_id} 
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, specialization_id: e.target.value })} 
                    required
                >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                        <option key={spec.specialization_id} value={spec.specialization_id}>
                            {spec.specialization_name}
                        </option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={updatedDoctor.phone_number} 
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, phone_number: e.target.value })} 
                    placeholder="Phone Number"
                    required 
                />
                <input 
                    type="text" 
                    value={updatedDoctor.address} 
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, address: e.target.value })} 
                    placeholder="Address"
                    required 
                />
                <input 
                    type="email" 
                    value={updatedDoctor.email || ''} // Fallback to empty string if undefined
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, email: e.target.value })} 
                    placeholder="Email"
                    required 
                />
                <button type="submit">Update Doctor</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditDoctorModal;
