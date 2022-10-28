import axios from 'axios';

// Creating a new axios instance
const fetcher = axios.create({
  headers: { Accept: 'text/html, application/json, text/plain' },
  baseURL: 'http://localhost:3000',
  timeout: 3000
});

export default fetcher;
