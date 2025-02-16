"use client";

import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

// Helper function to normalize answers
const normalizeAnswer = (answer) => {
  return answer.replace(/\s+/g, '').replace(/[()]/g, '');
};

// Animated Step Component
const AnimatedStep = ({ step, index }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 300);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="text-sm text-gray-700">
        Step {index + 1}: {step}
      </span>
    </div>
  );
};

// ProblemCard Component (for Practice Mode)
const ProblemCard = ({
  problem,
  answer,
  feedback,
  hintVisible,
  showSolution,
  onInputChange,
  onToggleHint,
  onToggleSolution,
}) => {
  return (
    <li className="flex flex-col space-y-2 mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <label className="text-lg font-medium" htmlFor={`problem-${problem.id}`}>
          {problem.expression}:
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleSolution(problem.id)}
            className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            {showSolution ? 'Hide Solution' : 'Show Steps'}
          </button>
        </div>
      </div>

      <input
        type="text"
        id={`problem-${problem.id}`}
        className="p-2 border border-gray-300 rounded w-full max-w-md"
        placeholder="Enter factored form"
        value={answer || ''}
        onChange={(e) => onInputChange(problem.id, e.target.value)}
      />

      <div className="space-y-2">
        {problem.hint && (
          <button
            onClick={() => onToggleHint(problem.id)}
            className="text-sm text-coral bg-lightNeutral px-2 py-1 rounded hover:bg-salmon hover:text-white transition-colors mt-1 w-fit"
          >
            {hintVisible ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}

        {hintVisible && problem.hint && (
          <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
            {problem.hint}
          </div>
        )}

        {showSolution && problem.steps && (
          <div className="mt-4 space-y-2 border-t pt-4">
            <h4 className="font-medium text-gray-800">Solution Steps:</h4>
            {problem.steps.map((step, index) => (
              <AnimatedStep key={index} step={step} index={index} />
            ))}
          </div>
        )}

        {feedback !== undefined && (
          <div
            className={`text-sm mt-2 p-2 rounded ${
              feedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback ? '✓ Correct!' : '✗ Incorrect. Try again!'}
          </div>
        )}
      </div>
    </li>
  );
};

// Solver Mode Component
const SolverMode = ({ onSolve }) => {
  const [expression, setExpression] = useState('');
  const [solutionInput, setSolutionInput] = useState('');
  const [solutionSteps, setSolutionSteps] = useState(null);
  const [error, setError] = useState('');

  const handleSolve = () => {
    if (!expression.trim()) {
      setError('Please enter a valid expression.');
      return;
    }
    if (!solutionInput.trim()) {
      setError('Please enter the solution.');
      return;
    }
    setError('');
    const steps = [
      `Input expression: ${expression}`,
      'Step 1: Identify the type of expression (e.g., quadratic, difference of squares).',
      'Step 2: Apply the appropriate factoring technique.',
      'Step 3: Simplify and write the factored form.',
    ];
    setSolutionSteps({ steps });
    onSolve(expression, solutionInput, steps);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Solver Mode</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter an expression to factor (e.g., x² - 9)"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Enter the factored solution (e.g., (x+3)(x-3))"
          value={solutionInput}
          onChange={(e) => setSolutionInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSolve}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          Solve
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {solutionSteps && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-gray-800">Solution Steps:</h4>
            {solutionSteps.steps.map((step, index) => (
              <AnimatedStep key={index} step={step} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function FactoringSolver() {
  const [mode, setMode] = useState('practice');
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hints, setHints] = useState({});
  const [customProblems, setCustomProblems] = useState([]);
  const [shownSolutionId, setShownSolutionId] = useState(null);

  useEffect(() => {
    document.title = 'Factoring Expressions - Practice';
  }, []);

  const baseProblems = [
    {
      id: 1,
      expression: 'x² - 9',
      solution: '(x+3)(x-3)',
      hint: 'Think about the difference of squares.',
      steps: [
        'Recognize the expression as a difference of squares: a² - b²',
        'Identify a = x and b = 3',
        'Apply formula: (a + b)(a - b) → (x + 3)(x - 3)',
      ],
    },
    {
      id: 2,
      expression: '3x² + 6x',
      solution: '3x(x+2)',
      hint: 'Factor out the greatest common factor.',
      steps: [
        'Identify the GCF of 3x² and 6x, which is 3x',
        'Factor out 3x: 3x(x+2)',
      ],
    },
    {
      id: 3,
      expression: 'x² + 7x + 12',
      solution: '(x+3)(x+4)',
      hint: 'Find two numbers that multiply to 12 and add to 7.',
      steps: [
        'Find factors of 12: (1,12), (2,6), (3,4)',
        'Identify the pair that adds to 7: (3,4)',
        'Write the factored form: (x+3)(x+4)',
      ],
    },
  ];

  const allProblems = [...baseProblems, ...customProblems];

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswers = () => {
    const feedbackObj = {};
    allProblems.forEach((problem) => {
      const normalizedAnswer = normalizeAnswer(answers[problem.id] || '');
      const normalizedSolution = normalizeAnswer(problem.solution);
      feedbackObj[problem.id] = normalizedAnswer === normalizedSolution;
    });
    setFeedback(feedbackObj);
  };

  const toggleHint = (id) => {
    setHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id) => {
    setShownSolutionId(shownSolutionId === id ? null : id);
  };

  const resetPractice = () => {
    setAnswers({});
    setFeedback({});
    setHints({});
    setShownSolutionId(null);
  };

  const handleAddCustomProblem = (expression, solution, steps) => {
    const newProblem = {
      id: Date.now(),
      expression,
      solution,
      steps,
      hint: 'Custom problem - check your solution steps.',
    };
    setCustomProblems((prev) => [...prev, newProblem]);
  };

  const totalProblems = allProblems.length;
  const correctAnswers = Object.values(feedback).filter((val) => val).length;
  const progress = totalProblems > 0 ? Math.round((correctAnswers / totalProblems) * 100) : 0;

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Factoring Expressions - Practice</h1>

          <div className="mb-8 flex space-x-4">
            <button
              onClick={() => setMode('practice')}
              className={`px-4 py-2 rounded transition-colors ${
                mode === 'practice' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => setMode('solver')}
              className={`px-4 py-2 rounded transition-colors ${
                mode === 'solver' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Solver Mode
            </button>
          </div>

          {mode === 'practice' ? (
            <>
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Practice Problems:</h2>
                <ul className="space-y-4">
                  {allProblems.map((problem) => (
                    <ProblemCard
                      key={problem.id}
                      problem={problem}
                      answer={answers[problem.id]}
                      feedback={feedback[problem.id]}
                      hintVisible={hints[problem.id]}
                      showSolution={shownSolutionId === problem.id}
                      onInputChange={handleInputChange}
                      onToggleHint={toggleHint}
                      onToggleSolution={toggleSolution}
                    />
                  ))}
                </ul>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={checkAnswers}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Check Answers
                  </button>
                  <button
                    onClick={resetPractice}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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
            </>
          ) : (
            <SolverMode onSolve={(expr, sol, steps) => handleAddCustomProblem(expr, sol, steps)} />
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
