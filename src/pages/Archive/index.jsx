import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const VolumePage = ({ isAdmin }) => {
  const { t } = useTranslation("archivePage");
  const navigate = useNavigate();

  const [volumes, setVolumes] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(null);

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("articles")
          .get();
        const articles = snapshot.docs.map((doc) => doc.data());
        const uniqueVolumes = [
          ...new Set(articles.map((article) => article.volume)),
        ];
        setVolumes(uniqueVolumes);
      } catch (error) {
        console.error("Error fetching volumes:", error);
      }
    };

    fetchVolumes();
  }, []);

  const handleVolumeClick = async (volume) => {
    setSelectedVolume(volume);
    try {
      const snapshot = await firebase
        .firestore()
        .collection("articles")
        .where("volume", "==", volume)
        .get();
      const blogsData = snapshot.docs.map((doc) => doc.data());
      navigate("/list", { state: { blogs: blogsData } });
    } catch (error) {
      console.error("Error fetching blogs by volume:", error);
    }
  };

  return (
    <div className="volume-page">
      <h1>{t("select_volume")}</h1>
      <div className="volume-button-container">
        {volumes.map((volume) => (
          <button
            key={volume}
            className={`volume-button ${
              selectedVolume === volume ? "selected" : ""
            }`}
            onClick={() => handleVolumeClick(volume)}
          >
            {volume}
          </button>
        ))}
      </div>
      {isAdmin && (
        <Link to="/add-article">
          <button className="add-article">{t("add_article")}</button>
        </Link>
      )}
    </div>
  );
};

export default VolumePage;
