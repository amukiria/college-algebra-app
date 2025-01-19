"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

// Attach d3 globally if required
if (typeof window !== "undefined") {
  window.d3 = d3;
}

const SetExplorer = () => {
  const [query, setQuery] = useState("");
  const [chartData, setChartData] = useState([
    { sets: ["A"], size: 3 },
    { sets: ["B"], size: 3 },
    { sets: ["A", "B"], size: 2 },
  ]);

  const exampleQueries = [
    {
      title: "Intersection",
      description: "Find the common elements between two sets.",
      query: "intersection of {1, 2, 3} and {2, 3, 4}",
    },
    {
      title: "Union",
      description: "Combine all unique elements from two sets.",
      query: "union of {1, 2, 3} and {3, 4, 5}",
    },
    {
      title: "Difference",
      description: "Find elements in one set but not the other.",
      query: "difference of {1, 2, 3} and {2, 3, 4}",
    },
  ];

  const fetchSetProblem = async () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([2, 3, 4]);

    const intersection = [...setA].filter((x) => setB.has(x)).length;
    const onlyInA = [...setA].filter((x) => !setB.has(x)).length;
    const onlyInB = [...setB].filter((x) => !setA.has(x)).length;

    setChartData([
      { sets: ["A"], size: onlyInA },
      { sets: ["B"], size: onlyInB },
      { sets: ["A", "B"], size: intersection },
    ]);
  };

  useEffect(() => {
    const chart = venn.VennDiagram().width(400).height(400);

    // Render the Venn diagram
    d3.select("#venn").datum(chartData).call(chart);

    // Add interactivity
    d3.selectAll("#venn .venn-circle path")
      .style("stroke", "#000")
      .style("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill-opacity", 0.5);
        d3.select("#tooltip")
          .style("visibility", "visible")
          .text(`${d.sets.join(" ∩ ")}: ${d.size}`);
      })
      .on("mouseout", function () {
        d3.select(this).style("fill-opacity", 0.3);
        d3.select("#tooltip").style("visibility", "hidden");
      });
  }, [chartData]);

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-accent">Master Sets in Algebra</h1>
        <p className="mt-4 text-lg">
          Explore operations like Intersection, Union, and Difference with interactive examples.
        </p>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {exampleQueries.map((example, index) => (
          <div
            key={index}
            onClick={() => setQuery(example.query)}
            className="p-6 bg-primary rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-accent">{example.title}</h3>
            <p className="mt-2">{example.description}</p>
            <button className="mt-4 bg-accent text-white px-4 py-2 rounded">
              Try It
            </button>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="bg-primary p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-accent">Custom Query</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query (e.g., 'intersection of {1, 2, 3} and {2, 3, 4}')"
          className="border p-2 w-full text-primary placeholder-secondary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <button
          className="mt-4 bg-accent text-white px-4 py-2 w-full font-bold hover:bg-blue-600 transition-colors"
          onClick={fetchSetProblem}
        >
          Compute Result
        </button>
      </div>

      {/* Tooltip for Interactivity */}
      <div
        id="tooltip"
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          visibility: "hidden",
        }}
      ></div>

      {/* Venn Diagram */}
      <div id="venn" className="mt-12"></div>
    </div>
  );
};

export default SetExplorer;
