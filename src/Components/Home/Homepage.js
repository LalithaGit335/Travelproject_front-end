import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Homepage.css';

function Homepage(){
    const navigate=useNavigate();

    async function registration(){
        navigate('/register');
    }

    // async function alreadyuser(){
    //     navigate('/login');
    // }

    return(
        <>
        <Navigation/>
        <br></br>
        <center><h3>New Journey</h3></center>
        <br></br>
        <center><h5>new people.new journey.new experience...</h5></center>
        <br></br>
        <br></br>
        {/* <label for="register"></label> */}
        <button type="submit" name="register" className="btn btn-primary" onClick={registration}>Let's Go...</button><br></br>
        {/* <br></br><label for="login">Already a user?</label>
        <button type="submit" name="login" className="btn btn-primary" onClick={alreadyuser}>Login</button> */}
        </>
    )
}

export default Homepage;