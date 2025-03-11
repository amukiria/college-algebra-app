"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function SetsPractice() {
  const [level, setLevel] = useState(1);
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
  const vennRef = useRef(null);

  const twoSetChallenges = [
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
      solution: "1,2,3,4,5,6",
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
      solution: "5,6",
    },
    {
      setA: [1, 2],
      setB: [3, 4],
      operation: "Union",
      question: "Find A ∪ B",
      solution: "1,2,3,4",
    },
  ];

  const threeSetChallenges = [
    {
      setA: [1, 2, 3, 4],
      setB: [2, 3, 5],
      setC: [3, 6],
      operation: "Intersection",
      question: "Find A ∩ B ∩ C",
      solution: "3",
    },
    {
      setA: [1, 2],
      setB: [2, 3],
      setC: [3, 4],
      operation: "Union",
      question: "Find A ∪ B ∪ C",
      solution: "1,2,3,4",
    },
    {
      setA: [5, 6, 7],
      setB: [6, 8],
      setC: [7, 9],
      operation: "Difference",
      question: "Find A - (B ∪ C)",
      solution: "5",
    },
    {
      setA: [2, 4, 6],
      setB: [4, 6, 8],
      setC: [6, 8, 10],
      operation: "Intersection",
      question: "Find A ∩ B ∩ C",
      solution: "6",
    },
    {
      setA: [1, 3, 5],
      setB: [2, 4, 5],
      setC: [3, 5, 6],
      operation: "Union",
      question: "Find A ∪ B ∪ C",
      solution: "1,2,3,4,5,6",
    },
  ];

  const challenges = level === 1 ? twoSetChallenges : threeSetChallenges;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    updateVennDiagram(vennData);

    if (timeLeft > 0 && treasures < 5) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setFeedback("Time’s up! The treasure slips away.");
    }
  }, [timeLeft, treasures, isMounted]);

  const updateVennDiagram = (newData) => {
    if (!vennRef.current) return;

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
    const current = challenges[currentChallenge];
    const expected = current.solution;
    // Normalize user input: remove spaces, sort if multiple elements
    const userTrimmed = userAnswer
      .trim()
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x !== "")
      .sort((a, b) => a - b)
      .join(",");
    const expectedTrimmed = expected
      .split(",")
      .map((x) => x.trim())
      .sort((a, b) => a - b)
      .join(",");

    if (userTrimmed === expectedTrimmed) {
      setTreasures(treasures + 1);
      setFeedback(level === 1 ? "Treasure found! Onward!" : "Gem secured! Keep hunting!");

      let newData;
      if (level === 1) {
        switch (current.operation) {
          case "Intersection":
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["A", "B"], size: current.setA.filter((x) => current.setB.includes(x)).length },
            ];
            break;
          case "Union":
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["A", "B"], size: [...new Set([...current.setA, ...current.setB])].length },
            ];
            break;
          case "Difference":
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["A", "B"], size: current.setA.filter((x) => !current.setB.includes(x)).length },
            ];
            break;
          default:
            newData = vennData;
        }
      } else {
        const intersectionAB = current.setA.filter((x) => current.setB.includes(x));
        const intersectionAC = current.setA.filter((x) => current.setC.includes(x));
        const intersectionBC = current.setB.filter((x) => current.setC.includes(x));
        const intersectionABC = current.setA.filter(
          (x) => current.setB.includes(x) && current.setC.includes(x)
        );
        switch (current.operation) {
          case "Intersection":
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["C"], size: current.setC.length },
              { sets: ["A", "B"], size: intersectionAB.length },
              { sets: ["A", "C"], size: intersectionAC.length },
              { sets: ["B", "C"], size: intersectionBC.length },
              { sets: ["A", "B", "C"], size: intersectionABC.length },
            ];
            break;
          case "Union":
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["C"], size: current.setC.length },
              { sets: ["A", "B"], size: [...new Set([...current.setA, ...current.setB])].length },
              { sets: ["A", "C"], size: [...new Set([...current.setA, ...current.setC])].length },
              { sets: ["B", "C"], size: [...new Set([...current.setB, ...current.setC])].length },
              { sets: ["A", "B", "C"], size: [...new Set([...current.setA, ...current.setB, ...current.setC])].length },
            ];
            break;
          case "Difference":
            const unionBC = [...new Set([...current.setB, ...current.setC])];
            newData = [
              { sets: ["A"], size: current.setA.length },
              { sets: ["B"], size: current.setB.length },
              { sets: ["C"], size: current.setC.length },
              { sets: ["A", "B"], size: intersectionAB.length },
              { sets: ["A", "C"], size: intersectionAC.length },
              { sets: ["B", "C"], size: intersectionBC.length },
              { sets: ["A", "B", "C"], size: current.setA.filter((x) => !unionBC.includes(x)).length },
            ];
            break;
          default:
            newData = vennData;
        }
      }
      setVennData(newData);
      updateVennDiagram(newData);

      if (treasures + 1 < 5) {
        setCurrentChallenge(currentChallenge + 1);
        setUserAnswer("");
        setTimeLeft(30);
      } else if (level === 1) {
        setLevel(2);
        setTreasures(0);
        setCurrentChallenge(0);
        setUserAnswer("");
        setFeedback("Level 1 Complete! Welcome to Level 2: Set Treasure Triad!");
        setTimeLeft(30);
        setVennData([
          { sets: ["A"], size: 0 },
          { sets: ["B"], size: 0 },
          { sets: ["C"], size: 0 },
          { sets: ["A", "B"], size: 0 },
          { sets: ["A", "C"], size: 0 },
          { sets: ["B", "C"], size: 0 },
          { sets: ["A", "B", "C"], size: 0 },
        ]);
        updateVennDiagram([
          { sets: ["A"], size: 0 },
          { sets: ["B"], size: 0 },
          { sets: ["C"], size: 0 },
          { sets: ["A", "B"], size: 0 },
          { sets: ["A", "C"], size: 0 },
          { sets: ["B", "C"], size: 0 },
          { sets: ["A", "B", "C"], size: 0 },
        ]);
      }
    } else {
      setFeedback(
        level === 1
          ? `Wrong path! Expected: ${expected}`
          : `Wrong! Expected: ${expected}`
      );
    }
  };

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text font-body">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary text-center">
            Sets Practice: {level === 1 ? "Set Explorer Mission" : "Set Treasure Triad"}
          </h1>
          <p className="text-lg mb-4 text-center">
            Level {level}: Solve 5 challenges to collect {level === 1 ? "treasures" : "gems"}! {level === 1 ? "Treasures" : "Gems"}: {treasures}/5 | Time Left: {timeLeft}s
          </p>

          {treasures < 5 && timeLeft > 0 ? (
            <div className="max-w-md mx-auto bg-lightNeutral p-6 rounded-lg shadow-md">
              <p className="text-lg mb-2">
                Set A: {"{" + challenges[currentChallenge].setA.join(", ") + "}"}
              </p>
              <p className="text-lg mb-2">
                Set B: {"{" + challenges[currentChallenge].setB.join(", ") + "}"}
              </p>
              {level === 2 && (
                <p className="text-lg mb-4">
                  Set C: {"{" + challenges[currentChallenge].setC.join(", ") + "}"}
                </p>
              )}
              <p className="text-lg mb-4 font-semibold text-primary">
                {challenges[currentChallenge].question}
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter result (e.g., 3 or 1,2,3)"
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                onClick={checkAnswer}
                className="w-full bg-accent text-white px-4 py-2 rounded hover:bg-salmon transition duration-300"
              >
                {level === 1 ? "Claim Treasure" : "Unlock Gem"}
              </button>
              {feedback && <p className="mt-4 text-center">{feedback}</p>}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-primary font-semibold">
                {treasures === 5 && level === 2 ? "Mission Complete! You’re a Set Master!" : "Level Failed! Time ran out."}
              </p>
              <button
                onClick={() => {
                  setLevel(1);
                  setTreasures(0);
                  setCurrentChallenge(0);
                  setUserAnswer("");
                  setFeedback("");
                  setTimeLeft(30);
                  setVennData([
                    { sets: ["A"], size: 0 },
                    { sets: ["B"], size: 0 },
                    { sets: ["A", "B"], size: 0 },
                  ]);
                  updateVennDiagram([
                    { sets: ["A"], size: 0 },
                    { sets: ["B"], size: 0 },
                    { sets: ["A", "B"], size: 0 },
                  ]);
                }}
                className="mt-4 bg-accent text-white px-6 py-3 rounded-lg hover:bg-salmon transition duration-300"
              >
                Restart from Level 1
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