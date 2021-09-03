import React from "react";
import Image from "./image/image";

// import ScrollToBottom from 'react-scroll-to-bottom';

import Message from "./message/message";

import "./messages.css";

const Messages = ({ messages, name }) => (
  <div className="messages">
    {messages.map((message, i) => {
      if (message[0] === 0) {
        return (
          <div key={i}>
            <Message message={message[1]} name={name} />
          </div>
        );
      } else {
        return (
          <div key={i}>
            <Image message={message[1]} name={name} />
          </div>
        );
      }
    })}
  </div>
);

export default Messages;
