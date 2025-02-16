"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function SetsPractice() {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [result, setResult] = useState("");
  const [vennData, setVennData] = useState([
    { sets: ["A"], size: 0 },
    { sets: ["B"], size: 0 },
    { sets: ["A", "B"], size: 0 },
  ]);
  const [operation, setOperation] = useState("");
  const [cardinalityA, setCardinalityA] = useState(0);
  const [cardinalityB, setCardinalityB] = useState(0);

  const updateVennDiagram = (newData) => {
    const vennElement = d3.select("#venn");
    if (!vennElement.node()) {
      console.warn("Venn diagram container not found.");
      return;
    }
    vennElement.selectAll("*").remove(); // Clear previous diagram
    const chart = venn.VennDiagram().width(400).height(400);
    vennElement
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  const handleIntersection = () => {
    const intersection = [...new Set(setA)].filter((x) => setB.includes(x));
    setResult(`Intersection: {${intersection.join(", ")}}`);
    setOperation("Intersection");
    const data = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: intersection.length },
    ];
    setVennData(data);
    updateVennDiagram(data);
  };

  const handleUnion = () => {
    const union = [...new Set([...setA, ...setB])];
    setResult(`Union: {${union.join(", ")}}`);
    setOperation("Union");
    const data = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: union.length },
    ];
    setVennData(data);
    updateVennDiagram(data);
  };

  const handleDifference = () => {
    const difference = [...new Set(setA)].filter((x) => !setB.includes(x));
    setResult(`Difference (A - B): {${difference.join(", ")}}`);
    setOperation("Difference");
    const data = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: difference.length },
    ];
    setVennData(data);
    updateVennDiagram(data);
  };

  const resetVennDiagram = () => {
    setSetA([]);
    setSetB([]);
    setResult("");
    setOperation("");
    setCardinalityA(0);
    setCardinalityB(0);
    const resetData = [
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ];
    setVennData(resetData);
    updateVennDiagram(resetData);
  };

  useEffect(() => {
    const initialData = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: [...new Set(setA)].filter((x) => setB.includes(x)).length },
    ];
    setVennData(initialData);
    updateVennDiagram(initialData);
  }, [setA, setB]);

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

  return (
    <>
      <SignedIn>
        <div className="container mx-auto p-8 bg-background min-h-screen text-text">
          <h1 className="text-5xl font-bold text-primary text-center mb-12">
            Practice: Sets Explorer
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Enter Set A (comma separated):
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    const newSetA = e.target.value
                      .split(",")
                      .map((item) => parseInt(item.trim()))
                      .filter((item) => !isNaN(item));
                    setSetA(newSetA);
                    setCardinalityA(newSetA.length);
                  }}
                  className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="e.g., 1, 2, 3"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Enter Set B (comma separated):
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    const newSetB = e.target.value
                      .split(",")
                      .map((item) => parseInt(item.trim()))
                      .filter((item) => !isNaN(item));
                    setSetB(newSetB);
                    setCardinalityB(newSetB.length);
                  }}
                  className="w-full p-3 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="e.g., 4, 5, 6"
                />
              </div>
            </div>
            {/* Button Section */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button
                  onClick={handleIntersection}
                  className="bg-accent text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Intersection
                </button>
                <button
                  onClick={handleUnion}
                  className="bg-accent text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Union
                </button>
                <button
                  onClick={handleDifference}
                  className="bg-accent text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Difference (A - B)
                </button>
                <button
                  onClick={resetVennDiagram}
                  className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-500 transition-colors"
                >
                  Reset
                </button>
              </div>
              {result && (
                <div className="mt-4 p-6 bg-primary rounded-lg shadow-lg text-white text-center">
                  <p className="text-xl">{result}</p>
                </div>
              )}
            </div>
          </div>

          {/* Venn Diagram Container */}
          <div id="venn" className="flex justify-center mb-12"></div>

          {/* Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-secondary rounded-lg shadow">
              <p className="font-semibold text-lg">Cardinality of A:</p>
              <p className="text-2xl">{cardinalityA}</p>
            </div>
            <div className="p-6 bg-secondary rounded-lg shadow">
              <p className="font-semibold text-lg">Cardinality of B:</p>
              <p className="text-2xl">{cardinalityB}</p>
            </div>
          </div>

          {/* Power Set Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Power Set</h2>
            <div className="space-y-4">
              <p className="font-semibold">Power Set of A: {JSON.stringify(powerSet(setA))}</p>
              <p className="font-semibold">Power Set of B: {JSON.stringify(powerSet(setB))}</p>
            </div>
          </div>

          {/* Navigation Button */}
          <div className="flex justify-center">
            <Link href="/lessons/sets/practice-2">
              <button className="bg-accent text-white px-8 py-4 rounded-lg shadow hover:bg-blue-600 transition-colors">
                Set Explorer 2 - 3 Sets
              </button>
            </Link>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
