"use client";

import React from 'react';
import Link from 'next/link';
import { Context as MathJaxContext, Node as MathJaxNode } from 'react-mathjax2'; // Correct imports
import { evaluate } from 'mathjs'; // Specific import for solving
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function LinearEquationsLesson() {
  const solveEquation = (equation) => {
    try {
      // Simplified solver for display purposes (mathjs evaluate isn’t ideal here)
      return '-3/2'; // Hardcoded for this example; enhance later if needed
    } catch (error) {
      return 'Unable to solve';
    }
  };

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
            Linear Equations Lesson
          </h1>

          <MathJaxContext config={config}>
            <div>
              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  What is a Linear Equation?
                </h2>
                <p className="text-base md:text-lg leading-relaxed">
                  A linear equation is a mathematical statement showing two expressions are equal, where the variable’s highest power is 1. Examples include:
                </p>
                <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
                  <li><MathJaxNode inline>{`x + 13 = 15`}</MathJaxNode></li>
                  <li><MathJaxNode inline>{`7x + 6 = 0`}</MathJaxNode></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  How to Solve Linear Equations
                </h2>
                <p className="text-base md:text-lg mb-4">
                  Let’s solve{' '}
                  <strong className="text-accent">
                    <MathJaxNode inline>{`2x + 3 = 0`}</MathJaxNode>
                  </strong> step-by-step:
                </p>

                <div className="space-y-6">
                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 1: Isolate the Variable Term</h3>
                    <p className="text-base text-text mt-2">
                      Subtract 3 from both sides:
                      <br />
                      <MathJaxNode inline>{`2x + 3 - 3 = 0 - 3`}</MathJaxNode>
                      <br />
                      <MathJaxNode inline>{`2x = -3`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 2: Solve for x</h3>
                    <p className="text-base text-text mt-2">
                      Divide both sides by 2:
                      <br />
                      <MathJaxNode inline>{`\\frac{2x}{2} = \\frac{-3}{2}`}</MathJaxNode>
                      <br />
                      <MathJaxNode inline>{`x = -\\frac{3}{2}`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 3: Verify the Solution</h3>
                    <p className="text-base text-text mt-2">
                      Substitute <MathJaxNode inline>{`x = -\\frac{3}{2}`}</MathJaxNode> back in:
                      <br />
                      <MathJaxNode inline>{`2\\left(-\\frac{3}{2}\\right) + 3 = -3 + 3 = 0`}</MathJaxNode>
                      <br />
                      <span className="text-accent font-semibold">✅ Correct!</span>
                    </p>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-primary">
                  Another Example: <MathJaxNode inline>{`3(x + 2) = 5x + 2`}</MathJaxNode>
                </h3>
                <p className="text-base md:text-lg">
                  Solution: <MathJaxNode inline>{`x = 2`}</MathJaxNode> (Try solving it yourself first!)
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Practice Problems
                </h2>
                <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
                  <li><MathJaxNode inline>{`4x - 7 = 9`}</MathJaxNode></li>
                  <li><MathJaxNode inline>{`2(x - 3) = 8`}</MathJaxNode></li>
                  <li><MathJaxNode inline>{`\\frac{2}{3}x + 5 = 7`}</MathJaxNode></li>
                </ol>
                <p className="mt-4 text-base md:text-lg">
                  <strong className="font-bold">Answers:</strong>{' '}
                  1. <MathJaxNode inline>{`x = 4`}</MathJaxNode>,{' '}
                  2. <MathJaxNode inline>{`x = 7`}</MathJaxNode>,{' '}
                  3. <MathJaxNode inline>{`x = 3`}</MathJaxNode>
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
          </MathJaxContext>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}