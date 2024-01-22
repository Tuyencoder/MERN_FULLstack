import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Link,useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [auth] = useAuth();
  const navigate = useNavigate();
  const { idUser } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/profile/${idUser}`);
        setUsername(response.data.username);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
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
      // Update user profile
      const response = await axios.put(`update-profile`, formData);
      console.log("Profile updated:", response.data);
      toast.success("Profile Updated Successfully");
      navigate(`/profile/${idUser}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <h2>User Profile</h2>
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
        <Link to="/profile/changePassword"  variant="primary" className="pointer">
          Change Your Password
        </Link>
      </Form>
    </Container>
  );
};

export default UserProfile;
