// App.js
import Main from "./components/nav/Main.js";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import SellHouse from "./pages/user/ad/SellHouse.js";
import SellLand from "./pages/user/ad/SellLand.js";
import AdCreate from "./pages/user/ad/AdCreate.js";
import { AuthProvider } from "./context/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/routes/PrivateRoute.js";
import Cart from "./pages/Cart.js";
import Order from "./pages/Order.js";
import DetailCourse from "./pages/DetailCourse.js";
import Footer from "./pages/Footer.js";
import AdminDashboard from "./pages/admin/Dashboard.js";
import AdminRoute from "./components/routes/AdminRoute.js";
import UserProfile from "./pages/user/Profile.js";
import EditCourse from "./pages/EditCourse.js";
import AdminEditUser from "./pages/admin/EditUser.js";
import Payment from "./pages/user/Payment.js";
import PaymentReturn from "./pages/user/PaymentReturn.js";
import LearningPathPage from "./pages/LearningPathPage.js";
import AccountActive from "./pages/auth/AccountActive.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import AccessAccount from "./pages/auth/AccessAccount.js";
import ChangePassword from "./pages/user/ChangePassword.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// <!-- Link trực tiếp từ Google Fonts -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
/>;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/CourseDetails/:idCourse" element={<DetailCourse />} />
          <Route path="/learning" element={<LearningPathPage />} />
          <Route path="/auth/account-active/:token" element={<AccountActive />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="profile/:idUser" element={<UserProfile />} />
            <Route path="profile/changePassword" element={<ChangePassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="vnpay_return" element={<PaymentReturn />} />
            <Route path="ad/create" element={<AdCreate />} />
            <Route path="edit/:idCourse" element={<EditCourse />} />
            <Route path="ad/create/sell/House" element={<SellHouse />} />
            <Route path="ad/create/sell/Land" element={<SellLand />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Order" element={<Order />} />
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="update-user/:idUser" element={<AdminEditUser />} />
            {/* Thêm các Route khác cho Admin ở đây nếu cần */}
          </Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}
