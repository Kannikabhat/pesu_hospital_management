const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Get all specializations
router.get('/', (req, res) => {
  const sql = 'SELECT specialization_id, specialization_name FROM specializations';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching specializations:', err); // Log error for debugging
      return res.status(500).json({ message: 'Error fetching specializations', error: err });
    }
    console.log('Fetched specializations:', results); // Log results for verification
    res.status(200).json(results);
  });
});

module.exports = router;
