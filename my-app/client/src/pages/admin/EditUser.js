import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AdminEditUser = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { idUser } = useParams();

  useEffect(() => {
    const fetchAdminEditUser = async () => {
      try {
        const response = await axios.get(`/admin-public-profile/${idUser}`);
        console.log('heheheeeeee',response)
        setUsername(response.data.username);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminEditUser();
  }, [idUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      name,
      address,
      phone,
    };

    try {
      const response = await axios.put(`/admin-update-profile/${idUser}`, formData);
      console.log("Profile updated:", response.data);
      toast.success("Profile Updated Successfully");
      navigate(`/dashboard`);
    } catch (error) {
      if (error.response) {
        console.error("Error updating profile:", error.response.data);
        toast.error(error.response.data.message || "Error updating profile");
      } else if (error.request) {
        console.error("Error sending request:", error.request);
        toast.error("Error sending request, please try again.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred, please try again later.");
      }
    }
  };

  return (
    <Container className="mt-4 mb-5">
    <h2>Admin Update User</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          required
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-4" variant="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  </Container>
  );
};

export default AdminEditUser;