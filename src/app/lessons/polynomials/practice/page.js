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

  // Helper function to remove leading zeros from a polynomial
  const removeLeadingZeros = (poly) => {
    let i = 0;
    while (i < poly.length && poly[i] === 0) i++;
    return poly.slice(i);
  };

  // Polynomial long division function
  const polynomialLongDivision = (dividend, divisor) => {
    dividend = removeLeadingZeros(dividend);
    divisor = removeLeadingZeros(divisor);

    if (divisor.length === 0) throw new Error('Division by zero polynomial.');

    const degreeDividend = dividend.length - 1;
    const degreeDivisor = divisor.length - 1;

    if (degreeDivisor > degreeDividend) {
      return { quotient: [0], remainder: dividend };
    }

    let quotient = new Array(degreeDividend - degreeDivisor + 1).fill(0);
    let remainder = [...dividend];

    for (let i = 0; i <= degreeDividend - degreeDivisor; i++) {
      const coeff = remainder[i] / divisor[0];
      quotient[i] = coeff;

      for (let j = 0; j <= degreeDivisor; j++) {
        remainder[i + j] -= coeff * divisor[j];
      }
    }

    quotient = removeLeadingZeros(quotient);
    remainder = removeLeadingZeros(remainder);

    return { quotient, remainder };
  };

  // Function to parse a polynomial string into an array of coefficients
  const parsePolynomial = (polyStr) => {
    const terms = polyStr.split(/(?=[+-])/); // Split into individual terms
    const degree = Math.max(
      ...terms.map((term) => {
        const match = term.match(/x\^(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
    );

    const coefficients = new Array(degree + 1).fill(0);

    terms.forEach((term) => {
      const match = term.match(/([-+]?\d*)x\^(\d+)/);
      if (match) {
        const coeff = match[1] === '-' || match[1] === '+' || match[1] === '' ? parseInt(match[1] + '1', 10) : parseInt(match[1], 10);
        const power = parseInt(match[2], 10);
        coefficients[degree - power] = coeff;
      } else if (term.match(/\d+/)) {
        coefficients[degree] = parseInt(term, 10);
      }
    });

    return coefficients;
  };

  // Function to format a coefficient array into a polynomial string
  const formatPolynomial = (coefficients) => {
    return coefficients
      .map((coeff, index) => {
        const power = coefficients.length - 1 - index;
        if (coeff === 0) return '';
        return `${coeff > 0 && index !== 0 ? '+' : ''}${coeff !== 1 && coeff !== -1 ? coeff : coeff === -1 ? '-' : ''}${power > 0 ? 'x' : ''}${power > 1 ? `^${power}` : ''}`;
      })
      .filter((term) => term !== '')
      .join('') || '0';
  };

  // Function to handle polynomial operations
  const handleOperation = () => {
    setError(''); // Clear previous errors
    try {
      if (operation === 'divide') {
        // Parse polynomials into coefficient arrays
        const dividend = parsePolynomial(poly1);
        const divisor = parsePolynomial(poly2);

        // Perform polynomial long division
        const { quotient, remainder } = polynomialLongDivision(dividend, divisor);

        // Format the result
        const quotientStr = formatPolynomial(quotient);
        const remainderStr = formatPolynomial(remainder);
        const res = `Quotient: ${quotientStr}, Remainder: ${remainderStr}`;

        // Update result and history
        setResult(res);
        setHistory([...history, { poly1, poly2, operation, result: res }]);
      } else {
        // Use algebra.js for other operations
        const p1 = algebra.parse(poly1);
        const p2 = algebra.parse(poly2);

        let res;
        switch (operation) {
          case 'add':
            res = p1.add(p2);
            break;
          case 'subtract':
            res = p1.subtract(p2);
            break;
          case 'multiply':
            res = p1.multiply(p2);
            break;
          default:
            throw new Error('Invalid operation selected.');
        }

        // Update result and history
        setResult(res.toString());
        setHistory([...history, { poly1, poly2, operation, result: res.toString() }]);
      }
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
    <div className="p-6 font-sans bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Polynomial Puzzle Game</h1>
      <p className="text-center mb-6 text-lg">Enter two polynomials and select an operation to perform.</p>

      {/* Input fields for polynomials */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Polynomial 1:</label>
        <input
          type="text"
          value={poly1}
          onChange={(e) => setPoly1(e.target.value)}
          placeholder="e.g., 3x^2 + 2x + 5"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Polynomial 2:</label>
        <input
          type="text"
          value={poly2}
          onChange={(e) => setPoly2(e.target.value)}
          placeholder="e.g., 4x^2 - 3x + 2"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Operation selection */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Operation:</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>

      {/* Buttons for Calculate and Reset */}
      <div className="mb-4">
        <button
          onClick={() => {
            if (validateInput()) handleOperation();
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg mr-3 hover:bg-blue-700"
        >
          Calculate
        </button>
        <button
          onClick={resetFields}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reset
        </button>
      </div>

      {/* Display errors */}
      {error && (
        <div className="text-red-600 mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Display result */}
      {result && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Result:</h2>
          <p>{result}</p>
        </div>
      )}

      {/* Display history of operations */}
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Operation History:</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="mb-2">
                <strong>Operation {index + 1}:</strong> {entry.poly1} {entry.operation} {entry.poly2} = {entry.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
