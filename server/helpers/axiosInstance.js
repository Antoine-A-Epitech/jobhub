const axios = require('axios');

// Creating a new axios instance with a custom config
const fetcher = axios.create({
  headers: { Accept: 'text/html, application/json, text/plain' },
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

module.exports = fetcher;
