import React from "react";
import Calculator from "./Calculator";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Function Chain Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
