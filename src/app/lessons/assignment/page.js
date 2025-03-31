"use client";

import React, { useState, useRef } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Dynamically import Plot with SSR disabled
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function AssignmentPage() {
  const [plots, setPlots] = useState({
    f1: { points: [], equation: "Math.pow(3, -x)" }, // f(x) = 3^(-x)
    f2: { points: [], equation: "(x + 1) / (x - 2)" }, // f(x) = (x + 1)/(x - 2)
    f3: { points: [], equation: "Math.log2(x - 1)" }, // f(x) = log2(x - 1)
  });
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const pageRef = useRef(null);
  const { user } = useUser(); // Clerk hook to get user info

  const handlePlotClick = (data, funcKey) => {
    const { x, y } = data.points[0];
    setPlots((prev) => ({
      ...prev,
      [funcKey]: { ...prev[funcKey], points: [...prev[funcKey].points, { x, y }] },
    }));
  };

  const handleEquationChange = (funcKey, value) => {
    setPlots((prev) => ({
      ...prev,
      [funcKey]: { ...prev[funcKey], equation: value, points: [] },
    }));
  };

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const generateGraphData = (equation) => {
    const xValues = Array.from({ length: 201 }, (_, i) => (i - 100) / 20); // -5 to 5 with more points for smoothness
    return {
      x: xValues,
      y: xValues.map((x) => {
        try {
          if (equation === "(x + 1) / (x - 2)" && Math.abs(x - 2) < 0.01) return null; // Asymptote at x = 2
          if (equation === "Math.log2(x - 1)" && x - 1 <= 0) return null; // Domain x > 1
          return eval(equation);
        } catch {
          return null;
        }
      }),
      type: "scatter",
      mode: "lines",
      name: "f(x)",
      line: { color: "#1f77b4", width: 3 }, // Bright blue, thicker line
    };
  };

  const handleSubmit = () => {
    const input = pageRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      // Add student name and timestamp at the top
      const studentName = user?.fullName || "Unknown Student";
      const timestamp = new Date().toLocaleString();
      pdf.setFontSize(12);
      pdf.text(`Student: ${studentName}`, 10, 10);
      pdf.text(`Submitted: ${timestamp}`, 10, 20);

      // Add the captured page content
      pdf.addImage(imgData, "PNG", 0, 30, width, height - 30);
      pdf.save("graphing-assignment.pdf");
    });
  };

  return (
    <>
      <SignedIn>
        <div ref={pageRef} className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
            Graphing Assignment (Due: 2/4/2025)
          </h1>

          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">1. Graph f(x) = 3^(-x) (3 Marks)</p>
            <select
              value={plots.f1.equation}
              onChange={(e) => handleEquationChange("f1", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
            >
              <option value="Math.pow(3, -x)">f(x) = 3^(-x)</option>
              <option value="(x + 1) / (x - 2)">f(x) = (x + 1)/(x - 2)</option>
              <option value="Math.log2(x - 1)">f(x) = log2(x - 1)</option>
            </select>
            <Plot
              data={[
                { x: plots.f1.points.map((p) => p.x), y: plots.f1.points.map((p) => p.y), type: "scatter", mode: "markers", name: "Your Points", marker: { color: "#ff7f0e", size: 10 } },
                generateGraphData(plots.f1.equation),
              ]}
              layout={{
                width: 600,
                height: 450,
                title: { text: "f(x) = 3^(-x)", font: { size: 20 } },
                xaxis: { range: [-5, 5], title: { text: "x", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                yaxis: { range: [0, 10], title: { text: "f(x)", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                plot_bgcolor: "#f8f9fa",
                paper_bgcolor: "#f8f9fa",
                showlegend: true,
                legend: { x: 1, y: 1 },
              }}
              onClick={(data) => handlePlotClick(data, "f1")}
              className="mx-auto"
            />
            <p className="mt-4">Question: Does the graph increase or decrease as x increases?</p>
            <input
              type="text"
              value={answers.q1}
              onChange={(e) => handleAnswerChange("q1", e.target.value)}
              className="mt-2 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Type your answer here"
            />
          </div>

          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">2. Graph f(x) = (x + 1)/(x - 2) (4 Marks)</p>
            <select
              value={plots.f2.equation}
              onChange={(e) => handleEquationChange("f2", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
            >
              <option value="Math.pow(3, -x)">f(x) = 3^(-x)</option>
              <option value="(x + 1) / (x - 2)">f(x) = (x + 1)/(x - 2)</option>
              <option value="Math.log2(x - 1)">f(x) = log2(x - 1)</option>
            </select>
            <Plot
              data={[
                { x: plots.f2.points.map((p) => p.x), y: plots.f2.points.map((p) => p.y), type: "scatter", mode: "markers", name: "Your Points", marker: { color: "#ff7f0e", size: 10 } },
                generateGraphData(plots.f2.equation),
              ]}
              layout={{
                width: 600,
                height: 450,
                title: { text: "f(x) = (x + 1)/(x - 2)", font: { size: 20 } },
                xaxis: { range: [-5, 7], title: { text: "x", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                yaxis: { range: [-10, 10], title: { text: "f(x)", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                plot_bgcolor: "#f8f9fa",
                paper_bgcolor: "#f8f9fa",
                showlegend: true,
                legend: { x: 1, y: 1 },
                shapes: [
                  {
                    type: "line",
                    x0: 2,
                    x1: 2,
                    y0: -10,
                    y1: 10,
                    line: { color: "#ff0000", width: 2, dash: "dash" },
                  },
                ],
                annotations: [
                  {
                    x: 2,
                    y: 8,
                    xref: "x",
                    yref: "y",
                    text: "Vertical Asymptote at x = 2",
                    showarrow: true,
                    arrowhead: 2,
                    ax: 20,
                    ay: -30,
                  },
                ],
              }}
              onClick={(data) => handlePlotClick(data, "f2")}
              className="mx-auto"
            />
            <p className="mt-4">Question: What happens to the graph as x approaches 2?</p>
            <input
              type="text"
              value={answers.q2}
              onChange={(e) => handleAnswerChange("q2", e.target.value)}
              className="mt-2 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Type your answer here"
            />
          </div>

          <div className="mb-12">
            <p className="text-lg font-semibold mb-2">3. Graph f(x) = log2(x - 1) (3 Marks)</p>
            <select
              value={plots.f3.equation}
              onChange={(e) => handleEquationChange("f3", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
            >
              <option value="Math.pow(3, -x)">f(x) = 3^(-x)</option>
              <option value="(x + 1) / (x - 2)">f(x) = (x + 1)/(x - 2)</option>
              <option value="Math.log2(x - 1)">f(x) = log2(x - 1)</option>
            </select>
            <Plot
              data={[
                { x: plots.f3.points.map((p) => p.x), y: plots.f3.points.map((p) => p.y), type: "scatter", mode: "markers", name: "Your Points", marker: { color: "#ff7f0e", size: 10 } },
                generateGraphData(plots.f3.equation),
              ]}
              layout={{
                width: 600,
                height: 450,
                title: { text: "f(x) = log2(x - 1)", font: { size: 20 } },
                xaxis: { range: [1, 10], title: { text: "x", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                yaxis: { range: [-3, 3], title: { text: "f(x)", font: { size: 16 } }, gridcolor: "#e0e0e0" },
                plot_bgcolor: "#f8f9fa",
                paper_bgcolor: "#f8f9fa",
                showlegend: true,
                legend: { x: 1, y: 1 },
                shapes: [
                  {
                    type: "line",
                    x0: 1,
                    x1: 1,
                    y0: -3,
                    y1: 3,
                    line: { color: "#ff0000", width: 2, dash: "dash" },
                  },
                ],
                annotations: [
                  {
                    x: 1,
                    y: 2,
                    xref: "x",
                    yref: "y",
                    text: "Domain starts at x = 1",
                    showarrow: true,
                    arrowhead: 2,
                    ax: 20,
                    ay: -30,
                  },
                ],
              }}
              onClick={(data) => handlePlotClick(data, "f3")}
              className="mx-auto"
            />
            <p className="mt-4">Question: What is the domain of the function?</p>
            <input
              type="text"
              value={answers.q3}
              onChange={(e) => handleAnswerChange("q3", e.target.value)}
              className="mt-2 p-2 border rounded w-full max-w-xs bg-white text-black"
              placeholder="Type your answer here"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-salmon"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}