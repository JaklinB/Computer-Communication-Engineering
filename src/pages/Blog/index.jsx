import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chip from "../../components/common/Chip";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import PDFViewer from "../../components/pdfViewer/PDFViewer";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Blog = ({ isAdmin }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const navigate = useNavigate();

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
            year: "numeric",
            month: "long",
            day: "numeric",
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
        setPdfUrl(null);
        setPdfError(true); 
      }
    }

    async function getLikeCountFromDatabase() {
      try {
        const articleRef = firebase.firestore().collection("articles").doc(id);
        const articleDoc = await articleRef.get();
        if (articleDoc.exists) {
          const articleData = articleDoc.data();
          setLikeCount(articleData.likeCount || 0);
        }
      } catch (error) {
        console.error("Error getting like count:", error);
      }
    }

    getBlogFromDatabase();
    getImageUrlFromStorage();
    getPdfUrlFromStorage();
    getLikeCountFromDatabase();
  }, [id]);

  async function deleteArticle() {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const blogRef = firebase.firestore().collection("articles").doc(id);
        await blogRef.delete();
        navigate("/list");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  }

  async function handleLike() {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const articleRef = firebase.firestore().collection("articles").doc(id);
        const likeRef = articleRef.collection("likes").doc(user.uid);

        const likeDoc = await likeRef.get();
        if (likeDoc.exists) {
          await likeRef.delete();
          await articleRef.update({
            likeCount: firebase.firestore.FieldValue.increment(-1),
          });
          setLiked(false);
          setLikeCount(likeCount - 1);
        } else {
          await likeRef.set({
            user_ref: user.uid,
            article_ref: id,
          });
          await articleRef.update({
            likeCount: firebase.firestore.FieldValue.increment(1),
          });
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  }

  return (
    <>
      {blog ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">{formattedDate}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {Array.isArray(blog.subcategories) &&
                blog.subcategories.map((category, i) => (
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
          {pdfUrl ? (
            <PDFViewer pdfUrl={pdfUrl} />
          ) : pdfError ? (
            <p>No PDF file found for this article.</p> 
          ) : null}
          {isAdmin && <button onClick={deleteArticle}>Delete Article</button>}
          <div className="like-section">
            <button onClick={handleLike} className="icon-button">
              {liked ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <span className="like-count">
              {likeCount} Like{likeCount !== 1 && "s"}
            </span>
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
