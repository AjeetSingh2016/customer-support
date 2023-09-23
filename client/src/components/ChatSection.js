import React, { useEffect, useState } from "react";
import "./Styles.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SendIcon from "@mui/icons-material/Send";
import { MessageOther as Message } from ".";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";


const ChatSection = () => {
  const lightTheme = useSelector((e) => e.themeKey);
  const location = useLocation();
  const data = location.state;

  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  // const

  const currentChatId = data.currentConversation?._id;
  const currentUserId = data.currentUserId;

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendButtonClick = async () => {
    // e.preventDefault();

    const message = {
      sender: currentUserId,
      text: newMessage,
      conversationId: currentChatId
    }

    try {
      const response = await axios.post("http://localhost:5000/messages/", message);
      setMessages([...messages, response.data])
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

  };


  // const updateUserStatus = async (newStatus) => {
  //   const userId = customerId;
  //   try {
  //     const response = await axios.patch(
  //       "http://localhost:5000/user/update/" + userId,
  //       {
  //         status: newStatus,
  //       }
  //     );
  //     return response.data; // This will contain the updated user object
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle errors here
  //     console.error(error);
  //     throw error;
  //   }
  // };

  const handleCompletedButton = async ()=>{
    toast("This functionality is under development");
  }

  useEffect(() => {
    console.log(location);
    if (data) {
      const getMessage = async () => {
        try {
          const response = await axios.get("http://localhost:5000/messages/" + currentChatId);
          setMessages(response.data)
          console.log("Sender ID " + response.data[0].sender);
          console.log("Current User ID " + currentUserId);
        } catch (error) {
          console.log(error);
        }
      };

      getMessage();
    }
  }, [data]);


  return (
    <div className="chat-container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className={"chat-header" + (lightTheme ? "" : " header-dark")}>
        <div className="chat-header-profile">
          <div className="chat-header-profile-picture">
            <h1>A</h1>
          </div>

          <div className="chat-header-name">Ajeet Singh</div>
        </div>

        <div>
          <IconButton onClick={handleCompletedButton}>
              <AddTaskIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>

      <div
        className={"chat-messages" + (lightTheme ? "" : " chat-messages-dark")}
      >
        {messages?.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            time={message.createdAt}
            isSelf={message.sender === currentUserId}
          />
        ))}
      </div>

      <div className={"chat-input" + (lightTheme ? "" : " header-dark")}>
        <input
          className={lightTheme ? "chat-search-input" : "search-input-dark"}
          value={newMessage}
          type="text"
          onChange={handleMessageChange}
          placeholder="Type Response..."
        />
        <div>
          <IconButton onClick={handleSendButtonClick}>
            {!lightTheme ? (
              <SendIcon style={{ color: "white" }} />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
