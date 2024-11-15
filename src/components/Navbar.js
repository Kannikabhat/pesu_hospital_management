import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <h1>Hospital Management System</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/medical-records">Medical Records</Link></li> {/* Added Medical Records Link */}
      </ul>
    </nav>
  );
};

export default Navbar;
