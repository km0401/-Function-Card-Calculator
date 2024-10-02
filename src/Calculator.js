import React, { useState } from "react";
import FunctionCard from "./FunctionCard";

const functionChainOrder = [1, 2, 4, 5, 3]; // Fixed order for chaining

function Calculator() {
  const [initialValue, setInitialValue] = useState(0);
  const [functions, setFunctions] = useState(Array(5).fill(""));
  const [error, setError] = useState(""); // State for general error messages
  const [functionErrors, setFunctionErrors] = useState(Array(5).fill("")); // State for function-specific error messages

  // Validate the equation for valid operators and characters
  const validateEquation = (equation) => {
    const validOperators = /^[0-9x()+\-*/^ ]+$/; // Only allow digits, x, operators, parentheses, and spaces
    return validOperators.test(equation);
  };

  const handleFunctionChange = (id, equation) => {
    const newFunctions = [...functions];
    const newFunctionErrors = [...functionErrors];

    if (validateEquation(equation)) {
      newFunctionErrors[id] = ""; // Clear error if the equation is valid
      newFunctions[id] = equation;
    } else {
      newFunctionErrors[id] =
        "Invalid equation: Only basic arithmetic operators (+, -, *, /, ^) and digits are allowed.";
    }

    setFunctions(newFunctions);
    setFunctionErrors(newFunctionErrors); // Update state for function-specific errors
  };

  const evaluateExpression = (equation, result) => {
    let correctedEquation = equation.replace(/\^/g, "**");
    correctedEquation = correctedEquation.replace(/(\d)(x)/g, "$1*$2");

    try {
      return eval(correctedEquation.replace(/x/g, `${result}`));
    } catch (error) {
      console.error("Invalid equation:", error);
      return 0;
    }
  };

  const calculateResult = () => {
    let result = initialValue;
    functionChainOrder.forEach((id) => {
      const equation = functions[id - 1];
      result = evaluateExpression(equation, result);
      console.log(`Function ${id}: ${equation} = ${result}`);
    });
    return result;
  };

  const handleInitialValueChange = (e) => {
    const value = e.target.value;

    // Validate if the input is a number
    if (!isNaN(value)) {
      setInitialValue(Number(value));
      setError("");
    } else {
      setError("Enter a valid number.");
    }
  };

  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="flex flex-col items-start mb-4 gap-2">
        <span
          className="px-4 py-1 font-semibold text-white"
          style={{
            backgroundColor: "#E29A2D",
            borderRadius: "14px",
            fontSize: "12px",
          }}
        >
          Initial Value of x
        </span>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          style={{
            border: "2px solid #FFC267",
            borderRadius: "12px",
            width: "115px",
            fontSize: "12px",
          }}
          value={initialValue}
          onChange={handleInitialValueChange}
          placeholder="Enter initial value (x)"
        />
        {error && (
          <span className="text-red-500 text-xs">Enter a valid number.</span>
        )}
      </div>

      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {functions.slice(0, 3).map((_, index) => (
            <div key={index} className="flex flex-col">
              <FunctionCard
                id={index}
                onInputChange={handleFunctionChange}
                functionChainOrder={functionChainOrder}
                error={functionErrors[index]}
              />
            </div>
          ))}

          {/* Centering the next two cards in the next row */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center space-x-6">
            {functions.slice(3, 5).map((_, index) => (
              <div key={index + 3} className="flex flex-col">
                <FunctionCard
                  id={index + 3}
                  onInputChange={handleFunctionChange}
                  functionChainOrder={functionChainOrder}
                  error={functionErrors[index + 3]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mb-4 gap-2">
        <span
          className="px-4 py-1 font-semibold text-white"
          style={{
            backgroundColor: "#4CAF79",
            borderRadius: "14px",
            fontSize: "12px",
          }}
        >
          Final Output y
        </span>

        <input
          type="text"
          className="w-full p-2 border rounded-md"
          style={{
            border: "2px solid #4CAF79",
            borderRadius: "12px",
            width: "115px",
            fontSize: "12px",
          }}
          value={calculateResult()}
          readOnly
        />
      </div>
    </div>
  );
}

export default Calculator;
