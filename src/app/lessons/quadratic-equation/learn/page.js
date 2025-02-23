"use client";

import React from 'react';
import Link from 'next/link';
import { Context as MathJaxContext, Node as MathJaxNode } from 'react-mathjax2'; // Correct imports
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function QuadraticEquationsLesson() {
  const config = {
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Quadratic Equations Lesson
          </h1>

          <MathJaxContext config={config}>
            <div>
              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  What are Quadratic Equations?
                </h2>
                <p className="text-base md:text-lg leading-relaxed">
                  A quadratic equation is a polynomial equation where the highest power of the variable is 2. It’s typically written as{' '}
                  <MathJaxNode inline>{`ax^2 + bx + c = 0`}</MathJaxNode>, where{' '}
                  <MathJaxNode inline>{`a`}</MathJaxNode>, <MathJaxNode inline>{`b`}</MathJaxNode>, and{' '}
                  <MathJaxNode inline>{`c`}</MathJaxNode> are constants, and{' '}
                  <MathJaxNode inline>{`a \\neq 0`}</MathJaxNode>. Examples include:
                </p>
                <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
                  <li><MathJaxNode inline>{`x^2 - 5x + 6 = 0`}</MathJaxNode></li>
                  <li><MathJaxNode inline>{`2x^2 + 3x - 2 = 0`}</MathJaxNode></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Solving by Factoring
                </h2>
                <p className="text-base md:text-lg mb-4">
                  One way to solve quadratics is by factoring them into two binomials and setting each to zero. Let’s solve{' '}
                  <strong className="text-accent">
                    <MathJaxNode inline>{`x^2 - 5x + 6 = 0`}</MathJaxNode>
                  </strong>:
                </p>

                <div className="space-y-6">
                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 1: Factor the Quadratic</h3>
                    <p className="text-base text-text mt-2">
                      Find two numbers that multiply to 6 (the constant) and add to -5 (the coefficient of{' '}
                      <MathJaxNode inline>{`x`}</MathJaxNode>):
                      <br />
                      - Numbers: -2 and -3 (<MathJaxNode inline>{`-2 \\times -3 = 6`}</MathJaxNode>,{' '}
                      <MathJaxNode inline>{`-2 + (-3) = -5`}</MathJaxNode>)
                      <br />
                      - Factored: <MathJaxNode inline>{`(x - 2)(x - 3) = 0`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 2: Set Each Factor to Zero</h3>
                    <p className="text-base text-text mt-2">
                      <MathJaxNode inline>{`x - 2 = 0`}</MathJaxNode> or{' '}
                      <MathJaxNode inline>{`x - 3 = 0`}</MathJaxNode>
                      <br />
                      - <MathJaxNode inline>{`x = 2`}</MathJaxNode>
                      <br />
                      - <MathJaxNode inline>{`x = 3`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 3: Verify Solutions</h3>
                    <p className="text-base text-text mt-2">
                      Check <MathJaxNode inline>{`x = 2`}</MathJaxNode>:{' '}
                      <MathJaxNode inline>{`2^2 - 5(2) + 6 = 4 - 10 + 6 = 0`}</MathJaxNode>
                      <br />
                      Check <MathJaxNode inline>{`x = 3`}</MathJaxNode>:{' '}
                      <MathJaxNode inline>{`3^2 - 5(3) + 6 = 9 - 15 + 6 = 0`}</MathJaxNode>
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
                  <MathJaxNode inline>{`x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`}</MathJaxNode>. Example:{' '}
                  <strong className="text-accent">
                    <MathJaxNode inline>{`2x^2 + 3x - 2 = 0`}</MathJaxNode>
                  </strong>
                </p>
                <p className="text-base md:text-lg">
                  - Identify: <MathJaxNode inline>{`a = 2`}</MathJaxNode>,{' '}
                  <MathJaxNode inline>{`b = 3`}</MathJaxNode>, <MathJaxNode inline>{`c = -2`}</MathJaxNode>
                  <br />
                  - Substitute:{' '}
                  <MathJaxNode inline>{`x = \\frac{-3 \\pm \\sqrt{3^2 - 4(2)(-2)}}{2(2)}`}</MathJaxNode>
                  <br />
                  - Simplify:{' '}
                  <MathJaxNode inline>{`x = \\frac{-3 \\pm \\sqrt{9 + 16}}{4} = \\frac{-3 \\pm \\sqrt{25}}{4} = \\frac{-3 \\pm 5}{4}`}</MathJaxNode>
                  <br />
                  - Solutions: <MathJaxNode inline>{`x = \\frac{2}{4} = \\frac{1}{2}`}</MathJaxNode> or{' '}
                  <MathJaxNode inline>{`x = \\frac{-8}{4} = -2`}</MathJaxNode>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Practice Problems
                </h2>
                <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
                  <li><MathJaxNode inline>{`x^2 + 7x + 12 = 0`}</MathJaxNode> (Factor)</li>
                  <li><MathJaxNode inline>{`3x^2 - 5x - 2 = 0`}</MathJaxNode> (Factor or use formula)</li>
                  <li><MathJaxNode inline>{`x^2 - 4 = 0`}</MathJaxNode> (Factor)</li>
                </ol>
                <p className="mt-4 text-base md:text-lg">
                  <strong className="font-bold">Answers:</strong>{' '}
                  1. <MathJaxNode inline>{`x = -3, -4`}</MathJaxNode>,{' '}
                  2. <MathJaxNode inline>{`x = 2, -\\frac{1}{3}`}</MathJaxNode>,{' '}
                  3. <MathJaxNode inline>{`x = 2, -2`}</MathJaxNode>
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
          </MathJaxContext>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}