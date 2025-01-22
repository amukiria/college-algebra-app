"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

export default function SetExplorer() {
  const [setA, setSetA] = useState([1, 2, 3]);
  const [setB, setSetB] = useState([2, 3, 4]);
  const [result, setResult] = useState("");
  const [vennData, setVennData] = useState([]);
  const [hoveredSet, setHoveredSet] = useState({ sets: "", elements: [] });
  const [operation, setOperation] = useState(""); // Track the operation being performed

  // Update the Venn diagram with new data
  const updateVennDiagram = (newData) => {
    const chart = venn.VennDiagram().width(400).height(400);
    d3.select("#venn")
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  // Calculate intersection for 2 sets
  const calculateIntersection = () => {
    return [...new Set(setA)].filter((x) => new Set(setB).has(x));
  };

  // Calculate union for 2 sets
  const calculateUnion = () => {
    return [...new Set([...setA, ...setB])];
  };

  // Calculate difference for 2 sets (A - B)
  const calculateDifference = () => {
    return [...new Set(setA)].filter((x) => !new Set(setB).has(x));
  };

  // Handle operations (Intersection, Union, Difference)
  const handleOperation = (operationType) => {
    let result;
    let vennData = [];
    
    if (operationType === "Intersection") {
      result = calculateIntersection();
      vennData = [
        { sets: ["A"], size: setA.length },
        { sets: ["B"], size: setB.length },
        { sets: ["A", "B"], size: result.length },
      ];
    } else if (operationType === "Union") {
      result = calculateUnion();
      vennData = [
        { sets: ["A"], size: setA.length },
        { sets: ["B"], size: setB.length },
        { sets: ["A", "B"], size: result.length },
      ];
    } else if (operationType === "Difference") {
      result = calculateDifference();
      vennData = [
        { sets: ["A"], size: setA.length },
        { sets: ["B"], size: setB.length },
        { sets: ["A", "B"], size: result.length },
      ];
    }

    setResult(`${operationType}: {${result.join(", ")}}`);
    setVennData(vennData);
    setOperation(operationType);
    updateVennDiagram(vennData);
  };

  // Reset function
  const resetVennDiagram = () => {
    setSetA([1, 2, 3]);
    setSetB([2, 3, 4]);
    setResult("");
    setOperation("");
    setVennData([
      { sets: ["A"], size: 3 },
      { sets: ["B"], size: 3 },
      { sets: ["A", "B"], size: 2 },
    ]);
    setHoveredSet({ sets: "", elements: [] });
    updateVennDiagram([
      { sets: ["A"], size: 3 },
      { sets: ["B"], size: 3 },
      { sets: ["A", "B"], size: 2 },
    ]);
  };

  // Hover effect
  useEffect(() => {
    const chart = venn.VennDiagram().width(400).height(400);
    const vennElement = d3.select("#venn").datum(vennData).call(chart);

    vennElement
      .selectAll("g")
      .on("mouseover", function (event, d) {
        const setNames = d.sets;
        let hoveredElements = [];
        if (setNames.includes("A")) hoveredElements = [...hoveredElements, ...setA];
        if (setNames.includes("B")) hoveredElements = [...hoveredElements, ...setB];
        setHoveredSet({ sets: setNames.join(", "), elements: hoveredElements });
      })
      .on("mouseout", function () {
        setHoveredSet({ sets: "", elements: [] });
      });
  }, [vennData]);

  // Initial Venn diagram
  useEffect(() => {
    const initialVennData = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: calculateIntersection().length },
    ];

    setVennData(initialVennData);
    updateVennDiagram(initialVennData);
  }, []);

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Practice: Sets Explorer</h1>

      <div className="mb-4">
        <label className="block mb-2">Enter Set A (comma separated):</label>
        <input
          type="text"
          onChange={(e) => setSetA(e.target.value.split(",").map((item) => parseInt(item.trim())))}
          className="p-2 border rounded mb-4"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Set B (comma separated):</label>
        <input
          type="text"
          onChange={(e) => setSetB(e.target.value.split(",").map((item) => parseInt(item.trim())))}
          className="p-2 border rounded mb-4"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => handleOperation("Intersection")}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Compute Intersection
        </button>
        <button
          onClick={() => handleOperation("Union")}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Compute Union
        </button>
        <button
          onClick={() => handleOperation("Difference")}
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
