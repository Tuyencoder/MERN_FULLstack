import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import UserTable from './ManagerUser';
import CourseTable from './ManagerCourses';
import OrderTable from './ManagerOrder';
const Navigation = () => {
  const [selectedItem, setSelectedItem] = useState(''); // State để lưu trữ mục đã chọn

  const handleSelect = (item) => {
    setSelectedItem(item); // Cập nhật state khi người dùng chọn một mục
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleSelect('users')} active={selectedItem === 'users'}>
                Manager Users
              </Nav.Link>
              <Nav.Link onClick={() => handleSelect('orders')} active={selectedItem === 'orders'}>
                Manager Orders
              </Nav.Link>
              <Nav.Link onClick={() => handleSelect('courses')} active={selectedItem === 'courses'}>
                Manager Courses
              </Nav.Link>
              {/* Thêm các mục điều hướng khác nếu cần */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hiển thị nội dung tương ứng */}
      {selectedItem === 'users' && <UserTable />}
      {selectedItem === 'orders' && <OrderTable />}
      
      {selectedItem === 'courses' && <CourseTable />}
      {/* Thêm các thành phần hiển thị nội dung tương ứng với các mục điều hướng khác */}
    </>
  );
};

export default Navigation;