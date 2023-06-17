import React, { useState, useEffect } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogListArchive from "../../components/BlogListArchive";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import './styles.css';

const MagazineList = ({ isAdmin, isLoggedIn }) => {
  const { t } = useTranslation("archivePage");
  const location = useLocation();
  const blogs = location.state?.blogs || [];

  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    setOriginalBlogs(blogs);
  }, [blogs]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    if (searchKey.trim() === "") {
      setOriginalBlogs(blogs);
    } else {
      const filteredBlogs = blogs.filter(
        (blog) =>
          blog.category.toLowerCase().includes(searchKey.toLowerCase().trim()) ||
          blog.subcategories.some((subcategory) =>
            subcategory.toLowerCase().includes(searchKey.toLowerCase().trim())
          )
      );
      setOriginalBlogs(filteredBlogs);
    }
  };

  const handleClearSearch = () => {
    setSearchKey("");
    setOriginalBlogs(blogs);
  };

  const handleSearchKey = (e) => {
    setSearchKey(e.target.value);
    handleSearchResults();
  };

  console.log(originalBlogs);

  return (
    <div>
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={handleSearchKey}
      />
      {!originalBlogs.length ? (
        <EmptyList />
      ) : (
        <BlogListArchive blogs={originalBlogs} isLoggedIn={isLoggedIn} />
      )}
      {isAdmin && (
        <Link to="/add-article">
          <button className="add-article">{t("add_article")}</button>
        </Link>
      )}
    </div>
  );
};

export default MagazineList;
