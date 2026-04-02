"use client";

import React, { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  onestep: {
    title: "One-Step",
    problem: "x + 5 = 12",
    steps: [
      {
        label: "Identify the operation",
        math: "x + 5 = 12",
        explanation: "The variable x has 5 added to it. To isolate x, we need to undo that addition.",
        highlight: "both",
      },
      {
        label: "Subtract 5 from both sides",
        math: "x + 5 - 5 = 12 - 5",
        explanation: "Whatever we do to one side, we must do to the other. Subtract 5 from both sides.",
        highlight: "first",
      },
      {
        label: "Simplify",
        math: "x = 7",
        explanation: "5 − 5 = 0 on the left, 12 − 5 = 7 on the right. x is now isolated.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "7 + 5 = 12 \\checkmark",
        explanation: "Substitute x = 7 back into the original equation to confirm it works.",
        highlight: "result",
      },
    ],
  },
  twostep: {
    title: "Two-Step",
    problem: "2x + 3 = 7",
    steps: [
      {
        label: "Identify the equation",
        math: "2x + 3 = 7",
        explanation: "x is multiplied by 2 and then 3 is added. We undo these operations in reverse order.",
        highlight: "both",
      },
      {
        label: "Subtract 3 from both sides",
        math: "2x + 3 - 3 = 7 - 3",
        explanation: "First undo the addition. Subtract 3 from both sides.",
        highlight: "first",
      },
      {
        label: "Simplify",
        math: "2x = 4",
        explanation: "The left side simplifies to 2x, the right side to 4.",
        highlight: "outer",
      },
      {
        label: "Divide both sides by 2",
        math: "\\frac{2x}{2} = \\frac{4}{2}",
        explanation: "Now undo the multiplication. Divide both sides by 2.",
        highlight: "inner",
      },
      {
        label: "Simplify",
        math: "x = 2",
        explanation: "2x ÷ 2 = x on the left, 4 ÷ 2 = 2 on the right.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "2(2) + 3 = 4 + 3 = 7 \\checkmark",
        explanation: "Substitute x = 2 back into the original equation to confirm.",
        highlight: "result",
      },
    ],
  },
  brackets: {
    title: "With Brackets",
    problem: "3(x + 2) = 5x + 2",
    steps: [
      {
        label: "Write the equation",
        math: "3(x + 2) = 5x + 2",
        explanation: "There are brackets on the left. We expand them first using the distributive property.",
        highlight: "both",
      },
      {
        label: "Expand the brackets",
        math: "3x + 6 = 5x + 2",
        explanation: "Multiply 3 by each term inside: 3 × x = 3x and 3 × 2 = 6.",
        highlight: "first",
      },
      {
        label: "Move x terms to one side",
        math: "3x - 5x + 6 = 2",
        explanation: "Subtract 5x from both sides to collect x terms on the left.",
        highlight: "outer",
      },
      {
        label: "Simplify x terms",
        math: "-2x + 6 = 2",
        explanation: "3x − 5x = −2x.",
        highlight: "inner",
      },
      {
        label: "Subtract 6 from both sides",
        math: "-2x = 2 - 6 = -4",
        explanation: "Move the constant to the right by subtracting 6 from both sides.",
        highlight: "combine",
      },
      {
        label: "Divide by −2",
        math: "x = \\frac{-4}{-2} = 2",
        explanation: "Divide both sides by −2. Negative ÷ negative = positive.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "3(2 + 2) = 3(4) = 12 = 5(2) + 2 \\checkmark",
        explanation: "Substitute x = 2 into both sides. Both equal 12.",
        highlight: "result",
      },
    ],
  },
  fractions: {
    title: "With Fractions",
    problem: "\\frac{2}{3}x + 5 = 7",
    steps: [
      {
        label: "Write the equation",
        math: "\\frac{2}{3}x + 5 = 7",
        explanation: "x is multiplied by 2/3 and 5 is added. We undo these in reverse order.",
        highlight: "both",
      },
      {
        label: "Subtract 5 from both sides",
        math: "\\frac{2}{3}x = 7 - 5",
        explanation: "Undo the addition of 5 first by subtracting 5 from both sides.",
        highlight: "first",
      },
      {
        label: "Simplify the right side",
        math: "\\frac{2}{3}x = 2",
        explanation: "7 − 5 = 2.",
        highlight: "outer",
      },
      {
        label: "Multiply both sides by the reciprocal",
        math: "\\frac{3}{2} \\times \\frac{2}{3}x = 2 \\times \\frac{3}{2}",
        explanation: "To undo multiplying by 2/3, multiply both sides by its reciprocal 3/2.",
        highlight: "inner",
      },
      {
        label: "Simplify",
        math: "x = 3",
        explanation: "On the left, (3/2)(2/3) = 1, so we get x. On the right, 2 × (3/2) = 3.",
        highlight: "result",
      },
      {
        label: "Verify",
        math: "\\frac{2}{3}(3) + 5 = 2 + 5 = 7 \\checkmark",
        explanation: "Substitute x = 3 back in. Both sides equal 7.",
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
  { problem: "4x - 7 = 9", answer: "4", hint: "Add 7 to both sides first, then divide by 4." },
  { problem: "2(x - 3) = 8", answer: "7", hint: "Expand the brackets first, then solve for x." },
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

      <p className="text-gray-600 text-sm mb-2">Solve for x:</p>
      <div className="text-2xl text-center mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <InlineMath math={current.problem} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Enter the value of x"
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

export default function LinearEquationsLesson() {
  const router = useRouter();
  const [activeExample, setActiveExample] = useState("onestep");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Linear Equations</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Equations where the variable's highest power is 1. Learn to isolate x and solve with confidence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is a Linear Equation */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Linear Equation?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>linear equation</strong> is a mathematical statement where two expressions are equal, and the variable's highest power is 1. The goal is always to find the value of x that makes the equation true.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Example 1</p>
                  <div className="text-center text-lg"><InlineMath math="x + 13 = 15" /></div>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Example 2</p>
                  <div className="text-center text-lg"><InlineMath math="7x + 6 = 0" /></div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">💡 The Golden Rule</p>
                <p>Whatever you do to one side of the equation, you must do to the other. Always keep the equation balanced.</p>
              </div>
            </section>

            {/* Types */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Types of Linear Equations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TechniqueCard
                  title="One-Step"
                  desc="Requires a single operation to isolate x."
                  example="x + 5 = 12 \Rightarrow x = 7"
                  color="bg-blue-100 text-blue-700"
                />
                <TechniqueCard
                  title="Two-Step"
                  desc="Requires two operations in reverse order of PEMDAS."
                  example="2x + 3 = 7 \Rightarrow x = 2"
                  color="bg-teal-100 text-teal-700"
                />
                <TechniqueCard
                  title="With Brackets"
                  desc="Expand brackets first using the distributive property."
                  example="3(x+2) = 5x+2 \Rightarrow x = 2"
                  color="bg-purple-100 text-purple-700"
                />
                <TechniqueCard
                  title="With Fractions"
                  desc="Multiply by the reciprocal to eliminate fractional coefficients."
                  example="\frac{2}{3}x + 5 = 7 \Rightarrow x = 3"
                  color="bg-amber-100 text-amber-700"
                />
              </div>
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
              <p className="text-gray-500 mb-6">Test your understanding before heading to the escape room.</p>
              <QuickCheck />
            </section>

            {/* CTA */}
            <div className="flex justify-center pb-8">
              <button
                onClick={() => router.push("/lessons/linear-equations/practice")}
                className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity"
              >
                Practice Linear Equations
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