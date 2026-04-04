"use client";

import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Confetti from "react-confetti";

const quizQuestions = [
  {
    id: 1,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "If A = {3, 4, 5, 6} and B = {1, 3, 4, 7, 8}, what is A intersect B?",
    options: [
      { value: "a", text: "3, 4, 5, 6, 7, 8" },
      { value: "b", text: "3, 4" },
      { value: "c", text: "1, 2, 5, 6" },
      { value: "d", text: "empty set" },
    ],
    correct: "b",
    explanation: "A intersect B includes elements common to both sets. A and B share 3 and 4, so A intersect B = {3, 4}.",
  },
  {
    id: 2,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "In a survey of 40 students, 25 play football, 15 play volleyball, and 5 play both. How many play only football?",
    options: [
      { value: "a", text: "10" },
      { value: "b", text: "20" },
      { value: "c", text: "25" },
      { value: "d", text: "5" },
    ],
    correct: "b",
    explanation: "Students who play only football = total football minus both = 25 minus 5 = 20.",
  },
  {
    id: 3,
    topic: "Polynomials",
    topicLink: "/lessons/polynomials/learn",
    question: "Which of the following is NOT a polynomial?",
    options: [
      { value: "a", text: "x squared + 3x + 1" },
      { value: "b", text: "1 divided by x, plus 2" },
      { value: "c", text: "4x cubed minus 5" },
      { value: "d", text: "-7" },
    ],
    correct: "b",
    explanation: "1/x + 2 has a negative exponent, so it is not a polynomial.",
  },
  {
    id: 4,
    topic: "Polynomials",
    topicLink: "/lessons/polynomials/learn",
    question: "What is the degree of the polynomial 4x to the 5th power minus 3x squared + x minus 7?",
    options: [
      { value: "a", text: "2" },
      { value: "b", text: "3" },
      { value: "c", text: "5" },
      { value: "d", text: "7" },
    ],
    correct: "c",
    explanation: "The degree is the highest exponent. Here, the highest exponent is 5.",
  },
  {
    id: 5,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "Which of the following is an example of a finite set?",
    options: [
      { value: "a", text: "The set of all prime numbers" },
      { value: "b", text: "The set of all real numbers" },
      { value: "c", text: "The set of vowels in the English alphabet" },
      { value: "d", text: "The set of all even numbers" },
    ],
    correct: "c",
    explanation: "Vowels a, e, i, o, u have exactly 5 elements — a finite set.",
  },
  {
    id: 6,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "How many subsets does a set containing 8 elements have?",
    options: [
      { value: "a", text: "128" },
      { value: "b", text: "256" },
      { value: "c", text: "512" },
      { value: "d", text: "64" },
    ],
    correct: "b",
    explanation: "A set with n elements has 2 to the power n subsets. 8 elements gives 256 subsets.",
  },
  {
    id: 7,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "Let A = {a, e, i} and C = {a, e, i, o, u}. Is A a proper subset of C?",
    options: [
      { value: "a", text: "Yes, because all elements of A are in C." },
      { value: "b", text: "No, because A has elements not in C." },
      { value: "c", text: "Yes, because A and C are equal." },
      { value: "d", text: "No, because C has more elements than A." },
    ],
    correct: "a",
    explanation: "Every element of A is in C, so A is a proper subset of C.",
  },
  {
    id: 8,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "Find A intersect B where A = {a, e, i} and B = {c, d, e}.",
    options: [
      { value: "a", text: "{a, e, i}" },
      { value: "b", text: "{c, d, e}" },
      { value: "c", text: "{e}" },
      { value: "d", text: "{a, e}" },
    ],
    correct: "c",
    explanation: "A and B share only e, so A intersect B = {e}.",
  },
  {
    id: 9,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "How many elements are in the power set of B = {c, d, e}?",
    options: [
      { value: "a", text: "8" },
      { value: "b", text: "4" },
      { value: "c", text: "3" },
      { value: "d", text: "6" },
    ],
    correct: "a",
    explanation: "The power set contains all subsets. For 3 elements: 2 to the power 3 = 8 subsets.",
  },
  {
    id: 10,
    topic: "Sets",
    topicLink: "/lessons/sets/learn",
    question: "Which set-builder notation describes the set of integers from 0 to 10 inclusive?",
    options: [
      { value: "a", text: "x such that x is a natural number" },
      { value: "b", text: "x such that x is an integer between 0 and 10 inclusive" },
      { value: "c", text: "x such that x is a natural number strictly between 0 and 10" },
      { value: "d", text: "x such that x is a real number at most 10" },
    ],
    correct: "b",
    explanation: "The correct description is x such that x is an integer between 0 and 10 inclusive.",
  },
  {
    id: 11,
    topic: "Linear Equations",
    topicLink: "/lessons/linear-equations/learn",
    question: "Solve for x: 3x + 4 = 10",
    options: [
      { value: "a", text: "x = 2" },
      { value: "b", text: "x = 3" },
      { value: "c", text: "x = 4" },
      { value: "d", text: "x = 6" },
    ],
    correct: "a",
    explanation: "3x + 4 = 10 gives 3x = 6, so x = 2.",
  },
  {
    id: 12,
    topic: "Polynomials",
    topicLink: "/lessons/polynomials/learn",
    question: "What type of polynomial is 4x squared minus 4x cubed, and what is its degree?",
    options: [
      { value: "a", text: "Cubic polynomial, degree 3" },
      { value: "b", text: "Not a polynomial — has a square root term" },
      { value: "c", text: "Quadratic polynomial, degree 2" },
      { value: "d", text: "Not a polynomial — has a fractional exponent" },
    ],
    correct: "a",
    explanation: "The highest degree is 3, making it a cubic polynomial.",
  },
  {
    id: 13,
    topic: "Factoring",
    topicLink: "/lessons/factoring/learn",
    question: "Factorize: 18xy squared minus 8x",
    options: [
      { value: "a", text: "2x(9y squared minus 4)" },
      { value: "b", text: "2x(9y minus 4)" },
      { value: "c", text: "x(18y squared minus 8)" },
      { value: "d", text: "4x(9y squared minus 2)" },
    ],
    correct: "a",
    explanation: "The GCF is 2x. 18xy squared minus 8x = 2x(9y squared minus 4).",
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [unanswered, setUnanswered] = useState([]);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      doSubmit(true);
    }
  }, [timeLeft, timerActive, submitted]);

  const handleAnswerChange = (questionId, value) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  };

  const doSubmit = (forced) => {
    if (!forced) {
      const missing = quizQuestions
        .filter((q) => !answers[q.id])
        .map((q) => q.id);
      if (missing.length > 0) {
        setUnanswered(missing);
        return;
      }
    }

    let correctCount = 0;
    let currentStreak = 0;
    let maxStreak = 0;

    quizQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    const timeBonus = Math.floor(timeLeft / 10);
    const totalPoints = correctCount * 10 + timeBonus;

    setScore(correctCount);
    setStreak(maxStreak);
    setPoints(totalPoints);
    setSubmitted(true);
    setTimerActive(false);
    setUnanswered([]);

    if (correctCount === quizQuestions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPoints(0);
    setStreak(0);
    setTimeLeft(300);
    setTimerActive(true);
    setShowConfetti(false);
    setUnanswered([]);
  };

  const progressPercentage = (Object.keys(answers).length / quizQuestions.length) * 100;
  const stars = score === quizQuestions.length ? 3 : score >= quizQuestions.length * 0.7 ? 2 : score >= quizQuestions.length * 0.5 ? 1 : 0;
  const timerColor = timeLeft > 120 ? "text-green-600" : timeLeft > 30 ? "text-amber-500" : "text-red-500";
  const timerBg = timeLeft > 120 ? "bg-green-50 border-green-200" : timeLeft > 30 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  const wrongTopics = submitted
    ? [...new Map(
        quizQuestions
          .filter((q) => answers[q.id] !== q.correct)
          .map((q) => [q.topic, q.topicLink])
      ).entries()]
    : [];

  return (
    <>
      <SignedIn>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={400}
            recycle={false}
          />
        )}

        <div className="bg-background min-h-screen font-body">
          <div className="bg-primary py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-white">College Algebra Quiz</h1>
            <p className="text-blue-100 text-lg">13 questions across Sets, Polynomials, Factoring, and Linear Equations.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">
            {!submitted && (
              <div>
                <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className={`border rounded-xl px-4 py-2 font-extrabold text-xl ${timerColor} ${timerBg}`}>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">
                      {Object.keys(answers).length} / {quizQuestions.length} answered
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {unanswered.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700 font-semibold">
                    Please answer questions: {unanswered.join(", ")} before submitting.
                  </div>
                )}

                {quizQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl shadow-md p-6 mb-6 ${unanswered.includes(q.id) ? "ring-2 ring-red-400" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        Q{q.id}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">{q.topic}</span>
                    </div>
                    <p className="text-gray-800 font-medium mb-4">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            answers[q.id] === option.value
                              ? "bg-blue-50 border-blue-400 text-blue-800"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option.value}
                            checked={answers[q.id] === option.value}
                            onChange={() => handleAnswerChange(q.id, option.value)}
                            className="accent-blue-600"
                          />
                          <span className="text-sm font-medium">
                            {option.value.toUpperCase()}. {option.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => doSubmit(false)}
                  className="w-full py-4 bg-accent text-white font-extrabold rounded-2xl shadow hover:opacity-90 transition-opacity text-lg"
                >
                  Submit Quiz
                </button>
              </div>
            )}

            {submitted && (
              <div>
                <div className="bg-white rounded-2xl shadow-md p-8 mb-8 text-center">
                  <div className="text-6xl mb-4">
                    {score === quizQuestions.length ? "🏆" : score >= quizQuestions.length * 0.7 ? "🎯" : "📚"}
                  </div>
                  <h2 className="text-3xl font-extrabold text-primary mb-2">
                    {score === quizQuestions.length ? "Perfect Score!" : `${score} / ${quizQuestions.length} Correct`}
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {((score / quizQuestions.length) * 100).toFixed(0)}% —{" "}
                    {score === quizQuestions.length
                      ? "Excellent work!"
                      : score >= quizQuestions.length * 0.7
                      ? "Good job!"
                      : "Keep practising!"}
                  </p>

                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3].map((star) => (
                      <span key={star} className={`text-4xl ${star <= stars ? "text-yellow-400" : "text-gray-200"}`}>
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-2xl font-extrabold text-blue-700">{points}</p>
                      <p className="text-xs text-gray-500 mt-1">Total Points</p>
                    </div>
                    <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                      <p className="text-2xl font-extrabold text-teal-700">{streak}</p>
                      <p className="text-xs text-gray-500 mt-1">Best Streak</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                      <p className="text-2xl font-extrabold text-purple-700">
                        {Math.floor((300 - timeLeft) / 60)}:{((300 - timeLeft) % 60).toString().padStart(2, "0")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Time Taken</p>
                    </div>
                  </div>

                  {/* FIXED SECTION */}
                  {wrongTopics.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                      <p className="text-sm font-semibold text-amber-800 mb-2">Review these topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {wrongTopics.map(([topic, link]) => (
                          <a
                            key={topic}
                            href={link}
                            className="text-xs font-semibold px-3 py-1 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
                          >
                            {topic}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Try Again
                  </button>
                </div>

                <h3 className="text-xl font-extrabold text-primary mb-4">Question Review</h3>

                {quizQuestions.map((q) => {
                  const isCorrect = answers[q.id] === q.correct;
                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-2xl shadow-md p-6 mb-4 border-l-4 ${isCorrect ? "border-green-400" : "border-red-400"}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                        <span className="text-xs text-gray-400">{q.topic}</span>
                      </div>
                      <p className="text-gray-800 font-medium mb-3">{q.id}. {q.question}</p>
                      <div className="space-y-2 mb-3">
                        {q.options.map((option) => {
                          const isSelected = answers[q.id] === option.value;
                          const isCorrectOption = q.correct === option.value;
                          return (
                            <div
                              key={option.value}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
                                isCorrectOption
                                  ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                                  : isSelected
                                  ? "bg-red-50 border-red-300 text-red-700"
                                  : "bg-gray-50 border-gray-200 text-gray-600"
                              }`}
                            >
                              <span>{option.value.toUpperCase()}. {option.text}</span>
                              {isCorrectOption && <span className="ml-auto">correct</span>}
                              {isSelected && !isCorrectOption && <span className="ml-auto">your answer</span>}
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600">
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-center mt-6 pb-8">
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Try Again
                  </button>
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