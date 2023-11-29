import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

// import '@fortawesome/fontawesome-free/css/all.min.css';

// import './Cart.css'; // File CSS cho giao diện giỏ hàng
import { useNavigate } from "react-router-dom";
function Cart() {
  const [auth, setAuth] = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0);
  const [phone, setPhone] = useState(auth.user.phone || ''); 

  // const [userId, setUserId] = useState('');
  // const 
  useEffect(() => {
    // Lấy thông tin giỏ hàng từ server khi component được render
    axios
      .get("/getAllCart")
      .then((response) => {
        setCartItems(response.data);
        // console.log('hshsh',response)
        setItemCount(response.data.length); // Cập nhật số lượng sản phẩm
        console.log("hshhaha", response);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, [itemCount]);

  console.log("cartitem o day nay", cartItems);
  
  const removeFromCart = (courseId) => {
    // Xử lý logic xoá sản phẩm khỏi giỏ hàng
    axios
      .delete(`/cart/${courseId}`)
      .then((response) => {
        console.log(response.data.message);
        updateItemCount();
        toast.success("Deleted successful");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };
  const updateItemCount = () => {
    setItemCount(itemCount - 1); // Giảm số lượng sản phẩm sau khi xóa thành công
  };
  function calculateTotal(cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price;
    }
    return total;
  }
  const totalPrice = calculateTotal(cartItems);


  // console.log("auth", auth);
  const handleOrder = ()=>{
    axios
      .post(`/orderCourse`,{totalPrice})
      .then((response) => {
        console.log(response.data.message);
        updateItemCount();
        toast.success("Order successful");
      })
      .catch((error) => {
        console.error("Error order course from cart:", error);
      });
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value); // Cập nhật giá trị phone khi có sự thay đổi
  };

  return (
    <div className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <a href="/" className="text-body">
                        <i className="fas fa-long-arrow-alt-left me-2" />
                        Continue shopping
                      </a>
                    </h5>
                    <h5 className="mb-3">
                      <a href="/Order" className="text-body">
                        <i className="fa-solid fa-truck mr-1" />
                        Check Your Order 
                      </a>
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {itemCount} items in your cart
                        </p>
                      </div>
                      <div>
                        <p className="mb-0">
                          <span className="text-muted">Sort by:</span>{" "}
                          <a href="#!" className="text-body">
                            price <i className="fas fa-angle-down mt-1" />
                          </a>
                        </p>
                      </div>
                    </div>
                    <ul>
                      {cartItems.map((item, index) => (
                        <li key={index}>
                          <div className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={`http://localhost:8000/image/${item.imageId.filename}`}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: 65 }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5 className="ml-3"> {item.name}</h5>
                                    <p className="small mb-0 ml-3">
                                      <i>Đăng bởi {item.userId.email} </i>{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: 50 }}>
                                    <h5 className="fw-normal mb-0">1</h5>
                                  </div>
                                  <div style={{ width: 80 }}>
                                    <h5 className="mb-0">{item.price} VND</h5>
                                  </div>
                                  <a
                                    onClick={() => removeFromCart(item._id)}
                                    style={{ color: "#cecece" }}
                                  >
                                    <i
                                      className="fa fa-trash "
                                      aria-hidden="}true"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            className="img-fluid rounded-3"
                            style={{ width: 45 }}
                            alt="Avatar"
                          />
                        </div>
                        <h1 className="text-center">Info for delivery</h1>

                        <form className="mt-4">
                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="typeName">
                              <h3>UserName</h3>
                            </label>
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              siez={17}
                              // placeholder="Cardholder's Name"
                              value={auth.user.username}
                            />
                           
                          </div>
                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="typeName">
                            <h3>Email</h3>
                            </label>
                            <input
                              type="text"
                              id="typeEmail"
                              className="form-control form-control-lg"
                              siez={17}
                              // placeholder="Cardholder's Name"
                              value={auth.user.email}
                            />
                            
                          </div>
                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="typeText">
                            <h3>Phone</h3>
                            </label>
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              siez={17}
                              // placeholder=""
                              value={phone}
                              minLength={19}
                              maxLength={19}
                              required
                              onChange={handlePhoneChange}
              
                            />
                           
                          </div>
                          <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="typeText">
                            <h3>Address</h3>
                            </label>
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              siez={17}
                              // placeholder=""
                              // value={auth.user.address}
                              minLength={19}
                              maxLength={19}
                              required
                            />
                            
                          </div>
                        
                        </form>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">{totalPrice} VND</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">FREE</p>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">{totalPrice}</p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-info btn-block btn-lg"
                        >
                          <div onClick={handleOrder} className="d-flex justify-content-between">
                            <span>{totalPrice} VND</span>
                            <span>
                              Checkout
                              <i className="fas fa-long-arrow-alt-right ms-2" />
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
