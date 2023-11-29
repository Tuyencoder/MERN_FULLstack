import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          My Courses
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/ad/create/sell/House">
          Create Course
        </NavLink>
      </li>
    </ul>
  );
}