// Home.js
import { useAuth } from "../context/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SimpleSlider from '../pages/Slider'
// import Course from "../../../server/models/ad";

export default function Home() {
  // context
  const [auth, setAuth] = useAuth();

  const [courses, setCourses] = useState([]);
  // const [courseName, setCourseName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getAllCourse");
        setCourses(response.data);
        console.log('response.data',response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }, []);

  
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
    <>
    <SimpleSlider />
      <div className="mt-4 ml-4"  >
        
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        <h2>
          <span className="helvetica-text">
            Khóa học Pro
          </span>
        </h2>
      </div>
      <ul className="product-list">
        {courses.map((course, index) => (
          <li className="" key={index}>
            <div className="card mt-4 ml-5 mb-4" style={{  width: "28rem" }}>
              {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
              {course.image && (
                <div className="image-container">
                <img 
                  
                  src={`http://localhost:8000/image/${course.image.filename}`}
                  alt="course"
                  className="card-img-top rounded-image"
                />
                </div>
              )}
              <div className="card-container">
              <div className="card-body">
                <a href={`/CourseDetails/${course._id}`}>
                <h3 className="card-title">{course.name}</h3>
                </a>
                
                {/* <p className="text-container">{course.description}</p> */}
                <p className="card-text">Giá: <strong>{course.price}</strong>  vnd</p>
                <p className="card-text">
                  <i>
                    Đăng bởi : {course.postedBy.email}
                    {/* Giá: {course.price} vnd */}
                  </i>
                </p>
                <div className="button-container">
                  <a href="#" className="btn btn-primary">
                    Mua ngay
                  </a>
                  <a onClick={()=>addToCart(course._id)}  className="btn btn-danger">
                    Thêm giỏ hàng
                  </a>
                </div>
              </div>
              </div>
            </div>
          </li>

        ))}
      </ul>
    </>
  );
}
