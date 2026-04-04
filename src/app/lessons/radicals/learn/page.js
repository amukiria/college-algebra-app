"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  simplifying: {
    title: "Simplifying",
    problem: "\\sqrt{72}",
    steps: [
      {
        label: "Identify the radicand",
        math: "\\sqrt{72}",
        explanation: "The radicand is 72. We need to find the largest perfect square that divides 72.",
        highlight: "both",
      },
      {
        label: "Factor into perfect square × other",
        math: "72 = 36 \\times 2",
        explanation: "36 is the largest perfect square that divides 72. Write 72 as 36 × 2.",
        highlight: "first",
      },
      {
        label: "Apply the Product Rule",
        math: "\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\cdot \\sqrt{2}",
        explanation: "Use √(ab) = √a · √b to split the radical into two.",
        highlight: "outer",
      },
      {
        label: "Simplify the perfect square",
        math: "\\sqrt{36} = 6",
        explanation: "√36 = 6 because 6² = 36.",
        highlight: "inner",
      },
      {
        label: "Write the final answer",
        math: "\\sqrt{72} = 6\\sqrt{2}",
        explanation: "Combine the simplified part with the remaining radical.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "(6\\sqrt{2})^2 = 36 \\times 2 = 72 \\checkmark",
        explanation: "Square the answer to confirm it equals the original radicand.",
        highlight: "result",
      },
    ],
  },
  product: {
    title: "Product & Quotient Rules",
    problem: "\\sqrt{50} \\times \\sqrt{2}",
    steps: [
      {
        label: "Write the expression",
        math: "\\sqrt{50} \\times \\sqrt{2}",
        explanation: "We have a product of two radicals. We can combine them using the Product Rule.",
        highlight: "both",
      },
      {
        label: "Apply the Product Rule",
        math: "\\sqrt{50} \\times \\sqrt{2} = \\sqrt{50 \\times 2} = \\sqrt{100}",
        explanation: "√a · √b = √(ab). Multiply the radicands together.",
        highlight: "first",
      },
      {
        label: "Simplify",
        math: "\\sqrt{100} = 10",
        explanation: "100 is a perfect square. √100 = 10.",
        highlight: "result",
      },
      {
        label: "Quotient Rule example",
        math: "\\sqrt{\\frac{16}{4}} = \\frac{\\sqrt{16}}{\\sqrt{4}}",
        explanation: "The Quotient Rule: √(a/b) = √a / √b. Split the fraction under the radical.",
        highlight: "outer",
      },
      {
        label: "Simplify each radical",
        math: "\\frac{\\sqrt{16}}{\\sqrt{4}} = \\frac{4}{2}",
        explanation: "√16 = 4 and √4 = 2.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "\\frac{4}{2} = 2",
        explanation: "Divide to get the final simplified answer.",
        highlight: "result",
      },
    ],
  },
  adding: {
    title: "Adding & Subtracting",
    problem: "\\sqrt{48} + \\sqrt{12}",
    steps: [
      {
        label: "Write the expression",
        math: "\\sqrt{48} + \\sqrt{12}",
        explanation: "To add radicals, we first simplify each one. We can only combine like radicals — those with the same radicand.",
        highlight: "both",
      },
      {
        label: "Simplify √48",
        math: "\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\cdot \\sqrt{3} = 4\\sqrt{3}",
        explanation: "Factor 48 as 16 × 3. √16 = 4, so √48 = 4√3.",
        highlight: "first",
      },
      {
        label: "Simplify √12",
        math: "\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\cdot \\sqrt{3} = 2\\sqrt{3}",
        explanation: "Factor 12 as 4 × 3. √4 = 2, so √12 = 2√3.",
        highlight: "outer",
      },
      {
        label: "Identify like radicals",
        math: "4\\sqrt{3} + 2\\sqrt{3}",
        explanation: "Both terms have √3 as the radical part. They are like radicals and can be combined.",
        highlight: "inner",
      },
      {
        label: "Add the coefficients",
        math: "(4 + 2)\\sqrt{3}",
        explanation: "Add the coefficients just like adding like terms in algebra.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "6\\sqrt{3}",
        explanation: "The simplified answer is 6√3.",
        highlight: "result",
      },
    ],
  },
  rationalizing: {
    title: "Rationalizing",
    problem: "\\frac{3}{\\sqrt{5}}",
    steps: [
      {
        label: "Identify the problem",
        math: "\\frac{3}{\\sqrt{5}}",
        explanation: "There is a radical in the denominator. We rationalize by eliminating it.",
        highlight: "both",
      },
      {
        label: "Multiply by √5/√5",
        math: "\\frac{3}{\\sqrt{5}} \\times \\frac{\\sqrt{5}}{\\sqrt{5}}",
        explanation: "Multiply numerator and denominator by √5. This is equivalent to multiplying by 1, so the value doesn't change.",
        highlight: "first",
      },
      {
        label: "Multiply the numerators",
        math: "3 \\times \\sqrt{5} = 3\\sqrt{5}",
        explanation: "Multiply 3 by √5 in the numerator.",
        highlight: "outer",
      },
      {
        label: "Multiply the denominators",
        math: "\\sqrt{5} \\times \\sqrt{5} = 5",
        explanation: "√5 × √5 = (√5)² = 5. The radical is eliminated.",
        highlight: "inner",
      },
      {
        label: "Write the result",
        math: "\\frac{3\\sqrt{5}}{5}",
        explanation: "The denominator is now rational — no radical in sight.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "\\frac{3\\sqrt{5}}{5} \\approx \\frac{3 \\times 2.236}{5} \\approx \\frac{6.708}{5} \\approx 1.342 \\checkmark",
        explanation: "Both forms give the same decimal value, confirming the rationalization is correct.",
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
  {
    problem: "\\sqrt{50}",
    answer: "5sqrt2",
    display: "5√2",
    hint: "Factor 50 as 25 × 2. What is √25?",
  },
  {
    problem: "\\frac{2}{\\sqrt{3}}",
    answer: "2sqrt3/3",
    display: "2√3/3",
    hint: "Multiply numerator and denominator by √3.",
  },
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

      <p className="text-gray-600 text-sm mb-2">Simplify:</p>
      <div className="text-2xl text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <p className="text-xs text-gray-400 mb-2">Type your answer using plain text, e.g. <code className="bg-gray-100 px-1 rounded">5sqrt2</code> for 5√2</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder={`e.g. ${current.display}`}
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

export default function RadicalsLearnPage() {
  const [activeExample, setActiveExample] = useState("simplifying");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Radicals</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Roots and radical expressions — learn to simplify, combine, and rationalize with confidence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is a Radical */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Radical?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>radical expression</strong> involves roots — square roots, cube roots, or higher. The symbol <InlineMath math="\sqrt{}" /> is called the radical sign, and the number inside is the <strong>radicand</strong>.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center text-2xl mb-6">
                <InlineMath math="\sqrt[n]{a} \quad \text{where } n \text{ is the index and } a \text{ is the radicand}" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Square Root</p>
                  <div className="text-center"><InlineMath math="\sqrt{25} = 5" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Because 5² = 25</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Cube Root</p>
                  <div className="text-center"><InlineMath math="\sqrt[3]{8} = 2" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Because 2³ = 8</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-purple-600 mb-2">nth Root</p>
                  <div className="text-center"><InlineMath math="\sqrt[4]{16} = 2" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Because 2⁴ = 16</p>
                </div>
              </div>
            </section>

            {/* Properties */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Properties of Radicals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ConceptCard
                  title="Product Rule"
                  desc="The square root of a product equals the product of the square roots."
                  example="\sqrt{ab} = \sqrt{a} \cdot \sqrt{b}"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Quotient Rule"
                  desc="The square root of a quotient equals the quotient of the square roots."
                  example="\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="Power Rule"
                  desc="A radical can be written as a fractional exponent."
                  example="\sqrt[n]{a^m} = a^{m/n}"
                  color="bg-purple-100 text-purple-700"
                />
              </div>
            </section>

            {/* Key Rules */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Key Operations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="Simplifying"
                  desc="Factor out perfect squares from under the radical."
                  example="\sqrt{72} = \sqrt{36 \cdot 2} = 6\sqrt{2}"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Adding & Subtracting"
                  desc="Only like radicals (same radicand) can be combined."
                  example="4\sqrt{3} + 2\sqrt{3} = 6\sqrt{3}"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="Multiplying"
                  desc="Multiply radicands together, then simplify."
                  example="\sqrt{3} \cdot \sqrt{12} = \sqrt{36} = 6"
                  color="bg-purple-100 text-purple-700"
                />
                <ConceptCard
                  title="Rationalizing"
                  desc="Eliminate radicals from the denominator by multiplying by the radical."
                  example="\frac{3}{\sqrt{5}} = \frac{3\sqrt{5}}{5}"
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
              <a href="/lessons/radicals/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Radicals
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