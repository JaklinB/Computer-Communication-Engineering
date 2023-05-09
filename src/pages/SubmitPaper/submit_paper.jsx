import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

function SubmitPaper() {
  const { t } = useTranslation("submitPaper");

  const [formData, setFormData] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    setFormData(Object.fromEntries(formData.entries()));

    const form = event.target;
    const url = form.action;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Form data sent successfully.");
      }
    };
    xhr.send(JSON.stringify(formData));
  }

  return (
    <div>
      <h1>{t("submit_paper_title")}</h1>
      <p>
        <a href="/publication-fee">{t("submit_paper_publication_fee")}</a>{" "}
        {t("submit_paper_publication_fee_rest")}
      </p>
      <p>
        {t("submit_paper_submissions")} {t("submit_paper_formatting")}
      </p>
      <br />
      <form
        className="form-container"
        action="c75762497807b4a97190031493d5a2e8"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          placeholder={t("submit_paper_form_name")}
          type="text"
          name="name"
        />

        <input
          placeholder={t("submit_paper_form_email")}
          type="email"
          name="email"
        />

        <input
          placeholder={t("submit_paper_form_file")}
          type="file"
          name="file"
        />

        <button type="submit">{t("submit_paper_submit")}</button>
      </form>
      <br />
    </div>
  );
}

export default SubmitPaper;
