"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function QuadraticEquationsPractice() {
  const [dragonHealth, setDragonHealth] = useState(5);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const problems = [
    { equation: "x^2 - 5x + 6 = 0", solution: "2, 3" },
    { equation: "2x^2 + 3x - 2 = 0", solution: "-2, 0.5" },
    { equation: "x^2 + 7x + 12 = 0", solution: "-3, -4" },
    { equation: "3x^2 - 5x - 2 = 0", solution: "2, -0.333" },
    { equation: "x^2 - 4 = 0", solution: "2, -2" },
  ];

  const checkAnswer = () => {
    const solutions = problems[currentProblem].solution.split(", ").sort();
    const userSolutions = userAnswer.trim().split(",").map(s => s.trim()).sort();
    
    if (JSON.stringify(userSolutions) === JSON.stringify(solutions)) {
      setDragonHealth(dragonHealth - 1);
      setFeedback("Hit! The dragon takes damage!");
      if (dragonHealth - 1 > 0) {
        setCurrentProblem((currentProblem + 1) % problems.length);
        setUserAnswer("");
      }
    } else {
      setDragonHealth(Math.min(dragonHealth + 0.5, 5)); // Heal dragon slightly
      setFeedback("Miss! The dragon heals a bit.");
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary text-center">
            Quadratic Quest: Dragon Slayer
          </h1>
          <p className="text-lg mb-4 text-center">
            Solve quadratic equations to slay the dragon! Dragon Health: {dragonHealth.toFixed(1)}/5
          </p>

          {dragonHealth > 0 ? (
            <div className="max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">
                Solve: <InlineMath math={problems[currentProblem].equation} />
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter solutions (e.g., 2, 3)"
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                onClick={checkAnswer}
                className="w-full bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition duration-300"
              >
                Strike the Dragon
              </button>
              {feedback && <p className="mt-4 text-center">{feedback}</p>}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-primary font-semibold">
                Victory! The dragon is slain!
              </p>
              <button
                onClick={() => {
                  setDragonHealth(5);
                  setCurrentProblem(0);
                  setUserAnswer("");
                  setFeedback("");
                }}
                className="mt-4 bg-accent text-white px-6 py-3 rounded-lg hover:bg-salmon transition duration-300"
              >
                New Quest
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