import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"; // To handle cookie-based authentication
import meditation from "../assets/meditation.png";
import logo from "../assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await axios.post(
        `${backendURL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Important for sending cookies to the backend
        }
      );

      const token = response.data.refreshToken; // Assume the token is returned in response

      // Dispatch login with the token
      dispatch(login({ token }));

      // Optionally, store token in cookies or localStorage
      Cookies.set("authToken", token); // Set token in cookies for persistence

      // Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      console.log(`Login Error: ${error}`);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }

  return (
    <>
      {/* Navbar */}
      <div className="n-bar h-[70px] bg-custom flex items-center justify-around">
        <img src={logo} className="w-[50%] md:w-[30%] lg:w-[20%]" alt="" />
        
        <Sheet>
  <SheetTrigger><Button variant="outline">Urgent Help?</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Call At 1800-599-0019</SheetTitle>
      <SheetDescription>
      The 24x7 Toll-Free Mental Health Rehabilitation Helpline KIRAN (1800-599-0019) was launched by DEPwD, Ministry of Social Justice and Empowerment in 13 languages to provide relief and support to persons with Mental Illness and in view of the growing incidence of mental illness.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

      </div>
      {/* Section 1 */}
      <div className="section my-5 flex flex-col sm:flex-row sm:items-center">
        <img
          src={meditation}
          className="rounded-2xl p-2"
          alt=""
        />
        <div className="p-4 ">
          <h2 className="text-2xl font-bold text-primary my-3 lg:text-3xl">
            Your Mental Health Matters
          </h2>
          <p className="text-sm italic">
            Taking care of your mental health and wellbeing can look different
            for everyone. It's about finding a balance and knowing what works
            for you.
          </p>
        </div>
      </div>



      {/* Login Section */}
      <div className="login w-full border flex flex-col gap-6 md:flex-row md:justify-around items-center p-6">
        <div>
          <img src={logo} className="w-[90%]" alt="" />
          <br />
        <ul class="list-none pl-5">
          <li class="flex items-center py-2">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Chat with your Mental Health Therepist
          </li>
          <li class="flex items-center py-2">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Book Appointments with Medical Professional
          </li>
          <li class="flex items-centerpy-2">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Take self-diagnostic tests to keep your mental health in check
          </li>
        </ul>
        </div>

        <hr />


        <Card className="w-[300px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="mx-auto text-xl text-primary">
              Login Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/register")}>
              Register Instead
            </Button>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
          <p
            className="text-center pb-4 text-primary"
            onClick={() => navigate("/helper-login")}
          >
            Registered Helper? Login here
          </p>
        </Card>
      </div>
    </>
  );
}

export default Login;
