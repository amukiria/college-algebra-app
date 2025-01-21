"use client";

import React, { useState } from "react";
import Link from "next/link";

const topics = [
  {
    title: "Sets",
    path: "/lessons/sets",
  },
  {
    title: "Polynomials",
    path: "/lessons/polynomials",
  },
  {
    title: "Factoring Expressions",
    path: "/lessons/factoring",
  },
  {
    title: "Rational Expressions",
    path: "/lessons/rational-expressions",
  },
  {
    title: "Linear Equations",
    path: "/lessons/linear-equations",
  },
  {
    title: "Quadratic Equations",
    path: "/lessons/quadratics",
  },
];

const Sidebar = () => {
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
              {/* Topic Header */}
              <div
                onClick={() => toggleSection(topic.title)}
                className="block px-4 py-2 cursor-pointer hover:bg-coral hover:text-white transition"
              >
                {topic.title}
                <span className="float-right">
                  {openSections[topic.title] ? "▲" : "▼"}
                </span>
              </div>

              {/* Submenu */}
              {openSections[topic.title] && (
                <ul className="ml-4 mt-2 border-l-2 border-gray-300">
                  <li>
                    <Link
                      href={`${topic.path}/learn`}
                      className="block px-4 py-2 hover:bg-coral hover:text-white transition"
                    >
                      Learn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${topic.path}/practice`}
                      className="block px-4 py-2 hover:bg-coral hover:text-white transition"
                    >
                      Practice Exercises
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
