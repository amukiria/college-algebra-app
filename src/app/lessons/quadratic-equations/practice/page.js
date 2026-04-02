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

function DragonHealthBar({ health, maxHealth }) {
  const pct = (health / maxHealth) * 100;
  const color = pct > 60 ? "bg-red-500" : pct > 30 ? "bg-orange-400" : "bg-yellow-400";

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-gray-600">🐉 Dragon Health</span>
        <span className="text-sm font-bold text-red-600">{health.toFixed(1)} / {maxHealth}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function QuadraticEquationsPractice() {
  const [dragonHealth, setDragonHealth] = useState(5);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [gameState, setGameState] = useState("playing");
  const [resetKey, setResetKey] = useState(0);
  const [strikes, setStrikes] = useState(0);

  const problems = [
    { equation: "x^2 - 5x + 6 = 0", solutions: [2, 3] },
    { equation: "2x^2 + 3x - 2 = 0", solutions: [-2, 0.5] },
    { equation: "x^2 + 7x + 12 = 0", solutions: [-3, -4] },
    { equation: "3x^2 - 5x - 2 = 0", solutions: [2, -1/3] },
    { equation: "x^2 - 4 = 0", solutions: [2, -2] },
  ];

  const current = problems[currentProblem];

  const parseLatexNumber = (str) => {
    str = str.trim();
    const negFracMatch = str.match(/-\\frac\{?(\d+)\}?\{?(\d+)\}?/);
    if (negFracMatch) return -(parseFloat(negFracMatch[1]) / parseFloat(negFracMatch[2]));
    const fracMatch = str.match(/\\frac\{?(\d+)\}?\{?(\d+)\}?/);
    if (fracMatch) return parseFloat(fracMatch[1]) / parseFloat(fracMatch[2]);
    return parseFloat(str.replace(/[^0-9.\-]/g, ""));
  };

  const checkAnswer = () => {
    console.log("Raw answer:", answer);
    const parts = answer.split(",").map((p) => parseLatexNumber(p.trim()));
    console.log("Parsed parts:", parts);
    const userSolutions = parts.filter((n) => !isNaN(n)).sort((a, b) => a - b);
    const correctSolutions = [...current.solutions].sort((a, b) => a - b);
    console.log("User solutions:", userSolutions);
    console.log("Correct solutions:", correctSolutions);

    const isCorrect =
      userSolutions.length === correctSolutions.length &&
      userSolutions.every((val, i) => Math.abs(val - correctSolutions[i]) < 0.01);

    if (isCorrect) {
      const newHealth = Math.max(0, dragonHealth - 1);
      setDragonHealth(newHealth);
      setStrikes((s) => s + 1);
      setFeedback({ type: "correct", message: "Hit! The dragon takes damage! ⚔️" });

      if (newHealth <= 0) {
        setTimeout(() => setGameState("won"), 800);
      } else {
        setTimeout(() => {
          setCurrentProblem((p) => (p + 1) % problems.length);
          setAnswer("");
          setFeedback(null);
          setResetKey((k) => k + 1);
        }, 1000);
      }
    } else {
      const newHealth = Math.min(5, dragonHealth + 0.5);
      setDragonHealth(newHealth);
      setFeedback({ type: "wrong", message: "Miss! The dragon heals a little. 🐉" });
      if (newHealth >= 5) {
        setTimeout(() => setGameState("lost"), 800);
      }
    }
  };

  const restart = () => {
    setDragonHealth(5);
    setCurrentProblem(0);
    setAnswer("");
    setFeedback(null);
    setGameState("playing");
    setStrikes(0);
    setResetKey((k) => k + 1);
  };

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Quadratic Quest: Dragon Slayer</h1>
            <p className="text-blue-100 text-lg">Solve quadratic equations to slay the dragon. Wrong answers heal it!</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                <div className="mb-8">
                  <DragonHealthBar health={dragonHealth} maxHealth={5} />
                  <p className="text-sm text-gray-500 mt-2">⚔️ Strikes landed: {strikes}</p>
                </div>

                <div
                  className="text-center text-8xl mb-6 transition-all duration-500"
                  style={{ filter: dragonHealth < 2 ? "grayscale(80%)" : "none" }}
                >
                  🐉
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                      Solve for x
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-2">Find all values of x:</p>
                  <div className="text-3xl mb-6 text-center">
                    <InlineMath math={current.equation} />
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    Enter both solutions separated by a comma. Use{" "}
                    <code className="bg-gray-100 px-1 rounded">/</code> for fractions.
                  </p>

                  <MathInput onChange={setAnswer} resetKey={resetKey} />

                  <button
                    onClick={checkAnswer}
                    className="mt-4 w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    ⚔️ Strike the Dragon
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
                <h2 className="text-3xl font-extrabold text-primary mb-3">Dragon Slain!</h2>
                <p className="text-gray-600 mb-2">You defeated the dragon in {strikes} strikes.</p>
                <p className="text-gray-400 text-sm mb-8">The kingdom is saved!</p>
                <button
                  onClick={restart}
                  className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  New Quest
                </button>
              </div>
            )}

            {gameState === "lost" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">💀</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">The Dragon Wins!</h2>
                <p className="text-gray-600 mb-2">The dragon regained full health and devoured the kingdom.</p>
                <p className="text-gray-400 text-sm mb-8">You landed {strikes} strikes.</p>
                <button
                  onClick={restart}
                  className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
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