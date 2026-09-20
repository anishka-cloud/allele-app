const GENERIC_PATH_PARTS = new Set([
  "dp",
  "item",
  "items",
  "p",
  "product",
  "products",
  "shop",
]);

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function titleCaseDraft(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (/^[A-Z0-9]{2,}$/.test(word)) return word;
      return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

function draftNameFromUrl(url) {
  const parts = url.pathname
    .split("/")
    .map((part) => decodeURIComponent(part).trim())
    .filter(Boolean);

  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const rawPart = parts[index].replace(/\.[a-z0-9]{2,5}$/i, "");
    const normalized = rawPart.toLowerCase();
    const previous = parts[index - 1]?.toLowerCase();

    if (GENERIC_PATH_PARTS.has(normalized)) continue;
    if (/^\d+$/.test(rawPart)) continue;
    if ((previous === "dp" || previous === "p") && /^[a-z0-9]{8,16}$/i.test(rawPart)) continue;

    const words = rawPart
      .replace(/[-_+]+/g, " ")
      .replace(/\b[a-z]?\d{5,}\b$/i, "")
      .replace(/\s+/g, " ")
      .trim();

    if (words.length >= 3) return titleCaseDraft(words);
  }

  return "";
}

export function parseProductEntry(value) {
  const entry = clean(value);
  if (!entry) {
    return { kind: "empty", name: "", sourceUrl: "", sourceHost: "" };
  }

  try {
    const url = new URL(entry);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Unsupported URL");

    return {
      kind: "url",
      name: draftNameFromUrl(url),
      sourceUrl: url.toString(),
      sourceHost: url.hostname.replace(/^www\./, ""),
    };
  } catch {
    return { kind: "name", name: entry, sourceUrl: "", sourceHost: "" };
  }
}
