"use client";

import React, { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function RationalExpressionsPractice() {
  const [progress, setProgress] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per problem

  const problems = [
    { expression: "\\frac{x^2 - 4}{x + 2}", solution: "x - 2" },
    { expression: "\\frac{2x}{x - 1} \\times \\frac{x - 1}{4}", solution: "\\frac{x}{2}" },
    { expression: "\\frac{x^2 - 9}{x + 3}", solution: "x - 3" },
    { expression: "\\frac{3x}{x + 2} \\times \\frac{x + 2}{6}", solution: "\\frac{x}{2}" },
    { expression: "\\frac{x^2 - 1}{x - 1}", solution: "x + 1" },
  ];

  useEffect(() => {
    if (timeLeft > 0 && progress < 5) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setFeedback("Time’s up! Try again.");
    }
  }, [timeLeft, progress]);

  const checkAnswer = () => {
    if (userAnswer.trim() === problems[currentProblem].solution) {
      setProgress(progress + 1);
      setFeedback("Correct! Move forward!");
      if (progress + 1 < 5) {
        setCurrentProblem(currentProblem + 1);
        setUserAnswer("");
        setTimeLeft(30);
      }
    } else {
      setFeedback("Wrong! Try again.");
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary text-center">
            Fraction Frenzy Race
          </h1>
          <p className="text-lg mb-4 text-center">
            Simplify or multiply 5 rational expressions to win the race! Progress: {progress}/5 | Time Left: {timeLeft}s
          </p>

          {progress < 5 && timeLeft > 0 ? (
            <div className="max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">
                Solve: <InlineMath math={problems[currentProblem].expression} />
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer (e.g., x - 2)"
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                onClick={checkAnswer}
                className="w-full bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition duration-300"
              >
                Submit Answer
              </button>
              {feedback && <p className="mt-4 text-center">{feedback}</p>}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-primary font-semibold">
                {progress === 5 ? "You’ve crossed the finish line!" : "Race over! Time ran out."}
              </p>
              <button
                onClick={() => {
                  setProgress(0);
                  setCurrentProblem(0);
                  setUserAnswer("");
                  setFeedback("");
                  setTimeLeft(30);
                }}
                className="mt-4 bg-accent text-white px-6 py-3 rounded-lg hover:bg-salmon transition duration-300"
              >
                Restart Race
              </button>
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}