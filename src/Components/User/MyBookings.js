import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from "../Navigation/UserNavigation.js";
import AuthContext from "../context/AuthContext.jsx";
import * as Yup from 'yup';
import './MyBookings.css';

function MyBookings() {
 
    const [bookingId, setBookingId] = useState("");
    const [userId, setUserId] = useState("");
    // const [no_Of_Rooms,setNo_Of_Rooms]=useState("");
    const [destId,setDestId]=useState("");
    const [checkInDate,setCheckInDate]=useState("");
    const [checkOutDate,setCheckOutDate]=useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [bookings,setBookings]=useState([]);
    const [destinations,setDestinations]=useState([]);
    const {userid}=useContext(AuthContext);
    const [price,setPrice]=useState("");
    const [errors, setErrors]=useState({});
 
    useEffect(() => {
        (async () => await Load())();
      }, []);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7075/api/Bookings");
        const filteredRes = result.data.filter(booking => booking.userId == userid);
        setBookings(filteredRes);
        console.log(filteredRes);
        const result1=await axios.get("https://localhost:7075/api/Destinations");
        setDestinations(result1.data);
        console.log(result1.data);
      }
 
      const validationSchema = Yup.object().shape({
        // no_Of_Rooms: Yup.string().required('No of Rooms is required'),
        /*roomId: Yup.string().required('Room is required'),*/
        checkInDate: Yup.string().required('Check in Date is required'),
        checkOutDate: Yup.string().required('Check out Date is required'),
      });
 
    function getDestnameById(id) {
         const dest = destinations.find(dest => dest.destId === id);
         return dest ? dest.destName : 'Room Type not found';
       }
 
    //   function getRoomIdByType(type) {
    //     const room = rooms.find(room => room.type === type);
    //     return room ? room.roomId : 'Room id not found';
    //   }
   
    //   function getRoomNumber(id){
    //     const room= rooms.find(room=>room.roomId==id);
    //     return room? room.roomNumber:'Room not found';
    //   }
      function AddDestination(destination){
        setDestId(destination.destId);
        setPrice(destination.price);
        // getPrice(room.roomId);
      }
    function getPrice(id){
         const dest= destinations.find(dest=>dest.destId==id);
         const amount=dest.price;
         setPrice(amount);
     }
 
      async function editCategory(booking) {
        setBookingId(booking.bookingId);
              setUserId(userid);
              setDestId(booking.destId);
            //   setNo_Of_Rooms(booking.no_Of_Rooms);
              setCheckInDate(booking.checkInDate);
              setCheckOutDate(booking.checkOutDate);
              setPaymentStatus(booking.paymentStatus);
            //   setPrice(getPrice(booking.roomId));
              setPrice(getPrice(booking.destId));
             
      }
     
   
      async function DeleteCategory(id) {
      await axios.delete("https://localhost:7075/api/Destinations/"+id );
       alert("Destination deleted Successfully");
       setBookingId("");
              setUserId("");
              setDestId("");
            //   setNo_Of_Rooms("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
     
       Load();
      }
   
      async function update(event) {
        event.preventDefault();
        try {
          await validationSchema.validate({
            // no_Of_Rooms,
            // roomId,
            checkInDate,
            checkOutDate,
   
          }, { abortEarly: false });
 
         await   axios.put(`https://localhost:7075/api/Bookings/${bookingId}`, {
            bookingId:bookingId,
            userId:userid,
            destId:destId,
            // no_Of_Rooms:no_Of_Rooms,
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            paymentStatus:paymentStatus,
            }
          );
          alert("Registation Updated");
          setBookingId("");
              setUserId("");
              setDestId("");
            //   setNo_Of_Rooms("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
              setPrice("");
               
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
            <h1>Booking Details</h1>
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
                  readOnly
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
                />
                
                

 
 
                {/* <label>no_Of_Rooms</label>
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
                {errors.no_Of_Rooms && <div className="invalid-feedback">{errors.no_Of_Rooms}</div>} */}
 
                <label>Check In Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.checkInDate ? 'is-invalid' : ''}`}
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(event) => {
                    setCheckInDate(event.target.value);
                  }}
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
                />
                {errors.checkOutDate && <div className="invalid-feedback">{errors.checkOutDate}</div>}

                <table class="table table-warning" align="center">
        <thead>
          <tr>
            <th scope="col">Dest Name</th>
            <th scope="col">Description</th>
            <th scope="col">Location</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {destinations.map(function fn(destination) {
          return (
            <tbody>
              <tr>
                <td>{destination.destName}</td>
                <td>{destination.description}</td>
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
                {/*
                <button class="btn btn-primary mt-4" onClick={save}>
                  Register
                </button>
                */}
                <button class="btn btn-danger mt-4" onClick={update}>
                  Update
                </button>
              </div>
            </form>
          </div>
          <br></br>
   
           <table class="table table-warning" align="center">
            <thead>
              <tr>
                <th scope="col">Booking Id</th>
                <th scope="col">Destination Name</th>
                <th scope="col">Check-in date </th>
                <th scope="col">check Out Date</th>
                <th scope="col">Payment Status</th>
 
              </tr>
            </thead>
            {bookings.map(function fn(booking) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{booking.bookingId} </th>
                    <td>{getDestnameById(booking.destId)}</td> 
                    {/* <td>{booking.no_Of_Rooms}</td> */}
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td>{booking.paymentStatus}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => editCategory(booking)}
                      >
                        Edit
                      </button>
                   
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => DeleteCategory(booking.bookingId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
           
          </div>
        );
      }
     
export default MyBookings;
