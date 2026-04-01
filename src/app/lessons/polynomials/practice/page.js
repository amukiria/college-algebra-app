"use client";

import { useState, useEffect, useRef } from "react";
import algebra from "algebra.js";

const COLORS = {
  p1: "#0066FF",
  p2: "#0099AA",
  result: "#EF9F27",
};

function evaluatePolynomial(coeffs, x) {
  return coeffs.reduce((acc, coeff, i) => {
    const power = coeffs.length - 1 - i;
    return acc + coeff * Math.pow(x, power);
  }, 0);
}

function parseToCoeffs(polyStr) {
  try {
    const terms = polyStr.replace(/\s/g, "").split(/(?=[+-])/);
    const degree = Math.max(
      ...terms.map((term) => {
        const match = term.match(/x\^(\d+)/);
        if (match) return parseInt(match[1]);
        if (term.includes("x")) return 1;
        return 0;
      })
    );
    const coefficients = new Array(degree + 1).fill(0);
    terms.forEach((term) => {
      const cubicMatch = term.match(/([-+]?\d*)x\^(\d+)/);
      const linearMatch = term.match(/([-+]?\d*)x$/);
      const constMatch = term.match(/^([-+]?\d+)$/);
      if (cubicMatch) {
        const coeff = cubicMatch[1] === "" || cubicMatch[1] === "+" ? 1 : cubicMatch[1] === "-" ? -1 : parseInt(cubicMatch[1]);
        coefficients[degree - parseInt(cubicMatch[2])] = coeff;
      } else if (linearMatch) {
        const coeff = linearMatch[1] === "" || linearMatch[1] === "+" ? 1 : linearMatch[1] === "-" ? -1 : parseInt(linearMatch[1]);
        coefficients[degree] = coeff;
      } else if (constMatch) {
        coefficients[degree] = parseInt(constMatch[1]);
      }
    });
    return coefficients;
  } catch {
    return null;
  }
}

function getDegree(coeffs) {
  for (let i = 0; i < coeffs.length; i++) {
    if (coeffs[i] !== 0) return coeffs.length - 1 - i;
  }
  return 0;
}

function generateInsight(op, c1, c2, cr) {
  const d1 = getDegree(c1);
  const d2 = getDegree(c2);
  const dr = getDegree(cr);
  switch (op) {
    case "add":
      if (dr < Math.max(d1, d2))
        return `Notice: the leading terms cancelled out, reducing the degree from ${Math.max(d1, d2)} to ${dr}. This happens when leading coefficients sum to zero.`;
      return `Notice: adding two polynomials never increases the degree beyond the higher of the two (degree ${Math.max(d1, d2)}).`;
    case "subtract":
      if (dr < Math.max(d1, d2))
        return `Notice: subtraction caused the leading terms to cancel, dropping the degree to ${dr}. Try changing the coefficients to prevent this.`;
      return `Notice: subtracting can eliminate terms entirely if coefficients match. Watch what happens to the curves near those x values.`;
    case "multiply":
      return `Notice: the degree of the product (${dr}) equals the sum of the degrees of the two polynomials (${d1} + ${d2} = ${d1 + d2}). This is always true for multiplication.`;
    case "divide":
      return `Notice: dividing reduces the degree. The quotient has degree ${dr}, which is the difference of the original degrees (${d1} - ${d2}).`;
    default:
      return "";
  }
}

function Graph({ p1Coeffs, p2Coeffs, resultCoeffs, xMin, xMax, yMin, yMax }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const PAD = 48;

    const toCanvasX = (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2);
    const toCanvasY = (y) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, W, H);

    const xStep = Math.ceil((xMax - xMin) / 10);
    const yStep = Math.ceil((yMax - yMin) / 8);

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= xMax; x += xStep) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), PAD);
      ctx.lineTo(toCanvasX(x), H - PAD);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      ctx.beginPath();
      ctx.moveTo(PAD, toCanvasY(y));
      ctx.lineTo(W - PAD, toCanvasY(y));
      ctx.stroke();
    }

    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    const yAxisY = Math.max(PAD, Math.min(H - PAD, toCanvasY(0)));
    ctx.beginPath();
    ctx.moveTo(PAD, yAxisY);
    ctx.lineTo(W - PAD, yAxisY);
    ctx.stroke();
    const xAxisX = Math.max(PAD, Math.min(W - PAD, toCanvasX(0)));
    ctx.beginPath();
    ctx.moveTo(xAxisX, PAD);
    ctx.lineTo(xAxisX, H - PAD);
    ctx.stroke();

    ctx.fillStyle = "#374151";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    for (let x = Math.ceil(xMin); x <= xMax; x += xStep) {
      if (x !== 0) ctx.fillText(x, toCanvasX(x), yAxisY + 16);
    }
    ctx.textAlign = "right";
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (y !== 0) ctx.fillText(y, xAxisX - 6, toCanvasY(y) + 4);
    }

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("x", W - PAD + 16, yAxisY + 4);
    ctx.fillText("y", xAxisX, PAD - 10);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText("0", xAxisX - 4, yAxisY + 12);

    const drawCurve = (coeffs, color, label) => {
      if (!coeffs) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      for (let px = PAD; px < W - PAD; px++) {
        const x = xMin + ((px - PAD) / (W - PAD * 2)) * (xMax - xMin);
        const y = evaluatePolynomial(coeffs, x);
        const py = toCanvasY(y);
        if (py < PAD - 10 || py > H - PAD + 10) { started = false; continue; }
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const edgeX = xMax - (xMax - xMin) * 0.05;
      const edgeY = evaluatePolynomial(coeffs, edgeX);
      const labelPy = toCanvasY(edgeY);
      if (labelPy > PAD && labelPy < H - PAD) {
        ctx.fillStyle = color;
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(label, W - PAD + 2, labelPy + 4);
      }
    };

    drawCurve(p1Coeffs, COLORS.p1, "P1");
    drawCurve(p2Coeffs, COLORS.p2, "P2");
    drawCurve(resultCoeffs, COLORS.result, "R");
  }, [p1Coeffs, p2Coeffs, resultCoeffs, xMin, xMax, yMin, yMax]);

  return <canvas ref={canvasRef} width={600} height={360} className="rounded-lg w-full" />;
}

function SymbolBar({ setter }) {
  const symbols = [
    { label: "x²", value: "x^2" },
    { label: "x³", value: "x^3" },
    { label: "x⁴", value: "x^4" },
    { label: "x⁵", value: "x^5" },
    { label: "xⁿ", value: "x^" },
    { label: "+", value: "+" },
    { label: "−", value: "-" },
  ];

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {symbols.map(({ label, value }) => (
        <button
          key={label}
          onClick={() => setter((prev) => prev + value)}
          className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-md shadow-sm text-gray-700 transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function PolynomialExplorer() {
  const [poly1, setPoly1] = useState("x^2+2x+1");
  const [poly2, setPoly2] = useState("x+1");
  const [operation, setOperation] = useState("multiply");
  const [result, setResult] = useState("");
  const [insight, setInsight] = useState("");
  const [error, setError] = useState("");
  const [p1Coeffs, setP1Coeffs] = useState(null);
  const [p2Coeffs, setP2Coeffs] = useState(null);
  const [resultCoeffs, setResultCoeffs] = useState(null);

  const [xMin, setXMin] = useState(-5);
  const [xMax, setXMax] = useState(5);
  const [yMin, setYMin] = useState(-100);
  const [yMax, setYMax] = useState(100);

  const zoomIn = () => {
    const xC = (xMin + xMax) / 2;
    const yC = (yMin + yMax) / 2;
    const xR = (xMax - xMin) / 2 * 0.7;
    const yR = (yMax - yMin) / 2 * 0.7;
    setXMin(xC - xR); setXMax(xC + xR);
    setYMin(yC - yR); setYMax(yC + yR);
  };

  const zoomOut = () => {
    const xC = (xMin + xMax) / 2;
    const yC = (yMin + yMax) / 2;
    const xR = (xMax - xMin) / 2 * 1.4;
    const yR = (yMax - yMin) / 2 * 1.4;
    setXMin(xC - xR); setXMax(xC + xR);
    setYMin(yC - yR); setYMax(yC + yR);
  };

  const resetZoom = () => {
    setXMin(-5); setXMax(5);
    setYMin(-100); setYMax(100);
  };

  const resetFields = () => {
    setPoly1("");
    setPoly2("");
    setOperation("add");
    setResult("");
    setInsight("");
    setError("");
    setP1Coeffs(null);
    setP2Coeffs(null);
    setResultCoeffs(null);
    resetZoom();
  };

  const polynomialLongDivision = (dividend, divisor) => {
    const removeLeadingZeros = (arr) => {
      let i = 0;
      while (i < arr.length - 1 && arr[i] === 0) i++;
      return arr.slice(i);
    };
    dividend = removeLeadingZeros(dividend);
    divisor = removeLeadingZeros(divisor);
    if (divisor.length === 0) throw new Error("Division by zero.");
    if (divisor.length > dividend.length) return { quotient: [0], remainder: dividend };
    let quotient = new Array(dividend.length - divisor.length + 1).fill(0);
    let remainder = [...dividend];
    for (let i = 0; i <= dividend.length - divisor.length; i++) {
      const coeff = remainder[i] / divisor[0];
      quotient[i] = coeff;
      for (let j = 0; j <= divisor.length - 1; j++) {
        remainder[i + j] -= coeff * divisor[j];
      }
    }
    return { quotient: removeLeadingZeros(quotient), remainder: removeLeadingZeros(remainder) };
  };

  const handleCalculate = () => {
    setError("");
    setInsight("");
    try {
      const c1 = parseToCoeffs(poly1);
      const c2 = parseToCoeffs(poly2);
      if (!c1 || !c2) throw new Error("Could not parse. Use format: 2x^2+3x+1");

      setP1Coeffs(c1);
      setP2Coeffs(c2);

      if (operation === "divide") {
        const { quotient } = polynomialLongDivision(c1, c2);
        setResultCoeffs(quotient);
        setResult(`Quotient degree: ${getDegree(quotient)}`);
        setInsight(generateInsight("divide", c1, c2, quotient));
      } else {
        const p1 = algebra.parse(poly1);
        const p2 = algebra.parse(poly2);
        let res;
        if (operation === "add") res = p1.add(p2);
        else if (operation === "subtract") res = p1.subtract(p2);
        else res = p1.multiply(p2);
        const resStr = res.toString();
        setResult(resStr);
        const cr = parseToCoeffs(resStr.replace(/\s/g, ""));
        setResultCoeffs(cr);
        if (cr) setInsight(generateInsight(operation, c1, c2, cr));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen text-text font-body">
      <h1 className="text-4xl font-extrabold text-primary mb-2 text-center">
        Polynomial Explorer
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Experiment with polynomial operations and observe what changes.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="flex gap-6 mb-3 text-sm font-medium">
          {[["P1", COLORS.p1], ["P2", COLORS.p2], ["Result", COLORS.result]].map(([label, color]) => (
            <span key={label} className="flex items-center gap-2">
              <span className="w-6 h-2 rounded inline-block" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-2">
          <Graph
            p1Coeffs={p1Coeffs}
            p2Coeffs={p2Coeffs}
            resultCoeffs={resultCoeffs}
            xMin={xMin} xMax={xMax}
            yMin={yMin} yMax={yMax}
          />
        </div>

        <div className="flex gap-2 justify-end mb-6">
          <button onClick={zoomIn} className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-gray-700">
            + Zoom In
          </button>
          <button onClick={zoomOut} className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-gray-700">
            − Zoom Out
          </button>
          <button onClick={resetZoom} className="px-3 py-1.5 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-gray-700">
            Reset View
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-5 text-sm text-gray-600">
            <p className="font-semibold mb-1">How to enter polynomials:</p>
            <p>
              Use <code className="bg-gray-100 px-1 rounded">x^2</code> for x²,{" "}
              <code className="bg-gray-100 px-1 rounded">x^3</code> for x³, and so on. Example:{" "}
              <code className="bg-gray-100 px-1 rounded">3x^2+2x+1</code>. Or tap the buttons below each field.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Polynomial 1</label>
              <input
                type="text"
                value={poly1}
                onChange={(e) => setPoly1(e.target.value)}
                placeholder="e.g. x^2+2x+1"
                className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <SymbolBar setter={setPoly1} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Polynomial 2</label>
              <input
                type="text"
                value={poly2}
                onChange={(e) => setPoly2(e.target.value)}
                placeholder="e.g. x+1"
                className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <SymbolBar setter={setPoly2} />
            </div>
          </div>

          <div className="mt-5 flex gap-3 flex-wrap">
            {["add", "subtract", "multiply", "divide"].map((op) => (
              <button
                key={op}
                onClick={() => setOperation(op)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  operation === op
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleCalculate}
              className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore
            </button>
            <button
              onClick={resetFields}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-4">
            <p className="text-sm text-gray-500 mb-1">Result</p>
            <p className="text-lg font-mono text-gray-800">{result}</p>
          </div>
        )}

        {insight && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-blue-700 mb-1">💡 Notice</p>
            <p className="text-sm text-blue-800">{insight}</p>
          </div>
        )}
      </div>
    </div>
  );
}