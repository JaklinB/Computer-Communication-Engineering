import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useTranslation } from "react-i18next";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "./styles.css";

const ProfilePage = () => {
  const { t } = useTranslation("profile");

  const navigate = useNavigate();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const userDocRef = db.collection("users").doc(userId);
      const userDocSnapshot = await userDocRef.get();
      if (userDocSnapshot.exists) {
        const userData = userDocSnapshot.data();
        setUserData(userData);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleGoToReadLater = () => {
    navigate("/read-later");
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        t("delete_profile_warning")
      )
    ) {
      try {
        await db.collection("users").doc(user.uid).delete();

        if (userData && userData.profileImageUrl) {
          await storage.refFromURL(userData.profileImageUrl).delete();
        }

        await user.delete();

        navigate("/login");
      } catch (error) {
        console.log("Error deleting profile:", error);
      }
    }
  };

  return (
    <div>
      {user && userData && <h1>{t("welcome")}, {userData.firstName}!</h1>}
      <div className="profile-page">
      {userData && (
        <div className="profile-info">
          <p>{t("title")}</p>
          <p>{t("first_name")} {userData.firstName}</p>
          <p>{t("last_name")} {userData.lastName}</p>
          <p>{t("email")} {userData.email}</p>
          <p>{t("role")} {userData.role}</p>
        </div>
      )}
      <div className="profile-actions">
        <button onClick={handleGoToReadLater}>{t("read_later_page")}</button>
        <button onClick={handleDeleteProfile}>{t("delete_profile")}</button>
        <button onClick={handleLogout}>{t("logout")}</button>
      </div>
    </div>
    </div>
    
  );
};

export default ProfilePage;
