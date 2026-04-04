"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  integers: {
    title: "Integers",
    problem: "7 - (-2) + (-5)",
    steps: [
      {
        label: "Write the expression",
        math: "7 - (-2) + (-5)",
        explanation: "We have a mix of positive and negative integers. Work through each operation carefully.",
        highlight: "both",
      },
      {
        label: "Simplify subtracting a negative",
        math: "7 - (-2) = 7 + 2",
        explanation: "Subtracting a negative is the same as adding a positive. Two negatives make a positive.",
        highlight: "first",
      },
      {
        label: "Add 7 + 2",
        math: "7 + 2 = 9",
        explanation: "Both numbers are positive, so simply add them.",
        highlight: "outer",
      },
      {
        label: "Now add the negative",
        math: "9 + (-5)",
        explanation: "Adding a negative is the same as subtracting. 9 + (−5) = 9 − 5.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "9 - 5 = 4",
        explanation: "The final answer is 4.",
        highlight: "result",
      },
      {
        label: "Sign rules for multiplication",
        math: "(-3) \\times (-2) = 6 \\quad \\text{and} \\quad (-8) \\div 2 = -4",
        explanation: "Same signs → positive. Different signs → negative. This applies to both multiplication and division.",
        highlight: "result",
      },
    ],
  },
  exponentrules: {
    title: "Exponent Rules",
    problem: "\\frac{2^3 \\cdot 2^4}{2^2}",
    steps: [
      {
        label: "Write the expression",
        math: "\\frac{2^3 \\cdot 2^4}{2^2}",
        explanation: "We have a product in the numerator divided by a power. We'll apply the product and quotient rules.",
        highlight: "both",
      },
      {
        label: "Apply the Product Rule to the numerator",
        math: "a^m \\cdot a^n = a^{m+n}",
        explanation: "When multiplying powers with the same base, add the exponents.",
        highlight: "first",
      },
      {
        label: "Simplify the numerator",
        math: "2^3 \\cdot 2^4 = 2^{3+4} = 2^7",
        explanation: "Add the exponents: 3 + 4 = 7.",
        highlight: "outer",
      },
      {
        label: "Apply the Quotient Rule",
        math: "\\frac{a^m}{a^n} = a^{m-n}",
        explanation: "When dividing powers with the same base, subtract the exponents.",
        highlight: "inner",
      },
      {
        label: "Simplify",
        math: "\\frac{2^7}{2^2} = 2^{7-2} = 2^5",
        explanation: "Subtract the exponents: 7 − 2 = 5.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "2^5 = 32",
        explanation: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
        highlight: "result",
      },
    ],
  },
  negzero: {
    title: "Negative & Zero Exponents",
    problem: "2^{-3} + 7^0",
    steps: [
      {
        label: "Write the expression",
        math: "2^{-3} + 7^0",
        explanation: "We have a negative exponent and a zero exponent. Each has a specific rule.",
        highlight: "both",
      },
      {
        label: "Zero exponent rule",
        math: "a^0 = 1 \\quad (a \\neq 0)",
        explanation: "Any non-zero number raised to the power of 0 equals 1.",
        highlight: "first",
      },
      {
        label: "Apply to 7⁰",
        math: "7^0 = 1",
        explanation: "Regardless of the base (as long as it's not 0), any number to the power 0 is 1.",
        highlight: "outer",
      },
      {
        label: "Negative exponent rule",
        math: "a^{-n} = \\frac{1}{a^n}",
        explanation: "A negative exponent means take the reciprocal of the positive exponent.",
        highlight: "inner",
      },
      {
        label: "Apply to 2⁻³",
        math: "2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}",
        explanation: "Flip the base to the denominator and make the exponent positive.",
        highlight: "combine",
      },
      {
        label: "Final answer",
        math: "\\frac{1}{8} + 1 = \\frac{1}{8} + \\frac{8}{8} = \\frac{9}{8}",
        explanation: "Add the two results. Convert 1 to 8/8 to get a common denominator.",
        highlight: "result",
      },
    ],
  },
  roots: {
    title: "Roots & Fractional Exponents",
    problem: "\\frac{8^{2/3} \\cdot 8^{1/3}}{2^{-2}}",
    steps: [
      {
        label: "Write the expression",
        math: "\\frac{8^{2/3} \\cdot 8^{1/3}}{2^{-2}}",
        explanation: "We have fractional exponents in the numerator and a negative exponent in the denominator.",
        highlight: "both",
      },
      {
        label: "Apply Product Rule to numerator",
        math: "8^{2/3} \\cdot 8^{1/3} = 8^{2/3 + 1/3} = 8^{3/3} = 8^1 = 8",
        explanation: "Add the fractional exponents: 2/3 + 1/3 = 3/3 = 1.",
        highlight: "first",
      },
      {
        label: "Simplify the denominator",
        math: "2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}",
        explanation: "Apply the negative exponent rule: 2⁻² = 1/4.",
        highlight: "outer",
      },
      {
        label: "Divide numerator by denominator",
        math: "\\frac{8}{\\frac{1}{4}} = 8 \\times 4",
        explanation: "Dividing by a fraction is the same as multiplying by its reciprocal.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "8 \\times 4 = 32",
        explanation: "The simplified answer is 32.",
        highlight: "result",
      },
      {
        label: "Fractional exponent as a root",
        math: "a^{1/n} = \\sqrt[n]{a} \\quad \\Rightarrow \\quad 8^{1/3} = \\sqrt[3]{8} = 2",
        explanation: "A fractional exponent 1/n means the nth root. This connects roots and exponents.",
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

// --- Quick Check ---
const quickChecks = [
  {
    problem: "3^{-2}",
    answer: "1/9",
    hint: "Apply the negative exponent rule: a⁻ⁿ = 1/aⁿ.",
  },
  {
    problem: "\\frac{5^4}{5^2}",
    answer: "25",
    hint: "Apply the Quotient Rule: subtract the exponents, then evaluate.",
  },
];

function QuickCheck() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const current = quickChecks[idx];

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").toLowerCase();

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

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer, e.g. 1/9"
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

export default function IntegersExponentsRootsLearnPage() {
  const [activeExample, setActiveExample] = useState("integers");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Integers, Exponents & Roots</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              The foundational building blocks of algebra — master signs, powers, and roots to unlock everything else.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* Integers */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Integers</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Integers are the set of whole numbers including positives, negatives, and zero:
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center text-xl mb-6">
                <InlineMath math="\mathbb{Z} = \{ \ldots, -3, -2, -1, 0, 1, 2, 3, \ldots \}" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="Addition & Subtraction"
                  desc="Subtracting a negative = adding a positive. Two negatives make a positive."
                  example="-5 + 3 = -2 \quad \text{and} \quad 7-(-2) = 9"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Multiplication & Division"
                  desc="Same signs → positive. Different signs → negative."
                  example="(-3) \times (-2) = 6 \quad (-8) \div 2 = -4"
                  color="bg-teal-100 text-teal-700"
                />
              </div>
            </section>

            {/* Exponent Rules */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Exponent Rules</h2>
              <p className="text-lg text-gray-700 mb-6">
                An exponent tells us how many times to multiply the base by itself: <InlineMath math="a^n = a \times a \times \cdots \times a" /> (n times).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="Product Rule"
                  desc="Multiply powers with the same base — add the exponents."
                  example="a^m \cdot a^n = a^{m+n}"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Quotient Rule"
                  desc="Divide powers with the same base — subtract the exponents."
                  example="\frac{a^m}{a^n} = a^{m-n}"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="Power Rule"
                  desc="Raise a power to another power — multiply the exponents."
                  example="(a^m)^n = a^{m \cdot n}"
                  color="bg-purple-100 text-purple-700"
                />
                <ConceptCard
                  title="Zero & Negative Exponents"
                  desc="Zero exponent = 1. Negative exponent = reciprocal."
                  example="a^0 = 1 \quad a^{-n} = \frac{1}{a^n}"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
            </section>

            {/* Roots */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Roots & Fractional Exponents</h2>
              <p className="text-lg text-gray-700 mb-6">
                A root is the inverse of an exponent. The nth root of a is written <InlineMath math="\sqrt[n]{a} = a^{1/n}" />.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Square Root</p>
                  <div className="text-center"><InlineMath math="\sqrt{16} = 4" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Because 4² = 16</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Cube Root</p>
                  <div className="text-center"><InlineMath math="\sqrt[3]{27} = 3" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Because 3³ = 27</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-purple-600 mb-2">Fractional Exponent</p>
                  <div className="text-center"><InlineMath math="8^{1/3} = \sqrt[3]{8} = 2" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Root and exponent are equivalent</p>
                </div>
              </div>
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each topic at your own pace.</p>

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
              <a href="/lessons/exponents/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Integers, Exponents & Roots
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