import axios from "axios";

export async function POST(request) {
  const { query } = await request.json();

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await axios.get("https://api.wolframalpha.com/v2/query", {
      params: {
        input: query,
        format: "image,plaintext", // Request both visual and plain text outputs
        output: "JSON",
        appid: process.env.WOLFRAM_API_KEY,
      },
    });

    return new Response(JSON.stringify({ data: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Wolfram API error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Wolfram API" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
