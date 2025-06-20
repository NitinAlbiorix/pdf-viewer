import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PDFPreview({ fileId }: { fileId: string }) {
  return (
    <div className="mt-2 border rounded h-[500px] overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={`https://3d8a-2401-4900-1c80-95b6-8432-9b0a-8d48-ba19.ngrok-free.app/uploads/${fileId}`}
          httpHeaders={{
            'ngrok-skip-browser-warning': 'true',
          }}
        />
      </Worker>
    </div>
  );
}
