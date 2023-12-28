import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// inport { addToCart } from '../../../'

export default function DetailCourse() {
  const { idCourse } = useParams(); // Lấy giá trị idCourse từ URL

  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/detail/${idCourse}`);
        setCourse(res.data); // Lưu dữ liệu từ API vào state
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idCourse]); // Thêm idCourse vào dependency array để useEffect được gọi lại khi idCourse thay đổi


  const addToCart = (courseId) => {
    axios.post('/add-to-cart', { courseId })
      .then((response) => {
        console.log(response.data);
        toast.success("Add to card successful");
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };
  return (
    <div className="container px-4 px-lg-5 my-5" style={{height:'500px'}}>
      <div className="row gx-4 gx-lg-5 align-items-center">
        <div className="col-md-6">
        <img
        className=" card card-img-top mb-5 mb-md-0 rounded-image"
        src={`http://localhost:8000/image/${course?.image?.filename}`  
        }
        alt="..."
      />
        </div>

        <div className="col-md-6">
          {/* <div className="small mb-1">SKU: BST-498</div> */}
          <h1 className="display-5 fw-bolder">{course.name}</h1>
          <div className="fs-5 mb-5">
            <span>Giá : {course.price} VND</span>
          </div>
          <p className="lead">{course.description}</p>
          <div className="d-flex">
            <input
              className="form-control text-center me-3"
              id="inputQuantity"
              type="num"
              // defaultValue={1}
              style={{ maxWidth: "3rem" }}
            />
            <button
              className="btn btn-outline-dark flex-shrink-0"
              type="button"
              onClick={()=>addToCart(course._id)}
            >
              <i className="bi-cart-fill me-1" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}