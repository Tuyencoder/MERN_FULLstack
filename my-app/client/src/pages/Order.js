import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Order() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Lấy thông tin giỏ hàng từ server khi component được render
    axios
      .get("/getOrder")
      .then((response) => {
        setOrder(response.data); // Sửa dòng này để lấy dữ liệu từ response.data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    
    <div className="container-fluid orderlist" >
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
          {order.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item._id}</td>
              <td>{item.createdAt}</td>
              <td>Đang xử lý</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}