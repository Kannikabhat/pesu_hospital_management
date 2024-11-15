// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients'; // Import the Patients page
import MedicalRecordsPage from './pages/MedicalRecordsPage';
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container"> {/* Optional: Wrap content for styling */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} /> {/* Add route for Patients */}
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
