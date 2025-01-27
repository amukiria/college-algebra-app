"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import Link from "next/link";

export default function SetsPractice() {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [setC, setSetC] = useState([]);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [result, setResult] = useState("");
  const [vennData, setVennData] = useState([
    { sets: ["A"], size: 0 },
    { sets: ["B"], size: 0 },
    { sets: ["C"], size: 0 },
    { sets: ["A", "B"], size: 0 },
    { sets: ["A", "C"], size: 0 },
    { sets: ["B", "C"], size: 0 },
    { sets: ["A", "B", "C"], size: 0 },
  ]);
  const [operation, setOperation] = useState("");

  const updateVennDiagram = (newData) => {
    const chart = venn.VennDiagram().width(400).height(400);
    d3.select("#venn")
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  const handleIntersection = () => {
    let intersection = [...new Set(setA)].filter((x) =>
      setB.includes(x) && setC.includes(x)
    );
    setResult(`Intersection: {${intersection.join(", ")}}`);
    setOperation("Intersection");

    setVennData([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["C"], size: setC.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
      { sets: ["A", "C"], size: [...new Set(setA)].filter((x) => setC.includes(x)).length },
      { sets: ["B", "C"], size: [...new Set(setB)].filter((x) => setC.includes(x)).length },
      { sets: ["A", "B", "C"], size: intersection.length }, // Intersection of A, B, and C
    ]);
    updateVennDiagram([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["C"], size: setC.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
      { sets: ["A", "C"], size: [...new Set(setA)].filter((x) => setC.includes(x)).length },
      { sets: ["B", "C"], size: [...new Set(setB)].filter((x) => setC.includes(x)).length },
      { sets: ["A", "B", "C"], size: intersection.length }, // Intersection of A, B, and C
    ]);
  };

  const handleUnion = () => {
    let union = [...new Set([...setA, ...setB, ...setC])];
    setResult(`Union: {${union.join(", ")}}`);
    setOperation("Union");

    setVennData([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["C"], size: setC.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
      { sets: ["A", "C"], size: [...new Set(setA)].filter((x) => setC.includes(x)).length },
      { sets: ["B", "C"], size: [...new Set(setB)].filter((x) => setC.includes(x)).length },
      { sets: ["A", "B", "C"], size: union.length },
    ]);
    updateVennDiagram([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["C"], size: setC.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
      { sets: ["A", "C"], size: [...new Set(setA)].filter((x) => setC.includes(x)).length },
      { sets: ["B", "C"], size: [...new Set(setB)].filter((x) => setC.includes(x)).length },
      { sets: ["A", "B", "C"], size: union.length },
    ]);
  };

  const resetVennDiagram = () => {
    setSetA([]);
    setSetB([]);
    setSetC([]);
    setInputA("");
    setInputB("");
    setInputC("");
    setResult("");
    setOperation("");
    setVennData([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["C"], size: 0 },
      { sets: ["A", "B"], size: 0 },
      { sets: ["A", "C"], size: 0 },
      { sets: ["B", "C"], size: 0 },
      { sets: ["A", "B", "C"], size: 0 },
    ]);
    updateVennDiagram([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["C"], size: 0 },
      { sets: ["A", "B"], size: 0 },
      { sets: ["A", "C"], size: 0 },
      { sets: ["B", "C"], size: 0 },
      { sets: ["A", "B", "C"], size: 0 },
    ]);
  };

  useEffect(() => {
    const initialVennData = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["C"], size: setC.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
      { sets: ["A", "C"], size: [...new Set(setA)].filter((x) => setC.includes(x)).length },
      { sets: ["B", "C"], size: [...new Set(setB)].filter((x) => setC.includes(x)).length },
      { sets: ["A", "B", "C"], size: [...new Set(setA)].filter((x) => setB.includes(x) && setC.includes(x)).length },
    ];
    setVennData(initialVennData);
    updateVennDiagram(initialVennData);
  }, [setA, setB, setC]);

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Practice: Sets Explorer</h1>

      {/* Input for Set A */}
      <div className="mb-4">
        <label className="block mb-2">Enter Set A (comma separated):</label>
        <input
          type="text"
          value={inputA}
          onChange={(e) => {
            setInputA(e.target.value);
            setSetA(e.target.value.split(",").map((item) => parseInt(item.trim())));
          }}
          className="p-2 border rounded mb-4"
        />
      </div>

      {/* Input for Set B */}
      <div className="mb-4">
        <label className="block mb-2">Enter Set B (comma separated):</label>
        <input
          type="text"
          value={inputB}
          onChange={(e) => {
            setInputB(e.target.value);
            setSetB(e.target.value.split(",").map((item) => parseInt(item.trim())));
          }}
          className="p-2 border rounded mb-4"
        />
      </div>

      {/* Input for Set C */}
      <div className="mb-4">
        <label className="block mb-2">Enter Set C (comma separated):</label>
        <input
          type="text"
          value={inputC}
          onChange={(e) => {
            setInputC(e.target.value);
            setSetC(e.target.value.split(",").map((item) => parseInt(item.trim())));
          }}
          className="p-2 border rounded mb-4"
        />
      </div>

      {/* Buttons for Operations */}
      <div className="mb-4">
        <button
          onClick={handleIntersection}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Compute Intersection
        </button>
        <button
          onClick={handleUnion}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Compute Union
        </button>
        <button
          onClick={resetVennDiagram}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-4 bg-primary p-4 rounded">
          <p>{result}</p>
        </div>
      )}

      {/* Venn Diagram */}
      <div id="venn" className="mt-8"></div>
    </div>
  );
}
