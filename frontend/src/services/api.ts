import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: `https://ecodriveapipuc.azurewebsites.net/`
});

export default api;