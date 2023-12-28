import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../../context/auth'
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [userID,setUserID] = useState(`${auth.user._id}`);
  const [linkCourse, setLinkCourse] = useState("");
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
    formData.append("linkCourse", linkCourse);

    try {
      const response = await axios.post("/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Course created:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Choose Image:</label>
              <input type="file" className="form-control-file" onChange={handleFileChange} />
              {previewURL && <img src={previewURL} alt="Preview" className="mt-2 img-fluid" />}
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input type="text" className="form-control form-control-lg" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input type="text" className="form-control form-control-lg" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link Course:</label>
              <input type="text" className="form-control form-control-lg" value={linkCourse} onChange={(e) => setLinkCourse(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Create Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;