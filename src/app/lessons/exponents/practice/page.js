"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function IntegersExponentsRootsPracticePage() {
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
    q1: "-12", // (-5) + (-7)
    q2: "16", // (2^3)^2 / 2^2
    q3: "3", // \sqrt[3]{27}
  };

  const hints = {
    q1: [
      "Both numbers are negative, so adding them will result in a negative sum.",
      "Add the absolute values: 5 + 7.",
      "The result is -(5 + 7).",
    ],
    q2: [
      "Start with the numerator: apply the power rule (a^m)^n = a^(m*n) to (2^3)^2.",
      "The numerator becomes 2^(3*2) = 2^6. Now simplify the denominator 2^2.",
      "Use the quotient rule a^m / a^n = a^(m-n): 2^6 / 2^2 = 2^(6-2).",
    ],
    q3: [
      "The cube root of a number a is a value x such that x^3 = a.",
      "What number, when cubed, equals 27? Try small integers.",
      "Check: 3^3 = 3 * 3 * 3 = 27, so the cube root is 3.",
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
            Integers, Exponents, and Roots - Practice
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Practice Problems</h2>

            <div className="mb-6">
              <p className="text-lg mb-2">
                1. Add: <InlineMath math="(-5) + (-7)" />.
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
                2. Simplify: <InlineMath math="\frac{(2^3)^2}{2^2}" />.
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
                3. Find: <InlineMath math="\sqrt[3]{27}" />.
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