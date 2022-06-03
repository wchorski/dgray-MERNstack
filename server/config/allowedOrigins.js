

const allowedOrigins = [
  `${process.env.REACT_APP__API_IP}:${process.env.REACT_APP__API_PORT}`,
  `${process.env.REACT_APP__API_IP}`,
  `${process.env.FRONTEND_URL_ORIGIN}:${process.env.FRONTEND_URL_PORT}`,
  `${process.env.FRONTEND_URL_ORIGIN}`,
  'http://127.0.0.1:5500',
  'http://localhost:3500',
  'http://localhost:3000',
  'http://localhost:3001',
];


module.exports = allowedOrigins;