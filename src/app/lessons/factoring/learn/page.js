"use client"
import React, { useState } from 'react';

export default function FactoringLesson() {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const problems = [
    { id: 1, expression: 'x² - 9', solution: '(x + 3)(x - 3)' },
    { id: 2, expression: '3x² + 6x', solution: '3x(x + 2)' },
    { id: 3, expression: 'x² + 7x + 12', solution: '(x + 3)(x + 4)' },
  ];

  const handleInputChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const checkAnswers = () => {
    const feedbackObj = {};
    problems.forEach((problem) => {
      feedbackObj[problem.id] = answers[problem.id] === problem.solution;
    });
    setFeedback(feedbackObj);
  };

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-6">Lesson: Factoring Expressions</h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy mb-4">What is Factoring?</h2>
        <p className="text-lg">
          Factoring is the process of breaking down an expression into simpler components, called 
          factors, that when multiplied give the original expression.
        </p>
      </section>

      {/* Types of Factoring */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy mb-4">Types of Factoring Techniques</h2>
        <ul className="list-disc ml-8 text-lg">
          <li>Factoring out the Greatest Common Factor (GCF)</li>
          <li>Factoring Trinomials</li>
          <li>Difference of Squares</li>
          <li>Factoring by Grouping</li>
        </ul>
      </section>

      {/* Visual Representation */}
      <section className="mb-8 bg-primary p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-accent mb-4">Visual Example: Factoring a Trinomial</h3>
        <p className="text-lg">
          For example, to factor <code className="bg-lightNeutral p-1 rounded">x² + 5x + 6</code>:
        </p>
        <p className="text-lg mt-2">
          Find two numbers that multiply to 6 and add to 5 → <strong>(2 and 3)</strong>
        </p>
        <div className="p-4 bg-lightNeutral rounded shadow-md mt-4">
          <p className="text-lg"><strong>Factored form:</strong> <code>(x + 2)(x + 3)</code></p>
        </div>
      </section>

      {/* Quick Practice Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-darkNavy mb-4">Quick Practice:</h2>
        <p className="text-lg mb-4">Factor the following expressions:</p>
        <ul className="space-y-4">
          {problems.map((problem) => (
            <li key={problem.id} className="flex flex-col space-y-2">
              <label className="text-lg font-medium">
                {problem.expression}:
              </label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full max-w-md"
                placeholder="Enter your answer"
                onChange={(e) => handleInputChange(problem.id, e.target.value)}
              />
              {feedback[problem.id] !== undefined && (
                <span className={`text-sm ${feedback[problem.id] ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback[problem.id] ? 'Correct!' : 'Incorrect. Try again!'}
                </span>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={checkAnswers}
          className="mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-accentDark transition-colors"
        >
          Check Answers
        </button>
      </section>

      {/* Feedback Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-darkNavy mb-4">Feedback:</h2>
        <p className="text-lg">
          After checking your answers, you'll see feedback here. Keep practicing to master factoring!
        </p>
      </section>
    </div>
  );
}