import { useRef } from 'react';
import { motion } from 'framer-motion';
import { uploadPDF } from '../api';
import { toast } from 'react-hot-toast';

export default function PDFUploader({ onUpload }: { onUpload: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadPDF(file);
        toast.success('PDF uploaded successfully!');
        onUpload();
      } catch (err) {
        toast.error('Upload failed. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <motion.div
      className="p-6 border-2 rounded-2xl text-center shadow-lg bg-gradient-to-br from-white via-blue-50 to-purple-100 hover:from-blue-100 hover:to-purple-200 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => inputRef.current?.click()}
        className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-6 py-2 rounded-full transition-all font-semibold"
      >
        Upload PDF
      </motion.button>

      <p className="mt-3 text-gray-600 text-sm">
        Accepted format: <span className="font-medium text-gray-800">.pdf</span>
      </p>
    </motion.div>
  );
}