import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "./sample.pdf";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  return (
    <div>
      <button
        className="download-button"
        onClick={() => window.open(samplePDF)}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PDFViewer;
