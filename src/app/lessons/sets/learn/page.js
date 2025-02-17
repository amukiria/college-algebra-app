"use client";
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function SetsLesson() {
  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
            Lesson: Sets
          </h1>

          {/* Introduction to Sets */}
          <section className="mt-6">
            <p className="leading-relaxed text-lg">
              A set is a collection of distinct objects, considered as an object in its own right.
              The objects in a set are called the <strong>elements</strong> or <strong>members</strong> of the set.
            </p>
            <p className="mt-4 text-lg">Here are some examples of sets:</p>
            <ul className="list-disc ml-8 mt-4 text-lg">
              <li>The set of natural numbers: {"{1, 2, 3, ...}"}</li>
              <li>The set of vowels in the English alphabet: {"{a, e, i, o, u}"}</li>
            </ul>
          </section>

          {/* Types of Sets */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary">Types of Sets</h2>
            <ul className="list-disc ml-8 mt-4 text-lg">
              <li><strong>Finite Set:</strong> A set with a limited number of elements. Example: {"{1, 2, 3}"}</li>
              <li><strong>Infinite Set:</strong> A set with an unlimited number of elements. Example: {"{1, 2, 3, 4, ...}"}</li>
              <li><strong>Subset:</strong> A set A is a subset of B if every element of A is also an element of B. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊆ B.</li>
              <li><strong>Proper Subset:</strong> A proper subset of a set A is a subset that is not equal to the original set. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊂ B.</li>
              <li><strong>Universal Set:</strong> The set that contains all elements under consideration for a particular problem. Example: {"{1, 2, 3, 4, 5, ...}"}</li>
              <li><strong>Empty Set:</strong> A set with no elements. Example: {"{}"}</li>
            </ul>
          </section>

          {/* Set Operations */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary">Set Operations</h2>
            <p className="text-lg mt-4">Sets can be combined or compared using operations such as <strong>union</strong>, <strong>intersection</strong>, <strong>difference</strong>, and <strong>complement</strong>.</p>

            <h3 className="text-xl font-semibold mt-6 text-primary">Union of Sets</h3>
            <p className="text-lg">The <strong>union</strong> of two sets is the set of all elements that are in either set. It is denoted as <strong>A ∪ B</strong>.</p>
            <pre className="bg-gray-100 p-4 rounded-md">{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A ∪ B = {1, 2, 3, 4, 5}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Intersection of Sets</h3>
            <p className="text-lg">The <strong>intersection</strong> of two sets is the set of all elements common to both sets. It is denoted as <strong>A ∩ B</strong>.</p>
            <pre className="bg-gray-100 p-4 rounded-md">{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A ∩ B = {3}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Difference of Sets</h3>
            <p className="text-lg">The <strong>difference</strong> of two sets is the set of all elements that are in the first set but not in the second set. It is denoted as <strong>A - B</strong>.</p>
            <pre className="bg-gray-100 p-4 rounded-md">{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A - B = {1, 2}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Complement of a Set</h3>
            <p className="text-lg">The <strong>complement</strong> of a set consists of all elements in the universal set that are not in the given set. It is denoted as <strong>A'</strong>.</p>
            <pre className="bg-gray-100 p-4 rounded-md">{`Example: Universal Set = {1, 2, 3, 4, 5}, A = {1, 2, 3}
A' = {4, 5}`}</pre>
          </section>

          {/* Venn Diagrams */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary">Venn Diagrams</h2>
            <p className="text-lg">Venn diagrams are used to visualize set relationships. The circles represent sets, and the overlaps represent intersections.</p>
            <p className="mt-4 text-lg">
              Example: Consider the sets A = {"{1, 2, 3}"} and B = {"{3, 4, 5}"}. The Venn diagram will show:
            </p>
            <ul className="list-disc ml-8 mt-4 text-lg">
              <li>Elements {"{1, 2}"} are only in A.</li>
              <li>Elements {"{4, 5}"} are only in B.</li>
              <li>Element {"3"} is in both sets.</li>
            </ul>
          </section>

          {/* Practice Problems */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary">Practice Problems</h2>
            <p className="text-lg mt-4">Try these problems to solidify your understanding of sets:</p>
            <ul className="list-decimal ml-8 mt-4 text-lg">
              <li>Let A = {"{2, 4, 6, 8}"} and B = {"{1, 3, 5, 7, 9}"}. Find A ∪ B and A ∩ B.</li>
              <li>If U = {"{1, 2, 3, 4, 5, 6}"} and A = {"{1, 2, 4}"} find A' (the complement of A).</li>
              <li>Draw a Venn diagram to represent A = {"{a, b, c}"} and B = {"{b, c, d}"}.</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary">Conclusion</h2>
            <p className="text-lg">
              Sets are an essential concept in mathematics and are used to organize and analyze objects. Understanding set operations is crucial for solving a wide range of problems.
            </p>
          </section>

          {/* Practice Sets Button */}
          <div className="mt-8 text-center">
            <Link href="/lessons/sets/practice">
              <button className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-[#00A894] transition ease-in-out">
                Practice Sets
              </button>
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
