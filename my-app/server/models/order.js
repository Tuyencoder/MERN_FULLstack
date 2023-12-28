import moment from "moment-timezone";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
  totalAmount: Number,
  address: String,
  createdAt: String,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
