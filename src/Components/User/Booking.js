import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from "../Navigation/UserNavigation.js";
import AuthContext from "../context/AuthContext.jsx";
import * as Yup from 'yup';
import './Booking.css';
 
function Bookings() {
 
    const navigate=useNavigate();
    const [bookingId, setBookingId] = useState("");
    const [userId, setUserId] = useState("");
    const [destId,setDestId]=useState("");
    const [checkInDate,setCheckInDate]=useState("");
    const [checkOutDate,setCheckOutDate]=useState("");
    const [paymentStatus, setPaymentStatus] = useState("Unpaid");
    const [bookings,setBookings]=useState([]);
    const [destinations,setDestinations]=useState([]);
    // const [available,setAvailable]=useState([]);
    const {userid}=useContext(AuthContext);
    const [price,setPrice]=useState("");
    const [errors, setErrors]=useState({});
 
    useEffect(() => {
        (async () => await Load())();
      }, []);
 
       async function Load() {    
        const result = await axios.get("https://localhost:7075/api/Bookings");
        setBookings(result.data);
        console.log(result.data);
        const result1=await axios.get("https://localhost:7075/api/Destinations");
        setDestinations(result1.data);
        console.log(result1.data);
       
        // if(checkInDate&&checkOutDate) {
        //     const availablerooms = await axios.get(`https://localhost:7069/api/Rooms/${checkInDate}/${checkOutDate}/RoomsAvailableOnDate`);
        //     setAvailable(availablerooms.data);
        //     console.log(availablerooms.data);
        //     }
   
      }
   
      const validationSchema = Yup.object().shape({
        // no_Of_Rooms: Yup.string().required('No of Rooms is required'),
        /*roomId: Yup.string().required('Room is required'),*/
        checkInDate: Yup.string().required('Check in Date is required'),
        checkOutDate: Yup.string().required('Check out Date is required'),
      });
 
    //   function getRoomIdByType(type) {
    //     const room = rooms.find(room => room.type === type);
    //     return room ? room.roomId : 'Room id not found';
    //   }
 
      function AddDestination(dest){
        setDestId(dest.destId);
        getPrice(dest);
      }

 
    function getPrice(dest){
       const amount=dest.price;
         setPrice(amount);
     }
 
    function insert(){
       axios.post("https://localhost:7075/api/Bookings",{
         userId:userId,
         destId:destId,
         checkInDate:checkInDate,
         checkOutDate:checkOutDate,
         paymentStatus:paymentStatus
   
   
       })
    }
       
      async function save(event) {  
        event.preventDefault();
        try {
          await validationSchema.validate({
            // destId,
            checkInDate,
            checkOutDate,
   
          }, { abortEarly: false });
 
          await axios.post("https://localhost:7075/api/Bookings", {        
            userId:userid,
            destId:destId,
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            paymentStatus:paymentStatus
           
          });
          alert(" Booking Successful!!");
              setBookingId("");
              setUserId("");
              setDestId("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
             
              Load();
        } catch (error) {
    if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(errors);
      } else {
        // Handle other errors
        alert('Registration failed');
      }
      }
      }
     
   
        return (
          <div>
            <UserNavigation />
            <br></br>
            <br></br>
            <br></br>
            <h3>Booking Details</h3>
          <div class="container mt-4">
            <form>
              <div class="form-group">
               
                <input
                  type="text"
                  class="form-control"
                  id="bookingId"
                  hidden
                  value={bookingId}
                  onChange={(event) => {
                    setBookingId(event.target.value);
                  }}
                />
                <label>User Id</label>
                <input
                  type="text"
                  class="form-control"
                  id="userId"
                  value={userid}
                  onChange={(event) => {
                    setUserId(userid);
                  }}
                  readOnly
                />
                {/*
                <label>Dest Id</label>
                <input
                  type="text"
                  class="form-control"
                  id="destId"
                  value={destId}
                  onChange={(event) => {
                    setDestId(userid);
                  }}
                  required
                />
                */}
                {/* <label></label>
                <label>No of Rooms</label>
                <input
                  type="text"
                  className={`form-control ${errors.no_Of_Rooms ? 'is-invalid' : ''}`}
                  id="no_Of_Rooms"
                  value={no_Of_Rooms}
                  onChange={(event) => {
                    setNo_Of_Rooms(event.target.value);
                  }}
                  required
                />
                {errors.no_Of_Rooms && <div className="invalid-feedback">{errors.no_Of_Rooms}</div>}
  */}
                <label>Check In Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.checkInDate ? 'is-invalid' : ''}`}
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(event) => {
                    setCheckInDate(event.target.value);
                  }}
                  required
                />
                {errors.checkInDate && <div className="invalid-feedback">{errors.checkInDate}</div>}
 
                <label>Check Out Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.checkOutDate ? 'is-invalid' : ''}`}
                  id="checkOutDate"          
                  value={checkOutDate}
                  onChange={(event) => {
                    setCheckOutDate(event.target.value);
                  }}
                  required
                />
                {errors.checkOutDate && <div className="invalid-feedback">{errors.checkOutDate}</div>}

               
        <table class="table table-warning" align="center">
        <thead>
          <tr>
            <th scope="col">Dest Id</th>
            <th scope="col">Dest Name</th>
            <th scope="col">Description</th>
            <th scope="col">Image URL</th>
            <th scope="col">Location</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {destinations.map(function fn(destination) {
          return (
            <tbody>
              <tr>
                <th scope="row">{destination.destId} </th>
                <td>{destination.destName}</td>
                <td>{destination.description}</td>
                <td>{destination.imageUrl}</td>
                <td>{destination.location}</td>
                <td>{destination.price}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => AddDestination(destination)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
 
      <label>Payment Status</label>
                <select class="form-control"
                id="paymentStatus"
                onChange={(event) => setPaymentStatus(event.target.value)} required >
                <option value="">Select</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                </select>


                <label>Payment Amount</label>
                <input
                  type="text"
                  class="form-control"
                  id="paymentAmount"
                  value={price}
                  readOnly
                /> 
              </div>
              <div>
              <button class="btn btn-primary mt-4" onClick={(event) => {
                save(event);
                }}>
                 Book
            </button>
            <br></br>
          <button class="btn btn-warning mt-4" onClick={(event) => {
                navigate('/user/mybookings');
                }}>
                 See my Bookings
            </button>
              </div>
            </form>
          </div>
          <br></br>
         
          </div>
        );
      }
     
      export default Bookings;
