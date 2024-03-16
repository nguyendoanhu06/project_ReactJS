import React, { useContext, useEffect, useState } from "react";
import "../Cart movies/Cartmovies.css";
import Navbarcart from "../Cart movies/Navbarcart";
import { MdKeyboardArrowRight } from "react-icons/md";
import SEATMAP from "../Cart movies/SEATMAP.png";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { getDocs } from "firebase/firestore";
import { MdEventSeat } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Footer from "../../Footer";

export default function Cartmovies() {
  const { chairCollection } = useContext(FirebaseContext);
  const [chairs, setChairs] = useState([]);

  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const chairSnapShot = await getDocs(chairCollection);
        const chairData = chairSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChairs(chairData);
      } catch (error) {
        console.log("Error fetching chairs:", error);
      }
    };
    fetchChairs();
  }, [chairCollection]);
  const renderSeats = () => {
    return chairs.map((chair) => {
      const { hang, danhSachGhe } = chair;

      return (
        <div className="seat-container">
        <span className="seat-row-title">{hang}</span>

        <div key={hang} className="seat-row">
          <div className="seat-list">
            {danhSachGhe.map((seat, index) => (
              <span key={index} className="seat">
                <MdEventSeat />
                <span className="seat-count">{seat.soGhe}</span>
              </span>
            ))}
          </div>
        </div>
        </div>
      );
    });
  };
// for side bar
const [error, setError] = useState(false);
const [showDiscountForm, setShowDiscountForm] = useState(false);

const handleDiscountSubmit = () => {
  setError(true); 
};

  return (
    <div className="cart-movies">
      <div className="cart-movies_header">
        <Navbarcart />
        <div className="cart-header">
          <div className="cart-header_container">
            <p>
              Trang chủ <MdKeyboardArrowRight /> <span>Trang đặt vé</span>
            </p>
          </div>
        </div>
      </div>
      <div className="cart-movies_body">
        <div className="booking-cart">
          <div className="cart-content">
            <div className="seatmap">
              <div className="cart-error">
                <span className="cart-error-text">Đã có người đặt!</span>
              </div>
              <div className="img-seatmap">
                <div className="img-canvas">
                  <div className="imp-translate">
                    <div className="imp-scale">
                      <img src={SEATMAP} />
                      <div className="imp-object">{renderSeats()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-sidebar">
              <div className="cart-info">
                <div className="cart-info_container">
                    <h3 className="cart_title">
                    Thông tin đặt vé
                    </h3>
                    <div className="content-card-info">
                    <span className="cart_placeholder">Vui lòng chọn ghế bạn muốn</span>
                    </div>

                </div>
                <div className="total-cart-info">
                  <span className="text">Thành tiền</span>
                  <span className="total-price">0đ</span>

                </div>
                <div className="cart-discount">
                  <a onClick={() => setShowDiscountForm(true)} style={{display: showDiscountForm ? 'none' : 'block'}}>Nhập mã giảm giá</a>
                  <div style={{ display: showDiscountForm ? 'block' : 'none' }} className="form-discount">
                    <div className="input-discount-code">
                      <input type="text" className="discount-code" placeholder="Nhập mã giảm giá" />
                    </div>
                    <button className="cart-discount-submit" onClick={(handleDiscountSubmit)}>
                      Áp dụng
                    </button>
                    <IoIosCloseCircle onClick={() => setShowDiscountForm(false)}/>
                    <p className="error" style={{display: !error ? 'none' : 'block' }}>
                      Mã giảm giá không hợp lệ
                    </p>
                  </div>
               
                </div>
                <div className="cart-checkout">
                  <div className="submit-load-more">
                    <div className="load-more">

                    </div>
                  </div>
                  <NavLink to={'/'}>Đến trang thanh toán</NavLink>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
