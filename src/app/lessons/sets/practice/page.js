"use client";

import React, { useState } from "react";
import VennDiagram from "@/components/VennDiagram";

export default function SetsPractice() {
  const [result, setResult] = useState("");

  const handlePractice = () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([2, 3, 4]);
    const intersection = [...setA].filter((x) => setB.has(x));
    setResult(`The intersection of Set A and Set B is: {${intersection.join(", ")}}`);
  };

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Practice: Sets Explorer</h1>
      <p className="mb-4">
        Try solving the following problem:
      </p>
      <p className="italic mb-4">
        "Find the intersection of Set A = {`{1, 2, 3}`} and Set B = {`{2, 3, 4}`}."
      </p>
      <button
        onClick={handlePractice}
        className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Compute Result
      </button>
      {result && (
        <div className="mt-4 bg-primary p-4 rounded">
          <p>{result}</p>
        </div>
      )}
      <VennDiagram />
    </div>
  );
}
