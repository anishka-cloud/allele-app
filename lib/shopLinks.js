const shopLinks = {
  "Clear Spring": "https://shopmy.us/collections/4672985",
  "True Spring": "https://shopmy.us/collections/4673080",
  "Light Spring": "https://shopmy.us/collections/4673208",
  "Soft Summer": "https://shopmy.us/collections/4678999",
  "True Summer": "https://shopmy.us/collections/4679320",
  "Light Summer": "https://shopmy.us/collections/4679551",
  "Soft Autumn": "https://shopmy.us/collections/4680251",
  "True Autumn": "https://shopmy.us/collections/4680429",
  "Dark Autumn": "https://shopmy.us/collections/4680621",
  "Dark Winter": "https://shopmy.us/collections/4680854",
  "True Winter": "https://shopmy.us/collections/4681130",
  "Bright Winter": "https://shopmy.us/collections/4681313",
};

const FALLBACK_URL = "https://shopmy.us/shop/nish";

export function getShopUrl(season) {
  return shopLinks[season] || FALLBACK_URL;
}
