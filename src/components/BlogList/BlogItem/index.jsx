import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../../common/Chip";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "./styles.css";

const BlogItem = ({
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
      alert("You need to log in to see the article.");
    }
  };

  return (
    <Link
      className="blogItem-link"
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
      <div className="blogItem-wrap">
        {imageUrl && (
          <img className="blogItem-cover" src={imageUrl} alt="cover" />
        )}
        <div className="description">
          <Chip label={category} />
          <h4>{title}</h4>
          <p className="blogItem-desc">{description}</p>
        </div>
        <footer>
          <div className="authors">
            {Array.isArray(authors) && authors.length > 0 ? (
              <p>{authors.join(", ")}</p>
            ) : null}
          </div>
          <div className="blogItem-footer">
            <p>{volume}</p>
            <p>{formattedDate}</p>
          </div>
        </footer>
      </div>
    </Link>
  );
};

export default BlogItem;
