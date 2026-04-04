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

const questions = [
  {
    key: "q1",
    label: "The 3rd term of an AP is 10 and the 7th term is 22. Find the common difference and the 8th term.",
    placeholder: "Format: d=#,a_8=#",
    badge: "AP",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    key: "q2",
    label: "In an AP, the 4th term is 17 and the common difference is 5. What is the first term?",
    placeholder: "Enter a number",
    badge: "AP",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    key: "q3",
    label: "The 3rd term of a GP is 20 and the common ratio is 2. What is the first term?",
    placeholder: "Enter a number",
    badge: "GP",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    key: "q4",
    label: "A GP starts with 2 and has a common ratio of 3. The 5th term is 162. Confirm the number of terms to reach 162.",
    placeholder: "Enter a number",
    badge: "GP",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    key: "q5",
    label: "Find the sum of the infinite GP: 4, 2, 1, 0.5, …",
    placeholder: "Enter a number",
    badge: "GP ∞",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    key: "q6",
    label: "Find the sum of the first 5 terms of the AP: 3, 7, 11, …",
    placeholder: "Enter a number",
    badge: "AP Sum",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    key: "q7",
    label: "Find the sum of the first 4 terms of the GP: 3, 6, 12, …",
    placeholder: "Enter a number",
    badge: "GP Sum",
    badgeColor: "bg-teal-100 text-teal-700",
  },
];

const correctAnswers = {
  q1: "d=3,a_8=25",
  q2: "2",
  q3: "5",
  q4: "5",
  q5: "8",
  q6: "55",
  q7: "45",
};

const hints = {
  q1: [
    "Use aₙ = a₁ + (n−1)d. For the 3rd term: a₁ + 2d = 10. For the 7th term: a₁ + 6d = 22.",
    "Subtract the equations: 4d = 12, so d = 3.",
    "Substitute d=3: a₁ = 4. Then a₈ = 4 + 7×3 = 25. Format your answer as: d=3,a_8=25",
  ],
  q2: [
    "Use a₄ = a₁ + (4−1)×5 = 17.",
    "Simplify: a₁ + 15 = 17, so a₁ = 2.",
  ],
  q3: [
    "Use aₙ = a₁ × rⁿ⁻¹. For the 3rd term: a₁ × 2² = 20.",
    "Simplify: a₁ × 4 = 20, so a₁ = 5.",
  ],
  q4: [
    "Use aₙ = a₁ × rⁿ⁻¹. Set up: 2 × 3ⁿ⁻¹ = 162.",
    "Divide by 2: 3ⁿ⁻¹ = 81. Since 3⁴ = 81, n−1 = 4, so n = 5.",
  ],
  q5: [
    "Identify a₁ = 4, r = 2/4 = 0.5. Use S∞ = a₁ / (1−r).",
    "S∞ = 4 / (1−0.5) = 4 / 0.5 = 8.",
  ],
  q6: [
    "AP: a₁=3, d=4. Find a₅ = 3 + 4×4 = 19.",
    "S₅ = (5/2)(3+19) = (5/2)(22) = 55.",
  ],
  q7: [
    "GP: a₁=3, r=2. Use Sₙ = a₁(1−rⁿ)/(1−r).",
    "S₄ = 3(1−16)/(1−2) = 3×(−15)/(−1) = 45.",
  ],
};

export default function ProgressionsPracticePage() {
  const initState = () => ({ q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "" });
  const initNull = () => ({ q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null });
  const initZero = () => ({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0 });

  const [answers, setAnswers] = useState(initState);
  const [feedback, setFeedback] = useState(initNull);
  const [hintIndex, setHintIndex] = useState(initZero);
  const [gameState, setGameState] = useState("playing");

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const checkAnswer = (question) => {
    const isCorrect =
      answers[question].trim().replace(/\s/g, "") ===
      correctAnswers[question].replace(/\s/g, "");
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
    setAnswers(initState());
    setFeedback(initNull());
    setHintIndex(initZero());
    setGameState("playing");
  };

  const correctCount = Object.values(feedback).filter((v) => v === "correct").length;
  const total = questions.length;

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">Progressions — Practice</h1>
            <p className="text-blue-100 text-lg">Apply AP and GP formulas to find terms, sums, and more.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-1 flex-wrap">
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
                  <p>Type your answer as a number. For question 1, use the format <code className="bg-gray-100 px-1 rounded">d=3,a_8=25</code>.</p>
                </div>

                {/* Questions */}
                {questions.map(({ key, label, placeholder, badge, badgeColor }) => (
                  <div key={key} className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="text-gray-800 font-medium mb-4">{label}</p>

                    <input
                      type="text"
                      value={answers[key]}
                      onChange={(e) => handleAnswerChange(key, e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkAnswer(key)}
                      placeholder={placeholder}
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
                        {feedback[key] === "correct"
                          ? "✓ Correct!"
                          : "✗ Incorrect. Try using the hints or review the notes."}
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
                <p className="text-gray-600 mb-2">You successfully solved all seven progression problems.</p>
                <div className="flex justify-center gap-1 flex-wrap my-8">
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
                  <a href="/lessons/progressions/learn">
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