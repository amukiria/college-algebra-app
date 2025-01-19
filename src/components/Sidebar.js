import React from "react";
import Link from "next/link";

const topics = [
  { title: "Sets (Definitions and Applications)", path: "/lessons/sets" },
  { title: "Polynomials", path: "/lessons/polynomials" },
  { title: "Factoring Expressions", path: "/lessons/factoring" },
  { title: "Rational Expressions", path: "/lessons/rational-expressions" },
  { title: "Linear Equations", path: "/lessons/linear-equations" },
  { title: "Integer Exponents and Roots", path: "/lessons/exponents-roots" },
  { title: "Radicals and Complex Numbers", path: "/lessons/radicals-complex" },
  { title: "Quadratic Equations", path: "/lessons/quadratics" },
  { title: "Systems of Linear Equations", path: "/lessons/systems" },
  { title: "Graphical Methods", path: "/lessons/graphical-methods" },
  { title: "Progressions and Binomial Expansions", path: "/lessons/progressions" },
];

const Sidebar = () => {
  return (
    <aside className="bg-primary w-64 h-screen fixed left-0 top-0 shadow-md text-text">
      <div className="p-6 font-bold text-accent text-lg border-b border-gray-200">
        Course Topics
      </div>
      <nav className="mt-4">
        <ul>
          {topics.map((topic, index) => (
            <li key={index} className="mb-2">
              <Link
                href={topic.path}
                className="block px-4 py-2 hover:bg-secondary hover:text-accent transition"
              >
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
