import React from "react";
import { pdfjs } from "react-pdf";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div>
      <button className="download-button" onClick={() => window.open(pdfUrl)}>
        Download PDF
      </button>
    </div>
  );
};

export default PDFViewer;
