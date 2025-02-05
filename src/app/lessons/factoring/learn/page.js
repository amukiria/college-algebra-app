"use client";

import React from 'react';

export default function FactoringLesson() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Factoring Expressions - Theory Lesson</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">What is Factoring?</h2>
        <p className="text-lg text-gray-600">
          Factoring is the process of breaking down an expression into simpler components, called
          factors, which when multiplied together give the original expression.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Common Factoring Techniques</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li><strong>Factoring out the Greatest Common Factor (GCF):</strong> Identify and factor out the largest common factor.</li>
          <li><strong>Difference of Squares:</strong> Applies to expressions like <code>a² - b²</code>, factored as <code>(a + b)(a - b)</code>.</li>
          <li><strong>Trinomial Factoring:</strong> Factoring quadratic expressions like <code>ax² + bx + c</code>.</li>
          <li><strong>Factoring by Grouping:</strong> Used for polynomials with four or more terms by grouping and factoring common terms.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step-by-Step Example</h2>
        <p className="text-lg text-gray-600">Let's factor the expression <code>x² + 5x + 6</code>:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 mt-2">
          <li>Identify two numbers that multiply to 6 (constant term) and add up to 5 (coefficient of <code>x</code>).</li>
          <li>The numbers are <strong>2 and 3</strong>.</li>
          <li>Rewrite the expression: <code>x² + 2x + 3x + 6</code>.</li>
          <li>Group terms: <code>(x² + 2x) + (3x + 6)</code>.</li>
          <li>Factor out common terms: <code>x(x + 2) + 3(x + 2)</code>.</li>
          <li>Final factored form: <code>(x + 2)(x + 3)</code>.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why is Factoring Important?</h2>
        <p className="text-lg text-gray-600">
          Factoring is essential for solving quadratic equations, simplifying expressions, and understanding polynomial functions.
        </p>
      </section>
    </div>
  );
}
