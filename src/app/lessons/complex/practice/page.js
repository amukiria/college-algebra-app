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

export default function ComplexNumbersPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [feedback, setFeedback] = useState({ q1: null, q2: null, q3: null });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0 });
  const [resetKey, setResetKey] = useState(0);
  const [gameState, setGameState] = useState("playing");

  const correctAnswers = {
    q1: "5+2i",
    q2: "-2+7i",
    q3: "i",
  };

  const hints = {
    q1: [
      "Combine the real parts and the imaginary parts separately.",
      "The real parts are 3 and 2, and the imaginary parts are 4i and -2i.",
      "Add the real parts: 3 + 2, and the imaginary parts: 4 + (-2).",
    ],
    q2: [
      "Use the distributive property to multiply the terms: (1 + 2i)(3 + i).",
      "Multiply each pair: 1 × 3, 1 × i, 2i × 3, 2i × i. Then simplify using i² = -1.",
      "Combine like terms after simplifying: 3 + i + 6i + 2i².",
    ],
    q3: [
      "The powers of i follow a cycle: i¹ = i, i² = -1, i³ = -i, i⁴ = 1.",
      "Find the exponent modulo 4: 17 mod 4.",
      "Since 17 ÷ 4 = 4 remainder 1, i¹⁷ = i¹.",
    ],
  };

  const questions = [
    { key: "q1", label: <>1. Add: <InlineMath math="(3 + 4i) + (2 - 2i)" />.</> },
    { key: "q2", label: <>2. Multiply: <InlineMath math="(1 + 2i)(3 + i)" />.</> },
    { key: "q3", label: <>3. Simplify: <InlineMath math="i^{17}" />.</> },
  ];

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const checkAnswer = (question) => {
    const normalize = (str) =>
      str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "");
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

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Complex Numbers — Practice</h1>
            <p className="text-blue-100 text-lg">Add, multiply, and simplify complex number expressions.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
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

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 text-sm text-gray-600">
                  <p>Use the math editor to type your answer. For complex numbers, type directly — e.g. <code className="bg-gray-100 px-1 rounded">5+2i</code> or <code className="bg-gray-100 px-1 rounded">-2+7i</code>.</p>
                </div>

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
                <p className="text-gray-600 mb-2">You successfully added, multiplied, and simplified all three complex number expressions.</p>
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
                  <a href="/lessons/complex/learn">
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