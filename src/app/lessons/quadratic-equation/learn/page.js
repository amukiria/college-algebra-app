"use client";

import React from 'react';
import Link from 'next/link';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Required for KaTeX styling
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function QuadraticEquationsLesson() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Quadratic Equations Lesson
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              What are Quadratic Equations?
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              A quadratic equation is a polynomial equation where the highest power of the variable is 2. It’s typically written as{' '}
              <InlineMath math="ax^2 + bx + c = 0" />, where{' '}
              <InlineMath math="a" />, <InlineMath math="b" />, and <InlineMath math="c" /> are constants, and{' '}
              <InlineMath math="a \neq 0" />. Examples include:
            </p>
            <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
              <li><InlineMath math="x^2 - 5x + 6 = 0" /></li>
              <li><InlineMath math="2x^2 + 3x - 2 = 0" /></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Solving by Factoring
            </h2>
            <p className="text-base md:text-lg mb-4">
              One way to solve quadratics is by factoring them into two binomials and setting each to zero. Let’s solve{' '}
              <strong className="text-accent">
                <InlineMath math="x^2 - 5x + 6 = 0" />
              </strong>:
            </p>

            <div className="space-y-6">
              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 1: Factor the Quadratic</h3>
                <p className="text-base text-text mt-2">
                  Find two numbers that multiply to 6 (the constant) and add to -5 (the coefficient of <InlineMath math="x" />):
                  <br />
                  - Numbers: -2 and -3 (<InlineMath math="-2 \times -3 = 6" />, <InlineMath math="-2 + (-3) = -5" />)
                  <br />
                  - Factored: <InlineMath math="(x - 2)(x - 3) = 0" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 2: Set Each Factor to Zero</h3>
                <p className="text-base text-text mt-2">
                  <InlineMath math="x - 2 = 0" /> or <InlineMath math="x - 3 = 0" />
                  <br />
                  - <InlineMath math="x = 2" />
                  <br />
                  - <InlineMath math="x = 3" />
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">Step 3: Verify Solutions</h3>
                <p className="text-base text-text mt-2">
                  Check <InlineMath math="x = 2" />: <InlineMath math="2^2 - 5(2) + 6 = 4 - 10 + 6 = 0" />
                  <br />
                  Check <InlineMath math="x = 3" />: <InlineMath math="3^2 - 5(3) + 6 = 9 - 15 + 6 = 0" />
                  <br />
                  <span className="text-accent font-semibold">✅ Both solutions are correct!</span>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Using the Quadratic Formula
            </h2>
            <p className="text-base md:text-lg mb-4">
              When factoring is tricky, use the quadratic formula:{' '}
              <InlineMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />. Example:{' '}
              <strong className="text-accent">
                <InlineMath math="2x^2 + 3x - 2 = 0" />
              </strong>
            </p>
            <p className="text-base md:text-lg">
              - Identify: <InlineMath math="a = 2" />, <InlineMath math="b = 3" />, <InlineMath math="c = -2" />
              <br />
              - Substitute: <InlineMath math="x = \frac{-3 \pm \sqrt{3^2 - 4(2)(-2)}}{2(2)}" />
              <br />
              - Simplify: <InlineMath math="x = \frac{-3 \pm \sqrt{9 + 16}}{4} = \frac{-3 \pm \sqrt{25}}{4} = \frac{-3 \pm 5}{4}" />
              <br />
              - Solutions: <InlineMath math="x = \frac{2}{4} = \frac{1}{2}" /> or <InlineMath math="x = \frac{-8}{4} = -2" />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Practice Problems
            </h2>
            <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
              <li><InlineMath math="x^2 + 7x + 12 = 0" /> (Factor)</li>
              <li><InlineMath math="3x^2 - 5x - 2 = 0" /> (Factor or use formula)</li>
              <li><InlineMath math="x^2 - 4 = 0" /> (Factor)</li>
            </ol>
            <p className="mt-4 text-base md:text-lg">
              <strong className="font-bold">Answers:</strong>{' '}
              1. <InlineMath math="x = -3, -4" />,{' '}
              2. <InlineMath math="x = 2, -\frac{1}{3}" />,{' '}
              3. <InlineMath math="x = 2, -2" />
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/lessons/quadratic-equations/practice" legacyBehavior>
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