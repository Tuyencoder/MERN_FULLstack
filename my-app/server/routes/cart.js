import express from "express";
import CartItem from "../models/cart.js";
import Course from "../models/ad.js";
// import * as auth from '../controllers/auth.js';
import { requireSignin } from "../middlewares/auth.js";
import User from "../models/auth.js";
import Order from "../models/order.js";
import moment from "moment-timezone";
const router = express.Router();

router.post("/add-to-cart", requireSignin, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);
   //check Course 
   const checkCourse = CartItem.find({
    CourseId : courseId
   })
  //  console.log("hello guy",checkCourse)
   //get info course
    const course = await Course.findById(courseId);
    console.log("hello guy",course)

    // if(!checkCourse) {
      // console.log("hello guy")
      const cartItem = new CartItem({
        userId: user._id,
        CourseId: courseId,
        imageId: course.image,
        // postedBy : ,
        name: course.name,
        price: course.price,
  
        // quantity:1,
      });
      // console.log('cartItem:',cartItem);
      await cartItem.save();
  
      res.status(200).json({ message: "Product added to cart successfully" });
    
  
    // else{
    //   res.json("trong gio hang da co khoa hoc !");
    // }
  
    
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart" });
    console.log(error.message);
  }
});

router.get("/getAllCart", requireSignin, async (req, res) => {
  try {
    // // const  = await CartItem.find({});
    const user = await User.findById(req.user._id);
    // console.log((user._id).toString());
    const userID = user._id.toString();
    // console.log(userID);
    const getAllCart = await CartItem.find({ userId: userID })
      .populate("imageId", "filename")
      .populate("userId", "email");
    // const getAllCart = await CartItem.find( {userId:  userID} ).populate({
    //   path: 'CourseId', // Tên của field chứa danh sách các Course của User
    //   // match: { _id: '6555db1f8c1d3c11ffeea029' }, // Điều kiện lọc Course theo _id
    //   populate: {
    //     path: 'image', // Tên của field chứa Image trong Course
    //     select: 'filename', // Chọn trường filename của Image
    //     model: 'Image' // Model của Image
    //   }
    // })

    // console.log('o day nay:',getAllCart);
    // return res.json(getAllCart);
    res.json(getAllCart);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/cart/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  console.log("courseID: ", courseId);

  try {
    // Xóa sản phẩm từ giỏ hàng dựa trên _id của sản phẩm
    const deletedCourseId = await CartItem.findByIdAndRemove(courseId);

    
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to remove product from cart" });
  }
});

router.post("/orderCourse", requireSignin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // console.log(user);
    const userID = user._id.toString();
    // console.log(user.name)
    const getAllCart = await CartItem.find({ userId: userID });
    // console.log('hehehe' ,getAllCart);
    const { totalPrice } = req.body;
    // console.log(totalPrice);
    const time = new Date();

    const june = moment(time);
    const timeNow = june.tz("Asia/Ho_Chi_Minh").format();

    
    const formattedTime = moment(timeNow).format('DD/MM/Y || HH:mm:ss');
    const order = await new Order({
      userId: userID,
      Courses: getAllCart,
      totalAmount: totalPrice,
      Address: user.address,
      createdAt: formattedTime,
    }).save();
    return res.json(order);
  } catch (error) {
    console.log(error);
  }
});

router.get('/getOrder',requireSignin, async (req, res) => {
    try {   
      const user = await User.findById(req.user._id);
      // console.log(user);
      const userID = user._id.toString();
      // console.log(user.name)
      const getOrder = await Order.find({ userId: userID });
      console.log(getOrder);
      return res.json(getOrder);
    } catch (error) {
      console.log(error);
    }
})

export default router;
