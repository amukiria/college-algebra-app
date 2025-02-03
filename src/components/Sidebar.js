"use client";

import React, { useState } from "react";
import Link from "next/link";

const topics = [
  { 
    title: "Sets", 
    links: [
      { title: "Learn", path: "/lessons/sets/learn" },
      { title: "Practice Exercises", path: "/lessons/sets/practice" }
    ]
  },
  { 
    title: "Polynomials", 
    links: [
      { title: "Learn", path: "/lessons/polynomials/learn" },
      { title: "Practice Exercises", path: "/lessons/polynomials/practice" }
    ]
  },
  { 
    title: "Factoring Expressions", 
    links: [
      { title: "Learn", path: "/lessons/factoring/learn" },
      { title: "Practice Exercises", path: "/lessons/factoring/practice" }
    ]
  },
  { 
    title: "Rational Expressions", 
    links: [
      { title: "Learn", path: "/lessons/rational-expressions/learn" },
      { title: "Practice Exercises", path: "/lessons/rational-expressions/practice" }
    ]
  },
  { 
    title: "Linear Equations", 
    links: [
      { title: "Learn", path: "/lessons/linear-equations/learn" },
      { title: "Practice Exercises", path: "/lessons/linear-equations/practice" }
    ]
  },
  { 
    title: "Quadratic Equations", 
    links: [
      { title: "Learn", path: "/lessons/quadratics/learn" },
      { title: "Practice Exercises", path: "/lessons/quadratics/practice" }
    ]
  },
];

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="bg-lightNeutral w-64 min-h-screen shadow-md fixed left-0 top-16 z-40">
      <div className="p-6 font-heading text-darkNavy text-lg border-b border-gray-300">
        MTH 1109 - College Algebra
      </div>

      <nav className="mt-4">
        <ul>
          {topics.map((topic, index) => (
            <li key={index} className="mb-2">
              <div
                onClick={() => toggleSection(topic.title)}
                className="block px-4 py-2 cursor-pointer hover:bg-coral hover:text-white transition"
              >
                {topic.title}
                <span className="float-right">
                  {openSections[topic.title] ? "▲" : "▼"}
                </span>
              </div>

              {openSections[topic.title] && (
                <ul className="ml-4 mt-2 border-l-2 border-gray-300">
                  {topic.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.path} passHref>
                        <span className="block px-4 py-2 hover:bg-coral hover:text-white transition">
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
