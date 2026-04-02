"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  factoring: {
    title: "Factoring",
    problem: "x^2 - 5x + 6 = 0",
    steps: [
      {
        label: "Identify the quadratic",
        math: "x^2 - 5x + 6 = 0",
        explanation: "This is a quadratic in standard form ax² + bx + c = 0 with a=1, b=−5, c=6. We'll factor it into two binomials.",
        highlight: "both",
      },
      {
        label: "Find two numbers that multiply to c",
        math: "p \\times q = 6",
        explanation: "The constant c = 6. We need two numbers whose product is 6: (1,6), (2,3), (−1,−6), (−2,−3).",
        highlight: "first",
      },
      {
        label: "And add to b",
        math: "p + q = -5",
        explanation: "The coefficient b = −5. Which pair sums to −5? Try −2 and −3: −2 + (−3) = −5 ✓",
        highlight: "outer",
      },
      {
        label: "Write the factored form",
        math: "(x - 2)(x - 3) = 0",
        explanation: "Use p = −2 and q = −3 to write the factored form.",
        highlight: "inner",
      },
      {
        label: "Apply the Zero Product Property",
        math: "x - 2 = 0 \\quad \\text{or} \\quad x - 3 = 0",
        explanation: "If a product equals zero, at least one factor must equal zero.",
        highlight: "combine",
      },
      {
        label: "Solve each equation",
        math: "x = 2 \\quad \\text{or} \\quad x = 3",
        explanation: "Solve each simple equation separately.",
        highlight: "result",
      },
      {
        label: "Verify both solutions",
        math: "2^2 - 5(2) + 6 = 0 \\checkmark \\quad 3^2 - 5(3) + 6 = 0 \\checkmark",
        explanation: "Substitute both values back to confirm they satisfy the original equation.",
        highlight: "result",
      },
    ],
  },
  formula: {
    title: "Quadratic Formula",
    problem: "2x^2 + 3x - 2 = 0",
    steps: [
      {
        label: "Identify the quadratic",
        math: "2x^2 + 3x - 2 = 0",
        explanation: "This quadratic doesn't factor easily. We'll use the quadratic formula instead.",
        highlight: "both",
      },
      {
        label: "The quadratic formula",
        math: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        explanation: "This formula works for any quadratic ax² + bx + c = 0.",
        highlight: "first",
      },
      {
        label: "Identify a, b, and c",
        math: "a = 2, \\quad b = 3, \\quad c = -2",
        explanation: "Read the coefficients directly from the equation.",
        highlight: "outer",
      },
      {
        label: "Calculate the discriminant",
        math: "b^2 - 4ac = 3^2 - 4(2)(-2) = 9 + 16 = 25",
        explanation: "The discriminant b²−4ac tells us how many solutions exist. Positive = 2 solutions.",
        highlight: "inner",
      },
      {
        label: "Substitute into the formula",
        math: "x = \\frac{-3 \\pm \\sqrt{25}}{2(2)} = \\frac{-3 \\pm 5}{4}",
        explanation: "Replace a, b, c with their values and simplify √25 = 5.",
        highlight: "combine",
      },
      {
        label: "Find both solutions",
        math: "x = \\frac{-3 + 5}{4} = \\frac{2}{4} = \\frac{1}{2} \\quad \\text{or} \\quad x = \\frac{-3 - 5}{4} = \\frac{-8}{4} = -2",
        explanation: "Use + and − separately to get both solutions.",
        highlight: "result",
      },
      {
        label: "Final answer",
        math: "x = \\frac{1}{2} \\quad \\text{or} \\quad x = -2",
        explanation: "Both values satisfy the original equation.",
        highlight: "result",
      },
    ],
  },
  completing: {
    title: "Completing the Square",
    problem: "x^2 + 6x + 5 = 0",
    steps: [
      {
        label: "Write the equation",
        math: "x^2 + 6x + 5 = 0",
        explanation: "We'll complete the square — rewrite the left side as a perfect square trinomial.",
        highlight: "both",
      },
      {
        label: "Move the constant to the right",
        math: "x^2 + 6x = -5",
        explanation: "Subtract 5 from both sides to isolate the x terms.",
        highlight: "first",
      },
      {
        label: "Find the completing term",
        math: "\\left(\\frac{6}{2}\\right)^2 = 9",
        explanation: "Take half the coefficient of x (6÷2=3) and square it (3²=9).",
        highlight: "outer",
      },
      {
        label: "Add 9 to both sides",
        math: "x^2 + 6x + 9 = -5 + 9 = 4",
        explanation: "Adding 9 to both sides keeps the equation balanced and completes the square on the left.",
        highlight: "inner",
      },
      {
        label: "Write as a perfect square",
        math: "(x + 3)^2 = 4",
        explanation: "x² + 6x + 9 = (x+3)². The left side is now a perfect square.",
        highlight: "combine",
      },
      {
        label: "Take the square root of both sides",
        math: "x + 3 = \\pm 2",
        explanation: "√4 = ±2. Don't forget the ± — both positive and negative roots are valid.",
        highlight: "result",
      },
      {
        label: "Solve for x",
        math: "x = -3 + 2 = -1 \\quad \\text{or} \\quad x = -3 - 2 = -5",
        explanation: "Subtract 3 from both cases to get the two solutions.",
        highlight: "result",
      },
    ],
  },
  difference: {
    title: "Difference of Squares",
    problem: "x^2 - 4 = 0",
    steps: [
      {
        label: "Identify the pattern",
        math: "x^2 - 4 = 0",
        explanation: "This is a difference of squares: x² − 4 = x² − 2². No middle term means b = 0.",
        highlight: "both",
      },
      {
        label: "Recognise the formula",
        math: "a^2 - b^2 = (a - b)(a + b)",
        explanation: "Any difference of two perfect squares factors into conjugate binomials.",
        highlight: "first",
      },
      {
        label: "Identify a and b",
        math: "a = x, \\quad b = 2",
        explanation: "√x² = x and √4 = 2.",
        highlight: "outer",
      },
      {
        label: "Factor the expression",
        math: "(x - 2)(x + 2) = 0",
        explanation: "Apply the formula with a = x and b = 2.",
        highlight: "inner",
      },
      {
        label: "Apply Zero Product Property",
        math: "x - 2 = 0 \\quad \\text{or} \\quad x + 2 = 0",
        explanation: "Set each factor equal to zero.",
        highlight: "combine",
      },
      {
        label: "Solve for x",
        math: "x = 2 \\quad \\text{or} \\quad x = -2",
        explanation: "The two solutions are symmetric around zero — this is always the case for difference of squares.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "2^2 - 4 = 0 \\checkmark \\quad (-2)^2 - 4 = 0 \\checkmark",
        explanation: "Both values satisfy the original equation.",
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
  { problem: "x^2 + 7x + 12 = 0", answer: "-3,-4", hint: "Find two numbers that multiply to 12 and add to 7. Try 3 and 4." },
  { problem: "x^2 - 4 = 0", answer: "2,-2", hint: "This is a difference of squares. Factor as (x−2)(x+2)." },
];

function QuickCheck() {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const current = quickChecks[idx];

  const normalize = (str) =>
    str.trim().replace(/\s/g, "").split(",").map(Number).sort((a, b) => a - b).join(",");

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

      <p className="text-gray-600 text-sm mb-2">Solve for x:</p>
      <div className="text-2xl text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Enter both solutions separated by a comma, e.g. 2,-3"
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

export default function QuadraticEquationsLesson() {
  const router = useRouter();
  const [activeExample, setActiveExample] = useState("factoring");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Quadratic Equations</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Equations where the highest power is 2. Four methods — one for every situation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What are Quadratic Equations */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What are Quadratic Equations?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>quadratic equation</strong> is a polynomial equation where the highest power of the variable is 2. The standard form is:
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center text-2xl mb-6">
                <InlineMath math="ax^2 + bx + c = 0 \quad (a \neq 0)" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "a", desc: "Coefficient of x². Cannot be 0.", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "b", desc: "Coefficient of x. Can be 0.", color: "bg-teal-50 border-teal-100 text-teal-700" },
                  { label: "c", desc: "The constant term. Can be 0.", color: "bg-purple-50 border-purple-100 text-purple-700" },
                ].map(({ label, desc, color }) => (
                  <div key={label} className={`border rounded-xl p-5 ${color}`}>
                    <p className="text-2xl font-extrabold mb-1"><InlineMath math={label} /></p>
                    <p className="text-sm">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Example 1</p>
                  <div className="text-center text-lg"><InlineMath math="x^2 - 5x + 6 = 0" /></div>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Example 2</p>
                  <div className="text-center text-lg"><InlineMath math="2x^2 + 3x - 2 = 0" /></div>
                </div>
              </div>
            </section>

            {/* The Discriminant */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">The Discriminant</h2>
              <p className="text-lg text-gray-700 mb-6">
                Before solving, the discriminant <InlineMath math="b^2 - 4ac" /> tells you how many solutions to expect.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="text-sm font-semibold text-green-700 mb-2"><InlineMath math="b^2 - 4ac > 0" /></p>
                  <p className="text-gray-700 text-sm">Two distinct real solutions</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-700 mb-2"><InlineMath math="b^2 - 4ac = 0" /></p>
                  <p className="text-gray-700 text-sm">One repeated solution</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="text-sm font-semibold text-red-700 mb-2"><InlineMath math="b^2 - 4ac < 0" /></p>
                  <p className="text-gray-700 text-sm">No real solutions</p>
                </div>
              </div>
            </section>

            {/* Four Methods */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Four Solving Methods</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TechniqueCard
                  title="Factoring"
                  desc="Factor into two binomials and use the Zero Product Property."
                  example="x^2 - 5x + 6 = (x-2)(x-3) = 0"
                  color="bg-blue-100 text-blue-700"
                />
                <TechniqueCard
                  title="Quadratic Formula"
                  desc="Works for any quadratic — the most reliable method."
                  example="x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
                  color="bg-teal-100 text-teal-700"
                />
                <TechniqueCard
                  title="Completing the Square"
                  desc="Rewrite as a perfect square, then take the square root."
                  example="x^2 + 6x + 5 \Rightarrow (x+3)^2 = 4"
                  color="bg-purple-100 text-purple-700"
                />
                <TechniqueCard
                  title="Difference of Squares"
                  desc="Special case when b = 0. Factor using a² − b² = (a−b)(a+b)."
                  example="x^2 - 4 = (x-2)(x+2) = 0"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
            </section>

            {/* The Formula */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-4">The Quadratic Formula</h2>
              <p className="text-gray-600 mb-4">When factoring isn't obvious, this formula always works:</p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                <BlockMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
              </div>
            </section>

            {/* Worked Examples */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Worked Examples</h2>
              <p className="text-gray-500 mb-6">Step through each method at your own pace.</p>

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
              <p className="text-gray-500 mb-6">Test your understanding before heading to slay the dragon.</p>
              <QuickCheck />
            </section>

            {/* CTA */}
            <div className="flex justify-center pb-8">
              <button
                onClick={() => router.push("/lessons/quadratic-equations/practice")}
                className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity"
              >
                ⚔️ Practice Quadratic Equations
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