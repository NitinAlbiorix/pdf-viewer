import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const uploadPDF = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/pdf/upload', form, {
    // headers: { 'ngrok-skip-browser-warning': '69420' },
  });
};

export const getPDFList = () =>
  api.get('/pdf/list', {
    // headers: { 'ngrok-skip-browser-warning': 'true' },
  });

export const downloadPDF = (storedName: string) =>
  api.get(`/pdf/${storedName}`, {
    responseType: 'blob',
    // headers: { 'ngrok-skip-browser-warning': 'true' },
  });
