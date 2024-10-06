import React from "react";

const StraightLine = ({ start, end }) => {
  const dotRadius = 5; 

  return (
    <g>
      <line
        x1={start.x} 
        y1={start.y} 
        x2={end.x}
        y2={end.y} 
        stroke="#0066FF4D" 
        strokeWidth="5" 
      />
      {/* The start dot */}
      <circle
        cx={start.x} 
        cy={start.y}
        r={dotRadius} 
        fill="#0066FF4D"
      />
      {/*The end dot */}
      <circle
        cx={end.x} 
        cy={end.y} 
        r={dotRadius} 
        fill="#0066FF4D" 
      />
    </g>
  );
};

export default StraightLine;
