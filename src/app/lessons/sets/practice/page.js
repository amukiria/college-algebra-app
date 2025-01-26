"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

export default function SetsPractice() {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [result, setResult] = useState("");
  const [vennData, setVennData] = useState([
    { sets: ["A"], size: 0 },
    { sets: ["B"], size: 0 },
    { sets: ["A", "B"], size: 0 },
  ]);
  const [hoveredSet, setHoveredSet] = useState({ sets: "", elements: [] });
  const [operation, setOperation] = useState(""); // Track the operation being performed

  // Updates Venn diagram with new data
  const updateVennDiagram = (newData) => {
    const chart = venn.VennDiagram().width(400).height(400);
    d3.select("#venn")
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  // Handles the intersection operation
  const handleIntersection = () => {
    let intersection = [...new Set(setA)].filter((x) => new Set(setB).has(x));

    setResult(`Intersection: {${intersection.join(", ")}}`);
    setOperation("Intersection");

    // Update venn diagram data
    setVennData([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: intersection.length },
    ]);
    updateVennDiagram([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: intersection.length },
    ]);
  };

  // Handles the union operation
  const handleUnion = () => {
    let union = [...new Set([...setA, ...setB])];

    setResult(`Union: {${union.join(", ")}}`);
    setOperation("Union");

    // Update venn diagram data
    setVennData([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: union.length },
    ]);
    updateVennDiagram([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: union.length },
    ]);
  };

  // Handles the difference operation
  const handleDifference = () => {
    let difference = [...new Set(setA)].filter((x) => !new Set(setB).has(x));

    setResult(`Difference (A - B): {${difference.join(", ")}}`);
    setOperation("Difference");

    // Update venn diagram data
    setVennData([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: difference.length },
    ]);
    updateVennDiagram([
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: difference.length },
    ]);
  };

  // Reset function to clear input and reset Venn Diagram
  const resetVennDiagram = () => {
    setSetA([]);
    setSetB([]);
    setResult("");
    setOperation("");
    setVennData([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ]);
    // Reset the hovered set and clear hover elements
    setHoveredSet({ sets: "", elements: [] });
    // Reset operation
    setOperation("");
    updateVennDiagram([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ]);
    // Clear text fields
    document.querySelector("input[placeholder='Enter Set A']").value = '';
    document.querySelector("input[placeholder='Enter Set B']").value = '';
  };

  // Updates hover feedback
  useEffect(() => {
    const chart = venn.VennDiagram().width(400).height(400);
    
    const vennElement = d3.select("#venn")
      .datum(vennData)
      .call(chart);

    vennElement
      .selectAll("g")
      .on("mouseover", function(event, d) {
        if (hoveredSet.sets === "") { // Only show hover if there’s no reset
          const setNames = d.sets;
          let hoveredElements = [];

          // Include elements in the set based on the hovered section
          if (setNames.includes("A")) hoveredElements = [...hoveredElements, ...setA];
          if (setNames.includes("B")) hoveredElements = [...hoveredElements, ...setB];

          // Show hovered set and its elements
          setHoveredSet({ sets: setNames.join(", "), elements: hoveredElements.length > 0 ? hoveredElements : [0] });
        }
      })
      .on("mouseout", function() {
        if (hoveredSet.sets !== "") { // Only clear hover feedback if not reset
          setHoveredSet({ sets: "", elements: [] });
        }
      });
  }, [vennData, setA, setB, hoveredSet]);

  // Trigger venn diagram update when sets change
  useEffect(() => {
    const initialVennData = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => new Set(setB).has(x)).length },
    ];

    setVennData(initialVennData);
    updateVennDiagram(initialVennData);
  }, [setA, setB]);

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Practice: Sets Explorer</h1>

      <div className="mb-4">
        <label className="block mb-2">Enter Set A (comma separated):</label>
        <input
          type="text"
          onChange={(e) => setSetA(e.target.value.split(",").map((item) => parseInt(item.trim())))}
          className="p-2 border rounded mb-4"
          placeholder="Enter Set A"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Set B (comma separated):</label>
        <input
          type="text"
          onChange={(e) => setSetB(e.target.value.split(",").map((item) => parseInt(item.trim())))}
          className="p-2 border rounded mb-4"
          placeholder="Enter Set B"
        />
      </div>

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
          onClick={handleDifference}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Compute Difference (A - B)
        </button>
        <button
          onClick={resetVennDiagram}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
        >
          Reset Venn Diagram
        </button>
      </div>

      {result && (
        <div className="mt-4 bg-primary p-4 rounded">
          <p>{result}</p>
        </div>
      )}

      {hoveredSet && (
        <div className="mt-4 bg-primary p-4 rounded">
          <p><strong>Hovered Set: </strong>{hoveredSet.sets}</p>
          <p><strong>Elements: </strong>{hoveredSet.elements.join(", ")}</p>
        </div>
      )}

      <div id="venn" className="mt-8"></div>
    </div>
  );
}
