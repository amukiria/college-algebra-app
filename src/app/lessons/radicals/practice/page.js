"use client";

import React, { useState, useEffect, useRef } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

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

function ProgressIcon({ state }) {
  if (state === "correct") return <span className="text-2xl">✅</span>;
  if (state === "incorrect") return <span className="text-2xl">❌</span>;
  return <span className="text-2xl opacity-20">⭕</span>;
}

export default function RadicalsPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [feedback, setFeedback] = useState({ q1: null, q2: null, q3: null });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0 });
  const [resetKey, setResetKey] = useState(0);
  const [gameState, setGameState] = useState("playing");

  const correctAnswers = {
    q1: "6\\sqrt2",
    q2: "5\\sqrt3",
    q3: "\\frac{2\\sqrt{7}}{7}",
  };

  const hints = {
    q1: [
      "Factor the number under the radical into a perfect square and another factor. What is the largest perfect square that divides 72?",
      "Rewrite 72 as 36 × 2, since 36 is a perfect square. Then use the property √(ab) = √a × √b.",
      "Take the square root of 36, which is 6, and leave √2 as is.",
    ],
    q2: [
      "Notice that both terms have the same radical, √3. This means they are like terms.",
      "Add the coefficients of the like radicals: 3 + 2.",
      "The result is the sum of the coefficients multiplied by the radical: (3 + 2)√3.",
    ],
    q3: [
      "To rationalize the denominator, multiply both the numerator and denominator by the radical in the denominator, √7.",
      "This gives (2 × √7) / (√7 × √7). Simplify the denominator.",
      "The denominator becomes 7, and the numerator is 2√7.",
    ],
  };

  const questions = [
    { key: "q1", label: <>1. Simplify: <InlineMath math="\sqrt{72}" />.</> },
    { key: "q2", label: <>2. Simplify: <InlineMath math="3\sqrt{3} + 2\sqrt{3}" />.</> },
    { key: "q3", label: <>3. Rationalize the denominator: <InlineMath math="\frac{2}{\sqrt{7}}" />.</> },
  ];

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const checkAnswer = (question) => {
    const normalize = (str) =>
      str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "");
    const userAnswer = normalize(answers[question]);
    const correctAnswer = normalize(correctAnswers[question]);

    const isCorrect = userAnswer === correctAnswer;
    setFeedback((prev) => ({ ...prev, [question]: isCorrect ? "correct" : "incorrect" }));

    if (isCorrect) {
      const newFeedback = { ...feedback, [question]: "correct" };
      if (Object.values(newFeedback).every((v) => v === "correct")) {
        setTimeout(() => setGameState("won"), 600);
      }
    }
  };

  const showHint = (question) => {
    setHintIndex((prev) => ({
      ...prev,
      [question]: Math.min(prev[question] + 1, hints[question].length - 1),
    }));
  };

  const reset = () => {
    setAnswers({ q1: "", q2: "", q3: "" });
    setFeedback({ q1: null, q2: null, q3: null });
    setHintIndex({ q1: 0, q2: 0, q3: 0 });
    setResetKey((k) => k + 1);
    setGameState("playing");
  };

  const correctCount = Object.values(feedback).filter((v) => v === "correct").length;

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Radicals — Practice</h1>
            <p className="text-blue-100 text-lg">Simplify, add, and rationalize radical expressions.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-3">
                      {questions.map(({ key }) => (
                        <ProgressIcon key={key} state={feedback[key]} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">{correctCount} / 3 correct</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(correctCount / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 text-sm text-gray-600">
                  <p>Use the math editor to type your answer. Type <code className="bg-gray-100 px-1 rounded">sqrt</code> for square roots and <code className="bg-gray-100 px-1 rounded">/</code> for fractions. The virtual keyboard also has all the symbols you need.</p>
                </div>

                {/* Questions */}
                {questions.map(({ key, label }) => (
                  <div key={key} className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <p className="text-lg font-semibold text-gray-800 mb-4">{label}</p>

                    <MathInput
                      onChange={(val) => handleAnswerChange(key, val)}
                      resetKey={resetKey}
                    />

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => checkAnswer(key)}
                        className="flex-1 py-2.5 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
                      >
                        Check Answer
                      </button>
                      <button
                        onClick={() => showHint(key)}
                        disabled={hintIndex[key] >= hints[key].length - 1}
                        className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        Hint
                      </button>
                    </div>

                    {hintIndex[key] > 0 && (
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                        💡 {hints[key][hintIndex[key] - 1]}
                      </div>
                    )}

                    {feedback[key] && (
                      <div className={`mt-3 text-center py-3 rounded-xl text-sm font-semibold ${
                        feedback[key] === "correct"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {feedback[key] === "correct" ? "✓ Correct!" : "✗ Incorrect. Try using the hints or review the notes."}
                      </div>
                    )}
                  </div>
                ))}

                {/* Reset */}
                <div className="flex justify-center">
                  <button
                    onClick={reset}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    Reset All
                  </button>
                </div>
              </>
            )}

            {gameState === "won" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🏆</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">All Correct!</h2>
                <p className="text-gray-600 mb-2">You successfully simplified, combined, and rationalized all three radical expressions.</p>
                <div className="flex justify-center gap-3 my-8">
                  {questions.map(({ key }) => (
                    <ProgressIcon key={key} state="correct" />
                  ))}
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={reset}
                    className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Practice Again
                  </button>
                  <a href="/lessons/radicals/learn">
                    <button className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                      Review Notes
                    </button>
                  </a>
                </div>
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