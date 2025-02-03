"use client"; // Ensure this is a Client Component if using React hooks

import { useState } from 'react';
import algebra from 'algebra.js'; // Import algebra.js

export default function PolynomialPuzzle() {
  // State to store user input, results, and history
  const [poly1, setPoly1] = useState('');
  const [poly2, setPoly2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]); // To store operation history
  const [error, setError] = useState(''); // To display errors

  // Function to handle polynomial operations
  const handleOperation = () => {
    setError(''); // Clear previous errors
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
          // Check if the divisor is a constant (number or fraction)
          if (p2.terms.length === 1 && p2.terms[0].variables.length === 0) {
            res = p1.divide(p2); // Divide by a constant
          } else {
            throw new Error('Polynomial division is only supported for constants (e.g., 2, 3x^0).');
          }
          break;
        default:
          throw new Error('Invalid operation selected.');
      }

      // Update result and history
      setResult(res.toString());
      setHistory([...history, { poly1, poly2, operation, result: res.toString() }]);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setResult('');
    }
  };

  // Function to validate polynomial input
  const validateInput = () => {
    if (!poly1 || !poly2) {
      setError('Please enter both polynomials.');
      return false;
    }
    return true;
  };

  // Function to reset all fields
  const resetFields = () => {
    setPoly1('');
    setPoly2('');
    setOperation('add');
    setResult('');
    setError('');
    setHistory([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Polynomial Puzzle Game</h1>
      <p>Enter two polynomials and select an operation to perform.</p>

      {/* Input fields for polynomials */}
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

      {/* Operation selection */}
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

      {/* Buttons for Calculate and Reset */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => {
            if (validateInput()) handleOperation();
          }}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
        >
          Calculate
        </button>
        <button
          onClick={resetFields}
          style={{ padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Reset
        </button>
      </div>

      {/* Display errors */}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Display result */}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}

      {/* Display history of operations */}
      {history.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Operation History:</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <strong>Operation {index + 1}:</strong> {entry.poly1} {entry.operation} {entry.poly2} = {entry.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}