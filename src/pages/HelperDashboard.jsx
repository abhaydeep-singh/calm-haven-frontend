import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function HelperDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" hidden md:block body md:w-[80%] mx-auto">
        <div className="flex py-16">
          {/* Sidebar */}
          <div className="sidebar w-[20%] border-r p-4 flex flex-col gap-4">
            {/* <h3 className="text-3xl mb-4 ">CALM HAVEN</h3> */}
            <div className="logo mb-1">
              <img
                className=" "
                src="/src/assets/logo.png"
                alt="alt"
                />
            </div>
            <Separator className="mb-6"/>  
            
            <Button variant="outline" onClick={() => navigate("chat-helper")}>Chat</Button>
            <Button variant="outline" onClick={() => navigate("create-article")}>
              Create Article
            </Button>
            <Button variant="outline" onClick={() => navigate("check-appointment")}>
              Check Appointment
            </Button>
          </div>

          {/* Content Area */}
          
          <div className="content w-[80%]">
          <h3 className="text-3xl mb-2 text-center text-primary font-bold">DASHBOARD</h3>
          <hr className="mb-16"/>
            <Outlet /> {/* This renders the nested routes */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HelperDashboard;


