import React from "react";
import "./styles.css";
import Carousel from "../../Carousel/carousel";


const Header = () => {
  return (
    <header className="home-header">
      <h1>
        <span>Списание</span> ТУ
      </h1>
      <p>Технически университет - София</p>
      <Carousel />
    </header>
  );
};

export default Header;
