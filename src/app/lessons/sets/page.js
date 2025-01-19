"use client";

import React from "react";
import VennDiagram from "@/components/VennDiagram";

export default function SetsLesson() {
  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Sets: Definitions and Applications</h1>

      {/* Week 1 Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Definitions and Operations</h2>
        <p>
          A set is a well-defined collection of distinct objects. Common set operations include:
        </p>
        <ul className="list-disc ml-8 mt-2">
          <li>Union (A ∪ B)</li>
          <li>Intersection (A ∩ B)</li>
          <li>Difference (A - B)</li>
          <li>Complement (A')</li>
        </ul>
      </section>

      {/* Week 2 Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Applications of Sets</h2>
        <p>
          Sets are commonly used to solve problems involving overlapping data. For example:
        </p>
        <ul className="list-disc ml-8 mt-2">
          <li>Survey analysis (e.g., people who like coffee vs. tea).</li>
          <li>Database queries for shared and unique data.</li>
        </ul>
        <VennDiagram />
      </section>
    </div>
  );
}
