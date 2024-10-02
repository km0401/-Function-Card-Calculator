import React, { useState } from "react";
import FunctionCardIcon from "./assets/icon_function_card.svg";

function FunctionCard({ id, onInputChange, functionChainOrder, error }) {
  const [equation, setEquation] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    setEquation(input);
    onInputChange(id, input);
  };

  // Determine the next function value based on the array index i.e. id
  const nextFunctionValue =
    id === functionChainOrder.length - 1
      ? "-"
      : `Function ${functionChainOrder[id + 1]}`;

  return (
    <div
      className="bg-white rounded-lg"
      style={{
        width: "235px",
        height: "251px",
        border: "1px solid #DFDFDF",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex flex-row mb-2 gap-2 align-end">
        <img src={FunctionCardIcon} alt="Function Card Icon" />
        <h2
          className="text-gray-500 text-sm font-semibold"
          style={{ fontSize: "14px", marginBottom: "8px", color: "#A5A5A5" }}
        >
          Function: {id + 1}
        </h2>
      </div>
      <div className="mb-4">
        <label
          className="block text-black font-semibold text-sm mb-1"
          htmlFor="equation-input"
        >
          Equation
        </label>
        <input
          id="equation-input"
          type="text"
          className="border border-gray-300 rounded-md focus:outline-none font-semibold"
          style={{
            fontSize: "12px",
            height: "33px",
            width: "195px",
            padding: "0 8px",
          }}
          value={equation}
          onChange={handleChange}
          placeholder="Enter an equation"
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
      <div className="mb-2">
        <label
          className="block text-black font-semibold text-sm mb-1"
          htmlFor="next-function"
        >
          Next function
        </label>
        <select
          id="next-function"
          type="text"
          className="border rounded-md"
          style={{
            fontSize: "12px",
            height: "33px",
            width: "195px",
            padding: "0 8px",
            border: "1px solid #D3D3D3",
            backgroundColor: "#F5F5F5",
            fontColor: "#D3D3D3",
          }}
          disabled
          value={nextFunctionValue}
        >
          <option value={nextFunctionValue}>{nextFunctionValue}</option>
        </select>
      </div>
      
      <div className="flex justify-between mt-4 text-xs">
        <label className="flex items-center">
          <input
            type="radio"
            name={`function-${id}`}
            value="input"
            className="h-4 w-4"
          />
          <span className="ml-1">input</span> 
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name={`function-${id}`}
            value="output"
            className="h-4 w-4" 
          />
          <span className="ml-1">output</span> 
        </label>
      </div>
    </div>
  );
}

export default FunctionCard;
