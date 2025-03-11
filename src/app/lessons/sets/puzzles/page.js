"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function SetsPractice() {
  const [treasures, setTreasures] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [vennData, setVennData] = useState([
    { sets: ["A"], size: 0 },
    { sets: ["B"], size: 0 },
    { sets: ["A", "B"], size: 0 },
  ]);
  const [isMounted, setIsMounted] = useState(false);
  const vennRef = useRef(null); // Use a ref for the Venn div

  const challenges = [
    {
      setA: [1, 2, 3],
      setB: [3, 4, 5],
      operation: "Intersection",
      question: "Find A ∩ B",
      solution: "3",
    },
    {
      setA: [2, 4, 6],
      setB: [1, 3, 5],
      operation: "Union",
      question: "Find A ∪ B",
      solution: "1, 2, 3, 4, 5, 6",
    },
    {
      setA: [1, 2, 3],
      setB: [2, 3, 4],
      operation: "Difference",
      question: "Find A - B",
      solution: "1",
    },
    {
      setA: [4, 5, 6],
      setB: [5, 6, 7],
      operation: "Intersection",
      question: "Find A ∩ B",
      solution: "5, 6",
    },
    {
      setA: [1, 2],
      setB: [3, 4],
      operation: "Union",
      question: "Find A ∪ B",
      solution: "1, 2, 3, 4",
    },
  ];

  useEffect(() => {
    setIsMounted(true); // Mark as mounted after first render
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Wait until mounted

    const current = challenges[currentChallenge];
    const data = [
      { sets: ["A"], size: current.setA.length },
      { sets: ["B"], size: current.setB.length },
      { sets: ["A", "B"], size: current.setA.filter((x) => current.setB.includes(x)).length },
    ];
    setVennData(data);
    updateVennDiagram(data);

    if (timeLeft > 0 && treasures < 5) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setFeedback("Time’s up! The treasure slips away.");
    }
  }, [timeLeft, treasures, currentChallenge, isMounted]);

  const updateVennDiagram = (newData) => {
    if (!vennRef.current) return; // Ensure ref is available

    const vennElement = d3.select(vennRef.current);
    vennElement.selectAll("*").remove();
    const chart = venn.VennDiagram().width(400).height(400);
    vennElement
      .datum(newData)
      .call(chart)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  };

  const checkAnswer = () => {
    const expected = challenges[currentChallenge].solution;
    const userTrimmed = userAnswer.trim().replace(/\s+/g, "");
    if (userTrimmed === expected) {
      setTreasures(treasures + 1);
      setFeedback("Treasure found! Onward!");
      if (treasures + 1 < 5) {
        setCurrentChallenge(currentChallenge + 1);
        setUserAnswer("");
        setTimeLeft(30);
      }
    } else {
      setFeedback("Wrong path! Try again, explorer.");
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary text-center">
            Set Explorer Mission
          </h1>
          <p className="text-lg mb-4 text-center">
            Solve 5 set challenges to collect treasures and complete your mission! Treasures: {treasures}/5 | Time Left: {timeLeft}s
          </p>

          {treasures < 5 && timeLeft > 0 ? (
            <div className="max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <p className="text-lg mb-2">
                Set A: {"{" + challenges[currentChallenge].setA.join(", ") + "}"}
              </p>
              <p className="text-lg mb-4">
                Set B: {"{" + challenges[currentChallenge].setB.join(", ") + "}"}
              </p>
              <p className="text-lg mb-4 font-semibold text-primary">
                {challenges[currentChallenge].question}
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter result (e.g., 3 or 1, 2)"
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                onClick={checkAnswer}
                className="w-full bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition duration-300"
              >
                Claim Treasure
              </button>
              {feedback && <p className="mt-4 text-center">{feedback}</p>}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-primary font-semibold">
                {treasures === 5 ? "Mission Complete! You’re a Set Master!" : "Mission Failed! Time ran out."}
              </p>
              <button
                onClick={() => {
                  setTreasures(0);
                  setCurrentChallenge(0);
                  setUserAnswer("");
                  setFeedback("");
                  setTimeLeft(30);
                }}
                className="mt-4 bg-accent text-white px-6 py-3 rounded-lg hover:bg-salmon transition duration-300"
              >
                Restart Mission
              </button>
            </div>
          )}

          {isMounted && (
            <div ref={vennRef} id="venn" className="flex justify-center w-full max-w-md mt-8"></div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}