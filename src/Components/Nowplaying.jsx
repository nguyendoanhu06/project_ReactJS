import React, { useContext, useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseContext } from '../../Firebase/FirebaseProvider';
import { query, limit, getDocs } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
export default function Nowplaying({ activeDot, handleDotClick}) {
  const { messCollect } = useContext(FirebaseContext);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(messCollect, limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarouselItems(data);

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [messCollect]);
  


  return (
    <div className="playing-now">
            <div className="now-playing-container">

    <div className="now-playing-item">
    {carouselItems.slice(activeDot, activeDot + 4).map((item) => (
        <div className="content-item" key={item.id}>
          <a href="#">
            <div className="now-playing-img">
          <img
            
            src={item.img}
            alt={item.nameFilm}
          />
          </div>
          </a>
            <div className="now-playing-info">
              <div className="categories-and-time">
                <div className="movie-category-now-playing">
                {item.infoFilm.catagory.map((category, index) => (
                      <React.Fragment key={index}>
                        <NavLink to={`/movies-category/${category}`}>{category}</NavLink>
                        {index !== item.infoFilm.catagory.length - 1 && <span>, </span>} 
                      </React.Fragment>
                    ))}
                    <span> / </span>
                  <span className="running-time">{item.infoFilm.time}</span>
                </div>
              </div>
              <a href="#"><h3 className="movie-now-title">{item.nameFilm}</h3></a>
              <button className="booking">Đặt vé</button>
            </div>
          </div>
      ))}
    </div>
    </div>
    
  </div>
);
}