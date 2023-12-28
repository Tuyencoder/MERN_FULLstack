import Sidebar from "../../components/nav/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`getAllCourseById`);
        setCourses(res.data); // Lưu dữ liệu từ API vào state
        console.log("data id", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const removeCourse = async (idCourse) => {
    // Xử lý logic xoá sản phẩm khỏi giỏ hàng
    const deleteCourse = await axios
      .delete(`/deleteCourse/${idCourse}`)
      .then((response) => {
        console.log("hello");
        console.log(response.data.message);
        // updateItemCount();
        handleClose();
        toast.success("Deleted successful");
        navigate('/')
      })
      .catch((error) => {
        console.error("Error removing course :", error);
      });
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="contaienr-fluid " style={{height:'100vh'}}>
      <Sidebar />

      <ul className="product-list">
        {courses.map((course, index) => (
          <li className="" key={index}>
            <div className="card mt-4 ml-4" style={{ width: "18rem" }}>
              {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
              {course.image && (
                <div className="image-container">
                  <img
                    src={`http://localhost:8000/image/${course.image.filename}`}
                    alt="course"
                    className="card-img-top"
                  />
                </div>
              )}
              <div className="card-container">
                <div className="card-body">
                  <h4 className="card-title">{course.name}</h4>

                  <p className="text-container">{course.description}</p>
                  <p className="card-text">Giá: {course.price} vnd</p>
                  <div className="button-container">
                    <a href={`/edit/${course._id}`} className="btn btn-warning">
                      Sửa khóa học
                    </a>
                    <Button
                      onClick={handleShow}
                      className="btn btn-danger"
                      data-toggle="modal"
                      data-target="#removeModal"
                    >
                      Xóa khóa học
                    </Button>
                    <Modal show={show} onHide={handleClose} className="transparent-modal">
                      <Modal.Header closeButton>
                        <Modal.Title>Modal Title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure to delete this course ?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="dark" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => removeCourse(course._id)}
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
