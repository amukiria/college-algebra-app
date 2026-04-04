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

export default function BinomialExpansionsPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "", q4: "", q5: "" });
  const [feedback, setFeedback] = useState({ q1: null, q2: null, q3: null, q4: null, q5: null });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 });
  const [resetKey, setResetKey] = useState(0);
  const [gameState, setGameState] = useState("playing");

  const correctAnswers = {
    q1: "p^4+4p^3q+6p^2q^2+4pq^3+q^4",
    q2: "16x^4+96x^3y+216x^2y^2+216xy^3+81y^4",
    q3: "x^5-5x^4y+10x^3y^2-10x^2y^3+5xy^4-y^5",
    q4: "x^3+3x^2/2+3x/4+1/8",
    q5: "1.082",
  };

  const hints = {
    q1: [
      "Use Pascal's Triangle for n=4 to get the coefficients: 1, 4, 6, 4, 1.",
      "The terms without coefficients are p⁴, p³q, p²q², pq³, q⁴.",
      "Combine: p⁴ + 4p³q + 6p²q² + 4pq³ + q⁴.",
    ],
    q2: [
      "Use Pascal's Triangle for n=4: coefficients are 1, 4, 6, 4, 1.",
      "Terms without coefficients: (2x)⁴, (2x)³(3y), (2x)²(3y)², (2x)(3y)³, (3y)⁴.",
      "Compute each: (2x)⁴=16x⁴, 4(2x)³(3y)=96x³y, 6(2x)²(3y)²=216x²y², 4(2x)(3y)³=216xy³, (3y)⁴=81y⁴.",
    ],
    q3: [
      "Write (x−y)⁵ as (x+(−y))⁵. Use Pascal's Triangle for n=5: 1, 5, 10, 10, 5, 1.",
      "Terms: x⁵, x⁴(−y), x³(−y)², x²(−y)³, x(−y)⁴, (−y)⁵.",
      "Signs alternate because of −y: x⁵ − 5x⁴y + 10x³y² − 10x²y³ + 5xy⁴ − y⁵.",
    ],
    q4: [
      "Use Pascal's Triangle for n=3: 1, 3, 3, 1.",
      "Terms: x³, x²(1/2), x(1/2)², (1/2)³.",
      "Combine: x³ + 3x²(1/2) + 3x(1/4) + 1/8 = x³ + 3x²/2 + 3x/4 + 1/8.",
    ],
    q5: [
      "Write (1.02)⁴ as (1+0.02)⁴. Use Pascal's Triangle for n=4: 1, 4, 6, 4, 1.",
      "Terms: 1 + 4(0.02) + 6(0.02)² + 4(0.02)³ + (0.02)⁴.",
      "Compute: 1 + 0.08 + 0.0024 + 0.000032 + ... ≈ 1.082 to 3 decimal places.",
    ],
  };

  const questions = [
    { key: "q1", label: <>1. Expand <InlineMath math="(p + q)^4" />.</>, useMath: true },
    { key: "q2", label: <>2. Expand <InlineMath math="(2x + 3y)^4" />.</>, useMath: true },
    { key: "q3", label: <>3. Expand <InlineMath math="(x - y)^5" />.</>, useMath: true },
    { key: "q4", label: <>4. Expand <InlineMath math="\left(x + \frac{1}{2}\right)^3" />.</>, useMath: true },
    { key: "q5", label: <>5. Estimate <InlineMath math="(1.02)^4" /> to 3 decimal places.</>, useMath: false },
  ];

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "");

  const checkAnswer = (question) => {
    const isCorrect = normalize(answers[question]) === normalize(correctAnswers[question]);
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
    setAnswers({ q1: "", q2: "", q3: "", q4: "", q5: "" });
    setFeedback({ q1: null, q2: null, q3: null, q4: null, q5: null });
    setHintIndex({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 });
    setResetKey((k) => k + 1);
    setGameState("playing");
  };

  const correctCount = Object.values(feedback).filter((v) => v === "correct").length;
  const total = questions.length;

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Binomial Expansions — Practice</h1>
            <p className="text-blue-100 text-lg">Expand binomials using Pascal's Triangle and the Binomial Theorem.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2">
                      {questions.map(({ key }) => (
                        <ProgressIcon key={key} state={feedback[key]} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">{correctCount} / {total} correct</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(correctCount / total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 text-sm text-gray-600">
                  <p>Use the math editor for expansion answers. Type terms connected with <code className="bg-gray-100 px-1 rounded">+</code> or <code className="bg-gray-100 px-1 rounded">-</code>. Use <code className="bg-gray-100 px-1 rounded">^</code> for exponents and <code className="bg-gray-100 px-1 rounded">/</code> for fractions. For question 5, type a decimal number.</p>
                </div>

                {/* Questions */}
                {questions.map(({ key, label, useMath }) => (
                  <div key={key} className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <p className="text-lg font-semibold text-gray-800 mb-4">{label}</p>

                    {useMath ? (
                      <MathInput
                        onChange={(val) => handleAnswerChange(key, val)}
                        resetKey={resetKey}
                      />
                    ) : (
                      <input
                        type="text"
                        value={answers[key]}
                        onChange={(e) => handleAnswerChange(key, e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && checkAnswer(key)}
                        placeholder="e.g. 1.082"
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}

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
                <p className="text-gray-600 mb-2">You successfully expanded all five binomial expressions.</p>
                <div className="flex justify-center gap-2 my-8">
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
                  <a href="/lessons/binomial/learn">
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