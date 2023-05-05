import React, { useState, useEffect } from "react";
import "./styles.css";

import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";


const images = [image1, image2, image3];

const Carousel = ({ slideInterval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
    }, slideInterval);

    return () => clearInterval(slideTimer);
  }, [currentImageIndex, images.length, slideInterval]);

  const handleImageLoad = (event) => {
    event.target.classList.add("carousel__image--active");
  };

  const imageTranslation = currentImageIndex * -100;

  return (
    <div className="carousel">
      <div className="carousel__wrapper" style={{ transform: `translateX(${imageTranslation}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel__image ${index === currentImageIndex ? "carousel__image--active" : ""}`}
            src={image}
            alt="carousel"
            onLoad={handleImageLoad}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

