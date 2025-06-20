import { useRef, useState } from 'react';
import { uploadPDF } from '../api';
import { toast } from 'react-hot-toast';
import { FiUploadCloud as FiUploadCloudRaw } from 'react-icons/fi';
const FiUploadCloud = FiUploadCloudRaw as unknown as React.FC<{ className?: string }>;

export default function PDFUploader({ onUpload }: { onUpload: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    try {
      await uploadPDF(file);
      toast.success('PDF uploaded successfully!');
      onUpload();
    } catch (err) {
      toast.error('Upload failed. Please try again.');
      console.error(err);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer transition-all duration-300 ease-in-out border-2 border-dashed rounded-2xl p-10 text-center w-full group ${
          isDragging
            ? 'border-blue-500 bg-blue-50 shadow-lg'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input
          type="file"
          accept="application/pdf"
          ref={inputRef}
          hidden
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
           <FiUploadCloud className="text-5xl text-blue-500 group-hover:animate-bounce" />
          <p className="text-gray-700 font-semibold text-lg">
            {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
          </p>
          <p className="text-gray-500 text-sm">or click to browse</p>
          <p className="text-xs text-gray-400">Only PDF files are supported</p>
        </div>
      </div>
    </div>
  );
}
