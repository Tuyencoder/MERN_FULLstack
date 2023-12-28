import express from "express";
import CartItem from "../models/cart.js";
import Course from "../models/ad.js";
// import * as auth from '../controllers/auth.js';
import { requireSignin } from "../middlewares/auth.js";
import User from "../models/auth.js";
import Order from "../models/order.js";
import moment from "moment-timezone";
import nodemailer from "nodemailer";
import * as config from "../config.js";
import crypto from "crypto";
import querystring from "qs";
import dateFormat from "dateformat";

const router = express.Router();

router.post("/add-to-cart", requireSignin, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);
    //check Course
    const checkCourse = CartItem.find({
      CourseId: courseId,
    });
    //  console.log("hello guy",checkCourse)
    //get info course
    const course = await Course.findById(courseId);
    console.log("hello guy", course);

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
    const userID = user._id.toString();
    const getAllCart = await CartItem.find({ userId: userID })
      .populate("CourseId", "linkCourse")
      .populate("userId", "email");

    const { totalPrice } = req.body;
    const time = new Date();
    const june = moment(time);
    const timeNow = june.tz("Asia/Ho_Chi_Minh").format();
    const formattedTime = moment(timeNow).format("DD/MM/Y || HH:mm:ss");

    const order = await new Order({
      userId: userID,
      courses: getAllCart,
      totalAmount: totalPrice,
      Address: user.address,
      createdAt: formattedTime,
    }).save();

    // Gửi email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_FROM,
        pass: config.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "xuantuyenqwerty@gmail.com",
      to: user.email,
      subject: "Đăng ký khóa học thành công",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chào mừng bạn đã đăng ký thành công!</title>
          <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
    }
    p {
      margin-bottom: 15px;
    }
    .continue-button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      text-decoration: none;
    }
    .continue-button:hover {
      background-color: #45a049;
    }
  </style>
        </head>
        <body>
          <div class="container">
            <p>Xin chào <strong>${user.email}</strong>,</p>
            <h2>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!</h2>
            <p>Hãy nhấn nút bên dưới để bắt đầu khóa học.</p>
            <a href="${
              getAllCart.length > 0 ? getAllCart[0]?.CourseId?.linkCourse : "#"
            }" class="continue-button">Tiếp tục</a>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Lỗi khi xử lý đơn hàng" });
  }
});

router.get("/getOrder", requireSignin, async (req, res) => {
  try {
    //get user info
    const user = await User.findById(req.user._id);
    // console.log(user);
    const userID = user._id.toString();
    // console.log(user.name)
    const getOrder = await Order.find({ userId: userID })
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "courses",
        select: "name",
      });
    console.log("getOrder", getOrder);
    return res.json(getOrder);
  } catch (error) {
    console.log(error);
  }
});
router.get("/getAllOrders", requireSignin, async (req, res) => {
  try {
    const getOrder = await Order.find({})
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "courses",
        select: "name",
      });
    console.log("getOrder", getOrder);
    return res.json(getOrder);
  } catch (error) {
    console.log(error);
  }
});
router.post("/checkout", requireSignin, async (req, res) => {
  try {
    const { totalPrice, idOrder } = req.body;
    const date = new Date();
    const user = await User.findById(req.user._id);
    const userID = user._id.toString();
    const getAllCart = await CartItem.find({ userId: userID })
      .populate("CourseId", "linkCourse")
      .populate("userId", "email");

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: config.vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: idOrder,
      vnp_OrderInfo: "Thanh toán đơn hàng thời gian: ",
      vnp_OrderType: "billpayment",
      vnp_Amount: totalPrice * 100,
      vnp_ReturnUrl: config.vnp_ReturnUrl,
      vnp_IpAddr: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      vnp_CreateDate: dateFormat(date, "yyyymmddHHMMss"), // Chỉnh sửa định dạng ngày tạo đơn hàng tùy thuộc vào yêu cầu của Vnpay
    };
    vnp_Params = sortObjects(vnp_Params);

    const hmac = crypto.createHmac("sha512", config.vnp_HashSecret || "");
    const signData = querystring.stringify(vnp_Params, { encode: false });

    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const vnpUrl =
      config.vnp_Url +
      "?" +
      querystring.stringify(vnp_Params, { encode: false });

    // Kiểm tra URL được tạo ra trong console

    // Chuyển hướng đến trang Vnpay
    return res.json({ vnpUrl });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Lỗi khi thực hiện chuyển hướng đến Vnpay" });
  }
});
router.get(
  "/order/vnpay_return",
  function (req, res, next) {
    try {
      let vnp_Params = req.query;
      console.log("Giá trị của vnp_Params:", vnp_Params);
      const secureHash = vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObjects(vnp_Params);

      var hmac = crypto.createHmac("sha512", config.vnp_HashSecret || "");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");
      const vnpResponseCode = req.query.vnp_ResponseCode;
      console.log(vnpResponseCode);

      if (vnpResponseCode === "00") {
        // Xử lý thành công
        // Ví dụ: Trả về thông tin thành công dưới dạng JSON
        res.json({ success: true, message: "Thanh toán thành công" });
      } else {
        // Xử lý thất bại
        // Ví dụ: Trả về thông tin thất bại dưới dạng JSON
        
        res.status(400).json({ success: false, message: "Lỗi đặt hàng" });
      }
    } catch (err) {
      next(err);
    }
  }
  // OrderController.AddUserOrder
);

function sortObjects(obj) {
  const sorted = {};
  const str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (let key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}


router.delete('/deleteOrder/:idOrder', async (req,res)=>{
  const idOrder = req.params.idOrder;
  console.log("courseID: ", idOrder);

  try {
    // Xóa sản phẩm từ order dựa trên _id của sản phẩm
     await Order.findOneAndDelete({_id: idOrder});

     
    return res
      .status(200)
      .json({ message: "Order removed from cart successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(error);
  }
})
export default router;
