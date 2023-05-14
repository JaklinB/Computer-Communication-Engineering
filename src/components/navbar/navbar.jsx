import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher/languageSwitcher";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import "./styles.css";

function Navbar() {
  const { t } = useTranslation("navbar");

  const auth = getAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        setIsLoggedIn(false);
        console.log("User signed out.");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user != null);
    });

    return unsubscribe;
  }, [auth]);

  return (
    <header className="nav">
      <div className="start">
        <div className="logo-img">
          <img
            className="nav-logo"
            src="/assets/images/logo-magazine.jpg"
            alt="LOGO"
          />
        </div>
        <LanguageSwitcher />
      </div>
      <div className="end">
        <nav ref={navRef}>
          <a href="/#">{t("home_page")}</a>
          <a href="/authors">{t("authors_page")}</a>
          <a href="/#">{t("journal_page")}</a>
          <a href="/list">{t("archive_page")}</a>
          <a href="/submit-paper">{t("submit_paper_page")}</a>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              {t("logout")}
            </button>
          ) : (
            <a href="/login">{t("login_page")}</a>
          )}
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
