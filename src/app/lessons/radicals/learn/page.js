"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function RadicalsLearnPage() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Radicals - Learn
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Introduction to Radicals</h2>
            <p className="text-lg mb-4">
              A radical expression involves roots, such as square roots, cube roots, or higher-order roots. The symbol for a radical is <InlineMath math="\sqrt{}" />, and the number inside is called the radicand. For example, <InlineMath math="\sqrt{16} = 4" /> because <InlineMath math="4^2 = 16" />.
            </p>

            <h3 className="text-xl font-semibold text-secondary mb-3">Key Concepts</h3>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li><strong>Square Root:</strong> <InlineMath math="\sqrt{a}" /> where <InlineMath math="a \geq 0" />. Example: <InlineMath math="\sqrt{25} = 5" />.</li>
              <li><strong>Cube Root:</strong> <InlineMath math="\sqrt[3]{a}" /> can be positive or negative. Example: <InlineMath math="\sqrt[3]{8} = 2" /> and <InlineMath math="\sqrt[3]{-8} = -2" />.</li>
              <li><strong>nth Root:</strong> <InlineMath math="\sqrt[n]{a}" /> where <InlineMath math="n" /> is the index. Example: <InlineMath math="\sqrt[4]{16} = 2" />.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">Properties of Radicals</h3>
            <p className="text-lg mb-4">
              Radicals follow specific rules that make simplification and operations easier:
            </p>
            <ul className="list-disc list-inside mb-4 text-lg">
              <li>Product Rule: <InlineMath math="\sqrt{ab} = \sqrt{a} \cdot \sqrt{b}" /> (for <InlineMath math="a, b \geq 0" />). Example: <InlineMath math="\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}" />.</li>
              <li>Quotient Rule: <InlineMath math="\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}" /> (for <InlineMath math="b \neq 0" />). Example: <InlineMath math="\sqrt{\frac{16}{4}} = \frac{\sqrt{16}}{\sqrt{4}} = \frac{4}{2} = 2" />.</li>
              <li>Power Rule: <InlineMath math="\sqrt[n]{a^m} = a^{m/n}" />. Example: <InlineMath math="\sqrt[3]{8^2} = 8^{2/3} = (8^{1/3})^2 = 2^2 = 4" />.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mb-3">Simplifying Radicals</h3>
            <p className="text-lg mb-4">
              To simplify a radical, factor the radicand into perfect powers and take them out of the radical. For example:
            </p>
            <BlockMath math="\sqrt{72} = \sqrt{36 \cdot 2} = \sqrt{36} \cdot \sqrt{2} = 6\sqrt{2}" />

            <h3 className="text-xl font-semibold text-secondary mb-3">Rationalizing the Denominator</h3>
            <p className="text-lg mb-4">
              When a radical appears in the denominator, we often rationalize it by multiplying the numerator and denominator by the radical. Example:
            </p>
            <BlockMath math="\frac{3}{\sqrt{5}} = \frac{3}{\sqrt{5}} \cdot \frac{\sqrt{5}}{\sqrt{5}} = \frac{3\sqrt{5}}{5}" />

            <h3 className="text-xl font-semibold text-secondary mb-3">Example Problem</h3>
            <p className="text-lg mb-2">
              Simplify the expression: <InlineMath math="\sqrt{48} + \sqrt{12}" />.
            </p>
            <p className="text-lg mb-4">
              First, simplify each radical:
            </p>
            <BlockMath math="\sqrt{48} = \sqrt{16 \cdot 3} = 4\sqrt{3}" />
            <BlockMath math="\sqrt{12} = \sqrt{4 \cdot 3} = 2\sqrt{3}" />
            <p className="text-lg mb-4">
              Now combine like terms:
            </p>
            <BlockMath math="4\sqrt{3} + 2\sqrt{3} = (4 + 2)\sqrt{3} = 6\sqrt{3}" />
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}