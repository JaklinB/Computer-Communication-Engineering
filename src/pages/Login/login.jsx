import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import "./styles.css";

const LoginPage = () => {
  const { t } = useTranslation("loginPage");

  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError(t("enter_email"));
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError(t("enter_password"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
            className={emailError ? "error" : ""}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <br />
          <div className="password-input-container">
            <input
              className={`password-input ${passwordError ? "error" : ""}`}
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
          {passwordError && <p className="error-message">{passwordError}</p>}
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
