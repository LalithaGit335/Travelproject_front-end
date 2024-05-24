import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext,useEffect, useState } from "react";
import UserNavigation from '../Navigation/UserNavigation.js';
import AuthContext from '../context/AuthContext';
import * as Yup from 'yup';
import './OtherReviews.css';
 
 
function OtherReviews() {
 
    const [reviewId, setReviewId] = useState("");
    const [userId,setUserId]=useState("");
    const [destId, setDestId] = useState("");
    const [comment,setComment]=useState("");
    const [rating,setRating]=useState("");
    const [reviews, setReviews] = useState([]);
    const {userid}=useContext(AuthContext);
    const [destName,setDestName]=useState("");
    const [destinations,setDestinations]=useState([]);
    const [datePosted,setDatePosted]=useState([]);
    const [errors, setErrors]=useState({});
     
      useEffect(() => {
        (async () => await Load())();
      }, []);
     
       async function Load() {    
        const result = await axios.get("https://localhost:7075/api/Reviews");
        const filteredRes = result.data.filter(review => review.userId == userid);
        setReviews(filteredRes);
        console.log(filteredRes);
        const result1 = await axios.get("https://localhost:7075/api/Destinations");
        setDestinations(result1.data);
        console.log(result1.data);
      }
 
      
      const validationSchema = Yup.object().shape({
        destName: Yup.string().required('Destination is required'),
        rating: Yup.string().required('Rating is required'),})
           
      function getDestIdByDest(name) {
        const dest = destinations.find(dest => dest.destName == name);
        return dest ? dest.destId : 'Dest Number not found';
      }
 
      function getDestName(id){
        const dest= destinations.find(dest=>dest.destId==id);
        return dest? dest.destName:'Destination not found';
      }
      
     
    function insert(){
       axios.post("https://localhost:7069/api/Reviews",{
        reviewId:reviewId,
        userId:userid,
         destId:destId,
         comment:comment,
         rating:rating
   
   
       })
    }
       
    async function save(event) {
        event.preventDefault();
        try {
          await validationSchema.validate({
            destName,
            rating,
   
          }, { abortEarly: false });
         await axios.post("https://localhost:7075/api/Reviews", {
            destId:destId,
            userId:userid,
            comment:comment,
            rating:rating
            }
          );
          alert("Review Added");
          setReviewId("");
              setUserId("");
              setDestId("");
              setComment("");
              setRating("");
               
          Load();
        } catch (error) {
    if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(errors);
      }
      else {
        // Handle other errors
        alert('Review Registration failed');
      }
    }
    }
   
      async function editCategory(reviews) {
        setReviewId(reviews.reviewId);
        setDestId(reviews.destId);
        setUserId(reviews.userId);
        setComment(reviews.comment);
        setRating(reviews.rating);
      }
     
   
      async function DeleteCategory(id) {
      await axios.delete("https://localhost:7075/api/Reviews/"+id );
       alert("Review deleted Successfully");
       setReviewId("");
              setUserId("");
              setDestId("");
              setComment("");
              setRating("");
             
       
       Load();
      }
     
   
      async function update(event) {
        event.preventDefault();
        try {
          await validationSchema.validate({
            destName,
            rating,
   
          }, { abortEarly: false });
         await axios.put(`https://localhost:7075/api/Reviews/${reviewId}`, {
          reviewId:reviewId,
          userId:userId,
         destId:destId,
         comment:comment,
         rating:rating
            }
          );
          alert("Review Updated");
          setReviewId("");
              setUserId("");
              setDestId("");
              setComment("");
              setRating("");
               
          Load();
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
              // Handle validation errors
              const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
              }, {});
              setErrors(errors);
            }
            else {
              // Handle other errors
              alert('Update failed');
            }
          }
      }
   
        return (
          <div>
            <UserNavigation />
            <br></br>
                <br></br>
                <br></br>
            <h1>Review Details</h1>

            
   
           <table class="table table-warning" align="center">
            <thead>
              <tr>
                <th scope="col">Destination Name</th>
                <th scope="col">Review</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            {reviews.map(function fn(review) {
              return (
                <tbody>
                  <tr>
                    <td>{getDestName(review.destId)}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating}</td>
                    
                  </tr>
                </tbody>
              );
            })}
          </table>
           
          </div>
        );
      }
     
export default OtherReviews;