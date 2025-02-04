import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PersonSvg from "@/assets/icons/PersonSvg";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ChatUser() {
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // For both old and new messages
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null); // WebSocket connection
  const [selectedContact, setSelectedContact] = useState(null); // Currently selected User
  const [tempUserID, setTempUserID] = useState("Initial ID: Dummy"); // To hold the userId

  useEffect(() => {
    getUserList();
  }, []);
  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  async function getUserList() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/info/get-helper-list",
        { withCredentials: true }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching the helper list:", error);
    }
  }

  // Fetch old message history and open WebSocket connection
  async function handleHelperClick(helperId) {
    try {
      // Fetch the userId and old messages from the server
      const response = await axios.post(
        `http://localhost:9000/api/v1/info/trigger-ws/${helperId}`,
        {},
        { withCredentials: true }
      );
      setSelectedContact(helperId);

      // Get the userId and message history from the response
      const { userId, messageHistory } = response.data.data;
      setTempUserID(userId);

      // Update the state with the old message history
      setMessages(messageHistory);
      console.log(messages);

      // Close previous WebSocket connection if exists
      if (ws) ws.close();

      // Open a new WebSocket connection
      const newWs = new WebSocket(`ws://localhost:9000/ws?userId=${userId}`);

      newWs.onopen = () => {
        console.log("WebSocket connection opened");
      };

      newWs.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("Message from server:", receivedMessage);

        // Update the message list with the new message received via WebSocket
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      };

      newWs.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setWs(newWs); // Set the new WebSocket connection
    } catch (error) {
      console.error(
        "Error fetching message history or opening WebSocket:",
        error
      );
    }
  }

  // Send a message via WebSocket
  function sendMessage() {
    if (ws && selectedContact) {
      const messageData = {
        senderId: tempUserID,
        receiverId: selectedContact,
        text: input,
      };

      // Send message to server
      ws.send(JSON.stringify(messageData));

      // Update local message state
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput("");
    }
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <div className="">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <div className="body lg:flex h-[85vh] lg:w-[80%] lg:mx-auto lg:py-8 ">
        
        {/* DESKTOP Left and right side containers */}
        <div className="hidden body-2maybe lg:flex w-full h-full">
          {/* Left container with ScrollArea */}
          <div className="left lg:w-[30%] border rounded ">
            <ScrollArea className="h-[80%] w-[90%] my-4 rounded-md border mx-auto">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Helpers
                </h4>
                {users.map((item) => (
                  <div
                    key={item._id}
                    className={`text-sm py-3 px-2 rounded hover:bg-input cursor-pointer 
                  ${selectedContact === item._id ? "bg-input" : ""}`}
                    onClick={() => handleHelperClick(item._id)}
                  >
                    {item.fullname}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right container for chat messages */}
          <div className="right relative lg:w-[70%] border rounded lg:h-full">
          <ScrollArea className="h-[80%] w-[90%] my-4 rounded-md border mx-auto">
            <div className="messages list-none">
              {messages.map((msg, index) => (
                // if tempUserID == msg.senderId

                <div className="div py-3 px-6 " key={index}>
                  <li
                    className={`${
                      tempUserID === msg.senderId
                        ? "text-red-400 text-end"
                        : "text-white"
                    } `}
                  >
                    {msg.message || msg.text}
                  </li>

                  <p
                    className={`${
                      tempUserID === msg.senderId ? " text-end" : ""
                    } text-xs text-gray-400 `}
                    >
                    
                    {new Date().toLocaleString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                  </p>


                </div>
              ))}
            </div>
          </ScrollArea>

            {/* Input area */}
            <div className="input-area w-full absolute bottom-0 py-6 px-10 flex gap-3">
              <Input
                className="text-white"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
