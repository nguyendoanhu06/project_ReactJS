import React, { useState, useEffect, useContext } from "react";

import "../styles/Featuredmovie.css";
import { PiFilmReelFill } from "react-icons/pi";
import { FaTags } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import {
  query,
  limit,
  getDocs,
  orderBy,
  startAt,
  collection,
} from "firebase/firestore";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import Trailer from "./Trailer.jsx";
import { NavLink } from "react-router-dom";
export default function Featuredmovie() {
  const { messCollect } = useContext(FirebaseContext);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(""); // for handle trailer link
  const [isOpen, setIsOpen] = useState(false);

  // handle trailer popup
  // lấy data từ firebase
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const snapshot = await getDocs(messCollect);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedMovies(data);
      } catch (error) {
        console.error("Error fetching featured movies: ", error);
      }
    };

    fetchFeaturedMovies();
  }, [messCollect]);

  // handle popup
  const handleOpenPopup = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="featured-movie-section">
      <div className="featured-movie-background-overlay"></div>
      <div className="featured-movie-container">
        <div className="featured-movie-header">
          <div className="featured-movie-header-content">
            <div className="featured-movie-header-left">
              <div className="header-left-wrap">
                <div className="header-left-heading">
                  <div className="header-left-icon">
                    <PiFilmReelFill className="heading-icon" />
                  </div>
                  <div className="top-heading">
                    <h3 className="sub-title">Đừng bỏ lỡ</h3>
                    <h2 className="title">Các phim nổi bật</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="featured-movie-header-right">
              <div className="header-right-wrap">
                <div className="header-right-heading">
                  <p>
                    Phasellus non cursus ligula, sed mattis urna. Aenean ac tor
                    gravida, volutpat quam eget, consequat elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-movie-content">
          <div className="featured-content-container">
            <div className="featured-content-outer-list">
              <div className="featured-content-list">
                <div className="featured-content-stage">
                  {featuredMovies.slice(3, 6).map(
                    (
                      movie // chỉ lấy 3 item để render ra featured movie
                    ) => (
                      <div className="featured-content-item" key={movie.id}>
                        <div className="featured-content-item-container">
                          <a href="#">
                            <div className="featured-movie-img">
                              <img src={movie.subImg[2]} alt={movie.nameFilm} />
                            </div>
                          </a>
                          <div className="featured-movie-info">
                            <a href="#">
                              <h3 className="movie-title">{movie.nameFilm}</h3>
                            </a>
                            <div className="categories-and-time">
                              <div className="movie-category">
                                <FaTags className="category-tag" />

                                {movie.infoFilm.catagory.map(
                                  (category, index) => (
                                    <React.Fragment key={index}>
                                      <NavLink
                                        to={`/movies-category/${category}`}
                                      >
                                        {category}
                                      </NavLink>
                                      {index !==
                                        movie.infoFilm.catagory.length - 1 && (
                                        <span>, </span>
                                      )}
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                              <span className="running-time-featured">
                                <FaClock className="time-icon" />
                                {movie.infoFilm.time}
                              </span>
                            </div>
                            <div className="button-wrapper">
                              <div className="has-trailer">
                                <div
                                  className="btn-trailer-video"
                                  data-movie-id={movie.id}
                                  onClick={() =>
                                    handleOpenPopup(movie.videoTrailer)
                                  }
                                >
                                  <span className="text-trailer">
                                    Xem trailer
                                  </span>
                                </div>
                              </div>
                              <button className="booking">Đặt vé</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-movie-explore">
          <div className="movie-explore-container">
            <div className="movie-explore-item-container">
              <div className="movie-explore-stage">
                <div className="movie-explore-left">
                  <div className="movie-explore-left-container">
                    <div className="movie-explore-counter">
                      <div className="counter-content">
                        <span>23,00+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="movie-explore-middle">
                  <div className="movie-explore-middle-container">
                    <p>more comedy & horror movies you can explore</p>
                  </div>
                </div>
                <div className="movie-explore-right">
                  <div className="movie-explore-right-container">
                    <NavLink to={"/#"}>
                      <span className="button-content-wrapper">
                        <span className="explore-button-text">Explore Now</span>
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trailer
        isOpen={isOpen}
        selectedVideoUrl={selectedVideoUrl}
        handleClosePopup={handleClosePopup}
      />
    </div>
  );
}
