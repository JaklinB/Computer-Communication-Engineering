import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import BlogList from "../../components/BlogList";

const ReadLaterPage = ({ userId }) => {
  const [readLaterArticles, setReadLaterArticles] = useState([]);

  useEffect(() => {
    const fetchReadLaterArticles = async () => {
      try {
        const userRef = firebase.firestore().collection("users").doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const readLaterArticleIds = userData.readLater || [];
          const readLaterPromises = readLaterArticleIds.map((articleId) => {
            const articleRef = firebase.firestore().collection("articles").doc(articleId);
            return articleRef.get();
          });
          const readLaterArticleDocs = await Promise.all(readLaterPromises);
          const readLaterArticlesData = readLaterArticleDocs.map((doc) => doc.data());
          setReadLaterArticles(readLaterArticlesData);
        }
      } catch (error) {
        console.error("Error fetching read later articles:", error);
      }
    };

    if (userId) {
      fetchReadLaterArticles();
    }
  }, [userId]);

  return (
    <div>
      <h1>Read Later Articles</h1>
      {readLaterArticles.length > 0 ? (
        <BlogList blogs={readLaterArticles} isLoggedIn={true} />
      ) : (
        <p>No articles added to read later.</p>
      )}
    </div>
  );
};

export default ReadLaterPage;
