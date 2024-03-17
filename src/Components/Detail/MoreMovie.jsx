
import React, { useState, useEffect, useContext } from 'react'
import "../Detail/Style.css"
import { FirebaseContext } from '../../../Firebase/FirebaseProvider';
import { getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';
import { NavLink, useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom'

export default function MoreMovie() {
    let navigate = useNavigate()
    const { messCollect } = useContext(FirebaseContext);
    const [carouselItems, setCarouselItems] = useState([]);

    let param = useParams()
    console.log(param.id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(messCollect, limit(3));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCarouselItems(data);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [messCollect, param.id]);
    let randomFilm = []
    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * carouselItems.length)
        randomFilm.push(carouselItems[random])

    }
    console.log(randomFilm)
    return (
        <div>
            <div className="more-movie">
                {carouselItems.map((item) => (
                    <div key={item.id} className="more-item">
                        <a href="#">
                            <img src={item.img[0]} alt={item.nameFilm} />
                        </a>
                        <div className="more-item-contain">
                            <div className="more-item-info">
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
                                <p> / </p>
                                <p>{item.infoFilm.time}</p>
                            </div>
                            <button onClick={() => {
                                navigate(`/detail/${item.id}`)
                                window.location.reload()
                            }} className='name-movie'>
                                <h3>{item.nameFilm}</h3>
                            </button>
                            <button className='get-ticket'>Đặt vé</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
