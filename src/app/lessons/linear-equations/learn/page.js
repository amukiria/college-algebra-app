"use client";

import React from 'react';
import Link from 'next/link';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Required for KaTeX styling
import * as math from 'mathjs'; // For solving equations
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function LinearEquationsLesson() {
  const solveEquation = (equation) => {
    try {
      const node = math.parse(equation);
      const solved = math.solve(node, 'x');
      return solved.toString();
    } catch (error) {
      return 'Unable to solve';
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Linear Equations Lesson
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              What is a Linear Equation?
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              A linear equation is a mathematical statement showing two expressions are equal, where the variable’s highest power is 1. Examples include:
            </p>
            <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
              <li><InlineMath math="x + 13 = 15" /></li>
              <li><InlineMath math="7x + 6 = 0" /></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              How to Solve Linear Equations
            </h2>

            <p className="text-base md:text-lg mb-4">
              Let’s solve <strong className="text-accent">2x + 3 = 0</strong> step-by-step:
            </p>

            <div className="space-y-6">
              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 1: Isolate the Variable Term</h3>
                <p className="text-base text-text mt-2">
                  Subtract 3 from both sides:
                  <br />
                  <InlineMath math="2x + 3 - 3 = 0 - 3" />
                  <br />
                  <InlineMath math="2x = -3" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 2: Solve for x</h3>
                <p className="text-base text-text mt-2">
                  Divide both sides by 2:
                  <br />
                  <InlineMath math="\frac{2x}{2} = \frac{-3}{2}" />
                  <br />
                  <InlineMath math="x = -\frac{3}{2}" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 3: Verify the Solution</h3>
                <p className="text-base text-text mt-2">
                  Substitute <InlineMath math="x = -\frac{3}{2}" /> back in:
                  <br />
                  <InlineMath math="2\left(-\frac{3}{2}\right) + 3 = -3 + 3 = 0" />
                  <br />
                  <span className="text-accent font-semibold">✅ Correct!</span>
                </p>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-primary">
              Another Example: <InlineMath math="3(x + 2) = 5x + 2" />
            </h3>
            <p className="text-base md:text-lg">
              Solution: <InlineMath math="x = 2" /> (Try solving it yourself first!)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Practice Problems
            </h2>
            <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
              <li><InlineMath math="4x - 7 = 9" /></li>
              <li><InlineMath math="2(x - 3) = 8" /></li>
              <li><InlineMath math="\frac{2}{3}x + 5 = 7" /></li>
            </ol>
            <p className="mt-4 text-base md:text-lg">
              <strong className="font-bold">Answers:</strong>{' '}
              1. <InlineMath math="x = 4" />,{' '}
              2. <InlineMath math="x = 7" />,{' '}
              3. <InlineMath math="x = 3" />
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/lessons/linear-equations/practice" legacyBehavior>
              <a className="inline-block bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-salmon transition duration-300">
                Go to Practice & Solver
              </a>
            </Link>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}