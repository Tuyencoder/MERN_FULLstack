
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const coursesPerPage = 3; // Số khóa học mỗi trang
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course data from API
    axios.get("/getAllCourse").then((response) => {
      setCourses(response.data);
    });
  }, []);

  const pageCount = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };


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
        navigate('/admin/dashboard')
      })
      .catch((error) => {
        console.error("Error removing course :", error);
      });
  };


  const displayCourses = courses
    .slice(pageNumber * coursesPerPage, (pageNumber + 1) * coursesPerPage)
    .map((course) => (
      <tr key={course?._id}>
        <td>{course?.name}</td>
        <td>{course?.description}</td>
        <td>{course?.price}</td>
        <td>
          {course?.image && (
            <div className="image-container">
              <img
                src={`http://localhost:8000/image/${course?.image.filename}`}
                alt="course"
                className="card-img-top rounded-image"
              />
            </div>
          )}
        </td>
        <td>{course?.postedBy?.email}</td>
        <td>
          <a href={`/edit/${course._id}`} className="btn btn-primary">
            Edit
          </a>
          <Button variant="danger" className="ml-2" onClick={handleShow}>
            Delete
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
        </td>
      </tr>
    ));

  const handleAdd = () => {
    // Logic to handle adding course
    console.log("Add course clicked");
  };

  const handleEdit = (courseId) => {
    // Logic to handle editing course with courseId
    console.log(`Edit course ${courseId} clicked`);
  };

  const handleDelete = (courseId) => {
    // Logic to handle deleting course with courseId
    console.log(`Delete course ${courseId} clicked`);
  };

  return (
    <Container className="mt-4">
      <h2>Course Table</h2>
      <div className="d-flex justify-content-end mt-4">
        <a className="btn btn-success"  href="/ad/create/sell/House" >
          Add Course
        </a>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price (VND)</th>
            <th>Image</th>
            <th>Posted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{displayCourses}</tbody>
      </Table>
      <div className="d-flex justify-content-end mt-4">
        <ReactPaginate
          previousLabel={<Button variant="dark">Previous</Button>}
          nextLabel={<Button variant="info">Next</Button>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-item"}
          nextLinkClassName={"page-item"}
        />
      </div>
    </Container>
  );
};

export default CourseTable;
