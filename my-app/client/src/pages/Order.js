import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("/getOrder")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const showPopup = (orderId) => {
    setSelectedOrderId(orderId);
    const selectedOrder = orders.find((order) => order._id === orderId);
    setOrderDetail(selectedOrder);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrderId(null);
    setOrderDetail(null);
  };

  return (
    <div className="container-fluid orderlist">
      <h1 className="m-4">Check Your Order</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Thời gian đặt</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr
              key={index}
              onClick={() => showPopup(item._id)}
              style={{ cursor: "pointer" }}
            >
              <th scope="row">{index + 1}</th>
              <td>{item._id}</td>
              <td>{item.createdAt}</td>
              <td>Đã thanh toán</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order ID: <strong>{selectedOrderId}</strong> </p>
          {orderDetail && (
            <>
              <p>
                Tên khách hàng: <strong>{orderDetail?.userId?.name}</strong>
              </p>
              <p>Tên khóa học: <strong>{orderDetail?.courses[0]?.name}</strong></p>
              <p>Giá: <strong>{orderDetail?.totalAmount} vnd</strong></p>
              <p>Trạng thái: <strong>Đã thanh toán </strong></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
