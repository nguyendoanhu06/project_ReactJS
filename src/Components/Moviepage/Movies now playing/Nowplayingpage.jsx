import React, { useContext, useEffect, useState } from "react";
import Bannersidepage from "../../Bannersidepage";
import Navbar from "../../Navbar";
import "../../Moviepage/Movies all/styles/Moviesall.css";
import { getDocs, limit, query } from "firebase/firestore";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import "../../../styles/Moviesplaying.css";
import "../Movies now playing/Nowplayingpage.css";
import { NavLink } from "react-router-dom";
import Footer from "../../Footer";

export default function Nowplayingpage() {
  const { messCollect } = useContext(FirebaseContext);

  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect, limit(6));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNowPlaying(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [messCollect]);
  return (
    <div className="Nowplayingpage">
      <div className="header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="nowplayingpage-body">
        <div className="nowplayingpage-container">
          <div className="nowplayingpage-context">
            <div className="nowplayingpage-wrap">
              <div className="nowplaying-movielist">
                {nowPlaying.map((item) => (
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
                      <button className="booking">Get Ticket</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
