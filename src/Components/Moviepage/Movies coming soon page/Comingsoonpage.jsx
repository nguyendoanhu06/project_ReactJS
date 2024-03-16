import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import "../Movies all/styles/Moviesall.css";
import "../Movies now playing/Nowplayingpage.css";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import Trailer from "../../Trailer";
import { getDocs, query } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Footer from "../../Footer";

export default function Comingsoonpage() {
  const { messCollect } = useContext(FirebaseContext);
  const [comingSoon, setComingSoon] = useState([]);
  // handle trailer popup
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // handle watch trailer
  const handleWatchTrailer = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsTrailerOpen(true);
  };

  //close watch trailer
  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect);
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moviesSlice = data.slice(7, 11);
        setComingSoon(moviesSlice);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [messCollect]);
  return (
    <div className="comingsoonpage">
      <div className="comingsoonpage-header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="nowplayingpage-body comingsoonpage">
        <div className="nowplayingpage-container comingsoonpage">
          <div className="nowplayingpage-context comingsoonpage">
            <div className="nowplayingpage-wrap comingsoonpage">
              <div className="nowplaying-movielist comingsoonpage">
                {comingSoon.map((item) => (
                  <div className="content-item" key={item.id}>
                    <a href="#">
                      <div className="now-playing-img">
                        <img src={item.img} alt={item.nameFilm} />
                      </div>
                    </a>
                    <div className="now-playing-info">
                      <div className="categories-and-time">
                        <div className="movie-category-now-playing">
                        {item.infoFilm.catagory.map((category, index) => (
                            <React.Fragment key={index}>
                              <NavLink to={`/movies-category/${category}`}>
                                {category}
                              </NavLink>
                              {index !== item.infoFilm.catagory.length - 1 && (
                                <span>, </span>
                              )}
                            </React.Fragment>
                          ))}
                          <span> / </span>
                          <span className="running-time">
                            {item.infoFilm.time}
                          </span>
                        </div>
                      </div>
                      <a href="#">
                        <h3 className="movie-now-title">{item.nameFilm}</h3>
                      </a>
                      <button
                        className="booking"
                        onClick={() => handleWatchTrailer(item.videoTrailer)}
                      >
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trailer popup */}
      <Trailer
        isOpen={isTrailerOpen}
        selectedVideoUrl={selectedVideoUrl}
        handleClosePopup={handleCloseTrailer}
      />
      <Footer/>
    </div>
  );
}
