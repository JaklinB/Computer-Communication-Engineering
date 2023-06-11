import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import EmptyList from "../../components/common/EmptyList";
import BlogItem from "../../components/BlogList/BlogItem";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useTranslation } from 'react-i18next';
import "./styles.css";

const Home = ({ isLoggedIn }) => {
  const { t } = useTranslation('homePage');

  const [blogs, setBlogs] = useState([]);
  const [mostLikedBlogs, setMostLikedBlogs] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const firestore = firebase.firestore();
        const snapshot = await firestore.collection("articles").get();
        const articles = snapshot.docs.map((doc) => doc.data());
        setBlogs(articles);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const updateMostLikedBlogs = () => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likeCount - a.likeCount);
      const mostLiked = sortedBlogs.slice(0, 3);
      setMostLikedBlogs(mostLiked);
    };

    updateMostLikedBlogs();
  }, [blogs]);

  const newestBlogs = blogs.slice(0, 3);

  return (
    <div>
      <Header />
      <h1 className="blogList-title">{t('newest_articles')}:</h1>
      <div className="blogList-wrap-home">
        {!blogs.length ? (
          <EmptyList />
        ) : (
          newestBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} isLoggedIn={isLoggedIn} />
          ))
        )}
      </div>
      <h1 className="blogList-title">{t('most_liked_articles')}:</h1>
      <div className="blogList-wrap-home">
        {!mostLikedBlogs.length ? (
          <EmptyList />
        ) : (
          mostLikedBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} isLoggedIn={isLoggedIn} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
