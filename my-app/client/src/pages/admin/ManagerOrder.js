import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch order data from API
    axios.get('/getAllOrders').then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }, []);

  const handleAdd = () => {
    // Logic to handle adding order
    console.log('Add order clicked');
  };

  const handleDelete = async (orderId) => {
    ///deleteOrder/:idOrder
    const deleteOrder = await axios
    .delete(`/deleteOrder/${orderId}`)
    .then((response) => {
      // console.log("hello");
      console.log(response.data.message);
      // updateItemCount();
      // handleClose();
      toast.success("Deleted order successful");
      navigate('/admin/dashboard')
    })
    .catch((error) => {
      console.error("Error removing course :", error);
    });
  };


  const handleEdit = (orderId) => {
    // Logic to handle deleting order with orderId
    console.log(`Delete order ${orderId} clicked`);
  };

  return (
    <Container className="mt-4">
      <h2>Order Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Courses</th>
            <th>Total Amount</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order?.userId._id}</td>
              <td>{order?.courses[0]?.name}</td>
              <td>{order?.totalAmount}</td>
              <td>{order?.createdAt}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(order._id)}>
                  Edit
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(order._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleAdd}>
        Add Order
      </Button>
    </Container>
  );
};

export default OrderTable;