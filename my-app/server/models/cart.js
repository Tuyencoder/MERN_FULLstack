import mongoose from "mongoose";
import { Schema } from "mongoose";
const cartItemSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true },
  CourseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  imageId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // quantity: { type: Number, default: 1 },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
 