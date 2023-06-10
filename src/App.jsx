import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import firebase from "firebase/compat/app";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import LoginPage from "./pages/Login/login";
import Register from "./pages/Register/register";
import ForgotPasswordPage from "./pages/ForgotPassword/forgotPasswordPage";
import AuthorsPage from "./pages/Authors/authors";
import MagazineList from "./pages/Magazine/magazine_list";
import SubmitPaper from "./pages/SubmitPaper/submit_paper";
import Journal from "./pages/Journal/journal";
import PublicationFees from "./pages/PublicationFees/publication_fees";
import AddArticle from "./pages/AddArticle/add_article";
import ProfilePage from "./pages/Profile/profile";
import ReadLaterPage from "./pages/ReadLater/read_later";
import "./App.css";
import "firebase/auth";
import "firebase/firestore";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
        fetchUserData(user.uid);
      } else {
        // User is logged out
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setIsAdmin(userData.isAdmin || false);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const isLoggedIn = user !== null;

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} isLoggedIn={isLoggedIn} />} />
        <Route path="/list" element={<MagazineList isAdmin={isAdmin} isLoggedIn={isLoggedIn} />} />
        <Route
          exact
          path="/articles/:id"
          element={<Blog isAdmin={isAdmin} isLoggedIn={isLoggedIn} userId={user ? user.uid : null} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/submit-paper" element={<SubmitPaper />} />
        <Route path="/publication-fee" element={<PublicationFees />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/read-later" element={<ReadLaterPage userId={user ? user.uid : null} />} />
        <Route path="/add-article" element={<AddArticle userId={user ? user.uid : null} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
