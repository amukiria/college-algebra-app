"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function RadicalsPracticePage() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
  });
  const [hintIndex, setHintIndex] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
  });

  const correctAnswers = {
    q1: "6\\sqrt{2}", // \sqrt{72}
    q2: "5\\sqrt{3}", // 3\sqrt{3} + 2\sqrt{3}
    q3: "\\frac{2\\sqrt{7}}{7}", // 2 / \sqrt{7}
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
    const userAnswer = answers[question].trim().replace(/\s/g, "");
    const correctAnswer = correctAnswers[question].replace(/\s/g, "");
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

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Radicals - Practice
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Practice Problems</h2>

            <div className="mb-6">
              <p className="text-lg mb-2">
                1. Simplify: <InlineMath math="\sqrt{72}" />.
              </p>
              <input
                type="text"
                value={answers.q1}
                onChange={(e) => handleAnswerChange("q1", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q1")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q1")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q1 >= hints.q1.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q1 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q1[hintIndex.q1 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q1}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-2">
                2. Simplify: <InlineMath math="3\sqrt{3} + 2\sqrt{3}" />.
              </p>
              <input
                type="text"
                value={answers.q2}
                onChange={(e) => handleAnswerChange("q2", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q2")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q2")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q2 >= hints.q2.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q2 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q2[hintIndex.q2 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q2}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-2">
                3. Rationalize the denominator: <InlineMath math="\frac{2}{\sqrt{7}}" />.
              </p>
              <input
                type="text"
                value={answers.q3}
                onChange={(e) => handleAnswerChange("q3", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q3")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q3")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q3 >= hints.q3.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q3 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q3[hintIndex.q3 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q3}</p>
            </div>
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}