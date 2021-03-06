import axios from 'axios';

const API_IP = process.env.REACT_APP__API_IP;
const API_PORT = process.env.REACT_APP__API_PORT;
const API_FOLDER = process.env.REACT_APP__API_FOLDER;

const BASE_URL = (API_IP === 'http://localhost' || API_IP === 'undefined' )
  ? `http://localhost:${API_PORT}`
  : `${API_IP}:${API_PORT}${API_FOLDER}`
// const BASE_URL = `${process.env.REACT_APP__API_IP}:${process.env.REACT_APP__API_PORT}`

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});