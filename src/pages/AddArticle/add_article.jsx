import React, { useState } from "react";
import firebase from "../../config/firebase";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

import "./styles.css";

const AddArticle = ({ userId }) => {
  const { t } = useTranslation("addArticle");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryInput, setSubcategoryInput] = useState("");
  const [description, setDescription] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [volume, setVolume] = useState("");
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubcategoriesChange = (event) => {
    setSubcategoryInput(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthorInput(event.target.value);
  };

  const handleCreatedAtChange = (date) => {
    setCreatedAt(date);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleImageFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubcategoryInputChange = (event) => {
    setSubcategoryInput(event.target.value);
  };

  const handleSubcategoryInputKeyDown = (event) => {
    if (event.key === "Enter" && subcategoryInput.trim() !== "") {
      event.preventDefault();
      setSubcategories((prevSubcategories) => [
        ...prevSubcategories,
        subcategoryInput.trim(),
      ]);
      setSubcategoryInput("");
    }
  };

  const handleRemoveSubcategory = (index) => {
    setSubcategories((prevSubcategories) =>
      prevSubcategories.filter((_, i) => i !== index)
    );
  };

  const handleAuthorInputKeyDown = (event) => {
    if (event.key === "Enter" && authorInput.trim() !== "") {
      event.preventDefault();
      setAuthors((prevAuthors) => [...prevAuthors, authorInput.trim()]);
      setAuthorInput("");
    }
  };

  const handleRemoveAuthor = (index) => {
    setAuthors((prevAuthors) => prevAuthors.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = t("add_title_empty");
    }

    if (category.trim() === "") {
      errors.category = t("add_category_empty");
    }

    if (subcategories.length === 0) {
      errors.subcategories = t("add_subcategories_empty");
    }

    if (description.trim() === "") {
      errors.description = t("add_description_empty");
    }

    if (authors.length === 0) {
      errors.authors = t("add_authors_empty");
    }

    if (volume.trim() === "") {
      errors.volume = t("add_volume_empty");
    }

    if (image === null) {
      errors.image = t("add_image_empty");
    }

    setErrors(errors);
    setIsSubmitted(true);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);
    setIsLoading(true);

    const storage = firebase.storage();
    const storageRef = storage.ref();

    const articleId = uuidv4();

    const articleData = {
      id: articleId,
      title,
      category,
      subcategories,
      description,
      authors,
      createdAt,
      volume,
    };

    const db = firebase.firestore();
    db.collection("articles")
      .doc(articleId)
      .set(articleData)
      .then(async () => {
        console.log("Article data stored successfully with ID:", articleId);

        if (image) {
          const imageStorageRef = storageRef.child(
            `articles/${articleId}/image`
          );
          imageStorageRef
            .put(image)
            .then(() => {
              console.log("Image file uploaded successfully");
            })
            .catch((error) => {
              console.error("Error uploading image file:", error);
            });
          await imageStorageRef.put(image);
        }

        if (pdfFile) {
          const pdfStorageRef = storageRef.child(`articles/${articleId}/pdf`);
          pdfStorageRef
            .put(pdfFile)
            .then(() => {
              console.log("PDF file uploaded successfully");
            })
            .catch((error) => {
              console.error("Error uploading PDF file:", error);
            });
          await pdfStorageRef.put(pdfFile);
        }

        setTitle("");
        setCategory("");
        setSubcategories([]);
        setDescription("");
        setAuthors([]);
        setCreatedAt(new Date());
        setVolume("");
        setImage(null);
        setPdfFile(null);
        setIsLoading(false);

        navigate(-1);
      })
      .catch((error) => {
        console.error("Error storing article data:", error);
        setIsLoading(true);
        setIsSubmitted(false);
      });
  };

  return (
    <div className="form-container">
      <h1>{t("add_article")}</h1>
      <form onSubmit={handleFormSubmit}>
        <div
          className={`form-field ${errors.title && isSubmitted ? "error" : ""}`}
        >
          <label htmlFor="title">{t("add_title")}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && isSubmitted && (
            <div className="error-message">{errors.title}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.category && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="category">{t("add_category")}</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          />
          {errors.category && isSubmitted && (
            <div className="error-message">{errors.category}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.subcategories && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="subcategories">{t("add_subcategories")}</label>
          <p>{t("hint_subcategories")}</p>
          <div className="tags-input">
            {subcategories.map((subcategory, index) => (
              <div className="tag" key={index}>
                {subcategory}
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveSubcategory(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="subcategories"
              value={subcategoryInput}
              onChange={handleSubcategoryInputChange}
              onKeyDown={handleSubcategoryInputKeyDown}
            />
          </div>
          {errors.subcategories && isSubmitted && (
            <div className="error-message">{errors.subcategories}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.description && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="description">{t("add_description")}</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          {errors.description && isSubmitted && (
            <div className="error-message">{errors.description}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.authors && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="authors">{t("add_authors")}</label>
          <p>{t("hint_authors")}</p>
          <div className="tags-input">
            {authors.map((author, index) => (
              <div className="tag" key={index}>
                {author}
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveAuthor(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="authors"
              value={authorInput}
              onChange={handleAuthorInputChange}
              onKeyDown={handleAuthorInputKeyDown}
            />
          </div>
          {errors.authors && isSubmitted && (
            <div className="error-message">{errors.authors}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.volume && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="volume">{t("add_volume")}</label>
          <input
            type="text"
            id="volume"
            value={volume}
            onChange={handleVolumeChange}
          />
          {errors.volume && isSubmitted && (
            <div className="error-message">{errors.volume}</div>
          )}
        </div>

        <div
          className={`form-field ${
            errors.createdAt && isSubmitted ? "error" : ""
          }`}
        >
          <label htmlFor="createdAt">{t("add_date")}</label>
          <DatePicker
            id="createdAt"
            selected={createdAt}
            onChange={handleCreatedAtChange}
          />
          {errors.createdAt && isSubmitted && (
            <div className="error-message">{errors.createdAt}</div>
          )}
        </div>

        <div
          className={`form-field ${errors.image && isSubmitted ? "error" : ""}`}
        >
          <label htmlFor="image">{t("add_image")}</label>
          <div>
            <input
              type="file"
              id="image"
              accept=".png,.jpeg,.jpg"
              onChange={handleImageFileChange}
            />
            {errors.image && isSubmitted && (
              <div className="error-message">{errors.image}</div>
            )}
          </div>
        </div>

        <label htmlFor="pdfFile">{t("add_pdf")}</label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          onChange={handlePdfFileChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <BallTriangle type="TailSpin" color="#fff" height={20} width={20} />
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
