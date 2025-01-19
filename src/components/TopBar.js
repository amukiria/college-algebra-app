import React from "react";
import Link from "next/link";

const TopBar = () => {
  return (
    <header className="bg-primary text-text shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-accent">
          <Link href="/">College Algebra</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <Link href="/lessons" className="hover:text-accent">
            Lessons
          </Link>
          <Link href="/practice" className="hover:text-accent">
            Practice
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
        </nav>

        {/* User Actions */}
        <div>
          <button className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
