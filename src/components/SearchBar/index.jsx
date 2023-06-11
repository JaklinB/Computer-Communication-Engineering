import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

function SearchBar({ formSubmit, value, handleSearchKey, clearSearch }) {
  const { t } = useTranslation("archivePage");
  return (
    <div className="searchBar-wrap">
      <form className="searchBar-form" onSubmit={formSubmit}>
        <div className="searchBar-input-wrap">
          <input
            type="text"
            placeholder={t("search_key_word")}
            value={value}
            onChange={handleSearchKey}
          />
        </div>
        <button><i className="material-icons">search</i></button>
      </form>
    </div>
  );
}

export default SearchBar;
