import axios from "axios";
import React, { useEffect , useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AccessAccount() {
  const { token } = useParams(); // Sử dụng destructuring để lấy giá trị token từ useParams
  console.log("==>token", token);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const previousToken = useRef(null);

  useEffect(() => {
    if (token && token !== previousToken.current) {
      previousToken.current = token;
      requestAccess();
    }
  }, [token]);

  const requestAccess = async () => {
    try {
      const { data } = await axios.post(`/access-account`, {resetCode : token }); // Gửi token như một object
      console.log(data);
      // Lưu data vào local storage
      localStorage.setItem("auth", JSON.stringify(data));
      // Lưu data vào context
      setAuth(data);
      toast.success("Access account successfully.Please change your password in Profile !");
        navigate('/');
    } catch (error) {
      // Xử lý lỗi khi gửi request
      console.error("Error:", error);
      // Hiển thị thông báo lỗi nếu cần
      toast.error("An error occurred while Accesssing.");
    }
  };

  return <div>Please wait....</div>;
}
