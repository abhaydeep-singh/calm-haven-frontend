import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Calender from "@/assets/icons/Calender";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Example of already booked dates
const bookedDates = [
  new Date("2024-10-3"), // Example booked date
  new Date("2024-10-15"), // Example booked date
  new Date("2024-10-20"), // Example booked date
];
// const helpers = ["ram", "sham"];

function isDateBooked(date) {
  return bookedDates.some(
    (bookedDate) =>
      bookedDate.getFullYear() === date.getFullYear() &&
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getDate() === date.getDate()
  );
}

function AptUser() {
  const [date, setDate] = useState(null); // Initialize with null
  const [selectedHelper, setSelectedHelper] = useState("");
  const [issue, setIssue] = useState("");
  const [helpers, setHelpers] = useState([]);
  const navigate = useNavigate();

  async function fetchHelper() {
    try {
      const helper = await axios.get(
        "http://localhost:9000/api/v1/info/get-helper-list",
        { withCredentials: true }
      );
      console.log(helper.data.data);
      setHelpers(helper.data.data);
    } catch (error) {
      console.log(`An error occured while fethcing Helpers: ${error}`);
    }
  }

  useEffect(() => {
    fetchHelper();
  }, []);

  async function addBooking() {
    try {
      const booking = await axios.post(
        "http://localhost:9000/api/v1/booking/add",
        {
          helper: selectedHelper,
          aptStatus: "pending",
          issue: "dummy", // FIXME:
          bookDate: date,
        },

        {
          withCredentials: true, // Important for sending cookies to the backend
        }
      );

      navigate("/");
    } catch (error) {
      console.log(`An error occured while Booking: ${error}`);
    }
  }

  return (
    <div>
      <div className="w-full my-8 mx-auto h-screen lg:w-[80%]">
        <div className="logo">
          <img src="src/assets/logo.png" alt="" />
        </div>

        <h2 className=" font-bold italic text-lg text-center mt-28 mb-3 text-primary lg:mt-10 lg:text-2xl">
          YOUR WELLNESS JOURNEY BEGINS HERE
        </h2>
        <Separator />
        <div className="img my-4 mx-2 lg:w-full lg:flex lg:items-center lg:justify-around">
          <img
            className="rounded-xl lg:w-[60%]"
            src="src/assets/therepy.png"
            alt=""
          />
          <div className="desktop popover+book mt-9 lg:flex flex-col gap-4 items-center hidden">
            {/* Booking section for desktop */}
            <div className="popover+book mt-9 lg:flex flex-col gap-6 items-center hidden ">
              <ScrollArea className="h-[110px] w-[300px] rounded-md border">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Select Helper</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {helpers.map((item, index) => (
                      <TableRow
                        key={index}
                        onClick={() => {
                          console.log("Clicked:", item.username); // Logs the clicked helper's name
                          setSelectedHelper(item._id); // Optionally set the selected helper
                        }}
                        className="cursor-pointer hover:bg-gray-100 hover:text-black w-full" // Ensure full width
                      >
                        <TableCell className="w-full">
                          {item.username}
                        </TableCell>{" "}
                    
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

          
            </div>
            {/* Calender section */}
            <Popover>
              <PopoverTrigger className="w-full">
                <div className="bttn w-full flex items-center justify-center">
                  <Button
                    className=" text-xl font-mono w-[240px]"
                    variant="outline"
                  >
                    <div className="flex gap-9 items-center">
                      <div>Pick a date</div>
                      <div className="cal w-6">
                        <Calender />
                      </div>
                    </div>
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => isDateBooked(date)}
                  // className="rounded-md border shadow w-[21%]"
                />
              </PopoverContent>
            </Popover>
            <Button variant="" className="text-white w-[90px]" onClick={addBooking}>
              Book Now
            </Button>
          </div>
        </div>
        <Separator />
        <h2 className="italic text-lg text-center my-5 lg:text-2xl">
          Book an appointment with ease and take the next step toward your
          goals!
        </h2>
        <Separator />

        {/*Booking section For mobile */}
        <div className="popover+book mt-9 flex flex-col gap-4 items-center lg:hidden">
          <ScrollArea className="h-[100px] w-[200px] rounded-md border">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Select Helper</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {helpers.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      console.log("Clicked:", item.username); // Logs the clicked helper's name
                      setSelectedHelper(item._id); // Optionally set the selected helper
                    }}
                    className="cursor-pointer hover:bg-gray-100 hover:text-black w-full" // Ensure full width
                  >
                    <TableCell className="w-full">{item.username}</TableCell>{" "}
                    {/* Ensure full width */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <Popover>
            <PopoverTrigger className="w-full">
              <div className="bttn w-full flex items-center justify-center">
                <Button
                  className=" text-xl font-mono w-[240px]"
                  variant="outline"
                >
                  <div className="flex gap-9 items-center">
                    <div>Pick a date</div>
                    <div className="cal w-6">
                      <Calender />
                    </div>
                  </div>
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => isDateBooked(date)}
                // className="rounded-md border shadow w-[21%]"
              />
            </PopoverContent>
          </Popover>
          <Button
            variant=""
            className="text-white w-[90px]"
            onClick={addBooking}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AptUser;
