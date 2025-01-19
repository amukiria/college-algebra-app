"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";
import * as venn from "venn.js";

const VennDiagram = () => {
  useEffect(() => {
    const chartData = [
      { sets: ["A"], size: 3 },
      { sets: ["B"], size: 3 },
      { sets: ["A", "B"], size: 2 },
    ];

    const chart = venn.VennDiagram().width(400).height(400);

    d3.select("#venn")
      .datum(chartData)
      .call(chart);

    // Add hover effects
    d3.selectAll("#venn .venn-circle path")
      .style("stroke", "#000")
      .style("stroke-width", 1)
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill-opacity", 0.5);
        d3.select("#tooltip")
          .style("visibility", "visible")
          .text(`${d.sets.join(" ∩ ")}: ${d.size}`);
      })
      .on("mouseout", function () {
        d3.select(this).style("fill-opacity", 0.3);
        d3.select("#tooltip").style("visibility", "hidden");
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div id="venn" className="mb-4"></div>
      <div
        id="tooltip"
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          visibility: "hidden",
        }}
      ></div>
    </div>
  );
};

export default VennDiagram;
