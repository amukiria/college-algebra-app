"use client";

import React, { useState, useEffect, useRef } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

function MathInput({ onChange, resetKey }) {
  const ref = useRef(null);

  useEffect(() => {
    import("mathlive").then(() => {
      const el = ref.current;
      if (!el) return;
      el.addEventListener("input", () => onChange(el.getValue()));
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    import("mathlive").then(() => {
      if (el.setValue) el.setValue("");
    });
  }, [resetKey]);

  return (
    <math-field
      ref={ref}
      style={{
        fontSize: "1.2rem",
        padding: "8px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        width: "100%",
        display: "block",
      }}
    />
  );
}

function RaceTrack({ progress, total }) {
  const pct = (progress / total) * 100;
  return (
    <div className="relative w-full bg-gray-100 rounded-full h-8 overflow-hidden border border-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-accent rounded-full transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
        {progress}/{total}
      </span>
      <span
        className="absolute top-1/2 -translate-y-1/2 text-xl transition-all duration-700"
        style={{ left: `calc(${pct}% - 12px)` }}
      >
        🏎️
      </span>
    </div>
  );
}

export default function RationalExpressionsPractice() {
  const [progress, setProgress] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("playing");
  const [resetKey, setResetKey] = useState(0);

  const problems = [
    { expression: "\\frac{x^2 - 4}{x + 2}", solution: "x-2", label: "Simplify" },
    { expression: "\\frac{2x}{x - 1} \\times \\frac{x - 1}{4}", solution: "\\frac{x}{2}", label: "Multiply" },
    { expression: "\\frac{x^2 - 9}{x + 3}", solution: "x-3", label: "Simplify" },
    { expression: "\\frac{3x}{x + 2} \\times \\frac{x + 2}{6}", solution: "\\frac{x}{2}", label: "Multiply" },
    { expression: "\\frac{x^2 - 1}{x - 1}", solution: "x+1", label: "Simplify" },
  ];

  const current = problems[currentProblem];

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft === 0) { setGameState("lost"); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "");

  const checkAnswer = () => {
    if (normalize(answer) === normalize(current.solution)) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      setFeedback({ type: "correct", message: "Correct! Keep racing! 🏁" });

      if (newProgress === 5) {
        setTimeout(() => setGameState("won"), 800);
      } else {
        setTimeout(() => {
          setCurrentProblem((p) => p + 1);
          setAnswer("");
          setFeedback(null);
          setTimeLeft(60);
          setResetKey((k) => k + 1);
        }, 1000);
      }
    } else {
      setFeedback({ type: "wrong", message: "Not quite — try again!" });
    }
  };

  const restart = () => {
    setProgress(0);
    setCurrentProblem(0);
    setAnswer("");
    setFeedback(null);
    setTimeLeft(60);
    setGameState("playing");
    setResetKey((k) => k + 1);
  };

  const timerColor = timeLeft > 30 ? "text-green-600" : timeLeft > 10 ? "text-amber-500" : "text-red-500";

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Fraction Frenzy Race</h1>
            <p className="text-blue-100 text-lg">Simplify or multiply 5 rational expressions to cross the finish line.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-500">Problem {currentProblem + 1} of 5</p>
                    <span className={`text-2xl font-extrabold ${timerColor}`}>{timeLeft}s</span>
                  </div>
                  <RaceTrack progress={progress} total={5} />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      current.label === "Simplify" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"
                    }`}>
                      {current.label}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-2">Solve:</p>
                  <div className="text-3xl mb-6 text-center">
                    <InlineMath math={current.expression} />
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    Use the math editor to enter your answer. Type{" "}
                    <code className="bg-gray-100 px-1 rounded">sqrt</code> for roots and{" "}
                    <code className="bg-gray-100 px-1 rounded">/</code> for fractions.
                  </p>

                  <MathInput onChange={setAnswer} resetKey={resetKey} />

                  <button
                    onClick={checkAnswer}
                    className="mt-4 w-full py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
                <div className="text-6xl mb-6">🏆</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">You crossed the finish line!</h2>
                <p className="text-gray-600 mb-8">All 5 expressions solved. Impressive speed!</p>
                <button onClick={restart} className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Race Again
                </button>
              </div>
            )}

            {gameState === "lost" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">⏱️</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">Time's Up!</h2>
                <p className="text-gray-600 mb-8">You completed {progress} of 5 problems.</p>
                <button onClick={restart} className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Try Again
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