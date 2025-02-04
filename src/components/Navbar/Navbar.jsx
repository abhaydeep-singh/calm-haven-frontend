import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();
  // async function handleProfile(){};
  async function handlelogout() {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(logout());
      }
      console.log(response);
    } catch (error) {
      console.log(`Logout Error: ${error}`);
    }
  }
  return (
    <>
      <div className="navbar bg-custom py-6 px-2 flex justify-between">
        <h1 className="font-bold px-1 text-3xl">Calm Haven</h1>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          {/* trigger */}
          <SheetTrigger asChild>
            <div className="ham w-12 md:hidden" onClick={toggleMenu}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H20C20.4142 16.25 20.75 16.5858 20.75 17Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            </div>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetClose asChild>
              <button aria-label="Close" className="text-black float-right p-2">
                &#10005;
              </button>
            </SheetClose>
            <div className="p-4 text-2xl text-white">
              <a href="#" className="block  mb-4">
                Home
              </a>
              <a href="#" className="block  mb-4" onClick={()=>navigate("/helper-login")} >
                Login as Helper
              </a>
              <a href="#" className="block  mb-4" onClick={handlelogout}>
                Logout
              </a>
              {/* <a href="#" className="block ">
                Temp
              </a> */}
            </div>
          </SheetContent>
        </Sheet>
        <div className="Navigation-Menu hidden md:block">
          <ul className="px-5">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Login as Helper</DropdownMenuItem>
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                  {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handlelogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {/* <li>
              <Button onClick={handlelogout}>Logout</Button>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
