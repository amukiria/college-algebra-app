"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const TopBar = () => {
  return (
    <header className="bg-background text-text shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-heading">
          <Link href="/" className="hover:text-accent">
            College Algebra
          </Link>
        </div>

        <nav className="flex space-x-6 font-body text-secondary">
          <Link href="/" className="hover:text-accent">Home</Link>
          <div className="relative group">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Lessons</a>
            <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul>
                <li><Link href="/lessons/sets/learn" className="block px-4 py-2 hover:bg-gray-100">Sets</Link></li>
                <li><Link href="/lessons/polynomials/learn" className="block px-4 py-2 hover:bg-gray-100">Polynomials</Link></li>
                <li><Link href="/lessons/factoring/learn" className="block px-4 py-2 hover:bg-gray-100">Factoring Expressions</Link></li>
                <li><Link href="/lessons/rational-expressions/learn" className="block px-4 py-2 hover:bg-gray-100">Rational Expressions</Link></li>
                <li><Link href="/lessons/linear-equations/learn" className="block px-4 py-2 hover:bg-gray-100">Linear Equations</Link></li>
                <li><Link href="/lessons/quadratic-equations/learn" className="block px-4 py-2 hover:bg-gray-100">Quadratic Equations</Link></li>
                <li><Link href="/lessons/radicals/learn" className="block px-4 py-2 hover:bg-gray-100">Radicals</Link></li>
                <li><Link href="/lessons/complex/learn" className="block px-4 py-2 hover:bg-gray-100">Complex Numbers</Link></li>
                <li><Link href="/lessons/exponents/learn" className="block px-4 py-2 hover:bg-gray-100">Integers, Exponents, and Roots</Link></li>
                <li><Link href="/lessons/binomial/learn" className="block px-4 py-2 hover:bg-gray-100">Binomial Expansions</Link></li>
                <li><Link href="/lessons/progressions/learn" className="block px-4 py-2 hover:bg-gray-100">Progressions</Link></li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Practice</a>
            <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul>
                <li><Link href="/lessons/sets/practice" className="block px-4 py-2 hover:bg-gray-100">Sets</Link></li>
                <li><Link href="/lessons/polynomials/practice" className="block px-4 py-2 hover:bg-gray-100">Polynomials</Link></li>
                <li><Link href="/lessons/factoring/practice" className="block px-4 py-2 hover:bg-gray-100">Factoring Expressions</Link></li>
                <li><Link href="/lessons/rational-expressions/practice" className="block px-4 py-2 hover:bg-gray-100">Rational Expressions</Link></li>
                <li><Link href="/lessons/linear-equations/practice" className="block px-4 py-2 hover:bg-gray-100">Linear Equations</Link></li>
                <li><Link href="/lessons/quadratic-equations/practice" className="block px-4 py-2 hover:bg-gray-100">Quadratic Equations</Link></li>
                <li><Link href="/lessons/radicals/practice" className="block px-4 py-2 hover:bg-gray-100">Radicals</Link></li>
                <li><Link href="/lessons/complex/practice" className="block px-4 py-2 hover:bg-gray-100">Complex Numbers</Link></li>
                <li><Link href="/lessons/exponents/practice" className="block px-4 py-2 hover:bg-gray-100">Integers, Exponents, and Roots</Link></li>
                <li><Link href="/lessons/binomial/practice" className="block px-4 py-2 hover:bg-gray-100">Binomial Expansions</Link></li>
                <li><Link href="/lessons/progressions/practice" className="block px-4 py-2 hover:bg-gray-100">Progressions</Link></li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Quiz</a>
            <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul>
                <li><Link href="/lessons/quiz" className="block px-4 py-2 hover:bg-gray-100">Quiz 1</Link></li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Assignment</a>
            <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul>
                <li><Link href="/lessons/assignment" className="block px-4 py-2 hover:bg-gray-100">Graphing Assignment</Link></li>
              </ul>
            </div>
          </div>
          <Link href="/lessons/exam" className="hover:text-accent">Exam Practice</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hover:bg-[#00A894]">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default TopBar;