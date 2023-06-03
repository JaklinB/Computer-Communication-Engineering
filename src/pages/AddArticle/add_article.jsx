import React, { useState } from 'react';
import firebase from "../../config/firebase";
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddArticle = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [description, setDescription] = useState('');
  const [authorNames, setAuthorNames] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();

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
    db.collection('articles')
      .doc(articleId)
      .set(articleData)
      .then(() => {
        console.log('Article data stored successfully with ID:', articleId);

        if (image) {
          const imageStorageRef = storageRef.child(`articles/${articleId}/image`);
          imageStorageRef
            .put(image)
            .then(() => {
              console.log('Image file uploaded successfully');
            })
            .catch((error) => {
              console.error('Error uploading image file:', error);
            });
        }

        if (pdfFile) {
          const pdfStorageRef = storageRef.child(`articles/${articleId}/pdf`);
          pdfStorageRef
            .put(pdfFile)
            .then(() => {
              console.log('PDF file uploaded successfully');
            })
            .catch((error) => {
              console.error('Error uploading PDF file:', error);
            });
        }

        setTitle('');
        setCategory('');
        setSubcategories('');
        setDescription('');
        setAuthorNames('');
        setCreatedAt(new Date());
        setImage(null);
        setPdfFile(null);
      })
      .catch((error) => {
        console.error('Error storing article data:', error);
      });
  };

  return (
    <div>
      <h1>Add Article</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        />

        <label htmlFor="subcategories">Subcategories:</label>
        <input
          type="text"
          id="subcategories"
          value={subcategories}
          onChange={handleSubcategoriesChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>

        <label htmlFor="authorNames">Author Names:</label>
        <input
          type="text"
          id="authorNames"
          value={authorNames}
          onChange={handleAuthorNamesChange}
        />

        <label htmlFor="createdAt">Created At:</label>
        <DatePicker
          id="createdAt"
          selected={createdAt}
          onChange={handleCreatedAtChange}
        />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept=".png,.jpeg,.jpg"
          onChange={handleImageFileChange}
        />

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
