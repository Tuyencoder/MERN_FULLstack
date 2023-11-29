import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../../context/auth'
import { useNavigate } from "react-router-dom";
const CreatCourse = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [userID,setUserID] = useState(`${auth.user._id}`);

  const navigate = useNavigate();
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
    formData.append("userID", userID);
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    try {
      console.log(userID);
      console.log(formData);
      const response = await axios.post("/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Course created:", response.data);
      navigate('/')
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit} className="product-form">
       
        {/* Các input cho sản phẩm */}
        <div className="input-group">
          <label>Choose Image:</label>
          <input type="file" onChange={handleFileChange} />

          {previewURL && <img src={previewURL} alt="Preview" style={{ width: '50px', height: '50px' }} />}
        </div>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Create Course</button>
      </form>
    </div>
  );
}
export default CreatCourse;
