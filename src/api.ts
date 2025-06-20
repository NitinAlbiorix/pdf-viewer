import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3d8a-2401-4900-1c80-95b6-8432-9b0a-8d48-ba19.ngrok-free.app',
});

export const uploadPDF = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/pdf/upload', form, {
    headers: { 'ngrok-skip-browser-warning': '69420' },
  });
};

export const getPDFList = () =>
  api.get('/pdf/list', {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });

export const downloadPDF = (storedName: string) =>
  api.get(`/pdf/${storedName}`, {
    responseType: 'blob',
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });
