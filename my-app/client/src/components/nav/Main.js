import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  const loginHandleButton = () => {
    navigate("/login");
  };

  const registerHandleButton = () => {
    navigate("/register");
  };

  const imageUrl =
    "https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ml-4">
      <img src={imageUrl} width="38px" height="38px" alt="Logo" />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-4">
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/learning">
              Learning
            </NavLink>
          </li>
          <li>
            <a onClick={handleCartClick} className="nav-link" href="/Cart">
              Cart
            </a>
          </li>
        </ul>
        <form className="form-inline mx-auto">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>

        {auth.user ? (
          <div className="dropdown">
            <li>
              <h4
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {`Welcome ${auth?.user?.name || auth?.user?.username}`}
              </h4>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/profile/${auth.user.username}`}
                  >
                    My Profile
                  </NavLink>
                </li>
                {auth.role !== "Admin" && (
                  <>
                    <li>
                      <NavLink className="nav-link" to={`/dashboard`}>
                        Course Manager
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        
                        className="nav-link"
                        to="/ad/create/sell/House"
                      >
                        Post Course
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to={`/Order`}>
                        Check my Order
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <a onClick={handleLogout} className="nav-link pointer">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        ) : auth.role === "Admin" ? (
          <div className="dropdown">
            <li>
              <h4
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {`Welcome Admin ${auth?.user?.name || auth?.user?.username}`}
              </h4>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="nav-link" to={`/dashboard`}>
                    Course Manager
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    
                    className="nav-link"
                    to="/ad/create/sell/House"
                  >
                    Post Course
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to={`/admin/dashboard`}>
                    Manager
                  </NavLink>
                </li>
                <li>
                  <a onClick={handleLogout} className="nav-link pointer">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        ) : (
          <div className="Login button">
            <button
              onClick={loginHandleButton}
              type="button"
              className="btn btn-outline-danger"
            >
              Đăng Nhập
            </button>
            <button
              onClick={registerHandleButton}
              type="button"
              className="btn btn-outline-warning "
            >
              Đăng Kí
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
