// src/services/api.js
import axios from 'axios';

const API_URL = 'http://10.0.0.30:3000';

const api = axios.create({
  baseURL: API_URL,
});

// User-related API calls
export const login = (username, password) => api.post('/api/users/login', { username, password });
export const registerUser = (userData) => api.post('/api/users/register', userData);
export const getLoggedInUser = (token) => api.post('/api/users/getUser',token);
// Patient-related API calls
export const getPatients = () => api.get('/api/patients');
export const getPatientById = (id) => api.get(`/api/patients/${id}`);
export const addPatient = (patientData) => api.post('/api/patients', patientData);

// New functions for deleting and updating a patient
export const deletePatient = (id) => api.delete(`/api/patients/${id}`);
export const updatePatient = (id, updatedData) => api.put(`/api/patients/${id}`, updatedData);

export const getTestsByPatientId = (patientId) => api.get(`/api/tests/${patientId}/tests`);
export const addPatientTest = (patientId, testData) => api.post(`/api/tests/${patientId}/tests`, testData);
export const getCriticalPatients = () => api.get('/api/tests/critical');
export const updateTest = (testId, updatedData) => api.put(`/api/tests/${testId}`, updatedData);
