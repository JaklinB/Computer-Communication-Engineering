import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import eye icons
import "./styles.css";

const LoginPage = () => {
  const { t } = useTranslation("loginPage");

  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track whether password is visible or not
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User is authenticated", user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Authentication failed", errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div>
      <h1>{t("login_title")}</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {errorMessage && <p>{errorMessage}</p>}
          <input
            type="email"
            placeholder={t("login_email")}
            value={email}
            onChange={handleEmailChange}
          />
          <br />
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
          <Link
            to="/forgot-password"
            style={{
              fontWeight: "600",
              color: "#a9a9a9",
              textDecoration: "none",
              textAlign: "end",
              fontSize: "12px",
            }}
          >
            {t("login_forgot_password")}
          </Link>
          <br />
          <button type="submit">{t("login_submit")}</button>
        </form>
        <br />
        <p>
          {t("login_no_account")}{" "}
          <Link to="/register" style={{ fontWeight: "bold" }}>
            {t("login_no_account_register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
