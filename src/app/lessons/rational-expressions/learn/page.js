"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function RationalExpressionsLesson() {
  const [isMounted, setIsMounted] = useState(false);

  // Dynamically import MathJax components inside the component
  const MathJaxContext = dynamic(() => import('react-mathjax2').then(mod => mod.Context), {
    ssr: false,
  });
  const MathJaxNode = dynamic(() => import('react-mathjax2').then(mod => mod.Node), {
    ssr: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config = {
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Rational Expressions Lesson
          </h1>

          <MathJaxContext config={config}>
            <div>
              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  What are Rational Expressions?
                </h2>
                <p className="text-base md:text-lg leading-relaxed">
                  A rational expression is a fraction where both the numerator and denominator are polynomials. It’s written as{' '}
                  <MathJaxNode inline>{`\\frac{P(x)}{Q(x)}`}</MathJaxNode>, where{' '}
                  <MathJaxNode inline>{`P(x)`}</MathJaxNode> and <MathJaxNode inline>{`Q(x)`}</MathJaxNode> are polynomials, and{' '}
                  <MathJaxNode inline>{`Q(x) \\neq 0`}</MathJaxNode> (division by zero is undefined). Examples include:
                </p>
                <ul className="list-disc ml-6 space-y-4 text-base md:text-lg mt-4">
                  <li><MathJaxNode inline>{`\\frac{x}{x^2 + 1}`}</MathJaxNode></li>
                  <li><MathJaxNode inline>{`\\frac{x^2 + x - 6}{1}`}</MathJaxNode></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Simplifying Rational Expressions
                </h2>
                <p className="text-base md:text-lg mb-4">
                  To simplify, factor the numerator and denominator, then cancel common factors. Let’s simplify{' '}
                  <strong className="text-accent">
                    <MathJaxNode inline>{`\\frac{x^2 - 9}{x + 3}`}</MathJaxNode>
                  </strong>:
                </p>

                <div className="space-y-6">
                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 1: Factor the Expression</h3>
                    <p className="text-base text-text mt-2">
                      Factor the numerator (difference of squares):
                      <br />
                      <MathJaxNode inline>{`x^2 - 9 = (x - 3)(x + 3)`}</MathJaxNode>
                      <br />
                      Denominator is already <MathJaxNode inline>{`x + 3`}</MathJaxNode>.
                      <br />
                      So: <MathJaxNode inline>{`\\frac{(x - 3)(x + 3)}{x + 3}`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 2: Cancel Common Factors</h3>
                    <p className="text-base text-text mt-2">
                      Cancel <MathJaxNode inline>{`x + 3`}</MathJaxNode> (as long as{' '}
                      <MathJaxNode inline>{`x \\neq -3`}</MathJaxNode>):
                      <br />
                      <MathJaxNode inline>{`\\frac{(x - 3)(x + 3)}{x + 3} = x - 3`}</MathJaxNode>
                    </p>
                  </div>

                  <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-primary">Step 3: State Restrictions</h3>
                    <p className="text-base text-text mt-2">
                      The original denominator <MathJaxNode inline>{`x + 3 \\neq 0`}</MathJaxNode>, so{' '}
                      <MathJaxNode inline>{`x \\neq -3`}</MathJaxNode>.
                      <br />
                      Final answer: <MathJaxNode inline>{`x - 3`}</MathJaxNode>,{' '}
                      <MathJaxNode inline>{`x \\neq -3`}</MathJaxNode>
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Multiplying Rational Expressions
                </h2>
                <p className="text-base md:text-lg mb-4">
                  Multiply numerators and denominators, then simplify. Example:{' '}
                  <strong className="text-accent">
                    <MathJaxNode inline>{`\\frac{x^2 - 9}{5x} \\times \\frac{10x}{x + 3}`}</MathJaxNode>
                  </strong>
                </p>
                <p className="text-base md:text-lg">
                  - Factor:{' '}
                  <MathJaxNode inline>{`\\frac{(x - 3)(x + 3)}{5x} \\times \\frac{10x}{x + 3}`}</MathJaxNode>
                  <br />
                  - Multiply:{' '}
                  <MathJaxNode inline>{`\\frac{(x - 3)(x + 3) \\cdot 10x}{5x \\cdot (x + 3)}`}</MathJaxNode>
                  <br />
                  - Simplify: <MathJaxNode inline>{`2(x - 3)`}</MathJaxNode>,{' '}
                  <MathJaxNode inline>{`x \\neq -3, 0`}</MathJaxNode>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  Practice Problems
                </h2>
                <ol className="list-decimal ml-6 space-y-4 text-base md:text-lg">
                  <li><MathJaxNode inline>{`\\frac{x^2 - 4}{x + 2}`}</MathJaxNode> (Simplify)</li>
                  <li><MathJaxNode inline>{`\\frac{2x}{x - 1} \\times \\frac{x - 1}{4}`}</MathJaxNode> (Multiply)</li>
                  <li><MathJaxNode inline>{`\\frac{x}{x - 3} + \\frac{2}{x + 3}`}</MathJaxNode> (Add)</li>
                </ol>
                <p className="mt-4 text-base md:text-lg">
                  <strong className="font-bold">Answers:</strong>{' '}
                  1. <MathJaxNode inline>{`x - 2, \\, x \\neq -2`}</MathJaxNode>,{' '}
                  2. <MathJaxNode inline>{`\\frac{x}{2}, \\, x \\neq 1`}</MathJaxNode>,{' '}
                  3. <MathJaxNode inline>{`\\frac{x^2 + 2x + 6}{(x - 3)(x + 3)}, \\, x \\neq \\pm 3`}</MathJaxNode>
                </p>
              </section>

              <div className="mt-10 text-center">
                <Link href="/lessons/rational-expressions/practice" legacyBehavior>
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