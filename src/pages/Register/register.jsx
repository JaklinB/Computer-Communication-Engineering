import React, { useState } from "react";
import { auth, firestore } from "firebase/compat/app";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import "./styles.css";

const Register = () => {
  const { t } = useTranslation("loginPage");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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
          email,
          role,
          isAdmin,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>{t("register_title")}</h1>
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={t("register_first_name")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("register_last_name")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder={t("register_email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <div className="password-input-container">
            <input
            className="password-input"
              type={showPassword ? "text" : "password"}
              placeholder={t("login_password")}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </button>
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">{t("register_role")}</option>
            <option value="student">{t("register_role_student")}</option>
            <option value="teacher">{t("register_role_teacher")}</option>
            <option value="fan">{t("register_role_other")}</option>
          </select>
          <label>
            {t("register_isAdmin")}
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <button type="submit">{t("register_submit")}</button>
        </form>
        <p>
          {t("already_registered")}{" "}
          <Link to="/login" style={{ fontWeight: "bold" }}>
            {t("already_registered_login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
