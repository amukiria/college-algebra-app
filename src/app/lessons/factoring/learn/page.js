"use client";

import React, { useState } from 'react';

export default function FactoringLesson() {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hintsVisible, setHintsVisible] = useState({});

  const problems = [
    { id: 1, expression: 'x² - 9', solution: ['(x + 3)(x - 3)', '(x - 3)(x + 3)'], hint: 'Think of the difference of squares.' },
    { id: 2, expression: '3x² + 6x', solution: ['3x(x + 2)', '(x + 2)3x'], hint: 'Factor out the greatest common factor (GCF).' },
    { id: 3, expression: 'x² + 7x + 12', solution: ['(x + 3)(x + 4)', '(x + 4)(x + 3)'], hint: 'Find two numbers that multiply to 12 and add to 7.' },
  ];

  const handleInputChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const normalize = (str) => {
    return str.replace(/\s+/g, '').replace(/[\(\)]/g, '');
  };

  const checkAnswers = () => {
    const feedbackObj = {};
    problems.forEach((problem) => {
      const userAnswer = normalize(answers[problem.id] || "");
      const correctAnswers = problem.solution.map(sol => normalize(sol));
      
      feedbackObj[problem.id] = correctAnswers.includes(userAnswer);
    });
    setFeedback(feedbackObj);
  };

  const toggleHint = (id) => {
    setHintsVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetPractice = () => {
    setAnswers({});
    setFeedback({});
    setHintsVisible({});
  };

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-6">Lesson: Factoring Expressions</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-darkNavy mb-4">Quick Practice:</h2>
        <p className="text-lg mb-4">Factor the following expressions:</p>
        <ul className="space-y-4">
          {problems.map((problem) => (
            <li key={problem.id} className="flex flex-col space-y-2">
              <label className="text-lg font-medium">{problem.expression}:</label>

              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full max-w-md"
                placeholder="Enter factored form, e.g., (x + 2)(x + 3)"
                value={answers[problem.id] || ""}
                onChange={(e) => handleInputChange(problem.id, e.target.value)}
              />

              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => toggleHint(problem.id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {hintsVisible[problem.id] ? "Hide Hint" : "Show Hint"}
                </button>

                {feedback[problem.id] !== undefined && (
                  <span className={`text-sm ${feedback[problem.id] ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback[problem.id] ? 'Correct!' : 'Incorrect. Try again!'}
                  </span>
                )}
              </div>

              {hintsVisible[problem.id] && (
                <p className="text-sm text-gray-600 bg-lightNeutral p-2 rounded mt-1">{problem.hint}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 bg-accent text-white rounded hover:bg-accentDark transition-colors"
          >
            Check Answers
          </button>

          <button
            onClick={resetPractice}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset Practice
          </button>
        </div>
      </section>
    </div>
  );
}
