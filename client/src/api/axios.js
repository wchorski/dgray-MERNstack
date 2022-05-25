import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP__API_IP}:${process.env.REACT_APP__API_PORT}`

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});