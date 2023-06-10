import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const ProfilePage = () => {
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

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
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
      <h1>Profile Page</h1>
      {user && userData && <p>Welcome, {userData.firstName}!</p>}
      {userData && (
        <div>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
      <button onClick={handleDeleteProfile}>Delete Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
