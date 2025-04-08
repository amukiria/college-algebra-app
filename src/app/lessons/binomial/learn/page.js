"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function BinomialExpansionsLearnPage() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
            Binomial Expansions - Learn
          </h1>

          <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-semibold text-secondary mb-4">What Are Binomial Expansions?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A binomial is an expression with two terms, like <InlineMath math="x + y" />, <InlineMath math="a + 3" />, or <InlineMath math="2m^2 - n^3" />. When we raise a binomial to a power, like <InlineMath math="(x + y)^3" />, we need to expand it into a sum of terms. The Binomial Theorem is a tool that makes this process easier, especially for higher powers, without having to multiply everything out by hand.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                In this lesson, we’ll learn how to expand binomials, use Pascal’s Triangle to find coefficients, and apply these expansions to solve real-world problems, like estimating numbers.
              </p>
            </div>

            {/* Expanding Binomials by Multiplication */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Expanding Binomials by Multiplication</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let’s start by expanding some binomials the old-fashioned way—by multiplying—to see the pattern.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                For <InlineMath math="(a + b)^2" />:
              </p>
              <div className="my-4">
                <BlockMath math="(a + b)^2 = (a + b)(a + b)" />
                <BlockMath math="= a^2 + ab + ba + b^2" />
                <BlockMath math="= a^2 + 2ab + b^2" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For <InlineMath math="(a + b)^3" />:
              </p>
              <div className="my-4">
                <BlockMath math="(a + b)^3 = (a + b)(a + b)^2" />
                <BlockMath math="= (a + b)(a^2 + 2ab + b^2)" />
                <BlockMath math="= a(a^2 + 2ab + b^2) + b(a^2 + 2ab + b^2)" />
                <BlockMath math="= a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3" />
                <BlockMath math="= a^3 + 3a^2b + 3ab^2 + b^3" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                For <InlineMath math="(a + b)^4" />:
              </p>
              <div className="my-4">
                <BlockMath math="(a + b)^4 = (a + b)(a + b)^3" />
                <BlockMath math="= (a + b)(a^3 + 3a^2b + 3ab^2 + b^3)" />
                <BlockMath math="= a(a^3 + 3a^2b + 3ab^2 + b^3) + b(a^3 + 3a^2b + 3ab^2 + b^3)" />
                <BlockMath math="= a^4 + 3a^3b + 3a^2b^2 + ab^3 + a^3b + 3a^2b^2 + 3ab^3 + b^4" />
                <BlockMath math="= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Notice the coefficients: for <InlineMath math="(a + b)^2" />, they’re <InlineMath math="1, 2, 1" />; for <InlineMath math="(a + b)^3" />, they’re <InlineMath math="1, 3, 3, 1" />; and for <InlineMath math="(a + b)^4" />, they’re <InlineMath math="1, 4, 6, 4, 1" />. These numbers follow a pattern we’ll explore with Pascal’s Triangle.
              </p>
            </div>

            {/* The Binomial Theorem */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">The Binomial Theorem Formula</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The Binomial Theorem gives us a faster way to expand <InlineMath math="(a + b)^n" />. The formula is:
              </p>
              <div className="my-4">
                <BlockMath math="(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let’s break it down:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mt-2">
                <li><InlineMath math="a" /> and <InlineMath math="b" /> are the two terms in your binomial (e.g., <InlineMath math="x" /> and <InlineMath math="2" /> in <InlineMath math="(x + 2)" />).</li>
                <li><InlineMath math="n" /> is the power you’re raising the binomial to.</li>
                <li><InlineMath math="\binom{n}{k}" /> is the binomial coefficient—it’s the number in front of each term.</li>
                <li>The <InlineMath math="\sum" /> means we add up terms, from <InlineMath math="k=0" /> to <InlineMath math="k=n" />.</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                The binomial coefficient <InlineMath math="\binom{n}{k}" /> is calculated as:
              </p>
              <div className="my-4">
                <BlockMath math="\binom{n}{k} = \frac{n!}{k!(n-k)!}" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Here, <InlineMath math="n!" /> (n factorial) means multiplying all numbers from 1 to <InlineMath math="n" /> (e.g., <InlineMath math="3! = 3 \times 2 \times 1 = 6" />).
              </p>
            </div>

            {/* Pascal’s Triangle */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Using Pascal’s Triangle for Coefficients</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The coefficients in a binomial expansion come from Pascal’s Triangle, a triangular arrangement of numbers where each number is the sum of the two numbers above it. Here are the rows for <InlineMath math="n=0" /> to <InlineMath math="n=10" />:
              </p>
              <div className="my-6">
                <table className="table-auto mx-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">n</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Coefficients</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">0</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 2 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">3</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 3 3 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">4</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 4 6 4 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 5 10 10 5 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 6 15 20 15 6 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">7</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 7 21 35 35 21 7 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 8 28 56 70 56 28 8 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">9</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 9 36 84 126 126 84 36 9 1</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 10 45 120 210 252 210 120 45 10 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Each row gives the coefficients for <InlineMath math="(a + b)^n" />. For example:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mt-2">
                <li>Row <InlineMath math="n=2" />: <InlineMath math="1, 2, 1" />, so <InlineMath math="(a + b)^2 = a^2 + 2ab + b^2" />.</li>
                <li>Row <InlineMath math="n=3" />: <InlineMath math="1, 3, 3, 1" />, so <InlineMath math="(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3" />.</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Notice that in each term, the exponents of <InlineMath math="a" /> and <InlineMath math="b" /> add up to <InlineMath math="n" />. For <InlineMath math="(a + b)^4" />, the terms are <InlineMath math="a^4b^0, a^3b^1, a^2b^2, a^1b^3, a^0b^4" />—the exponents always sum to 4.
              </p>
            </div>

            {/* Example 1: (p + q)^5 */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Example 1: Expanding <InlineMath math="(p + q)^5" /></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let’s expand <InlineMath math="(p + q)^5" /> using Pascal’s Triangle. The terms without coefficients are <InlineMath math="p^5, p^4q, p^3q^2, p^2q^3, pq^4, q^5" />.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                From Pascal’s Triangle, the coefficients for <InlineMath math="n=5" /> are <InlineMath math="1, 5, 10, 10, 5, 1" />. So:
              </p>
              <div className="my-4">
                <BlockMath math="(p + q)^5 = p^5 + 5p^4q + 10p^3q^2 + 10p^2q^3 + 5pq^4 + q^5" />
              </div>
            </div>

            {/* Example 2: (c + 4)^5 */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Example 2: Expanding <InlineMath math="(c + 4)^5" /></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Now let’s expand <InlineMath math="(c + 4)^5" />. Here, <InlineMath math="a = c" /> and <InlineMath math="b = 4" />. The terms without coefficients are <InlineMath math="c^5, c^4(4), c^3(4)^2, c^2(4)^3, c(4)^4, (4)^5" />.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Using the coefficients for <InlineMath math="n=5" /> (<InlineMath math="1, 5, 10, 10, 5, 1" />):
              </p>
              <div className="my-4">
                <BlockMath math="(c + 4)^5 = c^5 + 5c^4 \cdot 4 + 10c^3 \cdot 4^2 + 10c^2 \cdot 4^3 + 5c \cdot 4^4 + 4^5" />
                <BlockMath math="= c^5 + 20c^4 + 160c^3 + 640c^2 + 1280c + 1024" />
              </div>
            </div>

            {/* Example 3: (2x + 3y)^4 */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Example 3: Expanding <InlineMath math="(2x + 3y)^4" /></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let’s try <InlineMath math="(2x + 3y)^4" />. The terms without coefficients are <InlineMath math="(2x)^4, (2x)^3(3y), (2x)^2(3y)^2, (2x)(3y)^3, (3y)^4" />.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Coefficients for <InlineMath math="n=4" /> are <InlineMath math="1, 4, 6, 4, 1" />:
              </p>
              <div className="my-4">
                <BlockMath math="(2x + 3y)^4 = (2x)^4 + 4(2x)^3(3y) + 6(2x)^2(3y)^2 + 4(2x)(3y)^3 + (3y)^4" />
                <BlockMath math="= 16x^4 + 4 \cdot 8x^3 \cdot 3y + 6 \cdot 4x^2 \cdot 9y^2 + 4 \cdot 2x \cdot 27y^3 + 81y^4" />
                <BlockMath math="= 16x^4 + 96x^3y + 216x^2y^2 + 216xy^3 + 81y^4" />
              </div>
            </div>

            {/* Example 4: (x - y)^7 */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Example 4: Expanding <InlineMath math="(x - y)^7" /></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                For <InlineMath math="(x - y)^7" />, we write it as <InlineMath math="(x + (-y))^7" />. The terms without coefficients are <InlineMath math="x^7, x^6(-y), x^5(-y)^2, x^4(-y)^3, x^3(-y)^4, x^2(-y)^5, x(-y)^6, (-y)^7" />.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Coefficients for <InlineMath math="n=7" /> are <InlineMath math="1, 7, 21, 35, 35, 21, 7, 1" />:
              </p>
              <div className="my-4">
                <BlockMath math="(x - y)^7 = x^7 + 7x^6(-y) + 21x^5(-y)^2 + 35x^4(-y)^3 + 35x^3(-y)^4 + 21x^2(-y)^5 + 7x(-y)^6 + (-y)^7" />
                <BlockMath math="= x^7 - 7x^6y + 21x^5y^2 - 35x^4y^3 + 35x^3y^4 - 21x^2y^5 + 7xy^6 - y^7" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Notice how the signs alternate because of the negative sign in <InlineMath math="-y" />.
              </p>
            </div>

            {/* Numerical Applications */}
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Numerical Applications: Estimating <InlineMath math="(1.02)^6" /></h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Binomial expansions can help us estimate numbers. Let’s evaluate <InlineMath math="(1.02)^6" /> to 4 significant figures.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Write <InlineMath math="1.02 = 1 + 0.02" />, so <InlineMath math="(1.02)^6 = (1 + 0.02)^6" />. The terms without coefficients are <InlineMath math="1^6, 1^5(0.02), 1^4(0.02)^2, \ldots, (0.02)^6" />.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                Coefficients for <InlineMath math="n=6" /> are <InlineMath math="1, 6, 15, 20, 15, 6, 1" />:
              </p>
              <div className="my-4">
                <BlockMath math="(1.02)^6 = 1 + 6(0.02) + 15(0.02)^2 + 20(0.02)^3 + 15(0.02)^4 + 6(0.02)^5 + (0.02)^6" />
                <BlockMath math="= 1 + 0.12 + 0.006 + 0.00016 + 0.0000024 + 0.0000000192 + 0.000000000064" />
                <BlockMath math="= 1.1261624192" />
                <BlockMath math="= 1.126 \text{ (to 4 significant figures)}" />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Note: We can stop after the first few terms (e.g., up to <InlineMath math="(0.02)^3" />) because later terms are very small and don’t affect the answer much.
              </p>
            </div>
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}