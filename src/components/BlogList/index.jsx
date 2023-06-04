import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BlogItem from "./BlogItem";
import "./styles.css";

const BlogList = ({ blogs }) => {
  const { t } = useTranslation("archivePage");

  const [sortOption, setSortOption] = useState("none");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortBlogs = (blogs) => {
    if (sortOption === "oldest") {
      return [...blogs].sort(
        (a, b) => new Date(a.createdAt.seconds) - new Date(b.createdAt.seconds)
      );
    } else if (sortOption === "newest") {
      return [...blogs].sort(
        (a, b) => new Date(b.createdAt.seconds) - new Date(a.createdAt.seconds)
      );
    } else {
      return blogs;
    }
  };

  return (
    <div className="blogList">
      <div>
        <select id="sortOption" value={sortOption} onChange={handleSortChange}>
          <option value="none">{t("sort_by")}</option>
          <option value="oldest">{t("oldest_first")}</option>
          <option value="newest">{t("newest_first")}</option>
        </select>
      </div>
      <div className="blogList-wrap">
        {sortBlogs(blogs).map((blog) => (
          <BlogItem blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
