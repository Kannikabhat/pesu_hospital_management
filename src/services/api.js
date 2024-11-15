import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the URL according to your backend setup
});

export default api;
