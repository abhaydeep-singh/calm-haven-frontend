import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { ChatHelper, Home, Login, Register, SRQ_Survey } from './pages'
import  SurveyComponent  from './components/SurveyComponent.jsx'
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
// import { GeistSans } from "geist/font/sans"; // font idk if works or not?


function App() {
  const dispatch = useDispatch();

  // On initial load, check if the token is in the cookies
  useEffect(() => {
    const token = Cookies.get("authToken"); // Fetch token from cookies
    if (token) {
      dispatch(login({ token })); // Update Redux state with the token
    }
  }, [dispatch]);
  return (
    <div >            
      {/* <ChatHelper/> */}
      <Outlet />
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Home/> */}
      {/* <SurveyComponent/> */}
      {/* <SRQ_Survey/> */}

    </div>
  )
}

export default App
