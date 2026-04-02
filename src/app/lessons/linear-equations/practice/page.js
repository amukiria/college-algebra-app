"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

function KeyIcon({ filled }) {
  return (
    <span className={`text-2xl ${filled ? "opacity-100" : "opacity-20"}`}>🗝️</span>
  );
}

export default function LinearEquationsPractice() {
  const [keys, setKeys] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [gameState, setGameState] = useState("playing");

  const problems = [
    { equation: "2x + 3 = 7", solution: "2" },
    { equation: "5x - 10 = 15", solution: "5" },
    { equation: "3x + 4 = -5", solution: "-3" },
    { equation: "x - 7 = 2", solution: "9" },
    { equation: "4x + 1 = 13", solution: "3" },
  ];

  const current = problems[currentProblem];

  const checkAnswer = () => {
    if (userAnswer.trim() === current.solution) {
      const newKeys = keys + 1;
      setKeys(newKeys);
      setFeedback({ type: "correct", message: "Correct! Key collected! 🗝️" });

      if (newKeys === 5) {
        setTimeout(() => setGameState("won"), 800);
      } else {
        setTimeout(() => {
          setCurrentProblem((p) => p + 1);
          setUserAnswer("");
          setFeedback(null);
        }, 1000);
      }
    } else {
      setFeedback({ type: "wrong", message: "Not quite — try again!" });
    }
  };

  const restart = () => {
    setKeys(0);
    setCurrentProblem(0);
    setUserAnswer("");
    setFeedback(null);
    setGameState("playing");
  };

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Equation Escape Room</h1>
            <p className="text-lg text-blue-100">Solve 5 linear equations to collect keys and escape!</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <KeyIcon key={i} filled={i < keys} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Problem {currentProblem + 1} of 5</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(keys / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      Solve for x
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-2">Find the value of x:</p>
                  <div className="text-3xl mb-6 text-center">
                    <InlineMath math={current.equation} />
                  </div>

                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                    placeholder="Enter the value of x"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                  />

                  <button
                    onClick={checkAnswer}
                    className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Submit Answer
                  </button>

                  {feedback && (
                    <div className={`mt-4 text-center py-3 rounded-xl text-sm font-semibold ${
                      feedback.type === "correct"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {feedback.message}
                    </div>
                  )}
                </div>
              </>
            )}

            {gameState === "won" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🚪</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">You escaped!</h2>
                <p className="text-gray-600 mb-2">All 5 keys collected. The door is open!</p>
                <div className="flex justify-center gap-2 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <KeyIcon key={i} filled={true} />
                  ))}
                </div>
                <button
                  onClick={restart}
                  className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Play Again
                </button>
              </div>
            )}

          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}