import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const playfabResponse = await fetch("https://YOUR_TITLE_ID.playfabapi.com/Client/LoginWithCustomID", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-SecretKey": "YOUR_PLAYFAB_SECRET_KEY"
      },
      body: JSON.stringify({
        TitleId: "YOUR_TITLE_ID",
        CustomId: body.CustomId,
        CreateAccount: true
      }),
    });

    const data = await playfabResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to PlayFab" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "PlayFab API working!" });
}
