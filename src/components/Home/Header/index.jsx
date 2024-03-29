import React from "react";
import "./styles.css";
import Carousel from "../../Carousel/carousel";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation("homePage");
  return (
    <header className="home-header">
      <div className="title-home">
        <h1>
          <span>{t("title_light")}</span> {t("title_dark")}
        </h1>
      </div>
      <p>{t("tu_sofia")}</p>
      <Carousel />
    </header>
  );
};

export default Header;
