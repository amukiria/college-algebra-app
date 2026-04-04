"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  multiplication: {
    title: "Expanding by Multiplication",
    problem: "(a + b)^3",
    steps: [
      {
        label: "Write the expression",
        math: "(a + b)^3 = (a + b)(a + b)^2",
        explanation: "Break the cube into a product of (a+b) and (a+b)².",
        highlight: "both",
      },
      {
        label: "Expand (a+b)² first",
        math: "(a + b)^2 = a^2 + 2ab + b^2",
        explanation: "Use FOIL or the known result: (a+b)² = a² + 2ab + b².",
        highlight: "first",
      },
      {
        label: "Multiply (a+b) by the result",
        math: "(a + b)(a^2 + 2ab + b^2)",
        explanation: "Distribute (a+b) across each term of a² + 2ab + b².",
        highlight: "outer",
      },
      {
        label: "Distribute a",
        math: "a(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2",
        explanation: "Multiply a by each term inside the brackets.",
        highlight: "inner",
      },
      {
        label: "Distribute b",
        math: "b(a^2 + 2ab + b^2) = a^2b + 2ab^2 + b^3",
        explanation: "Multiply b by each term inside the brackets.",
        highlight: "combine",
      },
      {
        label: "Combine like terms",
        math: "a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3",
        explanation: "Add all the terms together and group like terms.",
        highlight: "result",
      },
      {
        label: "Final answer",
        math: "a^3 + 3a^2b + 3ab^2 + b^3",
        explanation: "Simplify: 2a²b + a²b = 3a²b and ab² + 2ab² = 3ab².",
        highlight: "result",
      },
    ],
  },
  pascal: {
    title: "Pascal's Triangle",
    problem: "(p + q)^5",
    steps: [
      {
        label: "Identify the power",
        math: "(p + q)^5 \\quad n = 5",
        explanation: "We need row n=5 from Pascal's Triangle to find the coefficients.",
        highlight: "both",
      },
      {
        label: "Read row 5 from Pascal's Triangle",
        math: "1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1",
        explanation: "Each number is the sum of the two numbers above it in the triangle.",
        highlight: "first",
      },
      {
        label: "Write the terms without coefficients",
        math: "p^5, \\; p^4q, \\; p^3q^2, \\; p^2q^3, \\; pq^4, \\; q^5",
        explanation: "The power of p decreases from 5 to 0, and the power of q increases from 0 to 5. They always add to 5.",
        highlight: "outer",
      },
      {
        label: "Apply the coefficients",
        math: "1 \\cdot p^5 + 5 \\cdot p^4q + 10 \\cdot p^3q^2 + 10 \\cdot p^2q^3 + 5 \\cdot pq^4 + 1 \\cdot q^5",
        explanation: "Multiply each term by its corresponding coefficient from Pascal's Triangle.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "p^5 + 5p^4q + 10p^3q^2 + 10p^2q^3 + 5pq^4 + q^5",
        explanation: "This is the fully expanded form of (p+q)⁵.",
        highlight: "result",
      },
      {
        label: "Sign pattern for (p−q)⁵",
        math: "p^5 - 5p^4q + 10p^3q^2 - 10p^2q^3 + 5pq^4 - q^5",
        explanation: "When the second term is negative, the signs alternate: +, −, +, −, ... This is because (−q)^odd is negative.",
        highlight: "result",
      },
    ],
  },
  theorem: {
    title: "Binomial Theorem",
    problem: "(2x + 3y)^4",
    steps: [
      {
        label: "State the Binomial Theorem",
        math: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
        explanation: "The Binomial Theorem gives a formula for expanding any binomial raised to a power.",
        highlight: "both",
      },
      {
        label: "Identify a, b, and n",
        math: "a = 2x, \\quad b = 3y, \\quad n = 4",
        explanation: "Read the values directly from the expression.",
        highlight: "first",
      },
      {
        label: "Get coefficients for n=4",
        math: "\\binom{4}{0}=1, \\; \\binom{4}{1}=4, \\; \\binom{4}{2}=6, \\; \\binom{4}{3}=4, \\; \\binom{4}{4}=1",
        explanation: "Calculate each binomial coefficient using n! / (k!(n−k)!). These match row 4 of Pascal's Triangle.",
        highlight: "outer",
      },
      {
        label: "Write all terms",
        math: "(2x)^4 + 4(2x)^3(3y) + 6(2x)^2(3y)^2 + 4(2x)(3y)^3 + (3y)^4",
        explanation: "Apply the formula: each term is C(4,k) × (2x)^(4−k) × (3y)^k.",
        highlight: "inner",
      },
      {
        label: "Simplify each term",
        math: "16x^4 + 4(8x^3)(3y) + 6(4x^2)(9y^2) + 4(2x)(27y^3) + 81y^4",
        explanation: "Evaluate the powers: (2x)⁴=16x⁴, (2x)³=8x³, (3y)²=9y², (3y)³=27y³, (3y)⁴=81y⁴.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "16x^4 + 96x^3y + 216x^2y^2 + 216xy^3 + 81y^4",
        explanation: "Multiply all coefficients: 4×8×3=96, 6×4×9=216, 4×2×27=216.",
        highlight: "result",
      },
    ],
  },
  numerical: {
    title: "Numerical Applications",
    problem: "(1.02)^6",
    steps: [
      {
        label: "Rewrite as a binomial",
        math: "(1.02)^6 = (1 + 0.02)^6",
        explanation: "Write 1.02 as 1 + 0.02 so we can apply the Binomial Theorem with a=1 and b=0.02.",
        highlight: "both",
      },
      {
        label: "Get coefficients for n=6",
        math: "1, \\; 6, \\; 15, \\; 20, \\; 15, \\; 6, \\; 1",
        explanation: "Row 6 from Pascal's Triangle gives the coefficients.",
        highlight: "first",
      },
      {
        label: "Write the expansion",
        math: "1 + 6(0.02) + 15(0.02)^2 + 20(0.02)^3 + \\cdots",
        explanation: "Since a=1, aⁿ⁻ᵏ = 1 for all terms. We only need to evaluate powers of 0.02.",
        highlight: "outer",
      },
      {
        label: "Evaluate each term",
        math: "1 + 0.12 + 0.006 + 0.00016 + \\cdots",
        explanation: "6×0.02=0.12, 15×0.0004=0.006, 20×0.000008=0.00016. Later terms are negligible.",
        highlight: "inner",
      },
      {
        label: "Sum the significant terms",
        math: "1 + 0.12 + 0.006 + 0.00016 = 1.12616",
        explanation: "We can stop here — the remaining terms are smaller than 0.0001 and won't affect 4 significant figures.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "(1.02)^6 \\approx 1.126 \\text{ (4 significant figures)}",
        explanation: "Round to 4 significant figures. This technique works well when b is small compared to a.",
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
        <div className="text-2xl"><InlineMath math={example.problem} /></div>
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

// --- Pascal's Triangle Visual ---
const pascalRows = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
  [1, 6, 15, 20, 15, 6, 1],
  [1, 7, 21, 35, 35, 21, 7, 1],
];

function PascalTriangle() {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <p className="text-sm text-gray-500 mb-4 text-center">Click a row to highlight it</p>
      <div className="flex flex-col items-center gap-2">
        {pascalRows.map((row, n) => (
          <div
            key={n}
            className={`flex gap-2 cursor-pointer transition-all`}
            onClick={() => setHighlighted(highlighted === n ? null : n)}
          >
            <span className="text-xs text-gray-400 w-6 text-right self-center">n={n}</span>
            {row.map((val, k) => (
              <div
                key={k}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  highlighted === n
                    ? "bg-primary text-white scale-110"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
      {highlighted !== null && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800 text-center">
          Row n={highlighted}: coefficients for <InlineMath math={`(a+b)^${highlighted}`} />
        </div>
      )}
    </div>
  );
}

// --- Quick Check ---
const quickChecks = [
  {
    problem: "\\text{What is the coefficient of } a^3b^2 \\text{ in } (a+b)^5?",
    answer: "10",
    hint: "Use Pascal's Triangle row n=5. The term a³b² has k=2, so the coefficient is C(5,2).",
  },
  {
    problem: "\\text{Expand } (x+1)^3",
    answer: "x^3+3x^2+3x+1",
    hint: "Use row n=3 from Pascal's Triangle: coefficients are 1, 3, 3, 1.",
  },
];

function QuickCheck() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const current = quickChecks[idx];

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\^/g, "").toLowerCase();

  const check = () => {
    if (normalize(input) === normalize(current.answer)) {
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

export default function BinomialExpansionsLearnPage() {
  const [activeExample, setActiveExample] = useState("multiplication");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Binomial Expansions</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Expand powers of binomials efficiently using Pascal's Triangle and the Binomial Theorem.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is a Binomial */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Binomial?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>binomial</strong> is an expression with exactly two terms. When raised to a power, we need to expand it into a sum of terms. The Binomial Theorem gives us a systematic way to do this.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Simple", example: "x + y" },
                  { label: "With constants", example: "a + 3" },
                  { label: "With coefficients", example: "2m^2 - n^3" },
                ].map(({ label, example }) => (
                  <div key={label} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <p className="text-sm font-semibold text-blue-600 mb-2">{label}</p>
                    <div className="text-center text-lg"><InlineMath math={example} /></div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">The Binomial Theorem</p>
                <BlockMath math="(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k" />
                <p className="text-sm text-gray-500 mt-2">where <InlineMath math="\binom{n}{k} = \frac{n!}{k!(n-k)!}" /></p>
              </div>
            </section>

            {/* Key Concepts */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Key Concepts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="Binomial Coefficient"
                  desc="The number in front of each term. Calculated using factorials."
                  example="\binom{5}{2} = \frac{5!}{2!3!} = 10"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Exponent Pattern"
                  desc="Powers of a decrease, powers of b increase. They always sum to n."
                  example="(a+b)^4: a^4, a^3b, a^2b^2, ab^3, b^4"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="Sign Pattern"
                  desc="For (a−b)ⁿ, signs alternate: +, −, +, −, ..."
                  example="(x-y)^3 = x^3 - 3x^2y + 3xy^2 - y^3"
                  color="bg-purple-100 text-purple-700"
                />
                <ConceptCard
                  title="Numerical Estimation"
                  desc="Write a number as (1 + small value)ⁿ and use the first few terms."
                  example="(1.02)^6 = (1+0.02)^6 \approx 1.126"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
            </section>

            {/* Pascal's Triangle */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Pascal's Triangle</h2>
              <p className="text-gray-500 mb-6">
                Each number is the sum of the two numbers above it. Each row gives the coefficients for the corresponding binomial expansion.
              </p>
              <PascalTriangle />
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
              <a href="/lessons/binomial/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Binomial Expansions
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