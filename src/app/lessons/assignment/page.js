"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, auth } from "@clerk/nextjs";
import Plot from "react-plotly.js";
import { db } from "@/lib/db";
import { userActivity } from "@/lib/db/schema";

export default function GraphingAssignmentPage() {
  const [plots, setPlots] = useState({
    f1: { points: [], equation: "x" }, // f(x) = x
    f2: { points: [], equation: "1/(x-2)" }, // f(x) = 1/(x-2)
    f3: { points: [], equation: "Math.sqrt(x)" }, // f(x) = √x
  });
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handlePlotClick = (data, funcKey) => {
    if (submitted) return;
    const { x, y } = data.points[0];
    setPlots((prev) => ({
      ...prev,
      [funcKey]: { ...prev[funcKey], points: [...prev[funcKey].points, { x, y }] },
    }));
  };

  const handleEquationChange = (funcKey, value) => {
    if (submitted) return;
    setPlots((prev) => ({
      ...prev,
      [funcKey]: { ...prev[funcKey], equation: value, points: [] }, // Reset points if equation changes
    }));
  };

  const generateGraphData = (equation) => {
    const xValues = Array.from({ length: 21 }, (_, i) => i - 10); // -10 to 10
    return xValues.map((x) => {
      try {
        if (equation === "1/(x-2)" && Math.abs(x - 2) < 0.01) return { x, y: null }; // Asymptote
        const y = eval(equation); // Evaluate equation (unsafe in prod, see notes)
        return { x, y: Number.isFinite(y) ? y : null };
      } catch {
        return { x, y: null };
      }
    });
  };

  const handleAnswerChange = (question, value) => {
    if (!submitted) setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    if (answers.q1 === "increases") correctCount += 3;
    if (answers.q2 === "vertical asymptote") correctCount += 4;
    if (answers.q3 === "x ≥ 0") correctCount += 3;

    const { userId } = auth();
    if (userId) {
      await db.insert(userActivity).values({
        userId,
        action: "graphing_attempt",
        timestamp: Date.now() / 1000,
        details: JSON.stringify({
          score: correctCount,
          total: 10,
          completed: correctCount === 10,
          answers,
          plots,
        }),
      });
    }

    setScore(correctCount);
    setSubmitted(true);
  };

  const resetAssignment = () => {
    setPlots({
      f1: { points: [], equation: "x" },
      f2: { points: [], equation: "1/(x-2)" },
      f3: { points: [], equation: "Math.sqrt(x)" },
    });
    setAnswers({ q1: "", q2: "", q3: "" });
    setSubmitted(false);
    setScore(0);
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
            Graphing Assignment (Due: 2/4/2025)
          </h1>

          {/* Function 1: f(x) = x */}
          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">1. Graph f(x) = x (3 Marks)</p>
            <input
              type="text"
              value={plots.f1.equation}
              onChange={(e) => handleEquationChange("f1", e.target.value)}
              disabled={submitted}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Enter equation (e.g., x)"
            />
            <Plot
              data={[
                { x: plots.f1.points.map(p => p.x), y: plots.f1.points.map(p => p.y), type: "scatter", mode: "markers", name: "Your Points" },
                { ...generateGraphData(plots.f1.equation), type: "scatter", mode: "lines", name: "f(x) = x" },
              ]}
              layout={{ width: 500, height: 400, title: "f(x) = x", xaxis: { range: [-5, 5] }, yaxis: { range: [-5, 5] } }}
              onClick={(data) => handlePlotClick(data, "f1")}
              className="mx-auto"
            />
            <p className="mt-4">Does the graph increase or decrease as x increases?</p>
            <select
              value={answers.q1}
              onChange={(e) => handleAnswerChange("q1", e.target.value)}
              disabled={submitted}
              className="mt-2 p-2 border rounded bg-white text-black"
            >
              <option value="">Select</option>
              <option value="increases">Increases</option>
              <option value="decreases">Decreases</option>
            </select>
            {submitted && (
              <p className="text-sm mt-2">
                {answers.q1 === "increases" ? "Correct! (3/3)" : "Incorrect. It increases as x increases. (0/3)"}
              </p>
            )}
          </div>

          {/* Function 2: f(x) = 1/(x-2) */}
          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">2. Graph f(x) = 1/(x-2) (4 Marks)</p>
            <input
              type="text"
              value={plots.f2.equation}
              onChange={(e) => handleEquationChange("f2", e.target.value)}
              disabled={submitted}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Enter equation (e.g., 1/(x-2))"
            />
            <Plot
              data={[
                { x: plots.f2.points.map(p => p.x), y: plots.f2.points.map(p => p.y), type: "scatter", mode: "markers", name: "Your Points" },
                { ...generateGraphData(plots.f2.equation), type: "scatter", mode: "lines", name: "f(x) = 1/(x-2)" },
              ]}
              layout={{ width: 500, height: 400, title: "f(x) = 1/(x-2)", xaxis: { range: [-5, 7] }, yaxis: { range: [-10, 10] } }}
              onClick={(data) => handlePlotClick(data, "f2")}
              className="mx-auto"
            />
            <p className="mt-4">What happens to the graph as x approaches 2?</p>
            <select
              value={answers.q2}
              onChange={(e) => handleAnswerChange("q2", e.target.value)}
              disabled={submitted}
              className="mt-2 p-2 border rounded bg-white text-black"
            >
              <option value="">Select</option>
              <option value="vertical asymptote">Vertical Asymptote</option>
              <option value="horizontal asymptote">Horizontal Asymptote</option>
              <option value="zero">Becomes Zero</option>
            </select>
            {submitted && (
              <p className="text-sm mt-2">
                {answers.q2 === "vertical asymptote" ? "Correct! (4/4)" : "Incorrect. It has a vertical asymptote at x = 2. (0/4)"}
              </p>
            )}
          </div>

          {/* Function 3: f(x) = √x */}
          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">3. Graph f(x) = √x (3 Marks)</p>
            <input
              type="text"
              value={plots.f3.equation}
              onChange={(e) => handleEquationChange("f3", e.target.value)}
              disabled={submitted}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Enter equation (e.g., Math.sqrt(x))"
            />
            <Plot
              data={[
                { x: plots.f3.points.map(p => p.x), y: plots.f3.points.map(p => p.y), type: "scatter", mode: "markers", name: "Your Points" },
                { ...generateGraphData(plots.f3.equation), type: "scatter", mode: "lines", name: "f(x) = √x" },
              ]}
              layout={{ width: 500, height: 400, title: "f(x) = √x", xaxis: { range: [0, 10] }, yaxis: { range: [0, 5] } }}
              onClick={(data) => handlePlotClick(data, "f3")}
              className="mx-auto"
            />
            <p className="mt-4">What is the domain of the function?</p>
            <select
              value={answers.q3}
              onChange={(e) => handleAnswerChange("q3", e.target.value)}
              disabled={submitted}
              className="mt-2 p-2 border rounded bg-white text-black"
            >
              <option value="">Select</option>
              <option value="all reals">All Real Numbers</option>
              <option value="x ≥ 0">x ≥ 0</option>
              <option value="x > 0">x > 0</option>
            </select>
            {submitted && (
              <p className="text-sm mt-2">
                {answers.q3 === "x ≥ 0" ? "Correct! (3/3)" : "Incorrect. Domain is x ≥ 0 since √x is real only for non-negative x. (0/3)"}
              </p>
            )}
          </div>

          <div className="text-center">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-salmon transition ease-in-out"
                disabled={!answers.q1 || !answers.q2 || !answers.q3}
              >
                Submit Assignment
              </button>
            ) : (
              <>
                <p className="text-xl text-primary font-semibold mb-4">
                  Score: {score}/10 ({(score / 10 * 100).toFixed(2)}%)
                </p>
                <button
                  onClick={resetAssignment}
                  className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-salmon transition ease-in-out"
                >
                  Retry Assignment
                </button>
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