import React from "react";

import "../message/message.css";

import ReactEmoji from "react-emoji";

const Image = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  console.log("image text : ", text);
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <img
          className="messageText colorWhite"
          src={text}
          alt={"canvas not rendered !!!!"}
        ></img>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <img
          className="messageText colorWhite"
          src={text}
          alt={"canvas not rendered !!!!"}
        ></img>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Image;
