import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

// Options for the appointment status
const options = [
  { value: "accept", label: "Accept" },
  { value: "deny", label: "Deny" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
];

function AptHelper() {
  const [openPopover, setOpenPopover] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [aptList, setAptList] = useState([]);

  useEffect(() => {
    getAptList();
  }, []);

  // Fetch appointment list from the backend
  async function getAptList() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/booking/get-list",
        { withCredentials: true }
      );
      const appointments = response.data.data;

      // Set aptList and initialize selectedValues based on the fetched status (aptRequest)
      setAptList(appointments);
      setSelectedValues(appointments.map((item) => item.aptRequest || "pending"));
    } catch (error) {
      console.log(`An error occurred while fetching the appointment list: ${error}`);
    }
  }

  // Handle selecting a status
  const handleSelect = (index, value) => {
    const newValues = [...selectedValues];
    newValues[index] = value;
    setSelectedValues(newValues);
    setOpenPopover(null); // Close popover after selection
  };

  // Handle update button click (Add API logic here if needed)
  const handleUpdate = (index) => {
    console.log(`Updating status for ${aptList[index].user.fullname}:`, selectedValues[index]);
    // Example: Call API to update the status in the backend
    // axios.post('/update-status', { id: aptList[index]._id, status: selectedValues[index] });
  };

  async function handleResolve(aptID) {
    try {
      const deleteApt = await axios.delete(`http://localhost:9000/api/v1/booking/delete/${aptID}`, { withCredentials: true });
      if (deleteApt.status === 201) {
        // Optionally refresh the appointment list after deletion
        getAptList();
      }
    } catch (error) {
      console.log(`Something went wrong while resolving the appointment: ${error}`);
    }
  }

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="font-semibold text-2xl text-center mt-7 mb-2">
        Manage Appointments
      </h1>
      <Separator className="mb-7" />
      <h2 className="font-semibold text-xl my-2 text-center">Appointments</h2>

      <ScrollArea className="h-[600px] md:h-[400px] rounded-md border p-4">
        <div className="tableBox overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableCaption>A list of your Appointment requests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">Serial No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead className="text-right">Apt Status</TableHead>
                <TableHead className="text-right">Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aptList.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.user.fullname}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell className="text-right">
                    <Popover
                      open={openPopover === index}
                      onOpenChange={() =>
                        setOpenPopover(openPopover === index ? null : index)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover === index}
                          className="w-[150px] justify-between"
                        >
                          {selectedValues[index]
                            ? options.find(
                                (option) =>
                                  option.value === selectedValues[index]
                              )?.label
                            : "Select status"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[150px] p-0">
                        <Command>
                          <CommandInput placeholder="Search status..." />
                          <CommandList>
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                              {options.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  onSelect={() =>
                                    handleSelect(index, option.value)
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedValues[index] === option.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {option.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => handleUpdate(index)}>
                      Update
                    </Button>
                    <Button className="mx-3" variant="destructive" onClick={() => handleResolve(item._id)}>
                      Resolve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}

export default AptHelper;
