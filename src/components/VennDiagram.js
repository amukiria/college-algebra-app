"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

const VennDiagram = () => {
  const vennRef = useRef(null); // Reference to the Venn container
  const tooltipRef = useRef(null); // Reference to the tooltip

  useEffect(() => {
    const chartData = [
      { sets: ["A"], size: 3 },
      { sets: ["B"], size: 3 },
      { sets: ["A", "B"], size: 2 },
    ];

    const chart = venn.VennDiagram().width(400).height(400);

    // Ensure that d3 selects the correct element using the ref
    const vennElement = d3.select(vennRef.current);

    // Render the Venn diagram
    vennElement.datum(chartData).call(chart);

    // Add hover effects
    vennElement
      .selectAll(".venn-circle path")
      .style("stroke", "#000")
      .style("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill-opacity", 0.5);
        d3.select(tooltipRef.current)
          .style("visibility", "visible")
          .text(`${d.sets.join(" ∩ ")}: ${d.size}`);
      })
      .on("mouseout", function () {
        d3.select(this).style("fill-opacity", 0.3);
        d3.select(tooltipRef.current).style("visibility", "hidden");
      });

    // Cleanup on unmount
    return () => {
      vennElement.selectAll("*").remove(); // Remove any previous chart when the component re-renders
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      <div id="venn" ref={vennRef} className="mb-4"></div>
      <div
        id="tooltip"
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          visibility: "hidden",
          pointerEvents: "none", // Ensure it doesn't interfere with mouse events
        }}
      ></div>
    </div>
  );
};

export default VennDiagram;
