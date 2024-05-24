import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "../context/AuthContext";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { setUserid, setRole, setUserName, setToken } = useContext(AuthContext);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // https://localhost:7075/api/Users/login?email=harshini%40gmail.com&password=Harshini%40123&Role=User
      const res = await axios.post(`https://localhost:7075/api/Users/login?email=${info.emailId}&password=${info.password}&Role=${info.role}`);
      let userid = jwtDecode(res.data).RegId;
      setToken(res.data);
      let username = jwtDecode(res.data).DisplayName;
      let role = jwtDecode(res.data).Role;
      setUserid(userid);
      setRole(role);
      setUserName(username);
      alert("Logged in Successfully!");
      if (role === 'Admin') {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      alert("Login failed!. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <form>
      <center><h3>Login Page</h3></center>
      <div className="mb-3 mt-3">
        <label htmlFor="email_Id" className="form-label">Email</label>
        <input type="email" id="email" name="emailId" className="form-control" placeholder="Enter email" onChange={handleChange} />
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="role" className="form-label">Role</label>
        <input type="text" id="role" name="role" className="form-control" placeholder="Enter role" onChange={handleChange} />
      </div>
      
      <input type="submit" value="Login" className="btn btn-primary" onClick={handleSubmit} />
      </form>
    </div>
    
  );
}

export default Login;


