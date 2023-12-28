import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import Main from '../admin/Main';
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch orders, users, products data from API
    // axios.get('/api/orders').then((response) => {
    //   setOrders(response.data);
    // });

    // axios.get('/api/users').then((response) => {
    //   setUsers(response.data);
    // });

    // axios.get('/api/products').then((response) => {
    //   setProducts(response.data);
    // });
  }, []);

  return (
    <Container className="mt-4" style={{ height: '150vh' }}>
      <h1 className="mb-4">Admin Dashboard</h1>
    <Main />
      
    </Container>
  );
};

export default AdminDashboard;