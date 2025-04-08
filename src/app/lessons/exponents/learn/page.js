"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function IntegersExponentsRootsLearnPage() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Integers, Exponents, and Roots - Learn
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Introduction to Integers, Exponents, and Roots</h2>
            <p className="text-lg mb-4">
              This section covers the foundational concepts of integers, exponents, and roots, which are essential for algebraic manipulations. Integers include positive and negative whole numbers, exponents represent repeated multiplication, and roots are the inverse operation of exponents.
            </p>

            <h3 className="text-xl font-semibold text-secondary mb-3">1. Integers</h3>
            <p className="text-lg mb-4">
              Integers are the set of whole numbers, including positive numbers, negative numbers, and zero: <InlineMath math="\mathbb{Z} = \{ \ldots, -3, -2, -1, 0, 1, 2, 3, \ldots \}" />.
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><strong>Addition/Subtraction:</strong> When adding or subtracting integers, consider their signs. Example: <InlineMath math="-5 + 3 = -2" /> and <InlineMath math="7 - (-2) = 7 + 2 = 9" />.</li>
              <li><strong>Multiplication/Division:</strong> The product or quotient of two integers with the same sign is positive; with different signs, it’s negative. Example: <InlineMath math="(-3) \times (-2) = 6" /> and <InlineMath math="(-8) \div 2 = -4" />.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">2. Exponents</h3>
            <p className="text-lg mb-4">
              An exponent indicates how many times a base is multiplied by itself. For a base <InlineMath math="a" /> and exponent <InlineMath math="n" />, we write <InlineMath math="a^n" />.
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><strong>Basic Rules:</strong>
                <ul className="list-circle list-inside ml-4">
                  <li>Product Rule: <InlineMath math="a^m \cdot a^n = a^{m+n}" />. Example: <InlineMath math="2^3 \cdot 2^2 = 2^{3+2} = 2^5 = 32" />.</li>
                  <li>Quotient Rule: <InlineMath math="\frac{a^m}{a^n} = a^{m-n}" /> (for <InlineMath math="a \neq 0" />). Example: <InlineMath math="\frac{5^4}{5^2} = 5^{4-2} = 5^2 = 25" />.</li>
                  <li>Power Rule: <InlineMath math="(a^m)^n = a^{m \cdot n}" />. Example: <InlineMath math="(3^2)^3 = 3^{2 \cdot 3} = 3^6 = 729" />.</li>
                  <li>Zero Exponent: <InlineMath math="a^0 = 1" /> (for <InlineMath math="a \neq 0" />). Example: <InlineMath math="7^0 = 1" />.</li>
                  <li>Negative Exponent: <InlineMath math="a^{-n} = \frac{1}{a^n}" />. Example: <InlineMath math="2^{-3} = \frac{1}{2^3} = \frac{1}{8}" />.</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">3. Roots</h3>
            <p className="text-lg mb-4">
              A root is the inverse operation of an exponent. The <InlineMath math="n" />-th root of a number <InlineMath math="a" /> is written as <InlineMath math="\sqrt[n]{a}" />, where <InlineMath math="\sqrt[n]{a} \cdot \sqrt[n]{a} \cdots \text{(n times)} = a" />.
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><strong>Square Root:</strong> <InlineMath math="\sqrt{a}" /> (i.e., <InlineMath math="n=2" />). Example: <InlineMath math="\sqrt{16} = 4" /> because <InlineMath math="4^2 = 16" />.</li>
              <li><strong>Cube Root:</strong> <InlineMath math="\sqrt[3]{a}" /> (i.e., <InlineMath math="n=3" />). Example: <InlineMath math="\sqrt[3]{27} = 3" /> because <InlineMath math="3^3 = 27" />.</li>
              <li><strong>Relation to Exponents:</strong> <InlineMath math="\sqrt[n]{a} = a^{1/n}" />. Example: <InlineMath math="\sqrt{25} = 25^{1/2} = 5" />.</li>
              <li><strong>Simplifying Roots:</strong> Factor the radicand into perfect powers. Example: <InlineMath math="\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}" />.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">Example Problem</h3>
            <p className="text-lg mb-2">
              Simplify: <InlineMath math="\frac{8^{2/3} \cdot 8^{1/3}}{2^{-2}}" />.
            </p>
            <p className="text-lg mb-2">
              Step 1: Use the product rule for exponents in the numerator:
            </p>
            <BlockMath math="8^{2/3} \cdot 8^{1/3} = 8^{(2/3) + (1/3)} = 8^{3/3} = 8^1 = 8" />
            <p className="text-lg mb-2">
              Step 2: Simplify the denominator using the negative exponent rule:
            </p>
            <BlockMath math="2^{-2} = \frac{1}{2^2} = \frac{1}{4}" />
            <p className="text-lg mb-2">
              Step 3: Divide the numerator by the denominator:
            </p>
            <BlockMath math="\frac{8}{\frac{1}{4}} = 8 \cdot 4 = 32" />
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}