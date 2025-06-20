import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PDFPreview({ fileId }: { fileId: string }) {
  return (
    <div className="mt-2 border rounded h-[500px] overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={`${process.env.REACT_APP_API_URL}/uploads/${fileId}`}
        />
      </Worker>
    </div>
  );
}
