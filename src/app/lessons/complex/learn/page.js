"use client";

import React, { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// --- Worked Examples ---
const workedExamples = {
  adding: {
    title: "Adding & Subtracting",
    problem: "(3 + 2i) + (1 - 5i)",
    steps: [
      {
        label: "Write the expression",
        math: "(3 + 2i) + (1 - 5i)",
        explanation: "To add complex numbers, combine the real parts and imaginary parts separately.",
        highlight: "both",
      },
      {
        label: "Group real parts",
        math: "(3 + 1) + (2i - 5i)",
        explanation: "Rearrange to group real parts (3 and 1) and imaginary parts (2i and −5i) together.",
        highlight: "first",
      },
      {
        label: "Add the real parts",
        math: "4 + (2i - 5i)",
        explanation: "3 + 1 = 4.",
        highlight: "outer",
      },
      {
        label: "Add the imaginary parts",
        math: "4 + (-3i)",
        explanation: "2i − 5i = −3i. Add the coefficients of i just like combining like terms.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "4 - 3i",
        explanation: "The result is 4 − 3i. Real part: 4, Imaginary part: −3.",
        highlight: "result",
      },
      {
        label: "Subtraction works the same way",
        math: "(3 + 2i) - (1 - 5i) = (3-1) + (2+5)i = 2 + 7i",
        explanation: "For subtraction, distribute the negative sign first, then combine real and imaginary parts.",
        highlight: "result",
      },
    ],
  },
  multiplying: {
    title: "Multiplying",
    problem: "(3 + 2i)(1 - 5i)",
    steps: [
      {
        label: "Write the expression",
        math: "(3 + 2i)(1 - 5i)",
        explanation: "Multiply complex numbers using the distributive property (FOIL). Remember i² = −1.",
        highlight: "both",
      },
      {
        label: "First: multiply first terms",
        math: "3 \\times 1 = 3",
        explanation: "Multiply the first terms of each binomial.",
        highlight: "first",
      },
      {
        label: "Outer: multiply outer terms",
        math: "3 \\times (-5i) = -15i",
        explanation: "Multiply the outer terms.",
        highlight: "outer",
      },
      {
        label: "Inner: multiply inner terms",
        math: "2i \\times 1 = 2i",
        explanation: "Multiply the inner terms.",
        highlight: "inner",
      },
      {
        label: "Last: multiply last terms",
        math: "2i \\times (-5i) = -10i^2",
        explanation: "Multiply the last terms. We get −10i².",
        highlight: "combine",
      },
      {
        label: "Substitute i² = −1",
        math: "-10i^2 = -10(-1) = 10",
        explanation: "Replace i² with −1. This converts the i² term into a real number.",
        highlight: "inner",
      },
      {
        label: "Combine all terms",
        math: "3 - 15i + 2i + 10 = 13 - 13i",
        explanation: "Add real parts: 3 + 10 = 13. Add imaginary parts: −15i + 2i = −13i.",
        highlight: "result",
      },
    ],
  },
  dividing: {
    title: "Dividing",
    problem: "\\frac{3 + 2i}{1 - 5i}",
    steps: [
      {
        label: "Write the expression",
        math: "\\frac{3 + 2i}{1 - 5i}",
        explanation: "To divide complex numbers, multiply numerator and denominator by the conjugate of the denominator.",
        highlight: "both",
      },
      {
        label: "Find the conjugate of the denominator",
        math: "\\text{Conjugate of } (1 - 5i) = (1 + 5i)",
        explanation: "The conjugate flips the sign of the imaginary part. Conjugate of a − bi is a + bi.",
        highlight: "first",
      },
      {
        label: "Multiply by conjugate/conjugate",
        math: "\\frac{3 + 2i}{1 - 5i} \\times \\frac{1 + 5i}{1 + 5i}",
        explanation: "Multiplying by (1+5i)/(1+5i) is the same as multiplying by 1 — the value doesn't change.",
        highlight: "outer",
      },
      {
        label: "Expand the numerator",
        math: "(3 + 2i)(1 + 5i) = 3 + 15i + 2i + 10i^2 = 3 + 17i - 10 = -7 + 17i",
        explanation: "Use FOIL on the numerator. Replace i² = −1.",
        highlight: "inner",
      },
      {
        label: "Expand the denominator",
        math: "(1 - 5i)(1 + 5i) = 1 + 25 = 26",
        explanation: "This is a difference of squares: (a−bi)(a+bi) = a² + b². So 1² + 5² = 26.",
        highlight: "combine",
      },
      {
        label: "Write the result",
        math: "\\frac{-7 + 17i}{26}",
        explanation: "Divide both parts of the numerator by 26.",
        highlight: "result",
      },
      {
        label: "Final answer in standard form",
        math: "-\\frac{7}{26} + \\frac{17}{26}i",
        explanation: "Separate into real and imaginary parts. This is the standard form a + bi.",
        highlight: "result",
      },
    ],
  },
  powers: {
    title: "Powers of i",
    problem: "i^{17}",
    steps: [
      {
        label: "Recall the cycle of powers",
        math: "i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1",
        explanation: "The powers of i repeat in a cycle of 4. After i⁴ = 1, the pattern starts over.",
        highlight: "both",
      },
      {
        label: "The cycle repeats every 4",
        math: "i^5 = i, \\quad i^6 = -1, \\quad i^7 = -i, \\quad i^8 = 1",
        explanation: "Every multiple of 4 gives i⁴ⁿ = 1. Use this to find any power of i.",
        highlight: "first",
      },
      {
        label: "Divide the exponent by 4",
        math: "17 \\div 4 = 4 \\text{ remainder } 1",
        explanation: "Find the remainder when 17 is divided by 4. The remainder tells us where in the cycle we are.",
        highlight: "outer",
      },
      {
        label: "Use the remainder",
        math: "17 \\mod 4 = 1",
        explanation: "The remainder is 1, so i¹⁷ = i¹.",
        highlight: "inner",
      },
      {
        label: "Final answer",
        math: "i^{17} = i^1 = i",
        explanation: "i¹⁷ = i. The cycle always reduces to the remainder position.",
        highlight: "result",
      },
      {
        label: "Verify with another example",
        math: "i^{22} = i^{22 \\mod 4} = i^2 = -1",
        explanation: "22 ÷ 4 = 5 remainder 2. So i²² = i² = −1. The pattern always works.",
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
    problem: "(2 + 3i) + (4 - i)",
    answer: "6+2i",
    hint: "Add real parts together and imaginary parts together.",
  },
  {
    problem: "i^{10}",
    answer: "-1",
    hint: "Find 10 mod 4. The remainder tells you which power in the cycle.",
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

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Type your answer, e.g. 6+2i"
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

export default function ComplexNumbersLearnPage() {
  const [activeExample, setActiveExample] = useState("adding");

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          {/* Hero */}
          <div className="bg-primary py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Complex Numbers</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              Numbers of the form a + bi. Extend the real number system to solve equations that have no real solutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            {/* What is a Complex Number */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Complex Number?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>complex number</strong> is a number of the form <InlineMath math="a + bi" />, where <InlineMath math="a" /> and <InlineMath math="b" /> are real numbers and <InlineMath math="i" /> is the imaginary unit defined as <InlineMath math="i = \sqrt{-1}" />.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center text-2xl mb-6">
                <InlineMath math="z = a + bi \quad \text{where } i^2 = -1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-2">Real Part</p>
                  <div className="text-center text-lg"><InlineMath math="a \text{ in } a + bi" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">e.g. 3 in 3 + 4i</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-2">Imaginary Part</p>
                  <div className="text-center text-lg"><InlineMath math="b \text{ in } a + bi" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">e.g. 4 in 3 + 4i</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-purple-600 mb-2">Conjugate</p>
                  <div className="text-center text-lg"><InlineMath math="a - bi" /></div>
                  <p className="text-xs text-gray-500 mt-2 text-center">e.g. 3 − 4i</p>
                </div>
              </div>
            </section>

            {/* Powers of i */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">The Powers of i</h2>
              <p className="text-lg text-gray-700 mb-6">
                The powers of <InlineMath math="i" /> follow a repeating cycle of 4. Knowing this cycle lets you simplify any power of i instantly.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { power: "i^1", value: "i", color: "bg-blue-50 border-blue-200 text-blue-700" },
                  { power: "i^2", value: "-1", color: "bg-teal-50 border-teal-200 text-teal-700" },
                  { power: "i^3", value: "-i", color: "bg-purple-50 border-purple-200 text-purple-700" },
                  { power: "i^4", value: "1", color: "bg-amber-50 border-amber-200 text-amber-700" },
                ].map(({ power, value, color }) => (
                  <div key={power} className={`border rounded-xl p-5 text-center ${color}`}>
                    <div className="text-lg font-bold mb-2"><InlineMath math={power} /></div>
                    <div className="text-2xl font-extrabold"><InlineMath math={value} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">💡 Quick Trick</p>
                <p>To find iⁿ, divide n by 4 and use the remainder: remainder 0 → 1, remainder 1 → i, remainder 2 → −1, remainder 3 → −i.</p>
              </div>
            </section>

            {/* Operations */}
            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Operations with Complex Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ConceptCard
                  title="Addition"
                  desc="Combine real parts and imaginary parts separately."
                  example="(3+2i)+(1-5i) = 4-3i"
                  color="bg-blue-100 text-blue-700"
                />
                <ConceptCard
                  title="Subtraction"
                  desc="Distribute the negative, then combine like parts."
                  example="(3+2i)-(1-5i) = 2+7i"
                  color="bg-teal-100 text-teal-700"
                />
                <ConceptCard
                  title="Multiplication"
                  desc="Use FOIL and substitute i² = −1."
                  example="(3+2i)(1-5i) = 13-13i"
                  color="bg-purple-100 text-purple-700"
                />
                <ConceptCard
                  title="Division"
                  desc="Multiply by the conjugate of the denominator."
                  example="\frac{3+2i}{1-5i} = -\frac{7}{26}+\frac{17}{26}i"
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
              <a href="/lessons/complex/practice">
                <button className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity">
                  Practice Complex Numbers
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