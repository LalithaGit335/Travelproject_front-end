import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavigation from '../Navigation/AdminNavigation.js';
import './ViewBookings.css';

 
function ViewBookings() {
 
    const [bookingId, setBookingId] = useState("");
    const [userId, setUserId] = useState("");
    const [destId,setDestId]=useState("");
    const [checkInDate,setCheckInDate]=useState("");
    const [checkOutDate,setCheckOutDate]=useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [bookings,setBookings]=useState([]);
   
     
     
      useEffect(() => {
        (async () => await Load())();
      }, []);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7075/api/Bookings");
        setBookings(result.data);
        console.log(result.data);
      }
   
    function insert(){
       axios.post("https://localhost:7075/api/Bookings",{
         bookingId:bookingId,
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
          await axios.post("https://localhost:7075/api/Bookings", {  
            bookingId:bookingId,
         userId:userId,
         destId:destId,
         checkInDate:checkInDate,
         checkOutDate:checkOutDate,
         paymentStatus:paymentStatus
           
          });
          alert("Category Registation Successfully");
              setBookingId("");
              setUserId("");
              setDestId("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
             
              Load();
        } catch (err) {
          alert(err);
        }
      }
   
      async function editCategory(booking) {
        setBookingId(booking.bookingId);
              setUserId(booking.userId);
              setDestId(booking.destId);
              setCheckInDate(booking.checkInDate);
              setCheckOutDate(booking.checkOutDate);
              setPaymentStatus(booking.paymentStatus);
              
             
      }
     
    {/*
      async function DeleteCategory(id) {
      await axios.delete("https://localhost:7069/api/Rooms/"+id );
       alert("Room deleted Successfully");
       setRoomId("");
       setType("");
       setCapacity("");
       setAmenities("");
       setPrice("");
       setImgURL("");
       setRoomNumber("");
     
       Load();
      }
    */}
   
      async function update(event) {
        event.preventDefault();
        try {
         await   axios.put(`https://localhost:7075/api/Bookings/${bookingId}`, {
            bookingId:bookingId,
            userId:userId,
            destId:destId,
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            paymentStatus:paymentStatus,
            }
          );
          alert("Registation Updated");
          setBookingId("");
              setUserId("");
              setDestId("");
              setCheckInDate("");
              setCheckOutDate("");
              setPaymentStatus("");
              
               
          Load();
        } catch (err) {
          alert(err);
        }
      }
   
        return (
          <div>
            <AdminNavigation />
            <br></br>
            <br></br>
            <br></br>
            <h1>Booking Details</h1>
          <div>
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
                {/*<label>User Id</label>*/}
                <input
                  type="text"
                  class="form-control"
                  id="userId"
                  hidden
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value);
                  }}
                />
                {/*<label>Destination Id</label>*/}
                <input
                  type="text"
                  class="form-control"
                  id="destId"
                  hidden
                  value={destId}
                  onChange={(event) => {
                    setDestId(event.target.value);
                  }}
                />
                {/* <label>no_Of_Rooms</label>
                <input
                  type="text"
                  class="form-control"
                  id="no_Of_Rooms"
                  hidden
                  value={no_Of_Rooms}
                  onChange={(event) => {
                    setNo_Of_Rooms(event.target.value);
                  }}
                /> */}
                {/*<label>Check In Date</label>*/}
                <input
                  type="date"
                  class="form-control"
                  id="checkInDate"
                  hidden
                  value={checkInDate}
                  onChange={(event) => {
                    setCheckInDate(event.target.value);
                  }}
                />
                {/*<label>Check Out Date</label>*/}
                <input
                  type="date"
                  class="form-control"
                  id="checkOutDate"
                  hidden            
                  value={checkOutDate}
                  onChange={(event) => {
                    setCheckOutDate(event.target.value);
                  }}
                />
                <label>Payment Status</label>
                <input
                  type="text"
                  class="form-control"
                  id="paymentStatus"
                  value={paymentStatus}
                  onChange={(event) => {
                    setPaymentStatus(event.target.value);
                  }}
                />
                
              </div>
              <div>
                {/*
                <button class="btn btn-primary mt-4" onClick={save}>
                  Register
                </button>
                */}
                <button class="btn btn-warning mt-4" onClick={update}>
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
                <th scope="col">User Id</th>
                <th scope="col">Dest Id</th>
                <th scope="col">Check-in date </th>
                <th scope="col">check Out Date</th>
                <th scope="col">PaymentStatus</th>
                
 
              </tr>
            </thead>
            {bookings.map(function fn(booking) {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{booking.bookingId} </th>
                    <td>{booking.userId}</td>
                    <td>{booking.destId}</td>
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
                      {/*
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => DeleteCategory(room.roomId)}
                      >
                        Delete
                      </button>
              */}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
           
          </div>
        );
      }
     
export default ViewBookings;
