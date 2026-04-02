"use client";

import React, { useState, useEffect, useRef } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Graph Component ---
function PolynomialGraph({ a, b, c }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const PAD = 48;
    const xMin = -5, xMax = 5, yMin = -10, yMax = 20;

    const toCanvasX = (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2);
    const toCanvasY = (y) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let x = xMin; x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), PAD);
      ctx.lineTo(toCanvasX(x), H - PAD);
      ctx.stroke();
    }
    for (let y = yMin; y <= yMax; y += 5) {
      ctx.beginPath();
      ctx.moveTo(PAD, toCanvasY(y));
      ctx.lineTo(W - PAD, toCanvasY(y));
      ctx.stroke();
    }

    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    const yAxisY = Math.max(PAD, Math.min(H - PAD, toCanvasY(0)));
    ctx.beginPath();
    ctx.moveTo(PAD, yAxisY);
    ctx.lineTo(W - PAD, yAxisY);
    ctx.stroke();
    const xAxisX = Math.max(PAD, Math.min(W - PAD, toCanvasX(0)));
    ctx.beginPath();
    ctx.moveTo(xAxisX, PAD);
    ctx.lineTo(xAxisX, H - PAD);
    ctx.stroke();

    ctx.fillStyle = "#374151";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    for (let x = xMin; x <= xMax; x++) {
      if (x !== 0) ctx.fillText(x, toCanvasX(x), yAxisY + 16);
    }
    ctx.textAlign = "right";
    for (let y = yMin; y <= yMax; y += 5) {
      if (y !== 0) ctx.fillText(y, xAxisX - 6, toCanvasY(y) + 4);
    }
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("x", W - PAD + 16, yAxisY + 4);
    ctx.fillText("y", xAxisX, PAD - 10);

    ctx.strokeStyle = "#0066FF";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let px = PAD; px < W - PAD; px++) {
      const x = xMin + ((px - PAD) / (W - PAD * 2)) * (xMax - xMin);
      const y = a * x * x + b * x + c;
      const py = toCanvasY(y);
      if (py < PAD - 10 || py > H - PAD + 10) { started = false; continue; }
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [a, b, c]);

  return <canvas ref={canvasRef} width={560} height={320} className="rounded-lg w-full" />;
}

// --- Worked Example Component ---
const workedExamples = {
  addition: {
    title: "Adding Polynomials",
    problem: "(3x^2 + 2x + 1) + (x^2 - x + 4)",
    steps: [
      {
        label: "Write out both polynomials",
        math: "(3x^2 + 2x + 1) + (x^2 - x + 4)",
        explanation: "Start by writing both polynomials side by side.",
        highlight: "both",
      },
      {
        label: "Group like terms",
        math: "(3x^2 + x^2) + (2x - x) + (1 + 4)",
        explanation: "Rearrange to group terms with the same degree together.",
        highlight: "group",
      },
      {
        label: "Combine x² terms",
        math: "4x^2 + (2x - x) + (1 + 4)",
        explanation: "3x² + x² = 4x². Add the coefficients of like terms.",
        highlight: "x2",
      },
      {
        label: "Combine x terms",
        math: "4x^2 + x + (1 + 4)",
        explanation: "2x − x = x. Subtract the coefficients.",
        highlight: "x",
      },
      {
        label: "Combine constants",
        math: "4x^2 + x + 5",
        explanation: "1 + 4 = 5. This is the final simplified answer.",
        highlight: "result",
      },
    ],
  },
  multiplication: {
    title: "Multiplying Binomials (FOIL)",
    problem: "(x + 2)(x - 3)",
    steps: [
      {
        label: "Write the problem",
        math: "(x + 2)(x - 3)",
        explanation: "FOIL stands for First, Outer, Inner, Last — the four pairs we multiply.",
        highlight: "both",
      },
      {
        label: "First: multiply first terms",
        math: "x \\cdot x = x^2",
        explanation: "Multiply the first term of each binomial: x × x = x².",
        highlight: "first",
      },
      {
        label: "Outer: multiply outer terms",
        math: "x \\cdot (-3) = -3x",
        explanation: "Multiply the outermost terms: x × (−3) = −3x.",
        highlight: "outer",
      },
      {
        label: "Inner: multiply inner terms",
        math: "2 \\cdot x = 2x",
        explanation: "Multiply the innermost terms: 2 × x = 2x.",
        highlight: "inner",
      },
      {
        label: "Last: multiply last terms",
        math: "2 \\cdot (-3) = -6",
        explanation: "Multiply the last term of each binomial: 2 × (−3) = −6.",
        highlight: "last",
      },
      {
        label: "Combine all terms",
        math: "x^2 - 3x + 2x - 6",
        explanation: "Add all four products together.",
        highlight: "combine",
      },
      {
        label: "Simplify like terms",
        math: "x^2 - x - 6",
        explanation: "−3x + 2x = −x. This is the final answer.",
        highlight: "result",
      },
    ],
  },
  factoring: {
    title: "Factoring a Trinomial",
    problem: "x^2 + 5x + 6",
    steps: [
      {
        label: "Identify the trinomial",
        math: "x^2 + 5x + 6",
        explanation: "We want to write this as (x + p)(x + q) for some numbers p and q.",
        highlight: "both",
      },
      {
        label: "Find two numbers that multiply to 6",
        math: "p \\times q = 6",
        explanation: "The constant term is 6. We need two numbers whose product is 6.",
        highlight: "first",
      },
      {
        label: "And add to 5",
        math: "p + q = 5",
        explanation: "The coefficient of x is 5. The same two numbers must also add to 5.",
        highlight: "outer",
      },
      {
        label: "Test pairs: 2 and 3",
        math: "2 \\times 3 = 6 \\text{ and } 2 + 3 = 5 \\checkmark",
        explanation: "2 and 3 work! Their product is 6 and their sum is 5.",
        highlight: "inner",
      },
      {
        label: "Write the factored form",
        math: "(x + 2)(x + 3)",
        explanation: "Substitute p = 2 and q = 3 into (x + p)(x + q).",
        highlight: "result",
      },
      {
        label: "Verify by expanding",
        math: "(x+2)(x+3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6 \\checkmark",
        explanation: "Expand to confirm we get back the original trinomial.",
        highlight: "result",
      },
    ],
  },
  division: {
    title: "Polynomial Long Division",
    problem: "(x^2 - 5x + 6) \\div (x - 2)",
    steps: [
      {
        label: "Set up the division",
        math: "(x^2 - 5x + 6) \\div (x - 2)",
        explanation: "Divide the polynomial x² − 5x + 6 by the divisor x − 2.",
        highlight: "both",
      },
      {
        label: "Divide leading terms",
        math: "x^2 \\div x = x",
        explanation: "Divide the leading term of the dividend (x²) by the leading term of the divisor (x). The result x is the first term of the quotient.",
        highlight: "first",
      },
      {
        label: "Multiply and subtract",
        math: "x(x - 2) = x^2 - 2x",
        explanation: "Multiply x by the full divisor (x − 2) to get x² − 2x.",
        highlight: "outer",
      },
      {
        label: "Find new remainder",
        math: "(x^2 - 5x + 6) - (x^2 - 2x) = -3x + 6",
        explanation: "Subtract x² − 2x from x² − 5x + 6. The new remainder is −3x + 6.",
        highlight: "inner",
      },
      {
        label: "Divide again",
        math: "-3x \\div x = -3",
        explanation: "Divide the leading term of the new remainder (−3x) by x. This gives −3, the next term of the quotient.",
        highlight: "last",
      },
      {
        label: "Multiply and subtract again",
        math: "-3(x - 2) = -3x + 6",
        explanation: "Multiply −3 by (x − 2) to get −3x + 6.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "(x^2 - 5x + 6) \\div (x - 2) = x - 3",
        explanation: "The remainder is 0, so the answer is exactly x − 3. No remainder.",
        highlight: "result",
      },
    ],
  },
};

function WorkedExample({ example }) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const current = example.steps[step];
  const isFirst = step === 0;
  const isLast = step === example.steps.length - 1;

  const goTo = (newStep) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(newStep);
      setAnimating(false);
    }, 200);
  };

  useEffect(() => {
    setStep(0);
  }, [example]);

  const highlightColor = {
    both: "bg-blue-50 border-blue-200",
    first: "bg-teal-50 border-teal-200",
    outer: "bg-purple-50 border-purple-200",
    inner: "bg-amber-50 border-amber-200",
    last: "bg-pink-50 border-pink-200",
    combine: "bg-orange-50 border-orange-200",
    group: "bg-indigo-50 border-indigo-200",
    x2: "bg-teal-50 border-teal-200",
    x: "bg-purple-50 border-purple-200",
    result: "bg-green-50 border-green-200",
  }[current.highlight] || "bg-gray-50 border-gray-200";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Problem */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Problem</p>
        <div className="text-2xl">
          <InlineMath math={example.problem} />
        </div>
      </div>

      {/* Step display */}
      <div className={`border rounded-xl p-6 mb-6 transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"} ${highlightColor}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Step {step + 1} of {example.steps.length}
          </span>
          <span className="text-sm font-semibold text-gray-700">{current.label}</span>
        </div>
        <div className="text-2xl text-center mb-4">
          <InlineMath math={current.math} />
        </div>
        <p className="text-sm text-gray-600 text-center">{current.explanation}</p>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-2 mb-6">
        {example.steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => goTo(step - 1)}
          disabled={isFirst}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={() => goTo(step + 1)}
          disabled={isLast}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          Next →
        </button>
      </div>

      {isLast && (
        <div className="mt-4 text-center py-3 bg-green-50 border border-green-200 rounded-xl text-sm font-semibold text-green-700">
          ✓ Example complete!
        </div>
      )}
    </div>
  );
}

// --- Degree Explorer ---
const degreeTypes = [
  { name: "Constant", degree: 0, math: "P(x) = 5", desc: "A polynomial of degree 0. Just a number — a flat horizontal line.", color: "bg-gray-100 text-gray-700" },
  { name: "Linear", degree: 1, math: "P(x) = 2x + 3", desc: "Degree 1. One bend — a straight line. The coefficient of x controls the slope.", color: "bg-blue-100 text-blue-700" },
  { name: "Quadratic", degree: 2, math: "P(x) = x^2 - 4x + 4", desc: "Degree 2. A parabola — one turning point. Opens up if leading coefficient is positive, down if negative.", color: "bg-teal-100 text-teal-700" },
  { name: "Cubic", degree: 3, math: "P(x) = x^3 + 3x^2 - x - 3", desc: "Degree 3. Up to two turning points. The curve always crosses the x-axis at least once.", color: "bg-purple-100 text-purple-700" },
];

function InfoCard({ symbol, title, description, example }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl font-bold text-primary">{symbol}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <code className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 font-mono">{example}</code>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-sm font-mono font-bold text-primary">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-blue-600" />
    </div>
  );
}

export default function PolynomialsLesson() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(1);
  const [selectedDegree, setSelectedDegree] = useState(2);
  const [activeExample, setActiveExample] = useState("addition");

  const selectedType = degreeTypes.find((d) => d.degree === selectedDegree);

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Polynomials</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Algebraic expressions built from variables, coefficients, and exponents. The building blocks of algebra.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is a Polynomial */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Polynomial?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>polynomial</strong> is an algebraic expression made up of variables, coefficients, and non-negative integer exponents.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center text-xl mb-6">
                <InlineMath math="P(x) = a_nx^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Variables", desc: "Represented by letters like", math: "x" },
                  { name: "Coefficients", desc: "Numbers multiplying variables, like", math: "a_n" },
                  { name: "Degree", desc: "The highest exponent, like", math: "n" },
                ].map(({ name, desc, math }) => (
                  <div key={name} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <p className="font-semibold text-gray-800 mb-1">{name}</p>
                    <p className="text-gray-600 text-sm">{desc} <InlineMath math={math} /></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Degree Explorer */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Types by Degree</h2>
              <p className="text-gray-500 mb-6">Select a type to explore its properties.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {degreeTypes.map((type) => (
                  <button
                    key={type.degree}
                    onClick={() => setSelectedDegree(type.degree)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedDegree === type.degree ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
              {selectedType && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedType.color}`}>Degree {selectedType.degree}</span>
                    <h3 className="text-xl font-bold text-gray-800">{selectedType.name} Polynomial</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedType.desc}</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-lg">
                    <InlineMath math={selectedType.math} />
                  </div>
                </div>
              )}
            </section>

            {/* Term types */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Types by Number of Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Monomial", desc: "One term", example: "3x" },
                  { name: "Binomial", desc: "Two terms", example: "x^2 + 3x" },
                  { name: "Trinomial", desc: "Three terms", example: "x^3 - 2x + 5" },
                ].map(({ name, desc, example }) => (
                  <div key={name} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <p className="font-semibold text-gray-800 mb-1">{name}</p>
                    <p className="text-gray-500 text-sm mb-3">{desc}</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center">
                      <InlineMath math={example} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Operations */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Operations on Polynomials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard symbol="+" title="Addition" description="Combine like terms — terms with the same variable and exponent." example="(3x² + 2x) + (x² − x) = 4x² + x" />
                <InfoCard symbol="−" title="Subtraction" description="Subtract like terms by distributing the negative sign first." example="(3x² + 2x) − (x² − x) = 2x² + 3x" />
                <InfoCard symbol="×" title="Multiplication" description="Use the distributive property — multiply each term by every other term." example="(x + 2)(x − 3) = x² − x − 6" />
                <InfoCard symbol="÷" title="Division" description="Use long division or synthetic division to divide polynomials." example="(x² − 5x + 6) ÷ (x − 2) = x − 3" />
              </div>
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each example at your own pace.</p>

              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(workedExamples).map(([key, ex]) => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeExample === key ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>

              <WorkedExample key={activeExample} example={workedExamples[activeExample]} />
            </section>

            {/* Interactive Graph */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Interactive Graph</h2>
              <p className="text-gray-500 mb-6">
                Drag the sliders to change the coefficients of <InlineMath math="y = ax^2 + bx + c" /> and watch the parabola update in real time.
              </p>
              <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                <div className="text-center text-xl font-mono font-bold text-primary mb-4">
                  <InlineMath math={`y = ${a}x^2 + (${b})x + (${c})`} />
                </div>
                <PolynomialGraph a={a} b={b} c={c} />
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6">
                <Slider label="a (x² coefficient)" value={a} min={-3} max={3} step={0.5} onChange={setA} />
                <Slider label="b (x coefficient)" value={b} min={-5} max={5} step={0.5} onChange={setB} />
                <Slider label="c (constant)" value={c} min={-5} max={5} step={0.5} onChange={setC} />
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                  <p className="font-semibold mb-1">💡 Notice</p>
                  {a > 0 && <p>The parabola opens upward because a &gt; 0.</p>}
                  {a < 0 && <p>The parabola opens downward because a &lt; 0.</p>}
                  {a === 0 && <p>When a = 0 the curve becomes a straight line — a linear polynomial.</p>}
                </div>
              </div>
            </section>

            {/* Factoring */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Factoring Polynomials</h2>
              <p className="text-lg text-gray-700 mb-6">Factoring breaks a polynomial into simpler pieces that multiply to give the original.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Greatest Common Factor", desc: "Factor out the largest common term from all terms.", ex: "6x^2 + 9x = 3x(2x + 3)" },
                  { name: "Factoring Trinomials", desc: "Find two binomials that multiply to give the trinomial.", ex: "x^2 + 5x + 6 = (x+2)(x+3)" },
                  { name: "Difference of Squares", desc: "A special pattern for two perfect squares.", ex: "a^2 - b^2 = (a-b)(a+b)" },
                ].map(({ name, desc, ex }) => (
                  <div key={name} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <p className="font-semibold text-gray-800 mb-2">{name}</p>
                    <p className="text-gray-500 text-sm mb-3">{desc}</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center text-sm">
                      <InlineMath math={ex} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="flex justify-center pb-8">
              <a href="/lessons/polynomials/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Polynomials
                </button>
              </a>
            </div>

          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}