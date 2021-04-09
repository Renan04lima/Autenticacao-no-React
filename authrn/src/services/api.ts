import axios from 'axios';

const api = axios.create({
  baseURL: 'http://17018cadf869.ngrok.io',
});

export default api;