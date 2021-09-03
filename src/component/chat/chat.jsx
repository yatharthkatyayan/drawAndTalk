import React, { useEffect, useState } from "react";
import Container from "../container/container";
import queryString from "query-string";
import io from "socket.io-client";

import Messages from "../messages/messages";
import InfoBar from "../infobar/infobar";
import Input from "../Input/Input";

import "./chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://draw-and-talk.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io.connect(ENDPOINT);
    //  console.log(socket);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, [0, message]]); ////
    });

    socket.on("Image", (message) => {
      setMessages((messages) => [...messages, [1, message]]); ////
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    } else {
      let canvasImage = document.getElementById("board");
      let base64Image = canvasImage.toDataURL("image/jpeg");
      socket.emit("sendImage", base64Image, () => setMessage(""));
      console.log(base64Image);
    }
  };

  return (
    // <Container />
    <div className="mainScreenContainer">
      <div className="chatcontainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>

      <div className="canavsContainer">
        <Container />
      </div>
    </div>
  );
};

export default Chat;
