
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
export default function ChangePassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
          <h1 className="display-1 bg-primary text-light p-5">Change Your Password</h1>
    
          <div className="container" style={{ height: "700px" }}>
            <div className="row">
              <div className="col-md-4 offset-md-4 mt-5">
                <form onSubmit>
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
                  <Link to="/" className="text-danger pointer">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

