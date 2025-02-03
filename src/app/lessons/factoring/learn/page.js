"use client";

import React, { useState } from 'react';

// Reusable ProblemCard Component
const ProblemCard = ({ problem, answer, feedback, hintVisible, onInputChange, onToggleHint }) => {
  return (
    <li className="flex flex-col space-y-2">
      <label className="text-lg font-medium" htmlFor={`problem-${problem.id}`}>
        {problem.expression}:
      </label>
      <input
        type="text"
        id={`problem-${problem.id}`}
        className="p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Enter factored form"
        value={answer || ''}
        onChange={(e) => onInputChange(problem.id, e.target.value)}
        aria-describedby={`hint-${problem.id}`}
      />
      <button
        onClick={() => onToggleHint(problem.id)}
        className="text-sm text-accent hover:text-accentDark underline mt-1 w-fit transition-colors"
        aria-expanded={hintVisible}
        aria-controls={`hint-${problem.id}`}
      >
        {hintVisible ? 'Hide Hint' : 'Show Hint'}
      </button>
      {hintVisible && (
        <span id={`hint-${problem.id}`} className="text-sm text-gray-600">
          Hint: {problem.hint}
        </span>
      )}
      {feedback !== undefined && (
        <span
          className={`text-sm ${feedback ? 'text-green-600' : 'text-red-600'}`}
          role="alert"
        >
          {feedback ? 'Correct!' : 'Incorrect. Try again!'}
        </span>
      )}
    </li>
  );
};

// Helper function to normalize answers
const normalizeAnswer = (answer) => {
  return answer.replace(/\s+/g, '').replace(/[()]/g, '');
};

export default function FactoringLesson() {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hints, setHints] = useState({});

  const problems = [
    { id: 1, expression: 'x² - 9', solution: '(x + 3)(x - 3)', hint: 'Think about the difference of squares.' },
    { id: 2, expression: '3x² + 6x', solution: '3x(x + 2)', hint: 'Factor out the greatest common factor.' },
    { id: 3, expression: 'x² + 7x + 12', solution: '(x + 3)(x + 4)', hint: 'Find two numbers that multiply to 12 and add to 7.' },
  ];

  const handleInputChange = (id, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: value }));
  };

  const checkAnswers = () => {
    const feedbackObj = {};
    problems.forEach((problem) => {
      const normalizedAnswer = normalizeAnswer(answers[problem.id] || '');
      const normalizedSolution = normalizeAnswer(problem.solution);
      feedbackObj[problem.id] = normalizedAnswer === normalizedSolution;
    });
    setFeedback(feedbackObj);
  };

  const resetPractice = () => {
    setAnswers({});
    setFeedback({});
    setHints({});
  };

  const toggleHint = (id) => {
    setHints((prevHints) => ({ ...prevHints, [id]: !prevHints[id] }));
  };

  // Calculate progress
  const totalProblems = problems.length;
  const correctAnswers = Object.values(feedback).filter((val) => val).length;
  const progress = totalProblems > 0 ? Math.round((correctAnswers / totalProblems) * 100) : 0;

  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-6">Lesson: Factoring Expressions</h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy mb-4">What is Factoring?</h2>
        <p className="text-lg">
          Factoring is the process of breaking down an expression into simpler components, called 
          factors, that when multiplied give the original expression. It is an essential skill in algebra 
          that simplifies solving equations and understanding mathematical relationships.
        </p>
      </section>

      {/* Expanded Theory Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-darkNavy mb-4">Factoring Techniques with Examples</h2>

        <h3 className="text-xl font-semibold text-accent mt-4">1. Factoring out the Greatest Common Factor (GCF)</h3>
        <p>
          Identify the largest factor common to all terms in the expression and factor it out.
        </p>
        <p className="mt-2">
          Example: <code>6x² + 9x</code><br />
          - Find GCF of 6 and 9, which is 3.<br />
          - Factor out 3: <strong>3(x² + 3x)</strong>.
        </p>

        <h3 className="text-xl font-semibold text-accent mt-4">2. Factoring Trinomials</h3>
        <p>
          Look for two numbers that multiply to the constant term and add up to the coefficient of the middle term.
        </p>
        <p className="mt-2">
          Example: <code>x² + 5x + 6</code><br />
          - Identify factors of 6 that add up to 5: (2, 3).<br />
          - Factored form: <strong>(x + 2)(x + 3)</strong>.
        </p>

        <h3 className="text-xl font-semibold text-accent mt-4">3. Difference of Squares</h3>
        <p>
          Recognize expressions of the form <code>a² - b²</code>, which factor into <strong>(a + b)(a - b)</strong>.
        </p>
        <p className="mt-2">
          Example: <code>x² - 16</code><br />
          - This is a difference of squares: <strong>(x + 4)(x - 4)</strong>.
        </p>
      </section>

      {/* Quick Practice Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-darkNavy mb-4">Quick Practice:</h2>
        <p className="text-lg mb-4">Factor the following expressions:</p>
        <ul className="space-y-4">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              answer={answers[problem.id]}
              feedback={feedback[problem.id]}
              hintVisible={hints[problem.id]}
              onInputChange={handleInputChange}
              onToggleHint={toggleHint}
            />
          ))}
        </ul>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 bg-accent text-white rounded hover:bg-accentDark transition-colors w-fit"
          >
            Check Answers
          </button>
          <button
            onClick={resetPractice}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors w-fit"
          >
            Reset Practice
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            Progress: {correctAnswers} out of {totalProblems} correct ({progress}%)
          </p>
        </div>
      </section>
    </div>
  );
}