import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditCourse = () => {
  const [course, setCourse] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const { idCourse } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/detail/${idCourse}`);
        const { data } = response;

        setCourse(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idCourse]);

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
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    try {
      const response = await axios.put(`/edit/${idCourse}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Course updated:", response.data);
      toast.success("Update Success");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Choose Image:</label>
              <input type="file" className="form-control-file" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button onClick={() => navigate('/dashboard')} className="btn btn-info">Back</button>

            <button   type="submit" className="btn btn-primary">Save</button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;