import {useState} from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [ auth , setAuth ] = useAuth();
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // console.log(email, password);
        setLoading(true)
        const { data } = await axios.post('/register', {
          email,
          password,
          phone,
        });
        console.log(data);
        if (data?.error) {
          setLoading(false)
          toast.error(data?.error);
        } else {
          setLoading(false)
          //save data to local storage
          localStorage.setItem("auth", JSON.stringify(data));
          //save data to context
          setAuth(data)
          toast.success("Registered successfully");
          navigate('/')
        }
      } catch (err) {
        setLoading(false)
        console.log(err);
        toast.error("Something went wrong. Try again.");
      }
    };


    return (
      <div>
        <h1 className="display-1 bg-primary text-light p-5">Register</h1>
  
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4 mt-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="form-control mb-4"
                  required
                  autoFocus
                  value={email}
                  onChange={e =>setEmail(e.target.value) }
                />
  
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control mb-4"
                  required
                  value={password}
                  onChange={e =>setPassword(e.target.value) }
                />
                <input
                  type="text"
                  placeholder="Enter your phone"
                  className="form-control mb-4"
                  required
                  // autoFocus
                  value={phone}
                  onChange={e =>setPhone(e.target.value) }
                />
  
                  
                <button disabled={loading}  className="btn btn-primary col-12 mb-4">{loading ? 'waiting ....' : 'Register'}</button>
              </form>
  
              {/* <a className="text-danger pointer">Forgot Password</a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }