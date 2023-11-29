import moment from "moment-timezone";
import mongoose from "mongoose";
// import { Schema } from "mongoose";



const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Tham chiếu đến thông tin khách hàng
  Courses: [
    {
      Course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Tham chiếu đến sản phẩm
      //   quantity: Number,
      price: Number, // Giá sản phẩm lúc đặt hàng
    },
  ],
  totalAmount: Number, // Tổng số tiền của đơn hàng
  Address: String, // Địa chỉ giao hàng
  // Thêm các thông tin khác nếu cần thiết
  createdAt: String,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
