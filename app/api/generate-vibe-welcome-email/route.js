import { generateVibeWelcomeEmail } from "@/lib/vibeEmailTemplate";
import { archetypeNames } from "@/lib/vibeArchetypes";

/**
 * POST /api/generate-vibe-welcome-email
 * Body: { archetype: "CG" }
 *
 * Returns: { subject, previewText, html, archetype }
 *
 * Vibe affiliate URLs are not yet wired into vibeProducts.js. Until per-product
 * buy_url fields land, every "Shop" link in the rendered email falls back to
 * the default ShopMy URL defined in vibeEmailTemplate.js.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const archetypeCode = body.archetype;

  if (!archetypeCode) {
    return Response.json({ error: "archetype field required" }, { status: 400 });
  }

  if (!archetypeNames[archetypeCode]) {
    return Response.json(
      {
        error: "Invalid archetype code",
        validCodes: Object.keys(archetypeNames),
      },
      { status: 400 }
    );
  }

  const email = generateVibeWelcomeEmail(archetypeCode);

  return Response.json({
    ...email,
    archetype: archetypeNames[archetypeCode],
  });
}

/**
 * GET /api/generate-vibe-welcome-email?archetype=CG
 * Same as POST but via query param. Convenient for browser preview.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const archetypeCode = searchParams.get("archetype");

  if (!archetypeCode) {
    return Response.json({ error: "archetype parameter required" }, { status: 400 });
  }

  const fakeRequest = { json: async () => ({ archetype: archetypeCode }) };
  return POST(fakeRequest);
}
