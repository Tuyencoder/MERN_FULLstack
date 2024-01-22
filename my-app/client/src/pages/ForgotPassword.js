import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/forgot-password", {
        email,
      });

      if (data?.error) {
        setLoading(false)
        toast.error(data?.error);
      } else {
        setLoading(false);
        toast.success("Please check your email!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong. Try again.");
      
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>

      <div className="container" style={{ height: "700px" }}>
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                autoFocus
              />

              <button
                className="btn btn-primary col-12 mb-4"
                disabled={loading}
              >
                {loading ? 'waiting ....' : 'Submit'}
              </button>
            </form>

            <div className="d-flex justify-content-between">
              <Link to="/login" className="text-danger pointer">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
