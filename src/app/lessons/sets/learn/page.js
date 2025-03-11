"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function SetsLesson() {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [result, setResult] = useState("");
  const [vennData, setVennData] = useState([
    { sets: ["A"], size: 0 },
    { sets: ["B"], size: 0 },
    { sets: ["A", "B"], size: 0 },
  ]);
  const [isMounted, setIsMounted] = useState(false);
  const vennRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const newData = [
      { sets: ["A"], size: setA.length },
      { sets: ["B"], size: setB.length },
      { sets: ["A", "B"], size: setA.filter((x) => setB.includes(x)).length },
    ];
    setVennData(newData);
    updateVennDiagram(newData);
  }, [setA, setB, isMounted]);

  const updateVennDiagram = (newData) => {
    if (!vennRef.current) return;

    const vennElement = d3.select(vennRef.current);
    vennElement.selectAll("*").remove();
    const chart = venn.VennDiagram().width(400).height(400);
    vennElement
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  const handleIntersection = () => {
    const intersection = setA.filter((x) => setB.includes(x));
    setResult(`Intersection (A ∩ B): {${intersection.join(", ")}}`);
  };

  const handleUnion = () => {
    const union = [...new Set([...setA, ...setB])];
    setResult(`Union (A ∪ B): {${union.join(", ")}}`);
  };

  const handleDifference = () => {
    const difference = setA.filter((x) => !setB.includes(x));
    setResult(`Difference (A - B): {${difference.join(", ")}}`);
  };

  const resetVisualizer = () => {
    setSetA([]);
    setSetB([]);
    setInputA("");
    setInputB("");
    setResult("");
    const resetData = [
      { sets: ["A"], size: 0 },
      { sets: ["B"], size: 0 },
      { sets: ["A", "B"], size: 0 },
    ];
    setVennData(resetData);
    updateVennDiagram(resetData);
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center">
            Lesson: Sets
          </h1>

          {/* Introduction to Sets */}
          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Introduction to Sets</h2>
            <p className="leading-relaxed text-lg">
              A set is a collection of distinct objects, considered as an object in its own right. The objects in a set are called the <strong>elements</strong> or <strong>members</strong> of the set.
            </p>
            <p className="mt-4 text-lg">Here are some examples of sets:</p>
            <ul className="list-disc ml-8 mt-4 text-lg">
              <li>The set of natural numbers: {"{1, 2, 3, ...}"}</li>
              <li>The set of vowels in the English alphabet: {"{a, e, i, o, u}"}</li>
            </ul>
          </section>

          {/* Types of Sets */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Types of Sets</h2>
            <ul className="list-disc ml-8 mt-4 text-lg">
              <li><strong>Finite Set:</strong> A set with a limited number of elements. Example: {"{1, 2, 3}"}</li>
              <li><strong>Infinite Set:</strong> A set with an unlimited number of elements. Example: {"{1, 2, 3, 4, ...}"}</li>
              <li><strong>Subset:</strong> A set A is a subset of B if every element of A is also an element of B. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊆ B.</li>
              <li><strong>Proper Subset:</strong> A proper subset of a set A is a subset that is not equal to the original set. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊂ B.</li>
              <li><strong>Universal Set:</strong> The set that contains all elements under consideration for a particular problem. Example: {"{1, 2, 3, 4, 5, ...}"}</li>
              <li><strong>Empty Set:</strong> A set with no elements. Example: {"{}"}</li>
            </ul>
          </section>

          {/* Set Operations with Two-Set Visualizer */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Set Operations</h2>
            <p className="text-lg mt-4">
              Sets can be combined or compared using operations such as <strong>union</strong>, <strong>intersection</strong>, <strong>difference</strong>, and <strong>complement</strong>. Try the visualizer below!
            </p>

            <div className="mt-6 max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block mb-2 text-lg font-semibold text-primary">Enter Set A (comma separated):</label>
                <input
                  type="text"
                  value={inputA}
                  onChange={(e) => {
                    setInputA(e.target.value);
                    setSetA(
                      e.target.value
                        .split(",")
                        .map((item) => parseInt(item.trim()))
                        .filter((item) => !isNaN(item))
                    );
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 1, 2, 3"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-lg font-semibold text-primary">Enter Set B (comma separated):</label>
                <input
                  type="text"
                  value={inputB}
                  onChange={(e) => {
                    setInputB(e.target.value);
                    setSetB(
                      e.target.value
                        .split(",")
                        .map((item) => parseInt(item.trim()))
                        .filter((item) => !isNaN(item))
                    );
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 3, 4, 5"
                />
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleIntersection}
                  className="bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition-colors"
                >
                  Intersection (A ∩ B)
                </button>
                <button
                  onClick={handleUnion}
                  className="bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition-colors"
                >
                  Union (A ∪ B)
                </button>
                <button
                  onClick={handleDifference}
                  className="bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition-colors"
                >
                  Difference (A - B)
                </button>
                <button
                  onClick={resetVisualizer}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
                >
                  Reset
                </button>
              </div>
              {result && (
                <p className="mt-4 text-center text-lg text-primary">{result}</p>
              )}
            </div>

            {isMounted && (
              <div ref={vennRef} id="venn" className="flex justify-center w-full max-w-md mt-6"></div>
            )}

            <h3 className="text-xl font-semibold mt-6 text-primary">Union of Sets</h3>
            <p className="text-lg">The union of two sets includes all elements in either set (A ∪ B).</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">{`Example: A = {1, 2, 3}, B = {3, 4, 5}\nA ∪ B = {1, 2, 3, 4, 5}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Intersection of Sets</h3>
            <p className="text-lg">The intersection includes only elements common to both sets (A ∩ B).</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">{`Example: A = {1, 2, 3}, B = {3, 4, 5}\nA ∩ B = {3}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Difference of Sets</h3>
            <p className="text-lg">The difference includes elements in A but not in B (A - B).</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">{`Example: A = {1, 2, 3}, B = {3, 4, 5}\nA - B = {1, 2}`}</pre>

            <h3 className="text-xl font-semibold mt-6 text-primary">Complement of a Set</h3>
            <p className="text-lg">The complement includes all elements in the universal set not in A (A').</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">{`Example: U = {1, 2, 3, 4, 5}, A = {1, 2, 3}\nA' = {4, 5}`}</pre>
          </section>

          {/* Venn Diagrams */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Venn Diagrams</h2>
            <p className="text-lg">Venn diagrams visualize set relationships. Use the visualizer above to see how circles overlap for intersections!</p>
          </section>

          {/* Practice Problems */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Practice Problems</h2>
            <p className="text-lg mt-4">Try these problems to solidify your understanding:</p>
            <ul className="list-decimal ml-8 mt-4 text-lg">
              <li>Let A = {"{2, 4, 6, 8}"} and B = {"{1, 3, 5, 7, 9}"}. Find A ∪ B and A ∩ B.</li>
              <li>If U = {"{1, 2, 3, 4, 5, 6}"} and A = {"{1, 2, 4}"} find A'.</li>
              <li>Draw a Venn diagram for A = {"{a, b, c}"} and B = {"{b, c, d}"}.</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Conclusion</h2>
            <p className="text-lg">
              Sets are essential for organizing and analyzing objects. Mastering operations is key to problem-solving.
            </p>
          </section>

          {/* Navigation Buttons */}
          <div className="mt-10 text-center space-x-4">
            <button
              onClick={() => router.push("/lessons/sets/practice")}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-[#00A894] transition ease-in-out"
            >
              Practice Sets
            </button>
            <button
              onClick={() => router.push("/lessons/sets/puzzle")}
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-[#00A894] transition ease-in-out"
            >
              Puzzle: Set Riddle Hunt
            </button>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}