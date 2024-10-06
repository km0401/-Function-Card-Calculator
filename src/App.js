import React from "react";
import Calculator from "./Calculator";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-6">Function Chain Calculator</h3>
      <Calculator />
    </div>
  );
}

export default App;
