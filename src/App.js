import './App.css';
import { Route, Routes } from 'react-router-dom';

import Activities from './Components/Activities';

import Homepage from './Components/Home/Homepage';
import Register from './Components/Registration/Register';
import Login from './Components/Login/Login';

import PrivateRoutesAdmin from './Components/PrivateRoutes/PrivateRoutesAdmin';
import DestinationCrud from './Components/Admin/DestinationCrud';
import ViewBookings from './Components/Admin/ViewBookings';
import ViewUsers from './Components/Admin/ViewUsers';

import PrivateRoutesUser from './Components/PrivateRoutes/PrivateRoutesUser';
import UserProfile from './Components/User/UserProfile';
import Bookings from './Components/User/Booking';
import MyBookings from './Components/User/MyBookings';
import Review from './Components/User/Reviews.js';
import Reviews from './Components/Reviews.js';
import OtherReviews from './Components/User/OtherReviews';


function App() {
  return (
    <div className="App">
      <Routes>


        <Route path='/activities' element={<Activities/>} />
        
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/reviews' element={<Reviews/>} />

        <Route element={<PrivateRoutesAdmin />} />
        <Route path='/admin' element={<DestinationCrud/>}/>
        <Route path='/admin/bookings' element={<ViewBookings/>}/>
        <Route path='/admin/users' element={<ViewUsers/>}/>

        <Route element={<PrivateRoutesUser />} />
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/user/book' element={<Bookings/>}/>
        <Route path='/user/mybookings' element={<MyBookings/>}/>
        <Route path='/user/review' element={<Review/>}/>
        <Route path='/user/reviews' element={<OtherReviews/>}/>



        

      </Routes>
    </div>
  );
}

export default App;
