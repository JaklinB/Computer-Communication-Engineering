import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";
import logoImage from "./logo_magazine_full.jpg";

const Journal = () => {
  const { t } = useTranslation("journal");

  const handleEmailClick = () => {
    window.location.href = "mailto:computer_engineering@tu-sofia.bg";
  };

  const handleAddressClick = () => {
    const googleMapsUrl =
      "https://www.google.com/maps/search/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8+%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F+%D0%A1%D0%BE%D1%84%D0%B8%D1%8F+1000,+%D0%B1%D1%83%D0%BB.%22%D0%9A%D0%BB.+%D0%9E%D1%85%D1%80%D0%B8%D0%B4%D1%81%D0%BA%D0%B8%22+8/@42.6570438,23.35319,17z/data=!3m1!4b1?entry=ttu";
    window.open(googleMapsUrl, "_blank");
  };

  const openInstructions = (event) => {
    event.preventDefault();
    const filePath = "/assets/Instructions_CE_2018.pdf";
    window.open(filePath, "_blank");
  };

  const openPeerReviewPolicy = (event) => {
    event.preventDefault();
    const filePath = "/assets/PEER_REVIEW_POLICY_EN.pdf";
    window.open(filePath, "_blank");
  };

  const openPublicationEthics = (event) => {
    event.preventDefault();
    const filePath = "/assets/PUBLICATION_ETHICS_EN.pdf";
    window.open(filePath, "_blank");
  };

  return (
    <div className="about-us">
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="about-us-details">
          <h2>{t("title")}</h2>
          <p className="description">{t("description")}</p>
          <div className="contact-info">
            <div className="info-item">
              <span className="icon">📍</span>
              <p onClick={handleAddressClick} className="address-link">
                {t("address")}
              </p>
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

      <div id="ct">
        <div className="corner " id="left_top"></div>
        <div className="corner" id="left_bottom"></div>
        <div className="corner" id="right_top"></div>
        <div className="corner" id="right_bottom"></div>
        <blockquote>
          <p className="more-description">{t("detailed_description_p1")}</p>
        </blockquote>
      </div>

      <div id="ct">
        <div className="corner " id="left_top"></div>
        <div className="corner" id="left_bottom"></div>
        <div className="corner" id="right_top"></div>
        <div className="corner" id="right_bottom"></div>
        <blockquote>
          <p className="more-description">{t("detailed_description_p2")}</p>
        </blockquote>
      </div>

      <div id="ct">
        <div className="corner " id="left_top"></div>
        <div className="corner" id="left_bottom"></div>
        <div className="corner" id="right_top"></div>
        <div className="corner" id="right_bottom"></div>
        <blockquote>
          <p className="more-description">{t("detailed_description_p3")}</p>
        </blockquote>
      </div>

      <div id="ct">
        <div className="corner " id="left_top"></div>
        <div className="corner" id="left_bottom"></div>
        <div className="corner" id="right_top"></div>
        <div className="corner" id="right_bottom"></div>
        <blockquote>
          <p className="more-description">{t("detailed_description_p4")}</p>
        </blockquote>
      </div>
      <div className="helpful-links">
        <h2>{t("helpful_links")}</h2>
        <p>
          <a onClick={openInstructions}>{t("instructions")}</a>
          {t("instructions_rest")}
        </p>
        <p>
          <a onClick={openPeerReviewPolicy}>{t("peer_review_policy")}</a>
        </p>
        <p>
          <a onClick={openPublicationEthics}>{t("publication_ethics")}</a>
        </p>
      </div>
    </div>
  );
};

export default Journal;
