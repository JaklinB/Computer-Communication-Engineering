import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

const LoginPage = () => {
  const { t } = useTranslation("loginPage");

  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          <input
            type="password"
            placeholder={t("login_password")}
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">{t("login_submit")}</button>
        </form>
        <p>
          {t("login_no_account")}{" "}
          <Link to="/register" style={{ "font-weight": "bold" }}>
            {t("login_no_account_register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
