"use client";

import React, { useState } from 'react';

const SetExplorer = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchSetProblem = async () => {
    try {
      setError('');
      const response = await fetch('/api/sets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.data.queryresult);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-primary min-h-screen text-text flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-accent">Set Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a query (e.g., 'intersection of {1, 2, 3} and {2, 3, 4}')"
        className="border p-2 mb-4 w-full max-w-md text-primary placeholder-secondary focus:outline-none focus:ring focus:ring-accent"
      />
      <button
        className="bg-accent text-white px-4 py-2 w-full max-w-md font-bold hover:bg-blue-600 transition-colors"
        onClick={fetchSetProblem}
      >
        Generate Problem
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-4 bg-secondary p-4 rounded text-text w-full max-w-md">
          <h2 className="text-lg font-bold mb-2">Result:</h2>
          <pre className="bg-primary p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SetExplorer;
