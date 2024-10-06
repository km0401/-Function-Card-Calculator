import React, { useEffect, useState, useRef } from "react";
import FunctionCardIcon from "./assets/icon_function_card.svg";

function FunctionCard({
  id,
  onInputChange,
  functionChainOrder,
  error,
  onCoordinatesChange,
}) {
  const [equation, setEquation] = useState("");

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Update coordinates when the component mounts or id changes
  useEffect(() => {
    const inputCircle = inputRef.current;
    const outputCircle = outputRef.current;

    if (inputCircle && outputCircle) {
      const inputRect = inputCircle.getBoundingClientRect();
      const outputRect = outputCircle.getBoundingClientRect();

      // Pass coordinates to parent component
      onCoordinatesChange(id, {
        input: {
          x: inputRect.left + window.scrollX + inputRect.width / 2,
          y: inputRect.top + window.scrollY + inputRect.height / 2,
        },
        output: {
          x: outputRect.left + window.scrollX + outputRect.width / 2,
          y: outputRect.top + window.scrollY + outputRect.height / 2,
        },
      });
    }
  }, [id, onCoordinatesChange]); 
  const handleChange = (e) => {
    const input = e.target.value;
    setEquation(input);
    onInputChange(id, input); 
  };

  // The next function value or placeholder if at the end
  const nextFunctionValue =
    id === functionChainOrder.length - 1
      ? "-"
      : `Function ${functionChainOrder[id + 1]}`;

  return (
    <div
      className="bg-white rounded-lg border border-gray-300 shadow-sm"
      style={{
        width: "235px",
        height: "251px",
        padding: "16px",
      }}
    >
      <div className="flex flex-row mb-2 gap-2 align-end">
        <img src={FunctionCardIcon} alt="Function Card Icon" />
        <h2
          className="text-gray-500 text-sm font-semibold"
          style={{ color: "#A5A5A5" }}
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
          className="border rounded-md"
          style={{
            fontSize: "12px",
            height: "33px",
            width: "195px",
            padding: "0 8px",
            border: "1px solid #D3D3D3",
            backgroundColor: "#F5F5F5",
          }}
          disabled
          value={nextFunctionValue}
        >
          <option value={nextFunctionValue}>{nextFunctionValue}</option>
        </select>
      </div>

      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center">
          <span
            className="w-4 h-4 bg-white rounded-full border-2"
            ref={inputRef}
          />
          <span className="ml-2">input</span>
        </div>
        <div className="flex items-center">
          <span
            className="w-4 h-4 bg-white rounded-full border-2"
            ref={outputRef}
          />
          <span className="ml-2">output</span>
        </div>
      </div>
    </div>
  );
}

export default FunctionCard;
