import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";
import logoImage from "./logo_magazine_full.jpg";

const Journal = () => {
  const { t } = useTranslation("journal");

  const handleEmailClick = () => {
    window.location.href = "mailto:computer_engineering@tu-sofia.bg";
  };

  return (
    <div className="about-us">
      <div className="about-us-header">
        <h1>{t("about_us")}</h1>
      </div>
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={logoImage} alt="Company" />
        </div>
        <div className="about-us-details">
          <h2>{t("title")}</h2>
          <p className="description">{t("description")}</p>
          <div className="contact-info">
            <div className="info-item">
              <span className="icon">📍</span>
              <p>{t("address")}</p>
            </div>
            <div className="info-item">
              <span className="icon">✉️</span>
              <p onClick={handleEmailClick} className="email-link">
                computer_engineering@tu-sofia.bg
              </p>
            </div>
            <div className="info-item">
              <span className="icon">✍️</span>
              <p>
                <a className="authors-link" href="/authors">
                  Authors
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="paragraphs">
        <p className="description">{t("detailed_description_p1")}</p>
        <p className="description">{t("detailed_description_p2")}</p>
        <p className="description">{t("detailed_description_p3")}</p>
        <p className="description">{t("detailed_description_p4")}</p>
      </div>
    </div>
  );
};

export default Journal;
