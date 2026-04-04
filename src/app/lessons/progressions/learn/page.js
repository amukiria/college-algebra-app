"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  apnth: {
    title: "AP: nth Term",
    problem: "\\text{Find } a_{10} \\text{ for } 3, 7, 11, 15, \\ldots",
    steps: [
      {
        label: "Identify the sequence",
        math: "3, 7, 11, 15, \\ldots",
        explanation: "This is an Arithmetic Progression — the difference between consecutive terms is constant.",
        highlight: "both",
      },
      {
        label: "Find the first term",
        math: "a_1 = 3",
        explanation: "The first term is 3.",
        highlight: "first",
      },
      {
        label: "Find the common difference",
        math: "d = 7 - 3 = 4",
        explanation: "Subtract any term from the next: 7 − 3 = 4. The common difference d = 4.",
        highlight: "outer",
      },
      {
        label: "State the nth term formula",
        math: "a_n = a_1 + (n-1)d",
        explanation: "This formula gives any term in an arithmetic progression.",
        highlight: "inner",
      },
      {
        label: "Substitute n=10",
        math: "a_{10} = 3 + (10-1) \\times 4",
        explanation: "Replace a₁ with 3, n with 10, and d with 4.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "a_{10} = 3 + 36 = 39",
        explanation: "(10−1) × 4 = 36. So the 10th term is 39.",
        highlight: "result",
      },
    ],
  },
  apsum: {
    title: "AP: Sum of n Terms",
    problem: "S_5 \\text{ for } 3, 7, 11, 15, \\ldots",
    steps: [
      {
        label: "Identify known values",
        math: "a_1 = 3, \\quad d = 4, \\quad n = 5",
        explanation: "We need a₁, d, and n to use the sum formula.",
        highlight: "both",
      },
      {
        label: "Find the 5th term first",
        math: "a_5 = 3 + (5-1) \\times 4 = 3 + 16 = 19",
        explanation: "Use the nth term formula to find a₅ = 19.",
        highlight: "first",
      },
      {
        label: "State the sum formula",
        math: "S_n = \\frac{n}{2}(a_1 + a_n)",
        explanation: "The sum of n terms equals n/2 times the sum of the first and last terms.",
        highlight: "outer",
      },
      {
        label: "Substitute values",
        math: "S_5 = \\frac{5}{2}(3 + 19)",
        explanation: "Replace n=5, a₁=3, and aₙ=19.",
        highlight: "inner",
      },
      {
        label: "Simplify",
        math: "S_5 = \\frac{5}{2} \\times 22 = 5 \\times 11",
        explanation: "3 + 19 = 22, then 5/2 × 22 = 5 × 11.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "S_5 = 55",
        explanation: "The sum of the first 5 terms is 55.",
        highlight: "result",
      },
    ],
  },
  gpnth: {
    title: "GP: nth Term",
    problem: "\\text{Find } a_6 \\text{ for } 3, 6, 12, 24, \\ldots",
    steps: [
      {
        label: "Identify the sequence",
        math: "3, 6, 12, 24, \\ldots",
        explanation: "This is a Geometric Progression — the ratio between consecutive terms is constant.",
        highlight: "both",
      },
      {
        label: "Find the first term",
        math: "a_1 = 3",
        explanation: "The first term is 3.",
        highlight: "first",
      },
      {
        label: "Find the common ratio",
        math: "r = \\frac{6}{3} = 2",
        explanation: "Divide any term by the previous: 6 ÷ 3 = 2. The common ratio r = 2.",
        highlight: "outer",
      },
      {
        label: "State the nth term formula",
        math: "a_n = a_1 \\cdot r^{n-1}",
        explanation: "This formula gives any term in a geometric progression.",
        highlight: "inner",
      },
      {
        label: "Substitute n=6",
        math: "a_6 = 3 \\cdot 2^{6-1} = 3 \\cdot 2^5",
        explanation: "Replace a₁ with 3, r with 2, and n with 6.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "a_6 = 3 \\cdot 32 = 96",
        explanation: "2⁵ = 32, so a₆ = 3 × 32 = 96.",
        highlight: "result",
      },
    ],
  },
  gpsum: {
    title: "GP: Sum & Infinite",
    problem: "S_4 \\text{ and } S_\\infty \\text{ for GP}",
    steps: [
      {
        label: "Finite sum: sequence 3, 6, 12, 24",
        math: "a_1 = 3, \\quad r = 2, \\quad n = 4",
        explanation: "We want the sum of the first 4 terms of 3, 6, 12, 24.",
        highlight: "both",
      },
      {
        label: "State the finite sum formula",
        math: "S_n = a_1 \\frac{1 - r^n}{1 - r} \\quad (r \\neq 1)",
        explanation: "Use this formula when |r| ≠ 1.",
        highlight: "first",
      },
      {
        label: "Substitute values",
        math: "S_4 = 3 \\cdot \\frac{1 - 2^4}{1 - 2}",
        explanation: "Replace a₁=3, r=2, n=4.",
        highlight: "outer",
      },
      {
        label: "Simplify",
        math: "S_4 = 3 \\cdot \\frac{1 - 16}{-1} = 3 \\cdot \\frac{-15}{-1} = 3 \\cdot 15",
        explanation: "1 − 16 = −15, divided by 1 − 2 = −1, gives 15.",
        highlight: "inner",
      },
      {
        label: "Finite sum answer",
        math: "S_4 = 45",
        explanation: "3 × 15 = 45. Verify: 3 + 6 + 12 + 24 = 45 ✓",
        highlight: "combine",
      },
      {
        label: "Infinite sum: sequence 1, 0.5, 0.25...",
        math: "S_\\infty = \\frac{a_1}{1 - r} = \\frac{1}{1 - 0.5} = \\frac{1}{0.5} = 2",
        explanation: "When |r| < 1, the sum converges. Here a₁=1 and r=0.5, so S∞ = 2.",
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

  React.useEffect(() => {
    setStep(0);
  }, [example]);

  const highlightColor = {
    both: "bg-blue-50 border-blue-200",
    first: "bg-teal-50 border-teal-200",
    outer: "bg-purple-50 border-purple-200",
    inner: "bg-amber-50 border-amber-200",
    combine: "bg-orange-50 border-orange-200",
    result: "bg-green-50 border-green-200",
  }[current.highlight] || "bg-gray-50 border-gray-200";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Problem</p>
        <div className="text-xl"><InlineMath math={example.problem} /></div>
      </div>

      <div className={`border rounded-xl p-6 mb-6 transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"} ${highlightColor}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Step {step + 1} of {example.steps.length}
          </span>
          <span className="text-sm font-semibold text-gray-700">{current.label}</span>
        </div>
        <div className="text-xl text-center mb-4">
          <InlineMath math={current.math} />
        </div>
        <p className="text-sm text-gray-600 text-center">{current.explanation}</p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {example.steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>

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

// --- Interactive Sequence Explorer ---
function SequenceExplorer() {
  const [type, setType] = useState("ap");
  const [a1, setA1] = useState(3);
  const [d, setD] = useState(4);
  const [r, setR] = useState(2);
  const [n, setN] = useState(8);

  const terms = Array.from({ length: n }, (_, i) => {
    if (type === "ap") return a1 + i * d;
    return +(a1 * Math.pow(r, i)).toFixed(3);
  });

  const sum = terms.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setType("ap")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${type === "ap" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Arithmetic (AP)
        </button>
        <button
          onClick={() => setType("gp")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${type === "gp" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Geometric (GP)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">First term (a₁)</label>
          <input
            type="number"
            value={a1}
            onChange={(e) => setA1(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {type === "ap" ? "Common difference (d)" : "Common ratio (r)"}
          </label>
          <input
            type="number"
            value={type === "ap" ? d : r}
            onChange={(e) => type === "ap" ? setD(Number(e.target.value)) : setR(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Number of terms (n)</label>
          <input
            type="number"
            min={1}
            max={12}
            value={n}
            onChange={(e) => setN(Math.min(12, Math.max(1, Number(e.target.value))))}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {terms.map((t, i) => (
          <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm font-mono text-blue-800">
            a{i + 1} = {t}
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-1">Sum of {n} terms</p>
        <p className="text-2xl font-bold text-green-700">S{n} = {+sum.toFixed(4)}</p>
      </div>

      {type === "gp" && Math.abs(r) < 1 && (
        <div className="mt-3 bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Infinite sum (|r| &lt; 1)</p>
          <p className="text-xl font-bold text-purple-700">S∞ = {+(a1 / (1 - r)).toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}

// --- Quick Check ---
const quickChecks = [
  {
    problem: "\\text{Find } a_8 \\text{ for the AP: } 2, 5, 8, 11, \\ldots",
    answer: "23",
    hint: "Use aₙ = a₁ + (n−1)d. Here a₁=2, d=3, n=8.",
  },
  {
    problem: "\\text{Find } S_3 \\text{ for the GP: } 2, 6, 18, 54, \\ldots",
    answer: "26",
    hint: "Add the first 3 terms: 2 + 6 + 18 = 26.",
  },
];

function QuickCheck() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const current = quickChecks[idx];

  const check = () => {
    if (input.trim() === current.answer) {
      setFeedback({ type: "correct", message: "Correct! 🎉" });
    } else {
      setFeedback({ type: "wrong", message: "Not quite — try again or use the hint." });
    }
  };

  const next = () => {
    setIdx((i) => (i + 1) % quickChecks.length);
    setInput("");
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-500">Problem {idx + 1} of {quickChecks.length}</span>
        <button onClick={next} className="text-sm text-primary font-semibold hover:underline">Next problem →</button>
      </div>

      <div className="text-lg text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer"
        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
      />

      <div className="flex gap-3 mb-3">
        <button onClick={check} className="flex-1 py-2.5 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm">
          Check Answer
        </button>
        <button
          onClick={() => setShowHint(true)}
          className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm"
        >
          Hint
        </button>
      </div>

      {showHint && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-3">
          💡 {current.hint}
        </div>
      )}

      {feedback && (
        <div className={`text-center py-3 rounded-xl text-sm font-semibold ${
          feedback.type === "correct"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}

function ConceptCard({ title, desc, example, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color} mb-3 inline-block`}>{title}</span>
      <p className="text-gray-600 text-sm mb-3">{desc}</p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center text-sm">
        <InlineMath math={example} />
      </div>
    </div>
  );
}

export default function ProgressionsLearnPage() {
  const [activeExample, setActiveExample] = useState("apnth");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Progressions</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Arithmetic and Geometric sequences — learn to find any term and sum any number of terms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* AP vs GP */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Two Types of Progressions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Arithmetic Progression (AP)</h3>
                  <p className="text-gray-700 text-sm mb-4">Each term is obtained by <strong>adding</strong> a constant difference to the previous term.</p>
                  <div className="bg-white rounded-xl p-3 text-center mb-3">
                    <InlineMath math="3, 7, 11, 15, \ldots \quad d = 4" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded-lg p-2 text-center"><InlineMath math="a_n = a_1 + (n-1)d" /></div>
                    <div className="bg-white rounded-lg p-2 text-center"><InlineMath math="S_n = \frac{n}{2}(a_1 + a_n)" /></div>
                  </div>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-teal-700 mb-3">Geometric Progression (GP)</h3>
                  <p className="text-gray-700 text-sm mb-4">Each term is obtained by <strong>multiplying</strong> by a constant ratio.</p>
                  <div className="bg-white rounded-xl p-3 text-center mb-3">
                    <InlineMath math="3, 6, 12, 24, \ldots \quad r = 2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded-lg p-2 text-center"><InlineMath math="a_n = a_1 \cdot r^{n-1}" /></div>
                    <div className="bg-white rounded-lg p-2 text-center"><InlineMath math="S_n = a_1\frac{1-r^n}{1-r}" /></div>
                    <div className="bg-white rounded-lg p-2 text-center"><InlineMath math="S_\infty = \frac{a_1}{1-r} \quad |r| < 1" /></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Formulas */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Key Formulas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="AP: nth Term"
                  desc="Find any term using the first term and common difference."
                  example="a_n = a_1 + (n-1)d"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="AP: Sum of n Terms"
                  desc="Two equivalent forms — use whichever is more convenient."
                  example="S_n = \frac{n}{2}[2a_1 + (n-1)d]"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="GP: nth Term"
                  desc="Find any term using the first term and common ratio."
                  example="a_n = a_1 \cdot r^{n-1}"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="GP: Infinite Sum"
                  desc="Only converges when |r| < 1. The series approaches a finite value."
                  example="S_\infty = \frac{a_1}{1-r} \quad (|r| < 1)"
                  color="bg-teal-100 text-teal-700"
                />
              </div>
            </section>

            {/* Sequence Explorer */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Sequence Explorer</h2>
              <p className="text-gray-500 mb-6">Enter your own values and watch the sequence and sum update in real time.</p>
              <SequenceExplorer />
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each type at your own pace.</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(workedExamples).map(([key, ex]) => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeExample === key ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>

              <WorkedExample key={activeExample} example={workedExamples[activeExample]} />
            </section>

            {/* Quick Check */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Quick Check</h2>
              <p className="text-gray-500 mb-6">Test your understanding before heading to practice.</p>
              <QuickCheck />
            </section>

            {/* CTA */}
            <div className="flex justify-center pb-8">
              <a href="/lessons/progressions/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Progressions
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