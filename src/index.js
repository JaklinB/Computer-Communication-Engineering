import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const element = document.getElementById("root");

const root = ReactDOM.createRoot(element);

const Magazine = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Magazine />);
