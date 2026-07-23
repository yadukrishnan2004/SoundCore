import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PROD 
    ? (import.meta.env.VITE_API_BASE_URL || 'https://soundcoore.bounceme.net/api/v1') 
    : '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default instance;
