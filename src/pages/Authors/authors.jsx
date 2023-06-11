import React, { useState } from "react";
import { authorsData } from "../../config/authorsData";
import { useTranslation } from "react-i18next";
import "./styles.css";

function Authors() {
  const { t } = useTranslation("authors");

  const [searchTerm, setSearchTerm] = useState("");
  const [showHonoraryEditor, setShowHonoraryEditor] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showBoard, setShowBoard] = useState(true);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuthors = authorsData.map((category) => {
    return {
      ...category,
      authors: category.authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
  });

  const showHonoraryEditorTable = filteredAuthors[0].authors.length > 0;
  const showEditorTable = filteredAuthors[1].authors.length > 0;
  const showBoardTable = filteredAuthors[2].authors.length > 0;

  return (
    <div>
      <h1>{t("authors_title")}</h1>
      <input
        type="text"
        placeholder={t("search_hint")}
        onChange={handleSearch}
      />
      {showHonoraryEditorTable && (
        <div>
          <h2>{t("honorary_editor_in_chief")}</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>{t("name")}</th>
                <th>{t("nationality")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[0].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showEditorTable && (
        <div>
          <h2>{t("editor_in_chief")}</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>{t("name")}</th>
                <th>{t("nationality")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[1].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showBoardTable && (
        <div>
          <h2>{t("editorial_and_scientific_board")}</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>{t("name")}</th>
                <th>{t("nationality")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[2].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Authors;
