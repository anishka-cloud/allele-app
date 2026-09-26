import { fitProducts } from "./fitProducts.mjs";

// These are examples of a silhouette, not personalized recommendations. Keep
// image, wash, product name and destination tied to the same catalog record.
export const fitStyleExampleIds = {
  slim: "levis-724",
  straight: "levis-501",
  wide: "levis-low-loose",
  bootcut: "levis-725",
  barrel: "madewell-barrel",
};

export function getFitStyleExample(leg) {
  const key = leg === "slim_straight" ? "slim" : leg;
  const id = fitStyleExampleIds[key];
  return id ? fitProducts.find(product => product.id === id) || null : null;
}

export function canDisplayFitProductPhoto(product, { localPreview = false } = {}) {
  if (!product?.imageUrl) return false;
  if (localPreview === true) return true;
  // Do not mistake public image URLs, affiliate membership, or attribution for
  // a reuse license. Approval must cover this exact image and cite evidence.
  const permission = product.imagePermission;
  return permission?.status === "approved"
    && permission.imageUrl === product.imageUrl
    && typeof permission.evidence === "string"
    && permission.evidence.trim().length > 0;
}
