"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function LinearEquationsPractice() {
  const [keys, setKeys] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const problems = [
    { equation: "2x + 3 = 7", solution: "2" },
    { equation: "5x - 10 = 15", solution: "5" },
    { equation: "3x + 4 = -5", solution: "-3" },
    { equation: "x - 7 = 2", solution: "9" },
    { equation: "4x + 1 = 13", solution: "3" },
  ];

  const checkAnswer = () => {
    if (userAnswer.trim() === problems[currentProblem].solution) {
      setKeys(keys + 1);
      setFeedback("Correct! You found a key!");
      if (keys + 1 < 5) {
        setCurrentProblem(currentProblem + 1);
        setUserAnswer("");
      }
    } else {
      setFeedback("Try again! That’s not the right solution.");
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary text-center">
            Equation Escape Room
          </h1>
          <p className="text-lg mb-4 text-center">
            Solve 5 linear equations to collect keys and escape! Keys: {keys}/5
          </p>

          {keys < 5 ? (
            <div className="max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">
                Solve: <InlineMath math={problems[currentProblem].equation} />
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
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
                Congratulations! You’ve escaped with 5 keys!
              </p>
              <button
                onClick={() => {
                  setKeys(0);
                  setCurrentProblem(0);
                  setUserAnswer("");
                  setFeedback("");
                }}
                className="mt-4 bg-accent text-white px-6 py-3 rounded-lg hover:bg-salmon transition duration-300"
              >
                Play Again
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