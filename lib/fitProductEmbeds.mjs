// Supplied by ShopMy > Settings & Sharing > Embeddable Components, 2026-09-25.
// Exact product destinations/washes checked in the creator UI. No raw-image
// reuse permission is implied. Keep the complete provider component intact.
export const fitProductEmbeds = {
  "levis-724": { embedUrl: "https://shopmy.us/collections/embed/7860374?", collectionId: "7860374", pinId: "89482010", sku: "188830385" },
  "levis-501": { embedUrl: "https://shopmy.us/collections/embed/7860455?", collectionId: "7860455", pinId: "89482206", sku: "125010681" },
  "levis-low-loose": { embedUrl: "https://shopmy.us/collections/embed/7860488?", collectionId: "7860488", pinId: "89482709", sku: "A55660002" },
  "levis-725": { embedUrl: "https://shopmy.us/collections/embed/7860519?", collectionId: "7860519", pinId: "89483083", sku: "187590196" },
  "madewell-barrel": { embedUrl: "https://shopmy.us/collections/embed/7860542?", collectionId: "7860542", pinId: "89483319", sku: "OA868" },
  "levis-314": { embedUrl: "https://shopmy.us/collections/embed/7860563?", collectionId: "7860563", pinId: "89483651", sku: "196310187" },
  "levis-315": { embedUrl: "https://shopmy.us/collections/embed/7861293?", collectionId: "7861293", pinId: "89493272", sku: "196320162" },
  "levis-ribcage-wide": { embedUrl: "https://shopmy.us/collections/embed/7861316?", collectionId: "7861316", pinId: "89494555", sku: "A60810009" },
  "af-curve-love-90s": { embedUrl: "https://shopmy.us/collections/embed/7861391?", collectionId: "7861391", pinId: "89494762", sku: "63108892" },
};

export function getFitProductEmbed(product) {
  const embed = fitProductEmbeds[product?.id];
  if (!embed || !product.sourceUrl.includes(embed.sku)) return null;
  return embed;
}
