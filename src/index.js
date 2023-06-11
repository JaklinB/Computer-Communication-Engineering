import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

const element = document.getElementById("root");

const root = ReactDOM.createRoot(element);

const Magazine = () => {
  const translationFiles = require.context('./locales', true, /\.json$/);

  const resources = {};

  translationFiles.keys().forEach((filename) => {
    const fileContents = translationFiles(filename);
    const match = filename.match(/([a-z]{2})\/([a-z]+)\.json$/i);
    if (match && match.length === 3) {
      const lang = match[1];
      const namespace = match[2];
      resources[lang] = resources[lang] || {};
      resources[lang][namespace] = fileContents;
    }
  });

  // Initialize i18next
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      ns: ['common', 'home'], 
      defaultNS: 'common', 
      interpolation: {
        escapeValue: false, 
      },
    });

  return (
    <React.StrictMode>
      <div className="app-container">
        <BrowserRouter>
          <Navbar />
          <App />
          <Footer />
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
};

root.render(<Magazine />);
