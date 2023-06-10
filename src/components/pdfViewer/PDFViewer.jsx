import React from "react";
import { pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ pdfUrl, }) => {
  const { t } = useTranslation("blog");
  return (
    <div>
      <button className="download-button" onClick={() => window.open(pdfUrl)}>
      {t("read_article")}
      </button>
    </div>
  );
};

export default PDFViewer;
