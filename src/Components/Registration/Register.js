import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import './Register.css';

   




function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [user, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    
//   useEffect(() => {
//     (async () => await Load())();
//   }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'username') setUserName(value);
      else if (name === 'email') setEmail(value);
      else if (name === 'password') setPassword(value);
      else if (name === 'role') setRole(value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!email.includes('@')) {
        setErrorMessage('Invalid email');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password should be at least 6 characters');
        return;
      }
      try {
        const response = await axios.post('https://localhost:7075/api/Users', {
          userName,
          email,
          password,
          role
        });
        setUsers([...user, response.data]);
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert('Registration failed!');
      }
    }
  
    return (
      <>
        <Navigation/>
        <h3>Welcome to Travel-Fun </h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username 
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label>
            Email 
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <label>
            Password 
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <label>
            Role 
            <input type="text" name="role" onChange={handleChange} />
          </label>
          <button type="submit">Register</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="login-link">
          <label>Already registered?</label>
          <Link to="/login">Login</Link>
        </div>
      </>
    );
  }
  
  export default Register;
  
  


