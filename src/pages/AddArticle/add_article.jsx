import React, { useState } from "react";
import firebase from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const AddArticle = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [description, setDescription] = useState("");
  const [authorNames, setAuthorNames] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubcategoriesChange = (event) => {
    setSubcategories(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAuthorNamesChange = (event) => {
    setAuthorNames(event.target.value);
  };

  const handleCreatedAtChange = (date) => {
    setCreatedAt(date);
  };

  const handleImageFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = "Please enter a title";
    }

    if (category.trim() === "") {
      errors.category = "Please enter a category";
    }

    if (subcategories.trim() === "") {
      errors.subcategories = "Please enter subcategories";
    }

    if (description.trim() === "") {
      errors.description = "Please enter a description";
    }

    if (authorNames.trim() === "") {
      errors.authorNames = "Please enter author names";
    }

    if (image === null) {
      errors.image = "Please import an image";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();

    const articleId = uuidv4();

    const articleData = {
      id: articleId,
      title,
      category,
      subcategories,
      description,
      authorNames,
      createdAt,
    };

    const db = firebase.firestore();
    db.collection("articles")
      .doc(articleId)
      .set(articleData)
      .then(() => {
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
        }

        setTitle("");
        setCategory("");
        setSubcategories("");
        setDescription("");
        setAuthorNames("");
        setCreatedAt(new Date());
        setImage(null);
        setPdfFile(null);
      })
      .catch((error) => {
        console.error("Error storing article data:", error);
      });
  };

  return (
    <div className="form-container">
      <h1>Add Article</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={`form-field ${errors.title ? "error" : ""}`}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className={`form-field ${errors.category ? "error" : ""}`}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          />
          {errors.category && (
            <div className="error-message">{errors.category}</div>
          )}
        </div>

        <div className={`form-field ${errors.subcategories ? "error" : ""}`}>
          <label htmlFor="subcategories">Subcategories:</label>
          <input
            type="text"
            id="subcategories"
            value={subcategories}
            onChange={handleSubcategoriesChange}
          />
          {errors.subcategories && (
            <div className="error-message">{errors.subcategories}</div>
          )}
        </div>

        <div className={`form-field ${errors.description ? "error" : ""}`}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          {errors.description && (
            <div className="error-message">{errors.description}</div>
          )}
        </div>

        <div className={`form-field ${errors.authorNames ? "error" : ""}`}>
          <label htmlFor="authorNames">Author Names:</label>
          <input
            type="text"
            id="authorNames"
            value={authorNames}
            onChange={handleAuthorNamesChange}
          />
          {errors.authorNames && (
            <div className="error-message">{errors.authorNames}</div>
          )}
        </div>

        <div className={`form-field ${errors.createdAt ? "error" : ""}`}>
          <label htmlFor="createdAt">Created At:</label>
          <DatePicker
            id="createdAt"
            selected={createdAt}
            onChange={handleCreatedAtChange}
          />
          {errors.createdAt && (
            <div className="error-message">{errors.createdAt}</div>
          )}
        </div>

        <div className={`form-field ${errors.image ? "error" : ""}`}>
          <label htmlFor="image">Image:</label>
          <div>
            <input
              type="file"
              id="image"
              accept=".png,.jpeg,.jpg"
              onChange={handleImageFileChange}
            />
            {errors.image && (
              <div className="error-message">{errors.image}</div>
            )}
          </div>
        </div>

        <label htmlFor="pdfFile">PDF File:</label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          onChange={handlePdfFileChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
