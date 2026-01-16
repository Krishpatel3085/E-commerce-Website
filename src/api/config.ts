import axios from 'axios';

const API_URL = 'https://j2c6cd58-5000.inc1.devtunnels.ms/'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default api;