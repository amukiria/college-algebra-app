"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function ProgressionsPracticePage() {
  const [answers, setAnswers] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "",
  });
  const [feedback, setFeedback] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "",
  });
  const [hintIndex, setHintIndex] = useState({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0,
  });

  const correctAnswers = {
    q1: "d=3,a_8=25", // AP: 3rd term=10, 7th term=22, find d and 8th term
    q2: "2", // AP: 4th term=17, d=5, find a_1
    q3: "5", // GP: 3rd term=20, r=2, find a_1
    q4: "5", // GP: a_1=2, r=3, 5th term=162, confirm n
    q5: "8", // Infinite GP: 4, 2, 1, ..., find sum
    q6: "55", // Sum of first 5 terms of AP 3, 7, 11, ...
    q7: "45", // Sum of first 4 terms of GP 3, 6, 12, ...
  };

  const hints = {
    q1: [
      "Use the AP formula: a_n = a_1 + (n-1)d. For the 3rd term: a_1 + 2d = 10. For the 7th term: a_1 + 6d = 22.",
      "Subtract the equations: (a_1 + 6d) - (a_1 + 2d) = 22 - 10, so 4d = 12, d = 3.",
      "Substitute d = 3 into a_1 + 2d = 10: a_1 + 6 = 10, a_1 = 4. Then, 8th term: a_8 = a_1 + 7d = 4 + 7*3 = 25.",
    ],
    q2: [
      "Use the AP formula: a_n = a_1 + (n-1)d. For the 4th term: a_4 = a_1 + (4-1)*5 = 17.",
      "Simplify: a_1 + 15 = 17, so a_1 = 2.",
    ],
    q3: [
      "Use the GP formula: a_n = a_1 * r^(n-1). For the 3rd term: a_1 * 2^(3-1) = 20.",
      "Simplify: a_1 * 4 = 20, so a_1 = 5.",
    ],
    q4: [
      "Use the GP formula: a_n = a_1 * r^(n-1). Here, a_1 = 2, r = 3, a_n = 162.",
      "Set up: 2 * 3^(n-1) = 162. Divide by 2: 3^(n-1) = 81. Since 3^4 = 81, n-1 = 4, so n = 5.",
    ],
    q5: [
      "Identify a_1 = 4, r = 2/4 = 0.5. Use the infinite GP sum formula: S_∞ = a_1 / (1 - r).",
      "Calculate: S_∞ = 4 / (1 - 0.5) = 4 / 0.5 = 8.",
    ],
    q6: [
      "AP: 3, 7, 11, ..., a_1 = 3, d = 4. Find a_5: a_5 = 3 + (5-1)*4 = 19.",
      "Sum: S_5 = (5/2)(a_1 + a_5) = (5/2)(3 + 19) = 55.",
    ],
    q7: [
      "GP: 3, 6, 12, ..., a_1 = 3, r = 2. Use S_n = a_1 (1 - r^n)/(1 - r).",
      "S_4 = 3 (1 - 2^4)/(1 - 2) = 3 (1 - 16)/(-1) = 45.",
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
        [question]: "Incorrect. Try using the hints to guide you, or review the Progressions - Learn page.",
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
            Progressions - Practice
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Practice Questions</h2>

            {/* Q1: AP - Find d and 8th term */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                1. The 3rd term of an arithmetic progression is 10, and the 7th term is 22. Find the common difference and the 8th term.
              </p>
              <input
                type="text"
                value={answers.q1}
                onChange={(e) => handleAnswerChange("q1", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
                placeholder="Format: d=#,a_8=#"
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

            {/* Q2: AP - Find a_1 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                2. In an arithmetic progression, the 4th term is 17, and the common difference is 5. What is the first term?
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

            {/* Q3: GP - Find a_1 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                3. The 3rd term of a geometric progression is 20, and the common ratio is 2. What is the first term?
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

            {/* Q4: GP - Confirm number of terms */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                4. A geometric progression starts with 2 and has a common ratio of 3. The 5th term is 162. Confirm the number of terms to reach 162.
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

            {/* Q5: Infinite GP Sum */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                5. Find the sum of the infinite geometric progression 4, 2, 1, 0.5, ….
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

            {/* Q6: Sum of first 5 terms of AP (retained) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                6. Find the sum of the first 5 terms of the arithmetic sequence 3, 7, 11, ….
              </p>
              <input
                type="text"
                value={answers.q6}
                onChange={(e) => handleAnswerChange("q6", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q6")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q6")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q6 >= hints.q6.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q6 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q6[hintIndex.q6 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q6}</p>
            </div>

            {/* Q7: Sum of first 4 terms of GP (retained) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                7. Find the sum of the first 4 terms of the geometric sequence 3, 6, 12, ….
              </p>
              <input
                type="text"
                value={answers.q7}
                onChange={(e) => handleAnswerChange("q7", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q7")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q7")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q7 >= hints.q7.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q7 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q7[hintIndex.q7 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q7}</p>
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