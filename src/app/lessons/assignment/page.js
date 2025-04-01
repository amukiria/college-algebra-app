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
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
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

  const addHeader = (pdf, studentName, timestamp, currentPage, totalPages, margin) => {
    pdf.setFontSize(12);
    pdf.text(`Student Name: ${studentName}`, margin, 10);
    pdf.text(`Course: MTH 1109 D – College Algebra`, margin, 16);
    pdf.text(`Graphs Assignment`, margin, 22);
    pdf.text(`Submission Time: ${timestamp}`, margin, 28);
    pdf.text(`Page ${currentPage} of ${totalPages}`, pdf.internal.pageSize.getWidth() - margin - 30, 28);
  };

  const handleSubmit = async () => {
    // Validation: Check if all answers are provided
    const missingAnswers = [];
    if (!answers.q1.trim()) missingAnswers.push("Question 1");
    if (!answers.q2.trim()) missingAnswers.push("Question 2");
    if (!answers.q3.trim()) missingAnswers.push("Question 3");

    if (missingAnswers.length > 0) {
      alert(`Please provide answers for the following questions: ${missingAnswers.join(", ")}.`);
      return; // Stop PDF generation if validation fails
    }

    // Proceed with PDF generation if all answers are provided
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    let currentPage = 1;

    // Student particulars
    const studentName = user?.fullName || "Unknown Student";
    const timestamp = new Date().toLocaleString();

    // Array of sections to capture
    const sections = [
      { ref: section1Ref, title: "1. Graph f(x) = 3^(-x)" },
      { ref: section2Ref, title: "2. Graph f(x) = (x + 1)/(x - 2)" },
      { ref: section3Ref, title: "3. Graph f(x) = log2(x - 1)" },
    ];

    // Total pages (one section per page)
    const totalPages = sections.length;

    for (let i = 0; i < sections.length; i++) {
      const { ref, title } = sections[i];
      if (!ref.current) continue;

      // Add a new page for each section
      if (i > 0) {
        pdf.addPage();
        currentPage++;
      }

      // Add header to the page
      addHeader(pdf, studentName, timestamp, currentPage, totalPages, margin);

      // Capture the section with html2canvas
      const canvas = await html2canvas(ref.current, { scale: 1, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - 2 * margin; // Adjusted to fit within margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add section title
      let currentY = 40; // Start below the header
      pdf.setFontSize(16);
      pdf.text(title, margin, currentY);
      currentY += 10;

      // Add the captured image
      pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);
    }

    pdf.save("graphing-assignment.pdf");
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
            Graphing Assignment (Due: 2/4/2025)
          </h1>

          <div ref={section1Ref} className="mb-12 bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">1. Graph f(x) = 3^(-x) (3 Marks)</p>
            <select
              value={plots.f1.equation}
              onChange={(e) => handleEquationChange("f1", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
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
            <p className="mt-4 text-lg">Question: Does the graph increase or decrease as x increases?</p>
            <textarea
              value={answers.q1}
              onChange={(e) => handleAnswerChange("q1", e.target.value)}
              className="mt-2 p-3 border rounded w-full max-w-md bg-white text-black text-lg h-24 resize-y"
              placeholder="Type your answer here"
            />
          </div>

          <div ref={section2Ref} className="mb-12 bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">2. Graph f(x) = (x + 1)/(x - 2) (4 Marks)</p>
            <select
              value={plots.f2.equation}
              onChange={(e) => handleEquationChange("f2", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
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
              }}
              onClick={(data) => handlePlotClick(data, "f2")}
              className="mx-auto"
            />
            <p className="mt-4 text-lg">Question: What happens to the graph as x approaches 2?</p>
            <textarea
              value={answers.q2}
              onChange={(e) => handleAnswerChange("q2", e.target.value)}
              className="mt-2 p-3 border rounded w-full max-w-md bg-white text-black text-lg h-24 resize-y"
              placeholder="Type your answer here"
            />
          </div>

          <div ref={section3Ref} className="mb-12 bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">3. Graph f(x) = log2(x - 1) (3 Marks)</p>
            <select
              value={plots.f3.equation}
              onChange={(e) => handleEquationChange("f3", e.target.value)}
              className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black text-lg"
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
              }}
              onClick={(data) => handlePlotClick(data, "f3")}
              className="mx-auto"
            />
            <p className="mt-4 text-lg">Question: What is the domain of the function?</p>
            <textarea
              value={answers.q3}
              onChange={(e) => handleAnswerChange("q3", e.target.value)}
              className="mt-2 p-3 border rounded w-full max-w-md bg-white text-black text-lg h-24 resize-y"
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