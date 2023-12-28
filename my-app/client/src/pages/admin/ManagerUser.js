import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5; // Số người dùng mỗi trang

  useEffect(() => {
    // Fetch user data from API
    axios.get("/getAllUsers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = users
    .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
    .map((user) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address}</td>
        <td>{user.phone}</td>
        <td>{user.role}</td>
        <td>
        <a href={`/admin/update-user/${user._id}`} className="btn btn-primary">
            Edit
          </a>
          <Button variant="danger" className="ml-2">
            Delete
          </Button>
        </td>
      </tr>
    ));

  return (
    <Container className="mt-4">
      <h2>User Table</h2>
      <div className="d-flex justify-content-end mt-4">
        <Button variant="success">Add User</Button>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </Table>
      <div className="d-flex justify-content-end mt-4">
        <ReactPaginate
          previousLabel={<Button variant="dark">Previous</Button>}
          nextLabel={<Button variant="info">Next</Button>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-item"}
          nextLinkClassName={"page-item"}
        />
      </div>
    </Container>
  );
};

export default UserTable;