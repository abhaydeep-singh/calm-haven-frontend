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
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"; // To handle cookie-based authentication

function LoginHelper() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Important for sending cookies to the backend
        }
      );

      const token = response.data.token; // Assume the token is returned in response

      // Dispatch login with the token
      dispatch(login({ token }));

      // Optionally, store token in cookies or localStorage
      Cookies.set("authToken", token); // Set token in cookies for persistence

      // Navigate to home page after successful login
      navigate("/helper-dashboard");
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
    <div className="card p-6 h-screen flex gap-4 flex-col items-center justify-center">
      <div className="logo">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>

      <Card className="w-[300px] sm:w-[400px]">
        <CardHeader>
          <CardTitle className="mx-auto text-xl text-primary">Login for Helpers</CardTitle>
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
      </Card>
    </div>
  );
}

export default LoginHelper;
