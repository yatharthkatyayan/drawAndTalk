import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Board = (Brush) => {
  /*
  canvas image to base64
  base64 to server as string
  base64 string to image
  */

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    // console.log(window.innerHeight, window.innerWidth);
    // console.log(canvas.style.height, canvas.style.width);
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = "8";
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    context.strokeStyle = `${Brush.BrushColor}`;
    context.lineWidth = `${Brush.BrushSize}`;
  }, [Brush]);

  const startDrawing = (e) => {
    const doc = document.getElementById("board");
    const left = doc.getBoundingClientRect().left;
    const top = doc.getBoundingClientRect().top;
    contextRef.current.beginPath();
    contextRef.current.moveTo(e.clientX - left, e.clientY - top);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const Draw = (e) => {
    if (!isDrawing) return;
    const doc = document.getElementById("board");
    const left = doc.getBoundingClientRect().left;
    const top = doc.getBoundingClientRect().top;
    contextRef.current.lineTo(e.clientX - left, e.clientY - top);
    contextRef.current.stroke();
  };

  return (
    <div className="inner-board-container" id="board-container">
      <canvas
        ref={canvasRef}
        className="board"
        id="board"
        onMouseDown={(e) => startDrawing(e)}
        onMouseMove={(e) => Draw(e)}
        onMouseUp={(e) => finishDrawing(e)}
        onMouseOut={(e) => finishDrawing(e)}
      ></canvas>
    </div>
  );
};

export default Board;
