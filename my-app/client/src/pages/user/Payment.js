import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState('');
  const [idOrder, setIdOrder] = useState('');

  useEffect(() => {
    axios
      .get('/getAllOrders')
      .then((response) => {
        setIdOrder(response.data[0]._id);
        setTotalPrice(response.data[0].totalAmount);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckOut = async () => {
    try {
      const formData = {
        totalPrice,
        idOrder,
      };

      const response = await axios.post('/checkout', formData, {
        mode: 'no-cors',
      });

      toast.success('Tiến hành thanh toán ...');

      const vnpayUrl = response.data.vnpUrl;
      window.location.href = vnpayUrl;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Lỗi thanh toán');
    }
  };

  return (
    <Container className="mt-5" style={{ height: '500px' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="text-center">
              <h1 className="card-title">Đặt hàng thành công!</h1>
              <h4 className="card-subtitle mb-3">Đơn hàng: {idOrder}</h4>
              <h4 className="card-subtitle">Tổng tiền: {totalPrice} VND</h4>
              <Button onClick={handleCheckOut} variant="primary" className="mt-3">
                Tiến hành thanh toán
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
