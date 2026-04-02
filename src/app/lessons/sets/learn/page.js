"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

function VennDiagram({ setA, setB, operation }) {
  const onlyA = setA.filter((x) => !setB.includes(x));
  const onlyB = setB.filter((x) => !setA.includes(x));
  const both = setA.filter((x) => setB.includes(x));

  const fillA = operation === "union" ? "#0066FF22" : operation === "difference" ? "#0066FF33" : operation === "intersection" ? "#0066FF11" : "#0066FF11";
  const fillB = operation === "union" ? "#0099AA22" : operation === "intersection" ? "#0099AA22" : "#0099AA11";
  const fillIntersection = operation === "union" ? "#6655DD44" : operation === "intersection" ? "#6655DD66" : "transparent";
  const strokeA = operation === "union" || operation === "difference" ? "#0066FF" : "#0066FF88";
  const strokeB = operation === "union" || operation === "intersection" ? "#0099AA" : "#0099AA88";

  const wrapText = (items, maxPerLine = 3) => {
    const lines = [];
    for (let i = 0; i < items.length; i += maxPerLine) {
      lines.push(items.slice(i, i + maxPerLine).join(", "));
    }
    return lines;
  };

  return (
    <svg viewBox="0 0 500 260" className="w-full max-w-lg mx-auto">
      <circle cx="190" cy="130" r="110" fill={fillA} stroke={strokeA} strokeWidth="2.5" />
      <circle cx="310" cy="130" r="110" fill={fillB} stroke={strokeB} strokeWidth="2.5" />
      <clipPath id="clipA">
        <circle cx="190" cy="130" r="110" />
      </clipPath>
      <circle cx="310" cy="130" r="110" fill={fillIntersection} clipPath="url(#clipA)" />

      <text x="120" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0066FF">A</text>
      <text x="380" y="50" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0099AA">B</text>

      {wrapText(onlyA).map((line, i) => (
        <text key={i} x="128" y={115 + i * 18} textAnchor="middle" fontSize="12" fill="#0066FF" fontWeight="500">{line}</text>
      ))}
      {onlyA.length === 0 && <text x="128" y="130" textAnchor="middle" fontSize="11" fill="#0066FF88">—</text>}

      {wrapText(both).map((line, i) => (
        <text key={i} x="250" y={115 + i * 18} textAnchor="middle" fontSize="12" fill="#6655DD" fontWeight="600">{line}</text>
      ))}
      {both.length === 0 && <text x="250" y="130" textAnchor="middle" fontSize="11" fill="#6655DD88">∅</text>}

      {wrapText(onlyB).map((line, i) => (
        <text key={i} x="372" y={115 + i * 18} textAnchor="middle" fontSize="12" fill="#0099AA" fontWeight="500">{line}</text>
      ))}
      {onlyB.length === 0 && <text x="372" y="130" textAnchor="middle" fontSize="11" fill="#0099AA88">—</text>}

      <text x="128" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">only A</text>
      <text x="250" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">A ∩ B</text>
      <text x="372" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">only B</text>
    </svg>
  );
}

function InfoCard({ title, symbol, description, example }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl font-bold text-primary">{symbol}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <code className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 font-mono">
        {example}
      </code>
    </div>
  );
}

export default function SetsLesson() {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState(null);
  const router = useRouter();

  const parseInput = (val) =>
    val.split(",").map((x) => x.trim()).filter((x) => x !== "");

  const handleIntersection = () => {
    const intersection = setA.filter((x) => setB.includes(x));
    setResult(`A ∩ B = { ${intersection.join(", ") || "∅"} }`);
    setOperation("intersection");
  };

  const handleUnion = () => {
    const union = [...new Set([...setA, ...setB])];
    setResult(`A ∪ B = { ${union.join(", ")} }`);
    setOperation("union");
  };

  const handleDifference = () => {
    const difference = setA.filter((x) => !setB.includes(x));
    setResult(`A − B = { ${difference.join(", ") || "∅"} }`);
    setOperation("difference");
  };

  const resetVisualizer = () => {
    setSetA([]);
    setSetB([]);
    setInputA("");
    setInputB("");
    setResult("");
    setOperation(null);
  };

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen text-text font-body">

          <div className="bg-primary text-white py-16 px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-4">Sets</h1>
            <p className="text-xl text-blue-100 max-w-xl mx-auto">
              A set is a collection of distinct objects. Learn how sets work, how to combine them, and how to visualize their relationships.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-8 py-12 space-y-16">

            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">What is a Set?</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>set</strong> is a well-defined collection of distinct objects called <strong>elements</strong> or <strong>members</strong>. Sets are written using curly braces.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-blue-600 mb-1">Example</p>
                  <p className="font-mono text-gray-800">Natural numbers: {"{1, 2, 3, ...}"}</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
                  <p className="text-sm font-semibold text-teal-600 mb-1">Example</p>
                  <p className="font-mono text-gray-800">Vowels: {"{a, e, i, o, u}"}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Types of Sets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Finite Set", desc: "A set with a countable number of elements.", ex: "{1, 2, 3}" },
                  { name: "Infinite Set", desc: "A set with unlimited elements.", ex: "{1, 2, 3, 4, ...}" },
                  { name: "Empty Set", desc: "A set with no elements.", ex: "{} or ∅" },
                  { name: "Subset (⊆)", desc: "Every element of A is also in B.", ex: "A = {1,2}, B = {1,2,3} → A ⊆ B" },
                  { name: "Proper Subset (⊂)", desc: "A subset that is not equal to the original.", ex: "A = {1,2}, B = {1,2,3} → A ⊂ B" },
                  { name: "Universal Set (U)", desc: "Contains all elements under consideration.", ex: "U = {1, 2, 3, 4, 5}" },
                ].map(({ name, desc, ex }) => (
                  <div key={name} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <p className="font-semibold text-gray-800 mb-1">{name}</p>
                    <p className="text-gray-600 text-sm mb-2">{desc}</p>
                    <code className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 font-mono text-gray-700">{ex}</code>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Set Operations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard symbol="∪" title="Union" description="All elements in A or B (or both)." example="A = {1,2,3}, B = {3,4,5} → A ∪ B = {1,2,3,4,5}" />
                <InfoCard symbol="∩" title="Intersection" description="Only elements common to both A and B." example="A = {1,2,3}, B = {3,4,5} → A ∩ B = {3}" />
                <InfoCard symbol="−" title="Difference" description="Elements in A that are not in B." example="A = {1,2,3}, B = {3,4,5} → A − B = {1,2}" />
                <InfoCard symbol="A'" title="Complement" description="All elements in U that are not in A." example="U = {1,2,3,4,5}, A = {1,2,3} → A' = {4,5}" />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Venn Diagram Visualizer</h2>
              <p className="text-gray-500 mb-8">Enter elements into Set A and Set B, then choose an operation to see it on the diagram.</p>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <VennDiagram setA={setA} setB={setB} operation={operation} />

                {result && (
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-purple-50 border border-purple-200 text-purple-800 font-mono font-semibold px-6 py-3 rounded-xl text-lg">
                      {result}
                    </span>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-blue-600 mb-1">Set A</label>
                    <input
                      type="text"
                      value={inputA}
                      onChange={(e) => { setInputA(e.target.value); setSetA(parseInput(e.target.value)); }}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="e.g. 1, 2, 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-teal-600 mb-1">Set B</label>
                    <input
                      type="text"
                      value={inputB}
                      onChange={(e) => { setInputB(e.target.value); setSetB(parseInput(e.target.value)); }}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="e.g. 3, 4, 5"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 justify-center">
                  <button onClick={handleUnion} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${operation === "union" ? "bg-accent text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Union (A ∪ B)
                  </button>
                  <button onClick={handleIntersection} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${operation === "intersection" ? "bg-accent text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Intersection (A ∩ B)
                  </button>
                  <button onClick={handleDifference} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${operation === "difference" ? "bg-accent text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Difference (A − B)
                  </button>
                  <button onClick={resetVisualizer} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Practice Problems</h2>
              <div className="space-y-4">
                {[
                  { n: 1, q: `Let A = {2, 4, 6, 8} and B = {1, 3, 5, 7, 9}. Find A ∪ B and A ∩ B.` },
                  { n: 2, q: `If U = {1, 2, 3, 4, 5, 6} and A = {1, 2, 4}, find A'.` },
                  { n: 3, q: `Draw a Venn diagram for A = {a, b, c} and B = {b, c, d}.` },
                ].map(({ n, q }) => (
                  <div key={n} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex gap-4">
                    <span className="text-2xl font-extrabold text-gray-200">{n}</span>
                    <p className="text-gray-700 pt-1">{q}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-center pb-8">
              <button
                onClick={() => router.push("/lessons/sets/practice")}
                className="px-8 py-3 bg-accent text-white font-semibold rounded-xl shadow hover:opacity-90 transition-opacity"
              >
                Practice Sets
              </button>
            </div>

          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}