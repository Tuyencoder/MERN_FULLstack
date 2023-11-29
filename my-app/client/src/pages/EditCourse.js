import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditCourse() {
  const [course, setCourse] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const { idCourse } = useParams();
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
  }, [idCourse]);
  console.log("idCourse", idCourse);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("userID", userID);
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    console.log("formData", formData);
    try {
      // console.log(userID);
      console.log(formData);
      const response = await axios.put(`/edit/${idCourse}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Course created:", response.data);
      // navigate('/')
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };


  return (
    <div
      className="create-product-container offset-md-4 mt-4 "
      style={{ height: "500px" }}
    >
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} className="product-form ">
        {/* Các input cho sản phẩm */}
        <div className="input-group">
          <label>Choose Image:</label>
          <input type="file" onChange={handleFileChange} />

          {/* {previewURL && <img src={previewURL} alt="Preview" style={{ width: '50px', height: '50px' }} />} */}
        </div>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            defaultValue={course.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input
            type="text"
            defaultValue={course.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price:</label>
          <input
            type="text"
            defaultValue={course.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
}
