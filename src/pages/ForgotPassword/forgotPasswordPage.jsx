import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

const ForgotPasswordPage = () => {
  const { t } = useTranslation("loginPage");

  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent successfully");
        setSuccessMessage(t("forgot_password_success"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sending password reset email failed", errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div>
      <h1>{t("forgot_password_title")}</h1>
      <div className="forgot_password">
        {successMessage ? (
          <p>{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <input
              type="email"
              placeholder={t("forgot_password_email")}
              className="forgot_password_input"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <button type="submit"  className="forgot_password_button">{t("forgot_password_submit")}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
