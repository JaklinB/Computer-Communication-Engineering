import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../../common/Chip";
import { useTranslation } from "react-i18next";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "./styles.css";

const BlogArchiveCard = ({
  blog: {
    description,
    title,
    createdAt,
    authors,
    cover,
    category,
    subCategories,
    id,
  },
  isLoggedIn,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [volume, setVolume] = useState(null);

  const { t } = useTranslation("blog");

  const storage = firebase.storage();
  const created = {
    seconds: createdAt.seconds,
    nanoseconds: createdAt.nanoseconds,
  };
  const dateInSeconds = created.seconds;
  const createdAtDate = new Date(dateInSeconds * 1000);
  const formattedDate = createdAtDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
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

    async function getVolumeFromFirebase() {
      try {
        const db = firebase.firestore();
        const articleRef = db.collection("articles").doc(id);
        const articleSnapshot = await articleRef.get();
        const articleData = articleSnapshot.data();
        if (articleData) {
          setVolume(articleData.volume);
        }
      } catch (error) {
        console.error("Error getting volume from Firebase:", error);
      }
    }

    getImageUrlFromStorage();
    getVolumeFromFirebase();
  }, [cover, id]);

  const handleArticleClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert(t("login_to_read"));
    }
  };

  return (
    <div className="blog-card">
      <Link
        className="meta"
        to={{
          pathname: `/articles/${id}`,
          state: {
            blog: {
              description,
              title,
              createdAt,
              authors,
              cover,
              category,
              subCategories,
              id,
            },
          },
        }}
        onClick={handleArticleClick}
      >
        <div
          className="photo"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </Link>
      <div className="description">
        <h1>{title}</h1>
        <Chip label={category} />
        <p className="description-text">{description}</p>
        <div className="details">
        {Array.isArray(authors) && authors.length > 0 ? (
            <p>{authors.join(", ")}</p>
          ) : null}
          <div className="footer-details">
             <div className="blogItem-footer">
            <p>Volume: {volume}</p>
            <p>{formattedDate}</p>
          </div>
          <p className="read-more">
            <Link to={`/articles/${id}`} onClick={handleArticleClick}>
              Read More
            </Link>
          </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default BlogArchiveCard;
