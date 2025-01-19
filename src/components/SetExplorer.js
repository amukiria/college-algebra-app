"use client";

import React, { useState } from "react";

const SetExplorer = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fetchSetProblem = async () => {
    try {
      setError("");
      const response = await fetch("/api/sets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.data.queryresult);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const exampleQueries = [
    {
      title: "Intersection",
      description: "Find the common elements between two sets.",
      query: "intersection of {1, 2, 3} and {2, 3, 4}",
    },
    {
      title: "Union",
      description: "Combine all unique elements from two sets.",
      query: "union of {1, 2} and {3, 4}",
    },
    {
      title: "Difference",
      description: "Find elements in one set but not the other.",
      query: "difference of {1, 2, 3} and {2, 3, 4}",
    },
  ];

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
          placeholder="Enter your query (e.g., 'intersection of {1, 2} and {2, 3}')"
          className="border p-2 w-full text-primary placeholder-secondary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <button
          className="mt-4 bg-accent text-white px-4 py-2 w-full font-bold hover:bg-blue-600 transition-colors"
          onClick={fetchSetProblem}
        >
          Generate Result
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {result && (
          <div className="mt-4 bg-secondary p-4 rounded text-text">
            <h3 className="text-lg font-bold mb-2">Result:</h3>
            <pre className="bg-primary p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetExplorer;
