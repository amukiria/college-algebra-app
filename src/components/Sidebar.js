"use client";

import React, { useState } from "react";
import Link from "next/link";

const topics = [
  { title: "Polynomials", path: "/lessons/polynomials" },
  { title: "Factoring Expressions", path: "/lessons/factoring" },
  { title: "Rational Expressions", path: "/lessons/rational-expressions" },
  { title: "Linear Equations", path: "/lessons/linear-equations" },
  { title: "Quadratic Equations", path: "/lessons/quadratics" },
];

const Sidebar = () => {
  const [isSetsOpen, setIsSetsOpen] = useState(false);

  return (
    <aside className="bg-primary w-64 h-screen fixed left-0 top-0 shadow-md text-text">
      <div className="p-6 font-bold text-accent text-lg border-b border-gray-200">
        MTH 1109 - College Algebra
      </div>
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <div
              onClick={() => setIsSetsOpen(!isSetsOpen)}
              className="block px-4 py-2 cursor-pointer hover:bg-secondary hover:text-accent transition"
            >
              Sets
              <span className="float-right">{isSetsOpen ? "▲" : "▼"}</span>
            </div>
            {isSetsOpen && (
              <ul className="ml-4 mt-2 border-l-2 border-gray-300">
                <li>
                  <Link
                    href="/lessons/sets/lesson"
                    className="block px-4 py-2 hover:bg-secondary hover:text-accent transition"
                  >
                    Lesson
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lessons/sets/practice"
                    className="block px-4 py-2 hover:bg-secondary hover:text-accent transition"
                  >
                    Sets Explorer
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {topics.map((topic, index) => (
            <li key={index} className="mb-2">
              <Link
                href={`${topic.path}/lesson`}
                className="block px-4 py-2 hover:bg-secondary hover:text-accent transition"
              >
                {topic.title} - Lesson
              </Link>
              <Link
                href={`${topic.path}/practice`}
                className="block px-4 py-2 hover:bg-secondary hover:text-accent transition ml-4"
              >
                Practice Exercises
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
