import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
 const AdminPrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log('data day',data);
      console.log('data ở đây',data.role);
      // Kiểm tra thông tin người dùng có vai trò admin hay không
      if (data.role === 'Admin') {
        setIsAdmin(true);
      }

      setOk(true);
    } catch (err) {
      setOk(false);
    }
  };

  return isAdmin ? <Outlet /> : "Bạn không có quyền truy cập";
};

export default AdminPrivateRoute;