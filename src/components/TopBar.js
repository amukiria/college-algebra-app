import React from "react";
import Link from "next/link";

const TopBar = () => {
  return (
    <header className="bg-lightNeutral text-darkNavy shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-heading">
          <Link href="/" className="hover:text-coral">
            MTH 1109 - College Algebra
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 font-body text-grayNeutral">
          <Link href="/" className="hover:text-coral">
            Home
          </Link>
          <Link href="/lessons" className="hover:text-coral">
            Lessons
          </Link>
          <Link href="/practice" className="hover:text-coral">
            Practice
          </Link>
          <Link href="/about" className="hover:text-coral">
            About
          </Link>
        </nav>

        {/* User Actions */}
        <div>
          <button className="bg-coral text-white px-4 py-2 rounded hover:bg-salmon transition-all">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
