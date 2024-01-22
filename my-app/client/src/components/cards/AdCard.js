import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdCard({ ad , addToCart}) {
    const handleAddToCart = () => {
        addToCart(ad._id); // Gọi hàm addToCart với courseId từ props ad
      };
  return (
    <>
      <li className="">
        <div className="card mt-4 ml-5 mb-4" style={{ width: "28rem" }}>
          {ad.image && (
            <div className="image-container">
              <img
                src={`http://localhost:8000/image/${ad.image.filename}`}
                alt="ad"
                className="card-img-top rounded-image"
              />
            </div>
          )}
          <div className="card-container">
            <div className="card-body">
              <a href={`/adDetails/${ad._id}`}>
                <h3 className="card-title">{ad.name}</h3>
              </a>

              {/* <p className="text-container">{ad.description}</p> */}
              <p className="card-text">
                Giá: <strong>{ad.price}</strong> vnd
              </p>
              <p className="card-text">
                <i>
                  Đăng bởi : {ad.postedBy.email}
                  {/* Giá: {ad.price} vnd */}
                </i>
              </p>
              <div className="button-container">
                <a href="#" className="btn btn-primary">
                  Mua ngay
                </a>
                <a onClick={handleAddToCart} className="btn btn-danger">
                  Thêm giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
