import React, { useState } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import firebaseConfig from "../../config/firebaseConfig";
import "./styles.css";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [storage, setStorage] = useState(firebase.storage()); // Initialize Firebase Storage

  const handleRegister = (e) => {
    e.preventDefault();
    const auth = firebase.auth();
    const db = firebase.firestore();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection("users").doc(user.uid).set({
          firstName,
          lastName,
          role,
          photoUrl,
          isAdmin,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">--Select Role--</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="fan">Fan</option>
          </select>
          <label>
            Admin:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <button type="submit">Register</button>
        </form>{" "}
      </div>
    </div>
  );
};

export default Register;
