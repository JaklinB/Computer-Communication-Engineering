import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import EmptyList from "../../components/common/EmptyList";
import BlogItem from "../../components/BlogList/BlogItem";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./styles.css";

const Home = ({ isLoggedIn }) => {
  const [blogs, setBlogs] = useState([]);

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

  const newestBlogs = blogs.slice(0, 3);

  return (
    <div>
      <Header />
      <h1 className="blogList-title">Най-новите статии</h1>
      <div className="blogList-wrap">
          {!blogs.length ? (
        <EmptyList />
      ) : (
        newestBlogs.map((blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
            isLoggedIn={isLoggedIn} 
          />
        ))
      )}
      </div>
    
    </div>
  );
};

export default Home;
