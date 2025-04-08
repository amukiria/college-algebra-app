"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath, BlockMath } from "react-katex"; // Added BlockMath import
import "katex/dist/katex.min.css";

export default function ExamPracticePage() {
  const [answers, setAnswers] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "",
    q10: "", q11: "", q12: "", q13: "", q14: "", q15: "", q16: "", q17: "", q18: "", q19: "",
  });
  const [feedback, setFeedback] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "",
    q10: "", q11: "", q12: "", q13: "", q14: "", q15: "", q16: "", q17: "", q18: "", q19: "",
  });
  const [hintIndex, setHintIndex] = useState({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0,
    q10: 0, q11: 0, q12: 0, q13: 0, q14: 0, q15: 0, q16: 0, q17: 0, q18: 0, q19: 0,
  });

  const correctAnswers = {
    q1: "15625", // (5^2)^3 = 5^6 = 15625
    q2: "y^-3", // 1/y^3 = y^(-3)
    q3: "1/(8y^6)", // ((3y^2)/(6y^4))^3 = (1/(2y^2))^3 = 1/(8y^6)
    q4: "5sqrt(2)", // sqrt(50) = sqrt(25*2) = 5sqrt(2)
    q5: "sqrt(5)/5", // Rationalize 1/sqrt(5) = sqrt(5)/5
    q6: "2sqrt(2)", // sqrt(50) - sqrt(18) = 5sqrt(2) - 3sqrt(2) = 2sqrt(2)
    q7: "7sqrt(2)-5sqrt(3)", // 4sqrt(50) + 3sqrt(12) - 5sqrt(27) + sqrt(32)
    q8: "-1", // i^6 = (i^2)^3 = (-1)^3 = -1
    q9: "5-i", // (1-i)(4+i) = 4 + i - 4i - i^2 = 4 - 3i + 1 = 5 - i
    q10: "x=-2,x=-4", // x^2 + 6x + 8 = 0, solutions are x = -2, x = -4
    q11: "x=2,y=2", // 3x + 2y = 10, 5x - y = 4, solution is x = 2, y = 2
    q12: "6", // Coefficient of x^2 in (x-1)^4 is 6
    q13: "9", // Coefficient of x^2 in (3x+1)^3 is 9
    q14: "2", // 3rd term of GP is 9, 6th term is 72, common ratio r = 2
    q15: "42", // Arithmetic sequence: a1 = 6, d = 4, 10th term = 42
    q16: "24", // 3, 7, 11, ..., 95 is the 24th term
    q17: "96", // Geometric sequence: a1 = 3, r = 2, 6th term = 96
    q18: "3", // 4th term of GP is 81, 6th term is 729, common ratio r = 3
  };

  const hints = {
    q1: ["Use the power rule: (a^m)^n = a^(m*n).", "So, (5^2)^3 = 5^(2*3) = 5^6.", "Calculate 5^6 = 15625."],
    q2: ["Recall that 1/a^n = a^(-n).", "So, 1/y^3 = y^(-3)."],
    q3: ["Simplify the fraction: (3y^2)/(6y^4) = 1/(2y^2).", "Then raise to the 3rd power: (1/(2y^2))^3 = 1/(8y^6)."],
    q4: ["Break down sqrt(50): sqrt(50) = sqrt(25*2).", "Simplify: sqrt(25*2) = 5sqrt(2)."],
    q5: ["Multiply numerator and denominator by sqrt(5).", "So, 1/sqrt(5) = sqrt(5)/5."],
    q6: ["Simplify each term: sqrt(50) = 5sqrt(2), sqrt(18) = 3sqrt(2).", "Subtract: 5sqrt(2) - 3sqrt(2) = 2sqrt(2)."],
    q7: ["Simplify each term: 4sqrt(50) = 20sqrt(2), 3sqrt(12) = 6sqrt(3), 5sqrt(27) = 15sqrt(3), sqrt(32) = 4sqrt(2).", "Combine: 20sqrt(2) + 6sqrt(3) - 15sqrt(3) + 4sqrt(2) = 24sqrt(2) - 9sqrt(3)."],
    q8: ["Recall i^2 = -1, so i^6 = (i^2)^3.", "Thus, i^6 = (-1)^3 = -1."],
    q9: ["Distribute: (1-i)(4+i) = 4 + i - 4i - i^2.", "Since i^2 = -1, this is 4 - 3i + 1 = 5 - i."],
    q10: ["Complete the square: x^2 + 6x + 8 = 0, rewrite as (x + 3)^2 - 1 = 0.", "Solve: (x + 3)^2 = 1, so x + 3 = ±1, x = -2 or x = -4."],
    q11: ["Solve the second equation for y: 5x - y = 4, so y = 5x - 4.", "Substitute into the first: 3x + 2(5x - 4) = 10, solve for x = 2, then y = 2."],
    q12: ["Expand (x-1)^4 using Pascal’s Triangle (n=4): 1, 4, 6, 4, 1.", "Terms: x^4 - 4x^3 + 6x^2 - 4x + 1, so coefficient of x^2 is 6."],
    q13: ["Expand (3x+1)^3 using Pascal’s Triangle (n=3): 1, 3, 3, 1.", "Terms: 27x^3 + 27x^2 + 9x + 1, so coefficient of x^2 is 27/3 = 9."],
    q14: ["Use the GP formula: a_r = a_1 * r^(r-1). 3rd term: a_1 * r^2 = 9, 6th term: a_1 * r^5 = 72.", "Divide: (a_1 * r^5)/(a_1 * r^2) = 72/9, so r^3 = 8, r = 2."],
    q15: ["Use the arithmetic sequence formula: a_n = a_1 + (n-1)d.", "a_1 = 6, d = 4, n = 10, so a_10 = 6 + (10-1)*4 = 42."],
    q16: ["Sequence: 3, 7, 11, ..., a_1 = 3, d = 4. Use a_n = a_1 + (n-1)d.", "Set a_n = 95: 3 + (n-1)*4 = 95, solve for n = 24."],
    q17: ["Use the GP formula: a_n = a_1 * r^(n-1).", "a_1 = 3, r = 2, n = 6, so a_6 = 3 * 2^5 = 3 * 32 = 96."],
    q18: ["4th term: a_1 * r^3 = 81, 6th term: a_1 * r^5 = 729.", "Divide: (a_1 * r^5)/(a_1 * r^3) = 729/81, so r^2 = 9, r = 3."],
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
        [question]: "Incorrect. Try using the hints to guide you, or review the relevant topic.",
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
            Exam Practice Questions - College Algebra (Spring 2025)
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Practice Questions</h2>

            {/* Q1: Simplify (5^2)^3 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                1. Simplify <InlineMath math="(5^2)^3" />.
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

            {/* Q2: Express 1/y^3 using a negative exponent */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                2. Express <InlineMath math="1/y^3" /> using a negative exponent.
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

            {/* Q3: Simplify ((3y^2)/(6y^4))^3 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                3. What is the simplified form of <InlineMath math="\left(\frac{3y^2}{6y^4}\right)^3" />?
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

            {/* Q4: Simplify sqrt(50) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                4. Simplify <InlineMath math="\sqrt{50}" />.
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

            {/* Q5: Rationalize 1/sqrt(5) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                5. Rationalize the denominator of <InlineMath math="\frac{1}{\sqrt{5}}" />.
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

            {/* Q6: Simplify sqrt(50) - sqrt(18) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                6. Simplify <InlineMath math="\sqrt{50} - \sqrt{18}" />.
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

            {/* Q7: Simplify 4sqrt(50) + 3sqrt(12) - 5sqrt(27) + sqrt(32) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                7. Simplify and evaluate <InlineMath math="4\sqrt{50} + 3\sqrt{12} - 5\sqrt{27} + \sqrt{32}" />.
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

            {/* Q8: Value of i^6 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                8. What is the value of <InlineMath math="i^6" />?
              </p>
              <input
                type="text"
                value={answers.q8}
                onChange={(e) => handleAnswerChange("q8", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q8")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q8")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q8 >= hints.q8.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q8 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q8[hintIndex.q8 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q8}</p>
            </div>

            {/* Q9: Multiply (1-i)(4+i) */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                9. Multiply <InlineMath math="(1 - i)(4 + i)" />.
              </p>
              <input
                type="text"
                value={answers.q9}
                onChange={(e) => handleAnswerChange("q9", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q9")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q9")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q9 >= hints.q9.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q9 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q9[hintIndex.q9 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q9}</p>
            </div>

            {/* Q10: Solve x^2 + 6x + 8 = 0 by completing the square */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                10. Solve the quadratic equation by completing the square method: <InlineMath math="x^2 + 6x + 8 = 0" />.
              </p>
              <input
                type="text"
                value={answers.q10}
                onChange={(e) => handleAnswerChange("q10", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q10")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q10")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q10 >= hints.q10.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q10 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q10[hintIndex.q10 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q10}</p>
            </div>

            {/* Q11: Solve system of equations */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                11. Solve the system of equations by substitution method:
              </p>
              <div className="my-4">
                <BlockMath math="3x + 2y = 10" />
                <BlockMath math="5x - y = 4" />
              </div>
              <input
                type="text"
                value={answers.q11}
                onChange={(e) => handleAnswerChange("q11", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q11")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q11")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q11 >= hints.q11.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q11 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q11[hintIndex.q11 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q11}</p>
            </div>

            {/* Q12: Coefficient of x^2 in (x-1)^4 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                12. In the expansion of <InlineMath math="(x - 1)^4" />, what is the coefficient of <InlineMath math="x^2" />?
              </p>
              <input
                type="text"
                value={answers.q12}
                onChange={(e) => handleAnswerChange("q12", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q12")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q12")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q12 >= hints.q12.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q12 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q12[hintIndex.q12 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q12}</p>
            </div>

            {/* Q13: Coefficient of x^2 in (3x+1)^3 */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                13. In the expansion of <InlineMath math="(3x + 1)^3" />, what is the coefficient of <InlineMath math="x^2" />?
              </p>
              <input
                type="text"
                value={answers.q13}
                onChange={(e) => handleAnswerChange("q13", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q13")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q13")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q13 >= hints.q13.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q13 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q13[hintIndex.q13 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q13}</p>
            </div>

            {/* Q14: Common ratio of GP */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                14. The 3rd term of a geometric progression (GP) is 9 and the 6th term is 72. Find the common ratio.
              </p>
              <input
                type="text"
                value={answers.q14}
                onChange={(e) => handleAnswerChange("q14", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q14")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q14")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q14 >= hints.q14.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q14 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q14[hintIndex.q14 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q14}</p>
            </div>

            {/* Q15: 10th term of arithmetic sequence */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                15. The first term of an arithmetic sequence is 6 and the common difference is 4. What is the 10th term?
              </p>
              <input
                type="text"
                value={answers.q15}
                onChange={(e) => handleAnswerChange("q15", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q15")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q15")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q15 >= hints.q15.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q15 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q15[hintIndex.q15 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q15}</p>
            </div>

            {/* Q16: Which term is 95 in 3, 7, 11, ... */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                16. Which term of the arithmetic sequence 3, 7, 11, … is equal to 95?
              </p>
              <input
                type="text"
                value={answers.q16}
                onChange={(e) => handleAnswerChange("q16", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q16")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q16")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q16 >= hints.q16.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q16 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q16[hintIndex.q16 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q16}</p>
            </div>

            {/* Q17: 6th term of geometric sequence */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                17. The first term of a geometric sequence is 3 and the common ratio is 2. What is the 6th term?
              </p>
              <input
                type="text"
                value={answers.q17}
                onChange={(e) => handleAnswerChange("q17", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q17")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q17")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q17 >= hints.q17.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q17 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q17[hintIndex.q17 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q17}</p>
            </div>

            {/* Q18: Common ratio of GP */}
            <div className="mb-6">
              <p className="text-lg mb-2">
                18. The 4th term of a geometric progression (GP) is 81 and the 6th term is 729. Find the common ratio.
              </p>
              <input
                type="text"
                value={answers.q18}
                onChange={(e) => handleAnswerChange("q18", e.target.value)}
                className="p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => checkAnswer("q18")}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-salmon"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => showHint("q18")}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  disabled={hintIndex.q18 >= hints.q18.length - 1}
                >
                  Show Hint
                </button>
              </div>
              {hintIndex.q18 > 0 && (
                <p className="mt-2 text-lg text-gray-700">Hint: {hints.q18[hintIndex.q18 - 1]}</p>
              )}
              <p className="mt-2 text-lg">{feedback.q18}</p>
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