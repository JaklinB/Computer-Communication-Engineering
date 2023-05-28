import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chip from "../../components/common/Chip";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import PDFViewer from "../../components/pdfViewer/PDFViewer";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    async function getBlogFromDatabase() {
      try {
        const blogRef = firebase.firestore().collection("articles").doc(id);
        const doc = await blogRef.get();
        if (doc.exists) {
          const blogData = doc.data();
          setBlog(blogData);
        }
      } catch (error) {
        console.error("Error getting blog:", error);
      }
    }

    async function getImageUrlFromStorage() {
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`articles/${id}/image`);
        const imageUrl = await imageRef.getDownloadURL();
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    }

    async function getPdfUrlFromStorage() {
      try {
        const storageRef = firebase.storage().ref();
        const pdfRef = storageRef.child(`articles/${id}/pdf`);
        const pdfUrl = await pdfRef.getDownloadURL();
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error getting PDF URL:", error);
      }
    }

    getBlogFromDatabase();
    getImageUrlFromStorage();
    getPdfUrlFromStorage();
  }, [id]);

  return (
    <>
      {blog ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">{blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {blog.subcategories.split(",").map((category, i) => (
                <div key={i}>
                  <Chip label={category.trim()} />
                </div>
              ))}
            </div>
          </header>
          {imageUrl && <img src={imageUrl} alt="cover" />}
          <p className="blog-desc">{blog.description}</p>
          {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : null}
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
