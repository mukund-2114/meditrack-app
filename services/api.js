// src/services/api.js
import axios from 'axios';

const API_URL = 'http://10.0.0.30:3000';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (email, password) => api.post('/api/users/login', { email, password });
export const registerUser =  (userData) => {
  console.log("sending server registration")
  console.log(api.post('/api/users/register'))
  api.post('/api/users/register', userData);
}
export const getPatients =() =>api.get('/api/patients');
export const getPatientById = (id) =>  api.get(`/api/patients/${id}`);
export const addPatient = (patientData) =>  api.post('/api/patients', patientData);
export const getPatientTests = (patientId) => api.get(`/api/tests/${patientId}/tests`);
export const addPatientTest =(patientId, testData) => api.post(`/api/tests/${patientId}/tests`, testData);
export const getCriticalPatients = () => api.get('/api/tests/critical');