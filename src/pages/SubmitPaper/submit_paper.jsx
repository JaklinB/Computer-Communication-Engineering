import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

function SubmitPaper() {
  const { t } = useTranslation("submitPaper");

  const [formErrors, setFormErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (validateForm(event, formData)) {
      const url = event.target.action;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("Form data sent successfully.");
        }
      };
      xhr.send(formData);
    }
  }

  const validateForm = (event, formData) => {
    let isValid = true;
    const errors = {};

    const name = formData.get("name");
    if (name.trim() === "") {
      errors.name = t("submit_paper_form_name_error");
      isValid = false;
    }

    const email = formData.get("email");
    if (email.trim() === "") {
      errors.email = t("submit_paper_form_email_error");
      isValid = false;
    }

    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];
    if (!file) {
      errors.file = t("submit_paper_form_file_error");
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const openFormattingGuidelines = (event) => {
    event.preventDefault();
    const filePath = "/assets/Formatting_Guidelines_EN.pdf";
    window.open(filePath, "_blank");
  };

  return (
    <div>
      <h1>{t("submit_paper_title")}</h1>
      <p>
        <a href="/publication-fee">{t("submit_paper_publication_fee")}</a>{" "}
        {t("submit_paper_publication_fee_rest")}
      </p>
      <p>
        {t("submit_paper_submissions")}{" "}
        <a onClick={openFormattingGuidelines}>{t("submit_paper_formatting")}</a>
      </p>
      <br />
      <div className="envelope-wrap">
         <div id="envelope">
        <div id="lid"></div>
        <div id="letter">
          <h4 className="email-text">computer_engineering@tu-sofia.bg</h4>
        </div>
        <div id="left-corner"></div>
        <div id="right-corner"></div>
      </div>
      </div>
     
    </div>
  );
}

export default SubmitPaper;
