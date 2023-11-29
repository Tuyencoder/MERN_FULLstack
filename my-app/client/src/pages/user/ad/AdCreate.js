import Sidebar from "../../../components/nav/Sidebar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function AdCreate() {
  // state
  // const [sell, setSell] = useState(false);
  // const [rent, setRent] = useState(false);
  // hooks
  // const navigate = useNavigate();



  return (
    <div className="container-fluid mt-2">
  <Sidebar />
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ marginTop: "-7%" }}
  >
    <div className="col-lg-6">
      {/* <button onClick={handleSell} className="btn btn-secondary p-5 col-12">
        <span className="h2">Sell</span>
      </button> */}
      {/* on Sell click show options */}
      {/* {sell && (
        <div className="my-1">
          <button
            onClick={() => navigate(`/ad/create/sell/House`)}
            className="btn btn-secondary p-5 col-6"
          >
            Book
          </button>
          <button
            onClick={() => navigate(`/ad/create/sell/Land`)}
            className="btn btn-secondary p-5 col-6"
          >
            Course
          </button>
        </div>
      )} */}
    </div>

    
  </div>
</div>
  );
}