"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function ComplexNumbersLearnPage() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Complex Numbers - Learn
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Introduction to Complex Numbers</h2>
            <p className="text-lg mb-4">
              A complex number is a number of the form <InlineMath math="a + bi" />, where <InlineMath math="a" /> and <InlineMath math="b" /> are real numbers, and <InlineMath math="i" /> is the imaginary unit with the property <InlineMath math="i^2 = -1" />. Here, <InlineMath math="a" /> is the real part, and <InlineMath math="b" /> is the imaginary part.
            </p>

            <h3 className="text-xl font-semibold text-secondary mb-3">Key Concepts</h3>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><strong>Imaginary Unit:</strong> <InlineMath math="i = \sqrt{-1}" />, so <InlineMath math="i^2 = -1" />.</li>
              <li><strong>Complex Number Form:</strong> <InlineMath math="z = a + bi" />. Example: <InlineMath math="3 + 4i" /> has real part 3 and imaginary part 4.</li>
              <li><strong>Conjugate:</strong> The conjugate of <InlineMath math="a + bi" /> is <InlineMath math="a - bi" />. Example: The conjugate of <InlineMath math="3 + 4i" /> is <InlineMath math="3 - 4i" />.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">Operations with Complex Numbers</h3>
            <p className="text-lg mb-4">
              Complex numbers can be added, subtracted, multiplied, and divided:
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li>
                <strong>Addition/Subtraction:</strong> Combine real and imaginary parts separately. Example:
                <BlockMath math="(3 + 2i) + (1 - 5i) = (3 + 1) + (2 - 5)i = 4 - 3i" />
              </li>
              <li>
                <strong>Multiplication:</strong> Use the distributive property and <InlineMath math="i^2 = -1" />. Example:
                <BlockMath math="(3 + 2i)(1 - 5i) = 3 \cdot 1 + 3 \cdot (-5i) + 2i \cdot 1 + 2i \cdot (-5i)" />
                <BlockMath math="= 3 - 15i + 2i - 10i^2 = 3 - 15i + 2i - 10(-1) = 13 - 13i" />
              </li>
              <li>
                <strong>Division:</strong> Multiply numerator and denominator by the conjugate of the denominator. Example:
                <BlockMath math="\frac{3 + 2i}{1 - 5i} = \frac{3 + 2i}{1 - 5i} \cdot \frac{1 + 5i}{1 + 5i}" />
                <BlockMath math="= \frac{(3 + 2i)(1 + 5i)}{(1 - 5i)(1 + 5i)} = \frac{3 + 15i + 2i + 10i^2}{1 + 5i - 5i - 25i^2}" />
                <BlockMath math="= \frac{3 + 17i - 10}{1 + 25} = \frac{-7 + 17i}{26} = -\frac{7}{26} + \frac{17}{26}i" />
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">Powers of \(i\)</h3>
            <p className="text-lg mb-4">
              The powers of <InlineMath math="i" /> follow a cycle:
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><InlineMath math="i^1 = i" /></li>
              <li><InlineMath math="i^2 = -1" /></li>
              <li><InlineMath math="i^3 = i^2 \cdot i = -i" /></li>
              <li><InlineMath math="i^4 = (i^2)^2 = (-1)^2 = 1" /></li>
            </ul>
            <p className="text-lg mb-4">
              The cycle repeats every 4 powers, so to find <InlineMath math="i^n" />, compute <InlineMath math="n \mod 4" />.
            </p>

            <h3 className="text-xl font-semibold text-secondary mb-3">Example Problem</h3>
            <p className="text-lg mb-2">
              Simplify: <InlineMath math="(2 + 3i)^2" />.
            </p>
            <BlockMath math="(2 + 3i)^2 = (2 + 3i)(2 + 3i) = 4 + 6i + 6i + 9i^2" />
            <BlockMath math="= 4 + 12i + 9(-1) = 4 - 9 + 12i = -5 + 12i" />
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}