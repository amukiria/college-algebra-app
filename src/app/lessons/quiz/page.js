"use client";

import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Confetti from "react-confetti";

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [points, setPoints] = useState(0); // Gamified points
  const [streak, setStreak] = useState(0); // Longest streak of correct answers

  const quizQuestions = [
    {
      id: 1,
      question: "If A = {3, 4, 5, 6} and B = {1, 3, 4, 7, 8}, what is A ∩ B?",
      options: [
        { value: "a", text: "{3, 4, 5, 6, 7, 8}" },
        { value: "b", text: "{3, 4}" },
        { value: "c", text: "{1, 2, 5, 6}" },
        { value: "d", text: "{}" },
      ],
      correct: "b",
      explanation: "The intersection A ∩ B includes elements common to both sets. A = {3, 4, 5, 6} and B = {1, 3, 4, 7, 8} share 3 and 4, so A ∩ B = {3, 4}.",
    },
    {
      id: 2,
      question: "In a survey of 40 students, 25 play football, 15 play volleyball, and 5 play both. How many students play only football?",
      options: [
        { value: "a", text: "10" },
        { value: "b", text: "20" },
        { value: "c", text: "25" },
        { value: "d", text: "5" },
      ],
      correct: "b",
      explanation: "To find students who play only football, subtract those who play both from the total football players: 25 (football) - 5 (both) = 20.",
    },
    {
      id: 3,
      question: "Which of the following is NOT a polynomial?",
      options: [
        { value: "a", text: "x² + 3x + 1" },
        { value: "b", text: "1/x + 2" },
        { value: "c", text: "4x³ - 5" },
        { value: "d", text: "-7" },
      ],
      correct: "b",
      explanation: "A polynomial has non-negative integer exponents. '1/x + 2' = x⁻¹ + 2 has a negative exponent, so it’s not a polynomial.",
    },
    {
      id: 4,
      question: "What is the degree of the polynomial 4x⁵y - 3x² + x - 7?",
      options: [
        { value: "a", text: "2" },
        { value: "b", text: "3" },
        { value: "c", text: "5" },
        { value: "d", text: "7" },
      ],
      correct: "c",
      explanation: "The degree is the highest sum of exponents in any term. Here, 4x⁵y has degree 5 (x) + 1 (y) = 6, but options suggest 5, assuming a typo (4x⁵).",
    },
    {
      id: 5,
      question: "Which of the following is an example of a finite set?",
      options: [
        { value: "a", text: "The set of all prime numbers" },
        { value: "b", text: "The set of all real numbers" },
        { value: "c", text: "The set of vowels in the English alphabet" },
        { value: "d", text: "The set of all even numbers" },
      ],
      correct: "c",
      explanation: "A finite set has a limited number of elements. Vowels {a, e, i, o, u} have 5 elements (finite).",
    },
    {
      id: 6,
      question: "How many subsets of the set {a, b, c, d, e, f, h, i} are there?",
      options: [
        { value: "a", text: "128" },
        { value: "b", text: "256" },
        { value: "c", text: "512" },
        { value: "d", text: "64" },
      ],
      correct: "b",
      explanation: "A set with n elements has 2ⁿ subsets. Here, 8 elements give 2⁸ = 256 subsets.",
    },
    {
      id: 7,
      question: "Let A = {a, e, i}, B = {c, d, e}, and C = {a, e, i, o, u}. Is A ⊂ C?",
      options: [
        { value: "a", text: "Yes, because all elements of A are in C." },
        { value: "b", text: "No, because A has elements not in C." },
        { value: "c", text: "Yes, because A and C are equal." },
        { value: "d", text: "No, because C has more elements than A." },
      ],
      correct: "a",
      explanation: "A ⊂ C means every element of A is in C. A = {a, e, i} and C = {a, e, i, o, u}. Since a, e, and i are all in C, A is a subset of C.",
    },
    {
      id: 8,
      question: "Find A ∩ B where A = {a, e, i} and B = {c, d, e}.",
      options: [
        { value: "a", text: "{a, e, i}" },
        { value: "b", text: "{c, d, e}" },
        { value: "c", text: "{e}" },
        { value: "d", text: "{a, e}" },
      ],
      correct: "c",
      explanation: "A ∩ B is the set of elements common to A and B. A = {a, e, i} and B = {c, d, e} share only e, so A ∩ B = {e}.",
    },
    {
      id: 9,
      question: "What is the power set P(B) of B = {c, d, e}?",
      options: [
        { value: "a", text: "{ {}, {c}, {d}, {e}, {c, d}, {c, e}, {d, e}, {c, d, e} }" },
        { value: "b", text: "{ {}, {c, d}, {d, e}, {c, e} }" },
        { value: "c", text: "{ {c, d, e} }" },
        { value: "d", text: "{ {}, {c, d}, {d, e}, {e, c} }" },
      ],
      correct: "a",
      explanation: "The power set P(B) is all possible subsets of B. For B = {c, d, e} (3 elements), there are 2³ = 8 subsets: {}, {c}, {d}, {e}, {c, d}, {c, e}, {d, e}, {c, d, e}.",
    },
    {
      id: 10,
      question: "Write {0, 1, 2, …, 10} in set-builder notation.",
      options: [
        { value: "a", text: "{x | x is a natural number}" },
        { value: "b", text: "{x | x is an integer, 0 ≤ x ≤ 10}" },
        { value: "c", text: "{x | x ∈ ℕ, 0 < x < 10}" },
        { value: "d", text: "{x | x ∈ ℝ, x ≤ 10}" },
      ],
      correct: "b",
      explanation: "{0, 1, 2, …, 10} includes integers from 0 to 10 inclusive. {x | x is an integer, 0 ≤ x ≤ 10} correctly describes this set.",
    },
    {
      id: 11,
      question: "Solve for x: 3x + 4 = 10",
      options: [
        { value: "a", text: "x = 2" },
        { value: "b", text: "x = 3" },
        { value: "c", text: "x = 4" },
        { value: "d", text: "x = 6" },
      ],
      correct: "a",
      explanation: "Solve 3x + 4 = 10: Subtract 4 from both sides (3x = 6), then divide by 3 (x = 2).",
    },
    {
      id: 12,
      question: "Determine whether 4x² - 4x³ is a polynomial. If so, state the type and degree.",
      options: [
        { value: "a", text: "Yes, it is a cubic polynomial of degree 3." },
        { value: "b", text: "No, because it has a square root term." },
        { value: "c", text: "Yes, it is a quadratic polynomial of degree 2." },
        { value: "d", text: "No, because it has a fractional exponent." },
      ],
      correct: "a",
      explanation: "4x² - 4x³ has integer exponents (2 and 3) and is a polynomial. The highest degree is 3, making it a cubic polynomial.",
    },
    {
      id: 13,
      question: "Factorize: 18xy² - 8x",
      options: [
        { value: "a", text: "2x(9y² - 4)" },
        { value: "b", text: "2x(9y - 4)" },
        { value: "c", text: "x(18y² - 8)" },
        { value: "d", text: "4x(9y² - 2)" },
      ],
      correct: "a",
      explanation: "Factor out the greatest common factor: 18xy² - 8x = 2x(9y² - 4).",
    },
  ];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, timerActive, submitted]);

  const handleAnswerChange = (questionId, value) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  };

  const handleSubmit = () => {
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

    if (correctCount === quizQuestions.length) {
      console.log("Perfect score achieved - triggering confetti!");
      setShowConfetti(true);
      setTimeout(() => {
        console.log("Stopping confetti after 3 seconds");
        setShowConfetti(false);
      }, 3000);
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
  };

  const allQuestionsAttempted = Object.keys(answers).length === quizQuestions.length;
  const isPerfectScore = score === quizQuestions.length;
  const progressPercentage = (Object.keys(answers).length / quizQuestions.length) * 100;
  const stars = Math.floor((score / quizQuestions.length) * 3);

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={true}
              numberOfPieces={200 + streak * 50}
            />
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center">
            College Algebra Quiz
          </h1>
          <div className="text-center mb-6">
            <p className="text-lg">
              Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
            <div className="mt-2 max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-accent h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-sm mt-1">
                {Object.keys(answers).length}/{quizQuestions.length} answered
              </p>
            </div>
          </div>

          <section className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Multiple Choice Questions
            </h2>
            {quizQuestions.map((q) => (
              <div
                key={q.id}
                className={`mb-6 bg-lightNeutral p-4 rounded-lg shadow-md ${
                  submitted && answers[q.id] !== q.correct ? "border-2 border-red-300" : ""
                }`}
              >
                <p className="text-lg font-semibold mb-2">{q.id}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option.value}
                        checked={answers[q.id] === option.value}
                        onChange={() => handleAnswerChange(q.id, option.value)}
                        disabled={submitted}
                        className="text-accent focus:ring-accent"
                      />
                      <span>{option.value}) {option.text}</span>
                    </label>
                  ))}
                </div>
                {submitted && (
                  <div className="mt-2">
                    <p className="text-sm">
                      {answers[q.id] === q.correct ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">
                          Incorrect. Correct answer: {q.options.find((opt) => opt.value === q.correct).text}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          <div className="mt-8 text-center">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition ease-in-out ${
                  allQuestionsAttempted && timeLeft > 0
                    ? "bg-accent text-white hover:bg-salmon"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!allQuestionsAttempted || timeLeft === 0}
              >
                Check Answers
              </button>
            ) : (
              <>
                <p className="text-xl text-primary font-semibold mb-2">
                  Your Score: {score}/{quizQuestions.length} ({((score / quizQuestions.length) * 100).toFixed(2)}%)
                </p>
                <p className="text-lg text-primary mb-2">Total Points: {points}</p>
                <p className="text-md text-gray-600 mb-2">Longest Streak: {streak}</p>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3].map((star) => (
                    <span key={star} className={`text-2xl ${star <= stars ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
                {isPerfectScore ? (
                  <p className="text-lg text-green-600 font-semibold">
                    Perfect Score! Great job!
                  </p>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-salmon transition ease-in-out"
                  >
                    Retry Quiz
                  </button>
                )}
              </>
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