"use client";

import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function FactoringTheoryLesson() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            Factoring Theory Lesson
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              What is Factoring?
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Factoring is the process of breaking down an algebraic expression into simpler parts called
              <strong> factors</strong>. These factors, when multiplied together, give the original expression.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Common Factoring Techniques
            </h2>
            <ul className="list-disc ml-6 space-y-4 text-base md:text-lg">
              <li className="text-primary">
                <strong>Factoring out the Greatest Common Factor (GCF):</strong> This involves identifying the largest factor common to all terms in an expression.
                <br />
                <em>Example:</em> For <strong>6x + 9</strong>, the GCF is 3. Factored form: <strong>3(2x + 3)</strong>.
              </li>
              <li className="text-primary">
                <strong>Difference of Squares:</strong> This technique is used when an expression is a subtraction of two perfect squares.
                <br />
                <em>Example:</em> <strong>x² - 16</strong> can be factored as <strong>(x - 4)(x + 4)</strong>.
              </li>
              <li className="text-primary">
                <strong>Factoring Trinomials:</strong> This involves rewriting a trinomial (three terms) as the product of two binomials.
                <br />
                <em>Example:</em> <strong>x² + 5x + 6</strong> factors to <strong>(x + 2)(x + 3)</strong>.
              </li>
              <li className="text-primary">
                <strong>Factoring by Grouping:</strong> This method groups terms with common factors and then factors out the GCF from each group.
                <br />
                <em>Example:</em> For <strong>ax + ay + bx + by</strong>, group as <strong>(ax + ay) + (bx + by)</strong>, then factor to get <strong>a(x + y) + b(x + y)</strong>. Final factored form: <strong>(a + b)(x + y)</strong>.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">
              Example: Factoring a Trinomial Step-by-Step
            </h2>
            <p className="text-base md:text-lg mb-4">
              Let's go through an example of factoring a trinomial. Consider the expression: 
              <strong className="text-accent"> x² + 5x + 6 </strong>.
            </p>

            <div className="space-y-6">
              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">
                  Step 1: Identify the Coefficients
                </h3>
                <p className="text-base text-text mt-2">
                  In the expression <strong className="text-accent">x² + 5x + 6</strong>:
                  <br />- The coefficient of <strong>x²</strong> is <strong>1</strong>.
                  <br />- The coefficient of <strong>x</strong> is <strong>5</strong>.
                  <br />- The constant term is <strong>6</strong>.
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">
                  Step 2: Find Two Numbers
                </h3>
                <p className="text-base text-text mt-2">
                  Look for two numbers that:
                  <br />- Multiply to give <strong>6</strong> (the constant).
                  <br />- Add to give <strong>5</strong> (the coefficient of <strong>x</strong>).
                </p>
                <p className="mt-2">
                  These numbers are <strong className="text-accent">2</strong> and <strong className="text-accent">3</strong> because:
                  <br />- <strong>2 × 3 = 6</strong>
                  <br />- <strong>2 + 3 = 5</strong>
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">
                  Step 3: Write the Factored Form
                </h3>
                <p className="text-base text-text mt-2">
                  Use the numbers found in Step 2 to rewrite the trinomial as:
                  <br /> <strong className="text-accent">(x + 2)(x + 3)</strong>
                </p>
              </div>

              <div className="bg-lightNeutral border-l-4 border-accent p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary">
                  Step 4: Verify Your Answer
                </h3>
                <p className="text-base text-text mt-2">
                  Expand <strong className="text-accent">(x + 2)(x + 3)</strong> to confirm:
                  <br /> <strong>(x + 2)(x + 3) = x² + 3x + 2x + 6</strong>
                  <br /> Combine like terms:
                  <br /> <strong>= x² + 5x + 6</strong>
                </p>
                <p className="mt-2 text-accent font-semibold">
                  ✅ The factored form is correct!
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10 text-center">
            <Link href="/lessons/factoring/practice" legacyBehavior>
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
