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
      el.addEventListener("input", (evt) => {
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

export default function RadicalsPracticePage() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [feedback, setFeedback] = useState({ q1: "", q2: "", q3: "" });
  const [hintIndex, setHintIndex] = useState({ q1: 0, q2: 0, q3: 0 });

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
    { key: "q1", label: <>1. Simplify: <InlineMath math="\sqrt{72}" />.</> },
    { key: "q2", label: <>2. Simplify: <InlineMath math="3\sqrt{3} + 2\sqrt{3}" />.</> },
    { key: "q3", label: <>3. Rationalize the denominator: <InlineMath math="\frac{2}{\sqrt{7}}" />.</> },
  ];

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Radicals - Practice
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
                <MathInput
                  onChange={(val) => handleAnswerChange(key, val)}
                />
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