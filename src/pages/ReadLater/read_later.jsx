import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import BlogList from "../../components/BlogList";

const ReadLaterPage = ({ userId }) => {
  const { t } = useTranslation("profile");

  const [readLaterArticles, setReadLaterArticles] = useState([]);

  useEffect(() => {
    const fetchReadLaterArticles = async () => {
      try {
        const userRef = firebase.firestore().collection("users").doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const readLaterArticleIds = userData.readLater || [];
          const readLaterPromises = readLaterArticleIds.map(async (articleId) => {
            const articleRef = firebase.firestore().collection("articles").doc(articleId);
            const articleSnapshot = await articleRef.get();
            const articleData = articleSnapshot.data();

            if (articleData && articleData.title && articleData.createdAt && articleData.authors) {
              return {
                description: articleData.description || "",
                title: articleData.title,
                createdAt: articleData.createdAt.toDate(),
                authors: articleData.authors,
                cover: articleData.cover || "",
                category: articleData.category || "",
                subCategories: articleData.subCategories || [],
                id: articleId,
              };
            }
          });

          const readLaterArticleData = await Promise.all(readLaterPromises);
          const validArticles = readLaterArticleData.filter((article) => article);
          setReadLaterArticles(validArticles);
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
      <h1>{t("read_later_articles")}</h1>
      {readLaterArticles.length > 0 ? (
        <BlogList blogs={readLaterArticles} isLoggedIn={true} />
      ) : (
        <p>{t("no_read_later")}</p>
      )}
    </div>
  );
};

export default ReadLaterPage;
