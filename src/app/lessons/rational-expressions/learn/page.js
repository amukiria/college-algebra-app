"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  simplifying: {
    title: "Simplifying",
    problem: "\\frac{x^2 - 9}{x + 3}",
    steps: [
      {
        label: "Identify the expression",
        math: "\\frac{x^2 - 9}{x + 3}",
        explanation: "We have a rational expression. To simplify, we factor the numerator and denominator, then cancel common factors.",
        highlight: "both",
      },
      {
        label: "Factor the numerator",
        math: "x^2 - 9 = (x - 3)(x + 3)",
        explanation: "x² − 9 is a difference of squares. Using a² − b² = (a−b)(a+b), we get (x−3)(x+3).",
        highlight: "first",
      },
      {
        label: "Rewrite the expression",
        math: "\\frac{(x - 3)(x + 3)}{x + 3}",
        explanation: "Replace the numerator with its factored form. The denominator x + 3 is already fully factored.",
        highlight: "outer",
      },
      {
        label: "Cancel common factors",
        math: "\\frac{(x - 3)\\cancel{(x + 3)}}{\\cancel{x + 3}} = x - 3",
        explanation: "Cancel (x + 3) from numerator and denominator. This is valid as long as x ≠ −3.",
        highlight: "inner",
      },
      {
        label: "State the restriction",
        math: "x \\neq -3",
        explanation: "The original denominator x + 3 = 0 when x = −3. This value is excluded from the domain.",
        highlight: "result",
      },
      {
        label: "Final answer",
        math: "x - 3, \\quad x \\neq -3",
        explanation: "The simplified form is x − 3, with the restriction that x cannot equal −3.",
        highlight: "result",
      },
    ],
  },
  multiplying: {
    title: "Multiplying",
    problem: "\\frac{x^2 - 9}{5x} \\times \\frac{10x}{x + 3}",
    steps: [
      {
        label: "Write the multiplication",
        math: "\\frac{x^2 - 9}{5x} \\times \\frac{10x}{x + 3}",
        explanation: "To multiply rational expressions, multiply numerators together and denominators together, then simplify.",
        highlight: "both",
      },
      {
        label: "Factor all numerators and denominators",
        math: "\\frac{(x-3)(x+3)}{5x} \\times \\frac{10x}{x+3}",
        explanation: "Factor x² − 9 as (x−3)(x+3). Everything else is already in simplest form.",
        highlight: "first",
      },
      {
        label: "Multiply across",
        math: "\\frac{(x-3)(x+3) \\cdot 10x}{5x \\cdot (x+3)}",
        explanation: "Combine into a single fraction by multiplying numerators and denominators.",
        highlight: "outer",
      },
      {
        label: "Cancel common factors",
        math: "\\frac{(x-3)\\cancel{(x+3)} \\cdot \\cancel{10x}}{\\cancel{5x} \\cdot \\cancel{(x+3)}}",
        explanation: "Cancel (x+3) and simplify 10x/5x = 2.",
        highlight: "inner",
      },
      {
        label: "Simplify",
        math: "2(x - 3)",
        explanation: "After cancelling, we're left with 2(x−3).",
        highlight: "result",
      },
      {
        label: "Final answer with restrictions",
        math: "2(x-3), \\quad x \\neq -3, \\, x \\neq 0",
        explanation: "x ≠ −3 because (x+3) was in the denominator, and x ≠ 0 because 5x was in the denominator.",
        highlight: "result",
      },
    ],
  },
  adding: {
    title: "Adding",
    problem: "\\frac{x}{x-3} + \\frac{2}{x+3}",
    steps: [
      {
        label: "Identify the fractions",
        math: "\\frac{x}{x-3} + \\frac{2}{x+3}",
        explanation: "To add rational expressions, we need a common denominator. The denominators here are (x−3) and (x+3).",
        highlight: "both",
      },
      {
        label: "Find the LCD",
        math: "\\text{LCD} = (x-3)(x+3)",
        explanation: "The least common denominator is the product of the two different denominators.",
        highlight: "first",
      },
      {
        label: "Rewrite each fraction with LCD",
        math: "\\frac{x(x+3)}{(x-3)(x+3)} + \\frac{2(x-3)}{(x+3)(x-3)}",
        explanation: "Multiply the first fraction by (x+3)/(x+3) and the second by (x−3)/(x−3).",
        highlight: "outer",
      },
      {
        label: "Expand the numerators",
        math: "\\frac{x^2+3x}{(x-3)(x+3)} + \\frac{2x-6}{(x-3)(x+3)}",
        explanation: "Expand x(x+3) = x²+3x and 2(x−3) = 2x−6.",
        highlight: "inner",
      },
      {
        label: "Add the numerators",
        math: "\\frac{x^2 + 3x + 2x - 6}{(x-3)(x+3)} = \\frac{x^2 + 5x - 6}{(x-3)(x+3)}",
        explanation: "Combine like terms in the numerator: 3x + 2x = 5x.",
        highlight: "combine",
      },
      {
        label: "Final answer with restrictions",
        math: "\\frac{x^2 + 5x - 6}{(x-3)(x+3)}, \\quad x \\neq \\pm 3",
        explanation: "The numerator doesn't factor further. State restrictions: x ≠ 3 and x ≠ −3.",
        highlight: "result",
      },
    ],
  },
  dividing: {
    title: "Dividing",
    problem: "\\frac{x^2 - 4}{x + 1} \\div \\frac{x - 2}{x^2 - 1}",
    steps: [
      {
        label: "Write the division",
        math: "\\frac{x^2 - 4}{x + 1} \\div \\frac{x - 2}{x^2 - 1}",
        explanation: "To divide rational expressions, multiply by the reciprocal of the divisor.",
        highlight: "both",
      },
      {
        label: "Flip and multiply",
        math: "\\frac{x^2 - 4}{x + 1} \\times \\frac{x^2 - 1}{x - 2}",
        explanation: "Keep the first fraction, change ÷ to ×, and flip the second fraction.",
        highlight: "first",
      },
      {
        label: "Factor all expressions",
        math: "\\frac{(x-2)(x+2)}{x+1} \\times \\frac{(x-1)(x+1)}{x-2}",
        explanation: "Factor x²−4 = (x−2)(x+2) and x²−1 = (x−1)(x+1).",
        highlight: "outer",
      },
      {
        label: "Multiply across",
        math: "\\frac{(x-2)(x+2)(x-1)(x+1)}{(x+1)(x-2)}",
        explanation: "Combine into a single fraction.",
        highlight: "inner",
      },
      {
        label: "Cancel common factors",
        math: "\\frac{\\cancel{(x-2)}(x+2)(x-1)\\cancel{(x+1)}}{\\cancel{(x+1)}\\cancel{(x-2)}}",
        explanation: "Cancel (x−2) and (x+1) from numerator and denominator.",
        highlight: "combine",
      },
      {
        label: "Final answer with restrictions",
        math: "(x+2)(x-1), \\quad x \\neq \\pm 1, \\, x \\neq 2",
        explanation: "The simplified answer is (x+2)(x−1). Restrictions come from all denominators that appeared.",
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
    problem: "\\frac{x^2 - 4}{x + 2}",
    answer: "x-2",
    hint: "Factor the numerator as a difference of squares, then cancel the common factor.",
  },
  {
    problem: "\\frac{2x}{x-1} \\times \\frac{x-1}{4}",
    answer: "x/2",
    hint: "Cancel the common factor (x−1), then simplify 2x/4.",
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

      <p className="text-gray-600 text-sm mb-2">Simplify or evaluate:</p>
      <div className="text-2xl text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer, e.g. x-2"
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

export default function RationalExpressionsLesson() {
  const router = useRouter();
  const [activeExample, setActiveExample] = useState("simplifying");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Rational Expressions</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Fractions where numerator and denominator are polynomials. Master simplifying, multiplying, adding, and dividing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What are Rational Expressions */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What are Rational Expressions?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>rational expression</strong> is a fraction where both the numerator and denominator are polynomials, written as <InlineMath math="\frac{P(x)}{Q(x)}" /> where <InlineMath math="Q(x) \neq 0" />.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Example 1</p>
                  <div className="text-center text-lg"><InlineMath math="\frac{x}{x^2 + 1}" /></div>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Example 2</p>
                  <div className="text-center text-lg"><InlineMath math="\frac{x^2 - 9}{x + 3}" /></div>
                </div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">⚠️ Key Rule</p>
                <p>The denominator can never equal zero. Always state restrictions on x where the denominator would be zero.</p>
              </div>
            </section>

            {/* Four Operations */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">The Four Operations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TechniqueCard
                  title="Simplifying"
                  desc="Factor numerator and denominator, then cancel common factors."
                  example="\frac{x^2-9}{x+3} = x-3, \quad x \neq -3"
                  color="bg-blue-100 text-blue-700"
                />
                <TechniqueCard
                  title="Multiplying"
                  desc="Multiply numerators together and denominators together, then simplify."
                  example="\frac{x}{2} \times \frac{4}{x+1} = \frac{4x}{2(x+1)}"
                  color="bg-teal-100 text-teal-700"
                />
                <TechniqueCard
                  title="Adding & Subtracting"
                  desc="Find the LCD, rewrite each fraction, then add or subtract numerators."
                  example="\frac{1}{x} + \frac{1}{x+1} = \frac{2x+1}{x(x+1)}"
                  color="bg-purple-100 text-purple-700"
                />
                <TechniqueCard
                  title="Dividing"
                  desc="Multiply by the reciprocal of the divisor, then simplify."
                  example="\frac{x}{2} \div \frac{x}{4} = \frac{x}{2} \times \frac{4}{x} = 2"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each operation at your own pace.</p>

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
              <button
                onClick={() => router.push("/lessons/rational-expressions/practice")}
                className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity"
              >
                Practice Rational Expressions
              </button>
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