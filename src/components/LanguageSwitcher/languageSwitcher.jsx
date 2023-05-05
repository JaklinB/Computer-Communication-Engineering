import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

function LanguageSwitcher() {
  const bgFlag = "🇧🇬";
  const enFlag = "🇬🇧";
  const { i18n } = useTranslation();
  const [flag, setFlag] = useState(enFlag);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="));

    if (cookie) {
      const lang = cookie.split("=")[1];
      i18n.changeLanguage(lang); // Set the language to the stored preference
    } else {
      i18n.changeLanguage("en"); // Default to English if no preference is stored
    }
  }, []); // Only run this effect once on component mount

  useEffect(() => {
    if (i18n.language === "bg") {
      setFlag(enFlag);
    } else {
      setFlag(bgFlag);
    }
  }, [i18n.language]);

  const handleLanguageChange = () => {
    const language = i18n.language === "en" ? "bg" : "en";
    i18n.changeLanguage(language);
    document.cookie = `lang=${language};expires=${new Date(
      Date.now() + 86400000
    ).toUTCString()};path=/`; // Set a cookie with the language preference that expires in 24 hours
  };

  return (
    <div className="language-switcher">
      <button onClick={handleLanguageChange}>{flag}</button>
    </div>
  );
}

export default LanguageSwitcher;
