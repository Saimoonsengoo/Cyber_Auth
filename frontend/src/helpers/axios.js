import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Use VITE_BACKEND_URL from .env file or default to localhost:5000
axios.defaults.withCredentials = true; // Include cookies with requests

export default axios;