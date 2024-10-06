import React, { useState, useEffect, useRef, useMemo } from "react";
import FunctionCard from "./FunctionCard";
import StraightLine from "./StraightLine";

const functionChainOrder = [1, 2, 4, 5, 3]; // Fixed order for chaining

function Calculator() {
  const [initialValue, setInitialValue] = useState(0);
  const [functions, setFunctions] = useState(Array(5).fill(""));
  const [error, setError] = useState(""); // General error messages for the initial value
  const [functionErrors, setFunctionErrors] = useState(Array(5).fill("")); // Function-specific error messages
  const [coordinates, setCoordinates] = useState({});
  const [inputCoordinates, setInputCoordinates] = useState({}); 
  const [outputCoordinates, setOutputCoordinates] = useState({}); 

  const inputCircleRef = useRef(null);
  const outputCircleRef = useRef(null);

  // Capture coordinates from each FunctionCard
  const handleCoordinatesChange = (id, coords) => {
    setCoordinates((prev) => ({
      ...prev,
      [id]: coords,
    }));
  };

  // Validate the equation for valid operators and characters
  const validateEquation = (equation) => /^[0-9x()+\-*/^ ]+$/.test(equation);

  const handleFunctionChange = (id, equation) => {
    setFunctions((prevFunctions) => {
      const newFunctions = [...prevFunctions];
      newFunctions[id] = validateEquation(equation)
        ? equation
        : newFunctions[id];
      return newFunctions;
    });

    setFunctionErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[id] = validateEquation(equation) ? "" : "Invalid equation";
      return newErrors;
    });
  };

  const evaluateExpression = (equation, result) => {
    let correctedEquation = equation
      .replace(/\^/g, "**")
      .replace(/(\d)(x)/g, "$1*$2");
    try {
      return eval(correctedEquation.replace(/x/g, `${result}`));
    } catch (error) {
      console.error("Invalid equation:", error);
      return 0;
    }
  };

  // Calculate result based on function chain order
  const calculateResult = useMemo(() => {
    return functionChainOrder.reduce((result, id) => {
      return evaluateExpression(functions[id - 1], result);
    }, initialValue);
  }, [initialValue, functions]);

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

  const captureCoordinates = () => {
    if (inputCircleRef.current && outputCircleRef.current) {
      const inputRect = inputCircleRef.current.getBoundingClientRect();
      const outputRect = outputCircleRef.current.getBoundingClientRect();
      setInputCoordinates({
        x: inputRect.left + inputRect.width / 2,
        y: inputRect.top + inputRect.height / 2,
      });
      setOutputCoordinates({
        x: outputRect.left + outputRect.width / 2,
        y: outputRect.top + outputRect.height / 2,
      });
    }
  };

  useEffect(() => {
    captureCoordinates();
    window.addEventListener("resize", captureCoordinates);
    return () => {
      window.removeEventListener("resize", captureCoordinates);
    };
  }, [initialValue, functions]);

  return (
    <>
      <div className="relative flex flex-col">
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
            <div className="relative w-[115px]">
              <input
                type="text"
                className="w-full p-2 pl-2 pr-10 border-2 border-[#FFC267] rounded-md text-xs"
                value={initialValue}
                onChange={handleInitialValueChange}
                placeholder="Enter initial value (x)"
              />
              <div className="absolute top-0 right-10 h-full w-[1px] bg-[#FFC267] rounded-md" />
              <div
                ref={inputCircleRef}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2"
              />
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
          </div>

          <div className="max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Render function cards */}
              {functions.slice(0, 3).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <FunctionCard
                    id={index}
                    onInputChange={handleFunctionChange}
                    functionChainOrder={functionChainOrder}
                    error={functionErrors[index]}
                    onCoordinatesChange={handleCoordinatesChange}
                  />
                </div>
              ))}

              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center space-x-6">
                {functions.slice(3, 5).map((_, index) => (
                  <div key={index + 3} className="flex flex-col">
                    <FunctionCard
                      id={index + 3}
                      onInputChange={handleFunctionChange}
                      functionChainOrder={functionChainOrder}
                      error={functionErrors[index + 3]}
                      onCoordinatesChange={handleCoordinatesChange}
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
            <div className="relative w-[115px]">
              <div
                ref={outputCircleRef}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2"
              />
              <div className="absolute top-0 left-8 h-full w-[1px] bg-[#4CAF79] rounded-md" />
              <input
                type="text"
                className="w-full p-2 pl-10 pr-2 border-2 border-[#4CAF79] rounded-md text-xs"
                value={calculateResult}
                placeholder="output"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/*SVG for connecting the dots*/}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {coordinates[0]?.input &&
          coordinates[0]?.output &&
          inputCoordinates.x &&
          outputCoordinates.x && (
            <>
              {/* Connect InputCoordinates to the 0th card's input */}
              <StraightLine
                start={inputCoordinates}
                end={coordinates[0]?.input}
              />

              {/* Connect cards according to functionChainOrder */}
              {functionChainOrder.map((id, index) => {
                if (index < functionChainOrder.length - 1) {
                  return (
                    coordinates[id - 1]?.output &&
                    coordinates[functionChainOrder[index + 1] - 1]?.input && (
                      <StraightLine
                        key={index}
                        start={coordinates[id - 1]?.output}
                        end={
                          coordinates[functionChainOrder[index + 1] - 1]?.input
                        }
                      />
                    )
                  );
                }
                return null;
              })}
              {/* Connect the last card's output to outputCoordinates */}
              {coordinates[
                functionChainOrder[functionChainOrder.length - 1] - 1
              ]?.output && (
                <StraightLine
                  start={
                    coordinates[
                      functionChainOrder[functionChainOrder.length - 1] - 1
                    ]?.output
                  }
                  end={outputCoordinates}
                />
              )}
            </>
          )}
      </svg>
    </>
  );
}

export default Calculator;
