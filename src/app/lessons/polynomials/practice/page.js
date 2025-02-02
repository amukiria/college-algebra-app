"use client"; // Ensure this is a Client Component if using React hooks

import { useState } from 'react';
import algebra from 'algebra.js'; // Import algebra.js

export default function PolynomialPuzzle() {
  // State to store user input and results
  const [poly1, setPoly1] = useState('');
  const [poly2, setPoly2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');

  // Function to handle polynomial operations
  const handleOperation = () => {
    try {
      // Parse the polynomials using algebra.js
      const p1 = algebra.parse(poly1);
      const p2 = algebra.parse(poly2);

      let res;
      switch (operation) {
        case 'add':
          res = p1.add(p2); // Add polynomials
          break;
        case 'subtract':
          res = p1.subtract(p2); // Subtract polynomials
          break;
        case 'multiply':
          res = p1.multiply(p2); // Multiply polynomials
          break;
        case 'divide':
          res = p1.divide(p2); // Divide polynomials
          break;
        default:
          res = 'Invalid operation';
      }

      setResult(res.toString()); // Display the result
    } catch (error) {
      setResult('Error: Invalid input or operation');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Polynomial Puzzle Game</h1>
      <p>Enter two polynomials and select an operation to perform.</p>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Polynomial 1:
          <input
            type="text"
            value={poly1}
            onChange={(e) => setPoly1(e.target.value)}
            placeholder="e.g., 3x^2 + 2x + 5"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Polynomial 2:
          <input
            type="text"
            value={poly2}
            onChange={(e) => setPoly2(e.target.value)}
            placeholder="e.g., 4x^2 - 3x + 2"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
      </div>

      <button
        onClick={handleOperation}
        style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Calculate
      </button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}