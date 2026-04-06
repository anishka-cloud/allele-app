import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, season, undertone, contrast, skin, value, olive } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const pubId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !pubId) {
      // Graceful fallback: log the email data and return success
      console.log("[subscribe] Beehiiv not configured. Email data:", {
        email, season, undertone, contrast, skin, value, olive,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, provider: "logged" });
    }

    // Beehiiv API call
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "shade-dna-quiz",
          utm_medium: "organic",
          custom_fields: [
            { name: "season", value: season || "" },
            { name: "undertone", value: undertone || "" },
            { name: "contrast", value: contrast || "" },
            { name: "olive", value: olive || "0" },
          ],
        }),
      }
    );

    if (!beehiivRes.ok) {
      const errData = await beehiivRes.json().catch(() => ({}));
      console.error("[subscribe] Beehiiv error:", beehiivRes.status, errData);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: beehiivRes.status }
      );
    }

    return NextResponse.json({ success: true, provider: "beehiiv" });
  } catch (err) {
    console.error("[subscribe] Server error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
