"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import Link from 'next/link';

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
  const [operation, setOperation] = useState("");
  const [cardinalityA, setCardinalityA] = useState(0);
  const [cardinalityB, setCardinalityB] = useState(0);

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
    let intersection = [...new Set(setA)].filter((x) => new Set(setB).has(x));
    setResult(`Intersection: {${intersection.join(", ")}}`);
    setOperation("Intersection");

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

  const handleUnion = () => {
    let union = [...new Set([...setA, ...setB])];
    setResult(`Union: {${union.join(", ")}}`);
    setOperation("Union");

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

  const handleDifference = () => {
    let difference = [...new Set(setA)].filter((x) => !new Set(setB).has(x));
    setResult(`Difference (A - B): {${difference.join(", ")}}`);
    setOperation("Difference");

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

  const resetVennDiagram = () => {
    setSetA([]);
    setSetB([]);
    setResult("");
    setOperation("");
    setCardinalityA(0);
    setCardinalityB(0);
    setVennData([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ]);
    setHoveredSet({ sets: "", elements: [] });
    setOperation("");
    updateVennDiagram([
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ]);
  };

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
          onChange={(e) => {
            const newSetA = e.target.value.split(",").map((item) => parseInt(item.trim()));
            setSetA(newSetA);
            setCardinalityA(newSetA.length);
          }}
          className="p-2 border rounded mb-4"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Set B (comma separated):</label>
        <input
          type="text"
          onChange={(e) => {
            const newSetB = e.target.value.split(",").map((item) => parseInt(item.trim()));
            setSetB(newSetB);
            setCardinalityB(newSetB.length);
          }}
          className="p-2 border rounded mb-4"
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

      <div className="mt-4">
        <p><strong>Cardinality of A: </strong>{cardinalityA}</p>
        <p><strong>Cardinality of B: </strong>{cardinalityB}</p>
        <p><strong>Power Set of A: </strong>{JSON.stringify(powerSet(setA))}</p>
        <p><strong>Power Set of B: </strong>{JSON.stringify(powerSet(setB))}</p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/set-practice-2" passHref>
          <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Set Explorer 2 - 3 Sets
          </button>
        </Link>
      </div>
    </div>
  );

  function powerSet(set) {
    const result = [[]];
    for (const value of set) {
      const currentLength = result.length;
      for (let i = 0; i < currentLength; i++) {
        result.push([...result[i], value]);
      }
    }
    return result;
  }
}
