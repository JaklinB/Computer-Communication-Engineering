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
    authorName,
    authorAvatar,
    cover,
    category,
    subCategories,
    id,
  },
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const storage = firebase.storage();
  const created = { seconds: createdAt.seconds, nanoseconds: createdAt.nanoseconds};
  const dateInSeconds = created.seconds;
  const createdAtDate = new Date(dateInSeconds * 1000);
  const formattedDate = createdAtDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  console.log(formattedDate);

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

    getImageUrlFromStorage();
  }, [cover, id]);

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
            authorName,
            authorAvatar,
            cover,
            category,
            subCategories,
            id,
          },
        },
      }}
    >
      <div className="blogItem-wrap">
        {imageUrl && (
          <img className="blogItem-cover" src={imageUrl} alt="cover" />
        )}
        <div className="description">
          <Chip label={category} />
          <h3>{title}</h3>
          <p className="blogItem-desc">{description}</p>
        </div>
        <footer>
          <div className="blogItem-author">
            <img src={authorAvatar} alt="avatar" />
            <div>
              <h6>{authorName}</h6>
              <p>{formattedDate}</p>
            </div>
          </div>
        </footer>
      </div>
    </Link>
  );
};

export default BlogItem;
