"use client";

import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

function VennDiagram({ setA, setB, operation }) {
  const fillA = operation === "Union" ? "#0066FF22" : operation === "Difference" ? "#0066FF33" : "#0066FF11";
  const fillB = operation === "Union" ? "#0099AA22" : operation === "Intersection" ? "#0099AA22" : "#0099AA11";
  const fillIntersection = operation === "Union" ? "#6655DD44" : operation === "Intersection" ? "#6655DD66" : "transparent";
  const strokeA = operation === "Union" || operation === "Difference" ? "#0066FF" : "#0066FF88";
  const strokeB = operation === "Union" || operation === "Intersection" ? "#0099AA" : "#0099AA88";

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
      <text x="128" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">only A</text>
      <text x="250" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">A ∩ B</text>
      <text x="372" y="220" textAnchor="middle" fontSize="10" fill="#6b7280">only B</text>
    </svg>
  );
}

function TreasureIcon({ filled }) {
  return (
    <span className={`text-2xl ${filled ? "opacity-100" : "opacity-20"}`}>💎</span>
  );
}

export default function SetsPractice() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [treasures, setTreasures] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState("playing");

  const challenges = [
    { setA: [1, 2, 3], setB: [3, 4, 5], operation: "Intersection", question: "Find A ∩ B", solution: "3" },
    { setA: [2, 4, 6], setB: [1, 3, 5], operation: "Union", question: "Find A ∪ B", solution: "1,2,3,4,5,6" },
    { setA: [1, 2, 3], setB: [2, 3, 4], operation: "Difference", question: "Find A − B", solution: "1" },
    { setA: [4, 5, 6], setB: [5, 6, 7], operation: "Intersection", question: "Find A ∩ B", solution: "5,6" },
    { setA: [1, 2], setB: [3, 4], operation: "Union", question: "Find A ∪ B", solution: "1,2,3,4" },
  ];

  const current = challenges[currentChallenge];

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft === 0) { setGameState("lost"); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const checkAnswer = () => {
    const normalize = (str) =>
      str.split(",").map((x) => x.trim()).filter((x) => x !== "").map(Number).sort((a, b) => a - b).join(",");

    if (normalize(userAnswer) === normalize(current.solution)) {
      const newTreasures = treasures + 1;
      setTreasures(newTreasures);
      setFeedback({ type: "correct", message: "Correct! Treasure claimed! 🎉" });

      if (newTreasures === 5) {
        setTimeout(() => setGameState("won"), 800);
      } else {
        setTimeout(() => {
          setCurrentChallenge((c) => c + 1);
          setUserAnswer("");
          setFeedback(null);
          setTimeLeft(60);
        }, 1000);
      }
    } else {
      setFeedback({ type: "wrong", message: "Not quite. Try again!" });
    }
  };

  const restart = () => {
    setCurrentChallenge(0);
    setTreasures(0);
    setUserAnswer("");
    setFeedback(null);
    setTimeLeft(60);
    setGameState("playing");
  };

  const timerColor = timeLeft > 30 ? "text-green-600" : timeLeft > 10 ? "text-amber-500" : "text-red-500";

  return (
    <>
      <SignedIn>
        <div className="bg-background min-h-screen font-body">

          <div className="bg-primary text-white py-12 px-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2">Set Explorer Mission</h1>
            <p className="text-blue-100 text-lg">Solve 5 challenges to collect all treasures.</p>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-10">

            {gameState === "playing" && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <TreasureIcon key={i} filled={i < treasures} />
                      ))}
                    </div>
                    <span className={`text-2xl font-extrabold ${timerColor}`}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(treasures / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Challenge {currentChallenge + 1} of 5</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                  <VennDiagram
                    setA={current.setA}
                    setB={current.setB}
                    operation={current.operation}
                  />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      current.operation === "Intersection" ? "bg-purple-100 text-purple-700" :
                      current.operation === "Union" ? "bg-blue-100 text-blue-700" :
                      "bg-teal-100 text-teal-700"
                    }`}>
                      {current.operation}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-1">{current.question}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    A = {"{" + current.setA.join(", ") + "}"} &nbsp;|&nbsp; B = {"{" + current.setB.join(", ") + "}"}
                  </p>

                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                    placeholder="Enter elements separated by commas, e.g. 1,2,3"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                  />

                  <button
                    onClick={checkAnswer}
                    className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Claim Treasure
                  </button>

                  {feedback && (
                    <div className={`mt-4 text-center py-3 rounded-xl text-sm font-semibold ${
                      feedback.type === "correct"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {feedback.message}
                    </div>
                  )}
                </div>
              </>
            )}

            {gameState === "won" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">🏆</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">Mission Complete!</h2>
                <p className="text-gray-600 mb-2">You collected all 5 treasures.</p>
                <div className="flex justify-center gap-2 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TreasureIcon key={i} filled={true} />
                  ))}
                </div>
                <button
                  onClick={restart}
                  className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Play Again
                </button>
              </div>
            )}

            {gameState === "lost" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">⏱️</div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">Time's Up!</h2>
                <p className="text-gray-600 mb-2">You collected {treasures} of 5 treasures.</p>
                <div className="flex justify-center gap-2 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TreasureIcon key={i} filled={i < treasures} />
                  ))}
                </div>
                <button
                  onClick={restart}
                  className="px-8 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>
              </div>
            )}

          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}