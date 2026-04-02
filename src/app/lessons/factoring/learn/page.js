"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  gcf: {
    title: "Greatest Common Factor",
    problem: "6x^2 + 9x",
    steps: [
      {
        label: "Identify all terms",
        math: "6x^2 + 9x",
        explanation: "We have two terms: 6x² and 9x. We need to find the largest factor common to both.",
        highlight: "both",
      },
      {
        label: "Find GCF of coefficients",
        math: "\\text{GCF}(6, 9) = 3",
        explanation: "The factors of 6 are 1, 2, 3, 6. The factors of 9 are 1, 3, 9. The greatest common factor is 3.",
        highlight: "first",
      },
      {
        label: "Find GCF of variables",
        math: "\\text{GCF}(x^2, x) = x",
        explanation: "Both terms contain x. The lowest power is x¹, so x is the GCF of the variable parts.",
        highlight: "outer",
      },
      {
        label: "Combine to get full GCF",
        math: "\\text{GCF} = 3x",
        explanation: "The full GCF is 3x — the product of the coefficient GCF and variable GCF.",
        highlight: "inner",
      },
      {
        label: "Factor out the GCF",
        math: "6x^2 + 9x = 3x(2x + 3)",
        explanation: "Divide each term by 3x: 6x² ÷ 3x = 2x and 9x ÷ 3x = 3.",
        highlight: "result",
      },
      {
        label: "Verify by expanding",
        math: "3x(2x + 3) = 6x^2 + 9x \\checkmark",
        explanation: "Distribute 3x back through to confirm we get the original expression.",
        highlight: "result",
      },
    ],
  },
  difference: {
    title: "Difference of Squares",
    problem: "x^2 - 16",
    steps: [
      {
        label: "Identify the pattern",
        math: "x^2 - 16",
        explanation: "This looks like a² − b². We need both terms to be perfect squares with subtraction between them.",
        highlight: "both",
      },
      {
        label: "Confirm first term is a perfect square",
        math: "x^2 = (x)^2 \\Rightarrow a = x",
        explanation: "x² is a perfect square. Its square root is x.",
        highlight: "first",
      },
      {
        label: "Confirm second term is a perfect square",
        math: "16 = (4)^2 \\Rightarrow b = 4",
        explanation: "16 is a perfect square. Its square root is 4.",
        highlight: "outer",
      },
      {
        label: "Apply the formula",
        math: "a^2 - b^2 = (a - b)(a + b)",
        explanation: "The difference of squares always factors into two conjugate binomials.",
        highlight: "inner",
      },
      {
        label: "Substitute a = x and b = 4",
        math: "x^2 - 16 = (x - 4)(x + 4)",
        explanation: "Replace a with x and b with 4 in the formula.",
        highlight: "result",
      },
      {
        label: "Verify by expanding",
        math: "(x-4)(x+4) = x^2 + 4x - 4x - 16 = x^2 - 16 \\checkmark",
        explanation: "The middle terms cancel out, confirming our answer.",
        highlight: "result",
      },
    ],
  },
  trinomial: {
    title: "Factoring Trinomials",
    problem: "x^2 + 5x + 6",
    steps: [
      {
        label: "Identify the trinomial",
        math: "x^2 + 5x + 6",
        explanation: "We want to write this as (x + p)(x + q). We need two numbers p and q.",
        highlight: "both",
      },
      {
        label: "Find two numbers that multiply to 6",
        math: "p \\times q = 6",
        explanation: "The constant term is 6. We need pairs: (1,6), (2,3), (−1,−6), (−2,−3).",
        highlight: "first",
      },
      {
        label: "And add to 5",
        math: "p + q = 5",
        explanation: "The coefficient of x is 5. Which pair sums to 5?",
        highlight: "outer",
      },
      {
        label: "Test pairs: 2 and 3",
        math: "2 \\times 3 = 6 \\text{ and } 2 + 3 = 5 \\checkmark",
        explanation: "2 and 3 satisfy both conditions.",
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
        math: "(x+2)(x+3) = x^2 + 5x + 6 \\checkmark",
        explanation: "Expanding confirms we get back the original trinomial.",
        highlight: "result",
      },
    ],
  },
  grouping: {
    title: "Factoring by Grouping",
    problem: "ax + ay + bx + by",
    steps: [
      {
        label: "Write out the expression",
        math: "ax + ay + bx + by",
        explanation: "We have four terms. Grouping works when no single GCF covers all terms.",
        highlight: "both",
      },
      {
        label: "Group the first two terms",
        math: "(ax + ay) + (bx + by)",
        explanation: "Group terms that share a common factor: ax and ay both have a, bx and by both have b.",
        highlight: "first",
      },
      {
        label: "Factor GCF from first group",
        math: "a(x + y) + (bx + by)",
        explanation: "Factor a out of ax + ay to get a(x + y).",
        highlight: "outer",
      },
      {
        label: "Factor GCF from second group",
        math: "a(x + y) + b(x + y)",
        explanation: "Factor b out of bx + by to get b(x + y).",
        highlight: "inner",
      },
      {
        label: "Factor out the common binomial",
        math: "(a + b)(x + y)",
        explanation: "Both groups share (x + y). Factor it out to get the final answer.",
        highlight: "result",
      },
      {
        label: "Verify by expanding",
        math: "(a+b)(x+y) = ax + ay + bx + by \\checkmark",
        explanation: "Expanding confirms we recover the original expression.",
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
    last: "bg-pink-50 border-pink-200",
    combine: "bg-orange-50 border-orange-200",
    result: "bg-green-50 border-green-200",
  }[current.highlight] || "bg-gray-50 border-gray-200";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Problem</p>
        <div className="text-2xl"><InlineMath math={example.problem} /></div>
      </div>

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

// --- Quick Check ---
const quickChecks = [
  { problem: "12x^2 + 8x", answer: "4x(3x+2)", hint: "Find the GCF of 12x² and 8x first." },
  { problem: "x^2 - 25", answer: "(x-5)(x+5)", hint: "Is this a difference of squares? What are the square roots of x² and 25?" },
];

function QuickCheck() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const current = quickChecks[idx];

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "").toLowerCase();

  const check = () => {
    if (normalize(input) === normalize(current.answer)) {
      setFeedback({ type: "correct", message: "Correct! Well done. 🎉" });
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

      <p className="text-gray-600 text-sm mb-2">Factor the following:</p>
      <div className="text-2xl text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer, e.g. 3x(2x+3)"
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
        <div className={`text-center py-3 rounded-xl text-sm font-semibold ${feedback.type === "correct"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
          }`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}

// --- Info Card ---
function TechniqueCard({ title, desc, example, color }) {
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

export default function FactoringTheoryLesson() {
  const [activeExample, setActiveExample] = useState("gcf");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Factoring</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Breaking expressions into simpler parts. Master the four core techniques and you can factor anything.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is Factoring */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is Factoring?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Factoring</strong> is the process of rewriting an algebraic expression as a product of simpler expressions called <strong>factors</strong>. It's the reverse of expanding.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Expanding →</p>
                  <div className="text-center"><InlineMath math="(x+2)(x+3) = x^2 + 5x + 6" /></div>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">← Factoring</p>
                  <div className="text-center"><InlineMath math="x^2 + 5x + 6 = (x+2)(x+3)" /></div>
                </div>
              </div>
            </section>

            {/* Techniques */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">The Four Core Techniques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TechniqueCard
                  title="Greatest Common Factor"
                  desc="Factor out the largest expression that divides evenly into all terms."
                  example="6x^2 + 9x = 3x(2x + 3)"
                  color="bg-blue-100 text-blue-700"
                />
                <TechniqueCard
                  title="Difference of Squares"
                  desc="Any expression of the form a² − b² factors into two conjugate binomials."
                  example="x^2 - 16 = (x-4)(x+4)"
                  color="bg-purple-100 text-purple-700"
                />
                <TechniqueCard
                  title="Factoring Trinomials"
                  desc="Find two numbers that multiply to the constant and add to the middle coefficient."
                  example="x^2 + 5x + 6 = (x+2)(x+3)"
                  color="bg-teal-100 text-teal-700"
                />
                <TechniqueCard
                  title="Factoring by Grouping"
                  desc="Group terms with common factors, then factor out the GCF from each group."
                  example="ax + ay + bx + by = (a+b)(x+y)"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each technique at your own pace.</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(workedExamples).map(([key, ex]) => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeExample === key ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              <p className="text-gray-500 mb-6">Test your understanding before heading to full practice.</p>
              <QuickCheck />
            </section>

            {/* CTA */}
            <div className="flex justify-center pb-8">
              <Link href="/lessons/factoring/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Go to Practice & Solver
                </button>
              </Link>
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