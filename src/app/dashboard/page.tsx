"use client";
import React from "react";
import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  // Placeholder values – later replace these with real data.
  const xp = 150;
  const level = 3;
  const streak = 5;
  const badges = ["Beginner", "Algebra Star", "Problem Solver"];

  return (
    <div className="full-height bg-background p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-heading text-darkNavy">Dashboard</h1>
        <UserButton />
      </header>

      {/* Welcome Section */}
      <section className="mb-12 bg-lightNeutral p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-heading text-darkNavy mb-2">
          Welcome, {user.username}!
        </h2>
        <p className="text-lg">
          Your account is secured via Clerk. Track your progress, earn XP, and climb the leaderboards!
        </p>
      </section>

      {/* Metrics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-darkNavy mb-1">XP</h3>
          <p className="text-3xl text-darkNavy">{xp}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-darkNavy mb-1">Level</h3>
          <p className="text-3xl text-darkNavy">{level}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-darkNavy mb-1">Streak</h3>
          <p className="text-3xl text-darkNavy">{streak} days</p>
        </div>
      </section>

      {/* Badges Section */}
      <section className="bg-lightNeutral p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-heading text-darkNavy mb-4">Badges Earned</h3>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="bg-coral text-white px-4 py-2 rounded-full shadow hover:bg-salmon transition-colors"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
