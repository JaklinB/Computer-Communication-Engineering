import React, { useState, useEffect } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/BlogList";
import SearchBar from "../../components/SearchBar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./styles.css";

const MagazineList = ({ isAdmin, isLoggedIn }) => {
  const { t } = useTranslation("archivePage");

  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");

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

  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  const handleClearSearch = () => {
    setSearchKey("");
  };

  return (
    <div>
      {isAdmin && (
        <Link to="/add-article">
          <button className="add-article">{t("add_article")}</button>
        </Link>
      )}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      {!blogs.length ? (
        <EmptyList />
      ) : (
        <BlogList blogs={blogs} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

export default MagazineList;
