import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher/languageSwitcher";
import { useTranslation } from "react-i18next";
import "./styles.css";

function Navbar() {
  const { t } = useTranslation("navbar");

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="nav">
      <div className="start">
        <h3>LOGO</h3>
        <LanguageSwitcher />
      </div>
      <div className="end">
        <nav ref={navRef}>
          <a href="/#">{t("home_page")}</a>
          <a href="/#">{t("authors_page")}</a>
          <a href="/#">{t("journal_page")}</a>
          <a href="/list">{t("archive_page")}</a>
          <a href="/register">Register</a>
          <a href="/login">LoginPage</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
