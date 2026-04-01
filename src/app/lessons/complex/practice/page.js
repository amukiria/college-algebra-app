"use client";

import React, { useState, useEffect, useRef } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

function MathInput({ onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    import("mathlive").then(() => {
      const el = ref.current;
      if (!el) return;
      el.addEventListener("input", () => {
        const latex = el.getValue();
        onChange(latex);
      });
    });
  }, []);

  return (
    <math-field
      ref={ref}
      style={{
        fontSize: "1.2rem",
        padding: "8px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        minWidth: "200px",
        display: "block",
      }}
    />
  );
}

export default function ComplexNumbersPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [feedback, setFeedback] = useState({ q1: "", q2: "", q3: "" });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0 });

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
      "Multiply each pair: 1 × 3, 1 × i, 2i × 3, 2i × i. Then simplify using i^2 = -1.",
      "Combine like terms after simplifying: 3 + i + 6i + 2i^2.",
    ],
    q3: [
      "The powers of i follow a cycle: i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1.",
      "Find the exponent modulo 4: 17 mod 4.",
      "Since 17 ÷ 4 = 4 remainder 1, i^17 = i^1.",
    ],
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const checkAnswer = (question) => {
    const normalize = (str) =>
      str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "");
    const userAnswer = normalize(answers[question]);
    const correctAnswer = normalize(correctAnswers[question]);
    console.log("User answer:", userAnswer);
    console.log("Correct answer:", correctAnswer);
    if (userAnswer === correctAnswer) {
      setFeedback((prev) => ({ ...prev, [question]: "Correct!" }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [question]: "Incorrect. Try using the hints to guide you, or review the notes.",
      }));
    }
  };

  const showHint = (question) => {
    setHintIndex((prev) => ({
      ...prev,
      [question]: Math.min(prev[question] + 1, hints[question].length - 1),
    }));
  };

  const questions = [
    { key: "q1", label: <>1. Add: <InlineMath math="(3 + 4i) + (2 - 2i)" />.</> },
    { key: "q2", label: <>2. Multiply: <InlineMath math="(1 + 2i)(3 + i)" />.</> },
    { key: "q3", label: <>3. Simplify: <InlineMath math="i^{17}" />.</> },
  ];

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Complex Numbers - Practice
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-2">Practice Problems</h2>
            <p className="text-sm text-gray-500 mb-6">
              Use the math editor to type your answer. Click inside the box — it supports a full
              math keyboard. You can also type directly: use{" "}
              <code className="bg-gray-100 px-1 rounded">sqrt</code> for square roots and{" "}
              <code className="bg-gray-100 px-1 rounded">/</code> for fractions.
            </p>

            {questions.map(({ key, label }) => (
              <div key={key} className="mb-8">
                <p className="text-lg mb-2">{label}</p>
                <MathInput onChange={(val) => handleAnswerChange(key, val)} />
                <div className="mt-3 flex space-x-4">
                  <button
                    onClick={() => checkAnswer(key)}
                    className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={() => showHint(key)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    disabled={hintIndex[key] >= hints[key].length - 1}
                  >
                    Show Hint
                  </button>
                </div>
                {hintIndex[key] > 0 && (
                  <p className="mt-2 text-lg text-gray-700">
                    Hint: {hints[key][hintIndex[key] - 1]}
                  </p>
                )}
                <p className="mt-2 text-lg">{feedback[key]}</p>
              </div>
            ))}
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}