"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function BinomialExpansionsPracticePage() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [hintIndex, setHintIndex] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
  });

  const correctAnswers = {
    q1: "p^4+4p^3q+6p^2q^2+4pq^3+q^4", // (p + q)^4
    q2: "16x^4+96x^3y+216x^2y^2+216xy^3+81y^4", // (2x + 3y)^4
    q3: "x^5-5x^4y+10x^3y^2-10x^2y^3+5xy^4-y^5", // (x - y)^5
    q4: "x^3+3x^2/2+3x/4+1/8", // (x + 1/2)^3
    q5: "1.082", // (1.02)^4 to 3 decimal places
  };

  const hints = {
    q1: [
      "Use Pascal’s Triangle for n=4 to get the coefficients: 1, 4, 6, 4, 1.",
      "The terms without coefficients are p^4, p^3q, p^2q^2, pq^3, q^4.",
      "Combine the coefficients and terms: 1p^4 + 4p^3q + 6p^2q^2 + 4pq^3 + 1q^4.",
    ],
    q2: [
      "Use Pascal’s Triangle for n=4: coefficients are 1, 4, 6, 4, 1.",
      "Terms without coefficients: (2x)^4, (2x)^3(3y), (2x)^2(3y)^2, (2x)(3y)^3, (3y)^4.",
      "Compute each term: (2x)^4 = 16x^4, 4(2x)^3(3y) = 4 \cdot 8x^3 \cdot 3y = 96x^3y, and so on.",
    ],
    q3: [
      "Write (x - y)^5 as (x + (-y))^5. Use Pascal’s Triangle for n=5: 1, 5, 10, 10, 5, 1.",
      "Terms: x^5, x^4(-y), x^3(-y)^2, x^2(-y)^3, x(-y)^4, (-y)^5.",
      "Combine: x^5 - 5x^4y + 10x^3y^2 - 10x^2y^3 + 5xy^4 - y^5 (signs alternate due to -y).",
    ],
    q4: [
      "Use Pascal’s Triangle for n=3: 1, 3, 3, 1.",
      "Terms: (x)^3, (x)^2(1/2), (x)(1/2)^2, (1/2)^3.",
      "Combine: x^3 + 3x^2 \cdot (1/2) + 3x \cdot (1/4) + 1/8.",
    ],
    q5: [
      "Write (1.02)^4 as (1 + 0.02)^4. Use Pascal’s Triangle for n=4: 1, 4, 6, 4, 1.",
      "Terms: 1 + 4(0.02) + 6(0.02)^2 + 4(0.02)^3 + (0.02)^4.",
      "Compute: 1 + 0.08 + 0.0024 + 0.000032 + 0.00000016 = 1.08243216, then round to 3 decimal places.",
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
            Binomial Expansions - Practice
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Practice Problems</h2>

            <div className="mb-6">
              <p className="text-lg mb-2">
                1. Expand <InlineMath math="(p + q)^4" />.
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
                2. Expand <InlineMath math="(2x + 3y)^4" />.
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
                3. Expand <InlineMath math="(x - y)^5" />.
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

            <div className="mb-6">
              <p className="text-lg mb-2">
                4. Expand <InlineMath math="\left(x + \frac{1}{2}\right)^3" />.
              </p>
              <input
                type="text"
                value={answers.q4}
                onChange={(e) => handleAnswerChange("q4", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q4")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q4")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q4 >= hints.q4.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q4 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q4[hintIndex.q4 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q4}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-2">
                5. Use binomial expansion to estimate <InlineMath math="(1.02)^4" /> to 3 decimal places.
              </p>
              <input
                type="text"
                value={answers.q5}
                onChange={(e) => handleAnswerChange("q5", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q5")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q5")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q5 >= hints.q5.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q5 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q5[hintIndex.q5 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q5}</p>
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