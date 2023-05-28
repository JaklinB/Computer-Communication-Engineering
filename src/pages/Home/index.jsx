import React, { useState } from "react";
import Header from "../../components/Home/Header";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/BlogList";

const Home = ({ isAdmin }) => {
 
  console.log(isAdmin);
  return (
    <div>
      <Header />
      {/* {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />} */}
    </div>
  );
};

export default Home;
