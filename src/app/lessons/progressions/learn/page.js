"use client";

import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function ProgressionsLearnPage() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Progressions
          </h1>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Arithmetic Progressions (AP)
            </h2>
            <p className="text-lg mb-4">
              An <strong>Arithmetic Progression (AP)</strong> is a sequence of numbers in which the difference between consecutive terms is constant. This difference is called the <strong>common difference</strong>, denoted as <InlineMath math="d" />.
            </p>
            <p className="text-lg mb-4">
              For an AP with first term <InlineMath math="a_1" /> and common difference <InlineMath math="d" />, the <InlineMath math="n" />-th term is given by:
            </p>
            <div className="my-4">
              <BlockMath math="a_n = a_1 + (n-1)d" />
            </div>
            <p className="text-lg mb-4">
              <strong>Example:</strong> Consider the sequence 3, 7, 11, 15, … Here, <InlineMath math="a_1 = 3" /> and <InlineMath math="d = 4" /> (since 7 - 3 = 4). To find the 10th term:
            </p>
            <div className="my-4">
              <BlockMath math="a_{10} = 3 + (10-1) \cdot 4 = 3 + 9 \cdot 4 = 3 + 36 = 39" />
            </div>
            <p className="text-lg mb-4">
              The sum of the first <InlineMath math="n" /> terms of an AP, denoted <InlineMath math="S_n" />, is:
            </p>
            <div className="my-4">
              <BlockMath math="S_n = \frac{n}{2} (a_1 + a_n) \quad \text{or} \quad S_n = \frac{n}{2} [2a_1 + (n-1)d]" />
            </div>
            <p className="text-lg mb-4">
              <strong>Example:</strong> For the sequence 3, 7, 11, 15, …, find the sum of the first 5 terms. First, find <InlineMath math="a_5" />:
            </p>
            <div className="my-4">
              <BlockMath math="a_5 = 3 + (5-1) \cdot 4 = 3 + 16 = 19" />
              <BlockMath math="S_5 = \frac{5}{2} (3 + 19) = \frac{5}{2} \cdot 22 = 5 \cdot 11 = 55" />
            </div>
          </section>

          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Geometric Progressions (GP)
            </h2>
            <p className="text-lg mb-4">
              A <strong>Geometric Progression (GP)</strong> is a sequence of numbers in which the ratio between consecutive terms is constant. This ratio is called the <strong>common ratio</strong>, denoted as <InlineMath math="r" />.
            </p>
            <p className="text-lg mb-4">
              For a GP with first term <InlineMath math="a_1" /> and common ratio <InlineMath math="r" />, the <InlineMath math="n" />-th term is given by:
            </p>
            <div className="my-4">
              <BlockMath math="a_n = a_1 \cdot r^{n-1}" />
            </div>
            <p className="text-lg mb-4">
              <strong>Example:</strong> Consider the sequence 3, 6, 12, 24, … Here, <InlineMath math="a_1 = 3" /> and <InlineMath math="r = 2" /> (since 6 ÷ 3 = 2). To find the 6th term:
            </p>
            <div className="my-4">
              <BlockMath math="a_6 = 3 \cdot 2^{6-1} = 3 \cdot 2^5 = 3 \cdot 32 = 96" />
            </div>
            <p className="text-lg mb-4">
              The sum of the first <InlineMath math="n" /> terms of a GP, denoted <InlineMath math="S_n" />, is:
            </p>
            <div className="my-4">
              <BlockMath math="S_n = a_1 \frac{1 - r^n}{1 - r} \quad (r \neq 1)" />
            </div>
            <p className="text-lg mb-4">
              <strong>Example:</strong> For the sequence 3, 6, 12, 24, …, find the sum of the first 4 terms:
            </p>
            <div className="my-4">
              <BlockMath math="S_4 = 3 \frac{1 - 2^4}{1 - 2} = 3 \frac{1 - 16}{1 - 2} = 3 \frac{-15}{-1} = 3 \cdot 15 = 45" />
            </div>
            <p className="text-lg mb-4">
              If the common ratio <InlineMath math="|r| < 1" />, the sum of an infinite GP converges to:
            </p>
            <div className="my-4">
              <BlockMath math="S_\infty = \frac{a_1}{1 - r}" />
            </div>
            <p className="text-lg mb-4">
              <strong>Example:</strong> For the infinite GP 1, 0.5, 0.25, 0.125, … (<InlineMath math="a_1 = 1" />, <InlineMath math="r = 0.5" />):
            </p>
            <div className="my-4">
              <BlockMath math="S_\infty = \frac{1}{1 - 0.5} = \frac{1}{0.5} = 2" />
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