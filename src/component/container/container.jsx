import React, { useEffect, useState } from "react";
import Board from "../board/board";
import "./style.css";

const Container = () => {
  const [size, setsize] = useState(8);
  const [color, setcolor] = useState("rgb(101, 226, 101)");

  useEffect(() => {
    let color_container = document.getElementById("color-container");
    color_container.style.backgroundColor = color;
  }, [color]);

  const handleSize = () => {
    let doc = document.getElementById("myRange").value;
    setsize(doc);
  };
  const handleColor = () => {
    let new_color = document.getElementById("color-picker").value;
    let color_container = document.getElementById("color-container");
    color_container.style.backgroundColor = new_color;
    setcolor(new_color);
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="container-color-picker" id="color-container">
          <input
            className="color-picker"
            type="color"
            id="color-picker"
            defaultValue={color}
            onChange={handleColor}
          />
        </div>
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max="150"
            className="slider"
            id="myRange"
            value={size}
            onChange={handleSize}
          />
        </div>
      </div>
      <div className="board-container">
        {<Board BrushColor={color} BrushSize={`${size}`}></Board>}
      </div>
    </div>
  );
};

export default Container;
