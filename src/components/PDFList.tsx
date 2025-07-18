import { useEffect, useState } from 'react';
import { getPDFList } from '../api';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export default function PDFList() {
  const [pdfs, setPdfs] = useState<{ id: string; name: string; path: string }[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const fetchPdfs = async () => {
    try {
      const res = await getPDFList();
      const transformed = Array.isArray(res.data)
        ? res.data.map((pdf: any) => ({
          id: pdf.id.toString(),
          name: pdf.originalName,
          storedName: pdf.storedName,
          path: pdf.path, 
        }))
        : [];
      setPdfs(transformed);
    } catch (err) {
      console.error('Error fetching PDF list:', err);
      setPdfs([]);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleDownload = async (pdfUrl: string, name: string) => {
    const loadingToast = toast.loading('Downloading...');

    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success('Download successful!', { id: loadingToast });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed!', { id: loadingToast });
    }
  };



  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
      <div className="overflow-x-auto">
        <div className="max-h-[450px] overflow-y-auto">
          {pdfs.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">No.</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-12 text-gray-500 font-medium">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  pdfs.map((pdf, index) => (
                    <tr key={pdf.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-800 font-medium">{pdf.name}</td>
                      <td className="px-6 py-4 space-x-3">
                        <button
                          onClick={() => handleDownload(pdf.path, pdf.name)}
                          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => setPreviewId(pdf.path)}
                          className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>

      {previewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-lg font-semibold">PDF Preview</h2>
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={() => setPreviewId(null)}
              >
                Close
              </button>
            </div>
            <iframe
              src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(previewId!)}`}
              className="w-full h-[80vh]"
              title="PDF Viewer"
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
