import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Register from "./pages/Register/register";
import MagazineList from "./pages/Magazine/magazine_list";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<MagazineList />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
