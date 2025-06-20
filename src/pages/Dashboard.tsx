import PDFUploader from '../components/PDFUploader';
import PDFList from '../components/PDFList';
import { useState } from 'react';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 animate-fade-in">
        📄 PDF Dashboard
      </h1>
      <PDFUploader onUpload={triggerRefresh} />
      <PDFList key={refresh.toString()} />
    </div>
  );
}