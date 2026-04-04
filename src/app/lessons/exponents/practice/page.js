"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

function ProgressIcon({ state }) {
  if (state === "correct") return <span className="text-2xl">✅</span>;
  if (state === "incorrect") return <span className="text-2xl">❌</span>;
  return <span className="text-2xl opacity-20">⭕</span>;
}

export default function IntegersExponentsRootsPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [feedback, setFeedback] = useState({ q1: null, q2: null, q3: null });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0 });
  const [gameState, setGameState] = useState("playing");

  const correctAnswers = {
    q1: "-12",
    q2: "16",
    q3: "3",
  };

  const hints = {
    q1: [
      "Both numbers are negative, so adding them will result in a negative sum.",
      "Add the absolute values: 5 + 7.",
      "The result is −(5 + 7).",
    ],
    q2: [
      "Start with the numerator: apply the power rule (aᵐ)ⁿ = aᵐⁿ to (2³)².",
      "The numerator becomes 2⁶. Now simplify the denominator 2².",
      "Use the quotient rule: 2⁶ / 2² = 2⁽⁶⁻²⁾ = 2⁴.",
    ],
    q3: [
      "The cube root of a is a value x such that x³ = a.",
      "What number, when cubed, equals 27? Try small integers.",
      "Check: 3³ = 3 × 3 × 3 = 27, so the cube root is 3.",
    ],
  };

  const questions = [
    { key: "q1", label: <>1. Add: <InlineMath math="(-5) + (-7)" />.</> },
    { key: "q2", label: <>2. Simplify: <InlineMath math="\frac{(2^3)^2}{2^2}" />.</> },
    { key: "q3", label: <>3. Find: <InlineMath math="\sqrt[3]{27}" />.</> },
  ];

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const checkAnswer = (question) => {
    const isCorrect = answers[question].trim().replace(/\s/g, "") === correctAnswers[question];
    const newFeedback = { ...feedback, [question]: isCorrect ? "correct" : "incorrect" };
    setFeedback(newFeedback);
    if (Object.values(newFeedback).every((v) => v === "correct")) {
      setTimeout(() => setGameState("won"), 600);
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
    setGameState("playing");
  };

  const correctCount = Object.values(feedback).filter((v) => v === "correct").length;

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Integers, Exponents & Roots — Practice</h1>
            <p className="text-blue-100 text-lg">Apply integer rules, exponent laws, and root operations.</p>
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
                  <p>Type your answer as a number. For negative answers include the minus sign, e.g. <code className="bg-gray-100 px-1 rounded">-12</code>.</p>
                </div>

                {/* Questions */}
                {questions.map(({ key, label }) => (
                  <div key={key} className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <p className="text-lg font-semibold text-gray-800 mb-4">{label}</p>

                    <input
                      type="text"
                      value={answers[key]}
                      onChange={(e) => handleAnswerChange(key, e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkAnswer(key)}
                      placeholder="Enter your answer"
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                <p className="text-gray-600 mb-2">You successfully applied integer rules, exponent laws, and root operations.</p>
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
                  <a href="/lessons/exponents/learn">
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