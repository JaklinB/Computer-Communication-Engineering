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
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    async function getBlogFromDatabase() {
      try {
        const blogRef = firebase.firestore().collection("articles").doc(id);
        const doc = await blogRef.get();
        if (doc.exists) {
          const blogData = doc.data();
          setBlog(blogData);
          const created = {
            seconds: blogData.createdAt.seconds,
            nanoseconds: blogData.createdAt.nanoseconds,
          };
          const dateInSeconds = created.seconds;
          const createdAtDate = new Date(dateInSeconds * 1000);
          const formattedDate = createdAtDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          setFormattedDate(formattedDate);
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
            <p className="blog-date">{formattedDate}</p>
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
          <p className="blog-desc">
            <span className="first-letter">{blog.description.charAt(0)}</span>
            {blog.description.slice(1)}
          </p>
          {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : null}
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
