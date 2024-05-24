
import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import AdminNavigation from "../Navigation/AdminNavigation";
import './DestinationCrud.css'
 
function DestinationCrud() {
 
const [destId, setDestId] = useState("");
const [destName,setDestName]=useState("");
const [description, setDescription] = useState("");
const [imageUrl,setImageURL]=useState("");
const [location,setLocation]=useState("");
const [price,setPrice]=useState("");
const [destinations, setDestinations] = useState([]);
const [errors, setErrors]=useState({});
 
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {    
    const result1=await axios.get("https://localhost:7075/api/Destinations");
    setDestinations(result1.data);
    console.log(result1.data);
  }
  const validationSchema = Yup.object().shape({
    // destId: Yup.number()
    //     .required('Destination Number is required')
    //     .typeError('Destination Number must be a number'),
    /*destId: Yup.string().required('Destination is required'),*/
    destName: Yup.string().required('Destination name is required'),
    // capacity: Yup.number()
    //     .required('capacity is required')
    //     .typeError('capacity must be a number'),
    price: Yup.number()
        .required('price is required')
        .typeError('package must be a number'),
    // amenities: Yup.string().required('Amenities is required'),
  });
 
 
function insert(){
   axios.post("https://localhost:7075/api/Destinations",{
     destId:destId,
     destName:destName,
     description:description,
     imageUrl:imageUrl,
     location:location,
     price:price
    })
}
   
  async function save(event) {  
    event.preventDefault();
    try {
      await validationSchema.validate({
        // destId,
        destName,
        price,
        // capacity,
        
        // amenities,
 
      }, { abortEarly: false });
      await axios.post("https://localhost:7075/api/Destinations", { 
        destName:destName,
        description:description,
        imageUrl:imageUrl,
        location:location,
        price:price,
       
      });
      alert("Destination added Successfully");
          setDestId("");
          setDestName("");
          setDescription("");
          setImageURL("");
          setLocation("");
          setPrice("");
         
          Load();
    } 
    catch (error) {
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
          alert('Registration failed');
        }
      }
    }
 
 
  async function editCategory(destinations) {
    setDestId(destinations.destId);
    setDestName(destinations.destName);
    setDescription(destinations.description);
    setImageURL(destinations.imageUrl);
    setLocation(destinations.location);
    setPrice(destinations.price);
  }
 
 
  async function DeleteCategory(id) {
  await axios.delete("https://localhost:7075/api/Destinations/"+id );
   alert("Destination deleted Successfully");
   setDestId("");
   setDestName("");
   setDescription("");
   setImageURL("");
   setLocation("");
   setPrice("");
   
   
   Load();
  }
 
 
  async function update(event) {
    event.preventDefault();
    try {
      await validationSchema.validate({
        // destId,
        destName,
        price,
 
      }, { abortEarly: false });
     await axios.put(`https://localhost:7075/api/Destinations/${destId}`, {
      destId:destId,
      destName:destName,
      description:description,
      imageUrl:imageUrl,
      location:location,
      price:price,
        }
      );
      alert("Updation Success!!");
      setDestId("");
      setDestName("");
      setDescription("");
      setImageURL("");
      setLocation("");
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
        }
        else {
          // Handle other errors
          alert('Updation failed');
        }
      }
  }
 
    return (
      <div>
        <AdminNavigation />
        <br></br>
            <br></br>
            <br></br>
        <h1>Destination Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           <label>Destination ID</label>
            <input
              type="text"
              class="form-control"
              id="destId"
              // hidden
              value={destId}
              onChange={(event) => {
                setDestId(event.target.value);
              }}
            />
            <label>Destination Name</label>
            <input
              type="text"
              className={`form-control ${errors.destName ? 'is-invalid' : ''}`}
              id="destName"
              value={destName}
              onChange={(event) => {
                setDestName(event.target.value);
              }}
              required
            />
            {errors.destName && <div className="invalid-feedback">{errors.destName}</div>}
 
            <label>Description</label>
            <input
              type="textarea"
              class="form-control"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              // required
            />
            {/* {errors.description && <div className="invalid-feedback">{errors.description}</div>} */}

            <input
              type="text"
              class="form-control"
              id="imageURL"
              hidden
              value={imageUrl}
              onChange={(event) => {
                setImageURL(event.target.value);
              }}
            />
 
            <label>Location</label>
            <input
              type="text"
              class="form-control"
              id="capacity"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              // required
            />
            {/* {errors.capacity && <div className="invalid-feedback">{errors.capacity}</div>} */}
 
 
            <label>Destination Price</label>
            <input
              type="text"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              required
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
 
            
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
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
                    onClick={() => editCategory(destination)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteCategory(destination.destId)}
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
 
  export default DestinationCrud;
 