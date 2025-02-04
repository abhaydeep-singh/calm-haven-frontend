import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleToggle = (event) => {
    setIsChecked(!isChecked);
    
  };
  async function handleRegister() {
    try {
      // axios POST request
      const response = await axios.post(
        "http://localhost:9000/api/v1/users/register",
        {
          username,
          fullname,
          email,
          password,
          isChecked
        },

        // i also have to change cors option to enable this [credentials = true]
        { withCredentials: true } // Important for sending cookies
      );

      console.log(response.data);

      // Store tokens or other login-related data if necessary in local storage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Navigate only when login is successful
      navigate("/login");
    } catch (error) {
      console.log(`Register Error: ${error}`);
      // Handle different error responses
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  }
  return (
    <>
      {/* <ModeToggle /> */}

      <div className="card p-6 h-screen flex gap-4 flex-col items-center justify-center">
        <div className="logo ">
          <img src="src/assets/logo.png" alt="" /> 
          
          
          
        </div>

        <Card className="w-[400px] ">
          <CardHeader>
            <CardTitle className="mx-auto text-xl text-primary">
              Register Now
            </CardTitle>
            <br />
            {/* <CardDescription>Welcome to Calm Haven</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="name"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input
                    id="name"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" onClick={handleToggle} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login Instead
            </Button>
            <Button onClick={handleRegister}>Register</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Register;
