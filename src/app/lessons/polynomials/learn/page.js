"use client"; // Marks the component as a Client Component in Next.js for client-side interactivity.

import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import Latex from "react-latex"; // Import react-latex for rendering mathematical expressions

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PolynomialsLesson() {
  // Function to calculate the value of the polynomial y = x² - 2x + 1
  const calculatePolynomial = (x) => x * x - 2 * x + 1;

  // Data for the polynomial graph
  const polynomialData = {
    labels: [-3, -2, -1, 0, 1, 2, 3], // x-values
    datasets: [
      {
        label: "y = x² - 2x + 1", // Label for the dataset (displayed in the legend)
        data: [-3, -2, -1, 0, 1, 2, 3].map(calculatePolynomial), // y-values calculated using the polynomial function
        borderColor: "rgba(255, 99, 132, 1)", // Color of the line
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color under the line
        borderWidth: 2, // Thickness of the line
        pointRadius: 3, // Size of the data points
      },
    ],
  };

  // Chart options
  const polynomialOptions = {
    responsive: true, // Makes the chart responsive to container size
    plugins: {
      legend: { display: true, position: "top" }, // Displays the legend at the top
    },
    scales: {
      x: { title: { display: true, text: "x-values" } }, // Adds a title to the x-axis
      y: { title: { display: true, text: "y-values" } }, // Adds a title to the y-axis
    },
  };

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      {/* Lesson Title */}
      <h1 className="text-4xl font-bold text-accent mb-6">Comprehensive Lesson: Polynomials</h1>

      {/* What is a Polynomial? */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy">What is a Polynomial?</h2>
        <p>
          A polynomial is an algebraic expression consisting of variables, coefficients, and exponents. The variables
          must have non-negative integer exponents, and the coefficients are real numbers. Polynomials are used to
          model a wide range of mathematical and real-world problems.
        </p>
        <p>
          <strong>General Form:</strong>{" "}
          <Latex>{"$P(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_1x + a_0$"}</Latex>
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Variables:</strong> Represented by letters (e.g., <Latex>{"$x$"}</Latex>).
          </li>
          <li>
            <strong>Coefficients:</strong> The numbers multiplying the variables (e.g., <Latex>{"$a_n$"}</Latex>).
          </li>
          <li>
            <strong>Degree:</strong> The highest exponent of the variable (e.g., <Latex>{"$n$"}</Latex>).
          </li>
        </ul>
      </div>

      {/* Types of Polynomials */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy">Types of Polynomials</h2>
        <p>Polynomials are classified based on the number of terms and their degree:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Monomial:</strong> A single-term polynomial (e.g., <Latex>{"$3x$"}</Latex>).
          </li>
          <li>
            <strong>Binomial:</strong> A two-term polynomial (e.g., <Latex>{"$x^2 + 3x$"}</Latex>).
          </li>
          <li>
            <strong>Trinomial:</strong> A three-term polynomial (e.g., <Latex>{"$x^3 - 2x + 5$"}</Latex>).
          </li>
          <li>
            <strong>Degree-Based Classification:</strong>
            <ul className="list-disc ml-6">
              <li>
                <strong>Constant Polynomial:</strong> Degree 0 (e.g., <Latex>{"$5$"}</Latex>).
              </li>
              <li>
                <strong>Linear Polynomial:</strong> Degree 1 (e.g., <Latex>{"$2x + 3$"}</Latex>).
              </li>
              <li>
                <strong>Quadratic Polynomial:</strong> Degree 2 (e.g., <Latex>{"$x^2 - 4x + 4$"}</Latex>).
              </li>
              <li>
                <strong>Cubic Polynomial:</strong> Degree 3 (e.g., <Latex>{"$x^3 + 3x^2 - x - 3$"}</Latex>).
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Operations on Polynomials */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy">Operations on Polynomials</h2>
        <p>Polynomials can be added, subtracted, multiplied, and divided using specific rules:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Addition:</strong> Combine like terms (e.g.,{" "}
            <Latex>{"$(3x^2 + 2x) + (x^2 - x) = 4x^2 + x$"}</Latex>).
          </li>
          <li>
            <strong>Subtraction:</strong> Subtract like terms (e.g.,{" "}
            <Latex>{"$(3x^2 + 2x) - (x^2 - x) = 2x^2 + 3x$"}</Latex>).
          </li>
          <li>
            <strong>Multiplication:</strong> Use the distributive property (e.g.,{" "}
            <Latex>{"$(x + 2)(x - 3) = x^2 - x - 6$"}</Latex>).
          </li>
          <li>
            <strong>Division:</strong> Use long division or synthetic division (e.g., divide{" "}
            <Latex>{"$x^2 - 5x + 6$"}</Latex> by <Latex>{"$x - 2$"}</Latex>).
          </li>
        </ul>
      </div>

      {/* Graphing Polynomials */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy">Graphing Polynomials</h2>
        <p>
          Polynomials can be graphed to visualize their behavior. The graph of a polynomial function is a smooth,
          continuous curve. Key features of polynomial graphs include:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Roots/Zeros:</strong> The x-values where the polynomial equals zero (i.e., where the graph crosses
            the x-axis).
          </li>
          <li>
            <strong>End Behavior:</strong> How the graph behaves as <Latex>{"$x$"}</Latex> approaches{" "}
            <Latex>{"$\\infty$"}</Latex> or <Latex>{"$-\\infty$"}</Latex>.
          </li>
          <li>
            <strong>Turning Points:</strong> Points where the graph changes direction (local maxima or minima).
          </li>
        </ul>
        <p>Below is a graph for the quadratic polynomial <Latex>{"$y = x^2 - 2x + 1$"}</Latex>:</p>
        <div className="mt-6">
          <Line data={polynomialData} options={polynomialOptions} />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          * Note: Graphing polynomials will be covered in a subsequent lesson.
        </p>
      </div>

      {/* Factoring Polynomials */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy">Factoring Polynomials</h2>
        <p>
          Factoring is the process of breaking down a polynomial into simpler polynomials (factors) that, when
          multiplied, give the original polynomial. Common factoring techniques include:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Greatest Common Factor (GCF):</strong> Factor out the largest common term.
          </li>
          <li>
            <strong>Factoring Trinomials:</strong> Find two binomials that multiply to give the original trinomial.
          </li>
          <li>
            <strong>Difference of Squares:</strong> Factor expressions like <Latex>{"$a^2 - b^2$"}</Latex> into{" "}
            <Latex>{"$(a - b)(a + b)$"}</Latex>.
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          * Note: Factoring will be covered in a subsequent lesson.
        </p>
      </div>

      {/* Conclusion and Practice Polynomials Button */}
      <div className="mt-8 text-center">
        <a href="/lessons/polynomials/practice">
          <button className="bg-accent text-white py-2 px-6 rounded-full hover:bg-hover transition">
            Practice Polynomials
          </button>
        </a>
      </div>
    </div>
  );
}
