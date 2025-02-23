"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function RationalExpressionsLesson() {
  const router = useRouter();

  const handlePracticeClick = () => {
    router.push("/lessons/rational-expressions/practice");
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Rational Expressions Lesson
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              What are Rational Expressions?
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              A rational expression is a fraction where both the numerator and denominator are polynomials. It’s written as{" "}
              <InlineMath math="\frac{P(x)}{Q(x)}" />, where{" "}
              <InlineMath math="P(x)" /> and <InlineMath math="Q(x)" /> are polynomials, and{" "}
              <InlineMath math="Q(x) \neq 0" /> (division by zero is undefined). Examples include:
            </p>
            <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
              <li><InlineMath math="\frac{x}{x^2 + 1}" /></li>
              <li><InlineMath math="\frac{x^2 + x - 6}{1}" /></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Simplifying Rational Expressions
            </h2>
            <p className="text-base md:text-lg mb-4">
              To simplify, factor the numerator and denominator, then cancel common factors. Let’s simplify{" "}
              <strong className="text-accent">
                <InlineMath math="\frac{x^2 - 9}{x + 3}" />
              </strong>:
            </p>

            <div className="space-y-6">
              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 1: Factor the Expression</h3>
                <p className="text-base text-text mt-2">
                  Factor the numerator (difference of squares):
                  <br />
                  <InlineMath math="x^2 - 9 = (x - 3)(x + 3)" />
                  <br />
                  Denominator is already <InlineMath math="x + 3" />.
                  <br />
                  So: <InlineMath math="\frac{(x - 3)(x + 3)}{x + 3}" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 2: Cancel Common Factors</h3>
                <p className="text-base text-text mt-2">
                  Cancel <InlineMath math="x + 3" /> (as long as{" "}
                  <InlineMath math="x \neq -3" />):
                  <br />
                  <InlineMath math="\frac{(x - 3)(x + 3)}{x + 3} = x - 3" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 3: State Restrictions</h3>
                <p className="text-base text-text mt-2">
                  The original denominator <InlineMath math="x + 3 \neq 0" />, so{" "}
                  <InlineMath math="x \neq -3" />.
                  <br />
                  Final answer: <InlineMath math="x - 3" />,{" "}
                  <InlineMath math="x \neq -3" />
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Multiplying Rational Expressions
            </h2>
            <p className="text-base md:text-lg mb-4">
              Multiply numerators and denominators, then simplify. Example:{" "}
              <strong className="text-accent">
                <InlineMath math="\frac{x^2 - 9}{5x} \times \frac{10x}{x + 3}" />
              </strong>
            </p>
            <p className="text-base md:text-lg">
              - Factor:{" "}
              <InlineMath math="\frac{(x - 3)(x + 3)}{5x} \times \frac{10x}{x + 3}" />
              <br />
              - Multiply:{" "}
              <InlineMath math="\frac{(x - 3)(x + 3) \cdot 10x}{5x \cdot (x + 3)}" />
              <br />
              - Simplify: <InlineMath math="2(x - 3)" />,{" "}
              <InlineMath math="x \neq -3, 0" />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Practice Problems
            </h2>
            <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
              <li><InlineMath math="\frac{x^2 - 4}{x + 2}" /> (Simplify)</li>
              <li><InlineMath math="\frac{2x}{x - 1} \times \frac{x - 1}{4}" /> (Multiply)</li>
              <li><InlineMath math="\frac{x}{x - 3} + \frac{2}{x + 3}" /> (Add)</li>
            </ol>
            <p className="mt-4 text-base md:text-lg">
              <strong className="font-bold">Answers:</strong>{" "}
              1. <InlineMath math="x - 2, \, x \neq -2" />,{" "}
              2. <InlineMath math="\frac{x}{2}, \, x \neq 1" />,{" "}
              3. <InlineMath math="\frac{x^2 + 2x + 6}{(x - 3)(x + 3)}, \, x \neq \pm 3" />
            </p>
          </section>

          <div className="mt-10 text-center">
            <button
              onClick={handlePracticeClick}
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-salmon transition duration-300"
            >
              Practice Rational Expressions
            </button>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}