/**
 * Vibe DNA Product Recommendations
 * 9 archetypes × 8 categories × 3 tiers = 216 products
 * Categories: top, bottom, layer, shoes, bag, jewelry, fragrance, finishing
 */

export const VIBE_TIER_META = {
  budget: { label: "BUDGET PICK", accent: "#7B8E6B" },
  value: { label: "BEST VALUE", accent: "#C4A265" },
  splurge: { label: "SPLURGE", accent: "#B88B6E" },
};

export const VIBE_CATEGORIES = [
  { key: "top", label: "Signature Top", icon: "👕", subtitle: "Your defining upper-body piece" },
  { key: "bottom", label: "Signature Bottom", icon: "👖", subtitle: "Your go-to lower half" },
  { key: "layer", label: "Layering Piece", icon: "🧥", subtitle: "Your outerwear signature" },
  { key: "shoes", label: "Shoes", icon: "👟", subtitle: "What grounds your look" },
  { key: "bag", label: "Bag", icon: "👜", subtitle: "Your everyday carry" },
  { key: "jewelry", label: "Jewelry", icon: "💎", subtitle: "Your signature sparkle" },
  { key: "fragrance", label: "Fragrance", icon: "🌸", subtitle: "How you want to be remembered" },
  { key: "finishing", label: "Finishing Touch", icon: "✨", subtitle: "The detail that makes it you" },
];

export const vibeProducts = {
  CG: {
    top: {
      budget: { brand: "Uniqlo", product: "U Crew Neck Tee", shade: "White", price: 15, swatch: "#FFFFFF", onSkinSwatch: "#F5F0E8" },
      value: { brand: "Skims", product: "Fits Everybody T-Shirt", shade: "Marble", price: 42, swatch: "#F0EDE5", onSkinSwatch: "#E8E3D8" },
      splurge: { brand: "The Row", product: "Wesler Tee", shade: "White", price: 190, swatch: "#FFFEFA", onSkinSwatch: "#F5F0E8" },
    },
    bottom: {
      budget: { brand: "Abercrombie", product: "Curve Love Straight Jean", shade: "Light Wash", price: 90, swatch: "#A8BDD0", onSkinSwatch: "#96AAC0" },
      value: { brand: "Agolde", product: "90's Pinch Waist Jean", shade: "Navigate", price: 198, swatch: "#C5CDD5", onSkinSwatch: "#B0BAC5" },
      splurge: { brand: "Citizens of Humanity", product: "Annina Wide Leg", shade: "Alemayde", price: 228, swatch: "#D0D8E0", onSkinSwatch: "#BEC8D2" },
    },
    layer: {
      budget: { brand: "H&M", product: "Oversized Blazer", shade: "Black", price: 45, swatch: "#1A1A1A", onSkinSwatch: "#2A2A2A" },
      value: { brand: "Aritzia", product: "Effortless Blazer", shade: "Cream", price: 198, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      splurge: { brand: "Anine Bing", product: "Quinn Blazer", shade: "Black", price: 450, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    shoes: {
      budget: { brand: "Adidas", product: "Samba OG", shade: "White/Black", price: 100, swatch: "#F5F5F5", onSkinSwatch: "#E8E8E8" },
      value: { brand: "Veja", product: "V-12 Leather", shade: "Extra White", price: 150, swatch: "#FAFAFA", onSkinSwatch: "#EDEDED" },
      splurge: { brand: "Common Projects", product: "Original Achilles Low", shade: "White", price: 425, swatch: "#FFFFFF", onSkinSwatch: "#F0F0F0" },
    },
    bag: {
      budget: { brand: "Mango", product: "Structured Tote Bag", shade: "Ecru", price: 50, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      value: { brand: "Polène", product: "Numéro Un Nano", shade: "Chalk", price: 290, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      splurge: { brand: "The Row", product: "Margaux 10", shade: "Ivory", price: 1890, swatch: "#FAF5ED", onSkinSwatch: "#EDE5D8" },
    },
    jewelry: {
      budget: { brand: "Mejuri", product: "Mini Hoop Earrings", shade: "Gold Vermeil", price: 58, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      value: { brand: "Monica Vinader", product: "Siren Muse Necklace", shade: "18k Gold Vermeil", price: 128, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      splurge: { brand: "Missoma", product: "Lucy Williams Chain", shade: "18k Gold", price: 198, swatch: "#DAB04D", onSkinSwatch: "#CDA342" },
    },
    fragrance: {
      budget: { brand: "Sol de Janeiro", product: "Brazilian Bum Bum Cream", shade: "Original", price: 48, swatch: "#F5DEB3", onSkinSwatch: "#E8D0A0" },
      value: { brand: "Glossier", product: "You", shade: "Original", price: 65, swatch: "#F5E0D0", onSkinSwatch: "#E8D0C0" },
      splurge: { brand: "Le Labo", product: "Another 13", shade: "50ml", price: 197, swatch: "#E8DDD0", onSkinSwatch: "#DDD0C0" },
    },
    finishing: {
      budget: { brand: "e.l.f.", product: "Lip Lacquer", shade: "Clear", price: 4, swatch: "#F5E8E0", onSkinSwatch: "#F0DDD5" },
      value: { brand: "Rare Beauty", product: "Soft Pinch Luminous", shade: "Joy", price: 23, swatch: "#E8B8A0", onSkinSwatch: "#DDA890" },
      splurge: { brand: "Dior", product: "Lip Maximizer", shade: "001 Pink", price: 38, swatch: "#F0C0C0", onSkinSwatch: "#E5B0B0" },
    },
  },
  COG: {
    top: {
      budget: { brand: "H&M", product: "Linen Blend Shirt", shade: "Natural White", price: 30, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      value: { brand: "Frank & Eileen", product: "Eileen Relaxed Button-Up", shade: "White Linen", price: 238, swatch: "#FAF5ED", onSkinSwatch: "#EDE5D8" },
      splurge: { brand: "Loro Piana", product: "Andre Linen Shirt", shade: "Natural", price: 695, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
    },
    bottom: {
      budget: { brand: "Old Navy", product: "High-Waisted Linen Pant", shade: "Sand", price: 40, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Reformation", product: "Petites Cleo Linen Pant", shade: "Natural", price: 148, swatch: "#E5DBC8", onSkinSwatch: "#D8CDB8" },
      splurge: { brand: "Vince", product: "Pleat Front Wide-Leg", shade: "Sandstone", price: 295, swatch: "#D8CDB8", onSkinSwatch: "#CCC0A8" },
    },
    layer: {
      budget: { brand: "Uniqlo", product: "Cashmere Crew Neck Sweater", shade: "Oatmeal", price: 100, swatch: "#E5DBC8", onSkinSwatch: "#D8CDB8" },
      value: { brand: "Jenni Kayne", product: "Cocoon Cardigan", shade: "Oat", price: 245, swatch: "#DDD0B8", onSkinSwatch: "#D0C3A8" },
      splurge: { brand: "Nili Lotan", product: "Cassandra Sweater", shade: "Ivory", price: 450, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
    },
    shoes: {
      budget: { brand: "Target (Universal Thread)", product: "Espadrille Mule", shade: "Natural", price: 25, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Soludos", product: "The Original Espadrille", shade: "Natural", price: 65, swatch: "#E5DBC8", onSkinSwatch: "#D8CDB8" },
      splurge: { brand: "Castañer", product: "Carina Wedge Espadrille", shade: "Ivory", price: 145, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
    },
    bag: {
      budget: { brand: "Mango", product: "Natural Fibre Basket Bag", shade: "Natural", price: 46, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Dragon Diffusion", product: "Bamboo Triple Jump", shade: "Natural", price: 300, swatch: "#C5B69A", onSkinSwatch: "#B8A88C" },
      splurge: { brand: "Loewe", product: "Small Basket Bag", shade: "Natural/Tan", price: 590, swatch: "#D8CDB8", onSkinSwatch: "#CCC0A8" },
    },
    jewelry: {
      budget: { brand: "Amazon Essentials", product: "Pearl Stud Earrings", shade: "White/Gold", price: 15, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      value: { brand: "Mejuri", product: "Bold Pearl Studs", shade: "Gold Vermeil", price: 78, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      splurge: { brand: "Tiffany & Co.", product: "Pearl Stud Earrings", shade: "Sterling Silver", price: 400, swatch: "#F8F5F0", onSkinSwatch: "#EDE8E0" },
    },
    fragrance: {
      budget: { brand: "Clean Reserve", product: "Skin Eau de Parfum", shade: "Original", price: 44, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      value: { brand: "Maison Margiela", product: "Replica Beach Walk", shade: "100ml", price: 78, swatch: "#D0E0F0", onSkinSwatch: "#C0D0E0" },
      splurge: { brand: "Jo Malone", product: "Wood Sage & Sea Salt", shade: "100ml", price: 160, swatch: "#B0C8D0", onSkinSwatch: "#A0B8C0" },
    },
    finishing: {
      budget: { brand: "Target", product: "Straw Hat", shade: "Natural", price: 15, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Lack of Color", product: "The Spencer Fedora", shade: "Natural", price: 110, swatch: "#E5DBC8", onSkinSwatch: "#D8CDB8" },
      splurge: { brand: "Janessa Leoné", product: "Hamilton Hat", shade: "Natural", price: 216, swatch: "#DDD0B8", onSkinSwatch: "#D0C3A8" },
    },
  },
  OM: {
    top: {
      budget: { brand: "Uniqlo", product: "Extra Fine Merino Crew", shade: "Oatmeal", price: 50, swatch: "#E5DBC8", onSkinSwatch: "#D8CDB8" },
      value: { brand: "Naadam", product: "The Essential Cashmere", shade: "Camel", price: 125, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
      splurge: { brand: "Khaite", product: "Diletta Cashmere Top", shade: "Cream", price: 580, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
    },
    bottom: {
      budget: { brand: "Abercrombie", product: "Tailored Relaxed Straight", shade: "Charcoal", price: 90, swatch: "#4A4A4A", onSkinSwatch: "#3D3D3D" },
      value: { brand: "Reformation", product: "Mason Pant", shade: "Camel", price: 178, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
      splurge: { brand: "The Row", product: "Banew Pant", shade: "Navy", price: 890, swatch: "#1A2744", onSkinSwatch: "#0D1A36" },
    },
    layer: {
      budget: { brand: "Mango", product: "Classic Trench Coat", shade: "Beige", price: 120, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Sandro", product: "Cotton Trench Coat", shade: "Beige", price: 495, swatch: "#D8CDB8", onSkinSwatch: "#CCC0A8" },
      splurge: { brand: "Burberry", product: "Kensington Heritage Trench", shade: "Honey", price: 2290, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
    },
    shoes: {
      budget: { brand: "Sam Edelman", product: "Loraine Loafer", shade: "Cognac", price: 150, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      value: { brand: "G.H. Bass", product: "Whitney Weejun", shade: "Cognac", price: 175, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      splurge: { brand: "The Row", product: "Soft Loafer", shade: "Espresso", price: 1090, swatch: "#3D2B1F", onSkinSwatch: "#2E1E14" },
    },
    bag: {
      budget: { brand: "Madewell", product: "Transport Tote", shade: "English Saddle", price: 188, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      value: { brand: "Polène", product: "Numéro Un", shade: "Camel", price: 430, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
      splurge: { brand: "Celine", product: "Sangle Bucket", shade: "Tan", price: 2600, swatch: "#A0825C", onSkinSwatch: "#937550" },
    },
    jewelry: {
      budget: { brand: "Mejuri", product: "Pearl Studs", shade: "14k Gold", price: 98, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      value: { brand: "Monica Vinader", product: "Tennis Bracelet", shade: "18k Gold Vermeil", price: 298, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      splurge: { brand: "Tiffany & Co.", product: "Return to Tiffany Bead", shade: "Sterling Silver", price: 450, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
    },
    fragrance: {
      budget: { brand: "Ariana Grande", product: "Cloud", shade: "Original", price: 40, swatch: "#E0D0E8", onSkinSwatch: "#D0C0D8" },
      value: { brand: "Byredo", product: "Blanche", shade: "50ml", price: 195, swatch: "#F5F0F5", onSkinSwatch: "#E8E0E8" },
      splurge: { brand: "Tom Ford", product: "Tobacco Vanille", shade: "50ml", price: 295, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Silk Hair Scarf", shade: "Ivory", price: 12, swatch: "#FAF5ED", onSkinSwatch: "#EDE5D8" },
      value: { brand: "Italic", product: "Silk Twill Scarf", shade: "Classic Print", price: 80, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      splurge: { brand: "Hermès", product: "Twilly d'Hermès Scarf", shade: "Signature", price: 200, swatch: "#C25A38", onSkinSwatch: "#B04D2E" },
    },
  },
  DA: {
    top: {
      budget: { brand: "H&M", product: "Cable-Knit Turtleneck", shade: "Dark Brown", price: 35, swatch: "#3D2B1F", onSkinSwatch: "#2E1E14" },
      value: { brand: "& Other Stories", product: "Alpaca-Blend Turtleneck", shade: "Tobacco", price: 89, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
      splurge: { brand: "Ralph Lauren", product: "Cable-Knit Cashmere", shade: "Hunter Green", price: 398, swatch: "#355E3B", onSkinSwatch: "#2A4E30" },
    },
    bottom: {
      budget: { brand: "Abercrombie", product: "Pleated Midi Skirt", shade: "Brown Plaid", price: 80, swatch: "#8B7355", onSkinSwatch: "#7E6648" },
      value: { brand: "Reformation", product: "Olina Midi Skirt", shade: "Otter Plaid", price: 148, swatch: "#6B5B4D", onSkinSwatch: "#5E4E40" },
      splurge: { brand: "Max Mara", product: "Wool Plaid Trousers", shade: "Tobacco Check", price: 495, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
    },
    layer: {
      budget: { brand: "Zara", product: "Textured Tweed Blazer", shade: "Brown", price: 90, swatch: "#6B5B4D", onSkinSwatch: "#5E4E40" },
      value: { brand: "Mango", product: "Wool-Blend Tweed Jacket", shade: "Chocolate", price: 150, swatch: "#5A3E2B", onSkinSwatch: "#4D3120" },
      splurge: { brand: "Ralph Lauren", product: "Herringbone Tweed Blazer", shade: "Brown Tweed", price: 598, swatch: "#6B5B4D", onSkinSwatch: "#5E4E40" },
    },
    shoes: {
      budget: { brand: "Amazon (The Drop)", product: "Lyon Mary Jane", shade: "Cognac", price: 55, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      value: { brand: "Madewell", product: "The Lisbeth Mary Jane", shade: "Dark Cabernet", price: 128, swatch: "#4A1C2E", onSkinSwatch: "#3D1022" },
      splurge: { brand: "Church's", product: "Shannon Oxford", shade: "Walnut", price: 640, swatch: "#5C3D2E", onSkinSwatch: "#4F3020" },
    },
    bag: {
      budget: { brand: "Amazon (The Drop)", product: "Diana Crossbody Satchel", shade: "Cognac", price: 40, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      value: { brand: "Madewell", product: "Transport Satchel", shade: "Pecan", price: 198, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      splurge: { brand: "Mulberry", product: "Bayswater Satchel", shade: "Oak", price: 1350, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Vintage Signet Ring", shade: "Gold", price: 15, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      value: { brand: "Mejuri", product: "Signet Ring", shade: "14k Gold", price: 178, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      splurge: { brand: "Miansai", product: "Heritage Signet Ring", shade: "Gold Vermeil", price: 295, swatch: "#DAB04D", onSkinSwatch: "#CDA342" },
    },
    fragrance: {
      budget: { brand: "Replica", product: "Coffee Break (Travel)", shade: "10ml", price: 32, swatch: "#3D2B1F", onSkinSwatch: "#2E1E14" },
      value: { brand: "Maison Margiela", product: "Replica By the Fireplace", shade: "100ml", price: 78, swatch: "#8B4513", onSkinSwatch: "#7A3A08" },
      splurge: { brand: "Tom Ford", product: "Tobacco Vanille", shade: "50ml", price: 295, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Blue Light Glasses", shade: "Tortoise", price: 16, swatch: "#8B5A2B", onSkinSwatch: "#7A4E20" },
      value: { brand: "Warby Parker", product: "Chamberlain Frames", shade: "Cognac Tortoise", price: 95, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
      splurge: { brand: "Oliver Peoples", product: "Gregory Peck Glasses", shade: "Bufftabac Tortoise", price: 396, swatch: "#8B7355", onSkinSwatch: "#7E6648" },
    },
  },
  CT: {
    top: {
      budget: { brand: "Shein", product: "Peter Pan Collar Blouse", shade: "Ivory", price: 18, swatch: "#FAF5ED", onSkinSwatch: "#EDE5D8" },
      value: { brand: "Doen", product: "Etta Top", shade: "Cream", price: 168, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      splurge: { brand: "Christy Dawn", product: "The Dawn Blouse", shade: "Buttercream", price: 228, swatch: "#F5ECD5", onSkinSwatch: "#E8DFC5" },
    },
    bottom: {
      budget: { brand: "Target (Universal Thread)", product: "Midi Prairie Skirt", shade: "Sage Floral", price: 30, swatch: "#A0B090", onSkinSwatch: "#90A080" },
      value: { brand: "Reformation", product: "Bea Midi Skirt", shade: "Laurel Floral", price: 148, swatch: "#8B9B7B", onSkinSwatch: "#7B8B6B" },
      splurge: { brand: "Doen", product: "The Sebastiane Skirt", shade: "Garden Floral", price: 278, swatch: "#B0C0A0", onSkinSwatch: "#A0B090" },
    },
    layer: {
      budget: { brand: "Amazon", product: "Cable Knit Cardigan", shade: "Cream", price: 35, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      value: { brand: "Free People", product: "Found My Friend Cardigan", shade: "Ivory", price: 128, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      splurge: { brand: "Doen", product: "The Palmetto Cardigan", shade: "Oat", price: 268, swatch: "#DDD0B8", onSkinSwatch: "#D0C3A8" },
    },
    shoes: {
      budget: { brand: "Target", product: "Mary Jane Flats", shade: "Brown", price: 28, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
      value: { brand: "Madewell", product: "The Nettie Mary Jane", shade: "Dark Cabernet", price: 118, swatch: "#4A1C2E", onSkinSwatch: "#3D1022" },
      splurge: { brand: "Loeffler Randall", product: "Leonie Ballet Flat", shade: "Butter", price: 295, swatch: "#F5ECD5", onSkinSwatch: "#E8DFC5" },
    },
    bag: {
      budget: { brand: "Amazon", product: "Straw Woven Tote", shade: "Natural", price: 25, swatch: "#D2C4A8", onSkinSwatch: "#C5B69A" },
      value: { brand: "Dragon Diffusion", product: "Mini Nantucket Basket", shade: "Natural", price: 260, swatch: "#C5B69A", onSkinSwatch: "#B8A88C" },
      splurge: { brand: "Loewe", product: "Small Basket Bag", shade: "Natural/Tan", price: 590, swatch: "#D8CDB8", onSkinSwatch: "#CCC0A8" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Flower Locket Necklace", shade: "Gold", price: 14, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      value: { brand: "Catbird", product: "Threadbare Chain Necklace", shade: "14k Gold", price: 134, swatch: "#D4A847", onSkinSwatch: "#C89B3C" },
      splurge: { brand: "Monica Vinader", product: "Locket Pendant", shade: "18k Gold Vermeil", price: 225, swatch: "#DAB04D", onSkinSwatch: "#CDA342" },
    },
    fragrance: {
      budget: { brand: "Burt's Bees", product: "Garden Tomato Toner", shade: "Original", price: 13, swatch: "#A0B090", onSkinSwatch: "#90A080" },
      value: { brand: "Jo Malone", product: "English Pear & Freesia", shade: "30ml", price: 76, swatch: "#C8D0A0", onSkinSwatch: "#B8C090" },
      splurge: { brand: "Diptyque", product: "Eau Rose", shade: "75ml", price: 160, swatch: "#E8B0B0", onSkinSwatch: "#D8A0A0" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Satin Hair Ribbon Set", shade: "Cream/Sage/Pink", price: 8, swatch: "#D4C0B0", onSkinSwatch: "#C8B4A0" },
      value: { brand: "Anthropologie", product: "Woven Apron", shade: "Gingham", price: 48, swatch: "#A0B090", onSkinSwatch: "#90A080" },
      splurge: { brand: "Le Labo", product: "Rose 31 Candle", shade: "Classic", price: 82, swatch: "#E8B0B0", onSkinSwatch: "#D8A0A0" },
    },
  },
  CQ: {
    top: {
      budget: { brand: "Shein", product: "Bow Front Satin Camisole", shade: "Pink", price: 12, swatch: "#F5C0D0", onSkinSwatch: "#E8B0C0" },
      value: { brand: "Reformation", product: "Olina Top", shade: "Blush", price: 98, swatch: "#F0C8D0", onSkinSwatch: "#E5B8C0" },
      splurge: { brand: "Rouje", product: "Wanda Top", shade: "Rose", price: 155, swatch: "#E8A0B8", onSkinSwatch: "#D890A8" },
    },
    bottom: {
      budget: { brand: "H&M", product: "Pleated Mini Skirt", shade: "Cream", price: 25, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      value: { brand: "Reformation", product: "Hanna Pleated Skirt", shade: "Blush", price: 148, swatch: "#F0C8D0", onSkinSwatch: "#E5B8C0" },
      splurge: { brand: "Miu Miu", product: "Pleated Mini Skirt", shade: "Pink", price: 980, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
    },
    layer: {
      budget: { brand: "Target", product: "Cropped Cardigan", shade: "Cherry Red", price: 25, swatch: "#C82536", onSkinSwatch: "#B81A2B" },
      value: { brand: "& Other Stories", product: "Bow-Detail Cardigan", shade: "Baby Pink", price: 79, swatch: "#F5D0D8", onSkinSwatch: "#E8C0C8" },
      splurge: { brand: "LoveShackFancy", product: "Eliya Cardigan", shade: "Rose Petal", price: 295, swatch: "#E8A0B8", onSkinSwatch: "#D890A8" },
    },
    shoes: {
      budget: { brand: "Amazon", product: "Bow Ballet Flats", shade: "Pink Patent", price: 30, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
      value: { brand: "Sam Edelman", product: "Felicia Ballet Flat", shade: "Pink Confetti", price: 130, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
      splurge: { brand: "Repetto", product: "Cendrillon Ballerina", shade: "Icone Pink", price: 345, swatch: "#E8A0B0", onSkinSwatch: "#D890A0" },
    },
    bag: {
      budget: { brand: "Amazon", product: "Bow Detail Crossbody", shade: "Pink", price: 22, swatch: "#F5C0D0", onSkinSwatch: "#E8B0C0" },
      value: { brand: "Loeffler Randall", product: "Rayne Bow Bag", shade: "Blush", price: 295, swatch: "#F0C8D0", onSkinSwatch: "#E5B8C0" },
      splurge: { brand: "Mansur Gavriel", product: "Mini Cloud Clutch", shade: "Blush", price: 495, swatch: "#F5D0D8", onSkinSwatch: "#E8C0C8" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Layered Pearl Necklace", shade: "White/Gold", price: 15, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      value: { brand: "Mejuri", product: "Bold Pearl Ring", shade: "14k Gold", price: 128, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      splurge: { brand: "Vivienne Westwood", product: "Bas Relief Orb Necklace", shade: "Silver/Pearl", price: 220, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
    },
    fragrance: {
      budget: { brand: "Body Fantasies", product: "Pink Sweet Pea", shade: "Original", price: 6, swatch: "#F5C0D0", onSkinSwatch: "#E8B0C0" },
      value: { brand: "Marc Jacobs", product: "Daisy Eau So Fresh", shade: "75ml", price: 70, swatch: "#F0D0D8", onSkinSwatch: "#E5C0C8" },
      splurge: { brand: "Chanel", product: "Chance Eau Tendre", shade: "100ml", price: 160, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Bow Hair Clip Set", shade: "Pink/Cream/Red", price: 10, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
      value: { brand: "Lelet NY", product: "Satin Bow Barrette", shade: "Ballet Pink", price: 68, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
      splurge: { brand: "Jennifer Behr", product: "Bow Silk Headband", shade: "Petal Pink", price: 198, swatch: "#E8A0B8", onSkinSwatch: "#D890A8" },
    },
  },
  Y2K: {
    top: {
      budget: { brand: "Shein", product: "Metallic Halter Top", shade: "Silver", price: 10, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Urban Outfitters", product: "Out From Under Tube Top", shade: "Metallic Silver", price: 34, swatch: "#C8C8D0", onSkinSwatch: "#B8B8C0" },
      splurge: { brand: "Poster Girl", product: "Crystal Chainmail Top", shade: "Silver", price: 295, swatch: "#D0D0E0", onSkinSwatch: "#C0C0D0" },
    },
    bottom: {
      budget: { brand: "Abercrombie", product: "Low Rise Baggy Jean", shade: "Light Wash", price: 90, swatch: "#A8BDD0", onSkinSwatch: "#96AAC0" },
      value: { brand: "Agolde", product: "Fold Waistband Jean", shade: "Sway", price: 198, swatch: "#B0C0D0", onSkinSwatch: "#A0B0C0" },
      splurge: { brand: "Miaou", product: "Echo Low Rise Jean", shade: "Light Indigo", price: 275, swatch: "#8BA8C8", onSkinSwatch: "#7B98B8" },
    },
    layer: {
      budget: { brand: "Amazon", product: "Y2K Cropped Track Jacket", shade: "Pink/White", price: 25, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
      value: { brand: "Juicy Couture", product: "OG Bling Hoodie", shade: "Hot Pink", price: 128, swatch: "#FF69B4", onSkinSwatch: "#E85CA0" },
      splurge: { brand: "Balenciaga", product: "Cropped Track Jacket", shade: "Pink", price: 1250, swatch: "#F5A0B8", onSkinSwatch: "#E890A8" },
    },
    shoes: {
      budget: { brand: "Steve Madden", product: "Slinky Platform Sandal", shade: "Silver", price: 70, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Naked Wolfe", product: "Spice Platform", shade: "White", price: 260, swatch: "#F5F5F5", onSkinSwatch: "#E8E8E8" },
      splurge: { brand: "Versace", product: "Platform Mules", shade: "Silver", price: 995, swatch: "#C8C8D0", onSkinSwatch: "#B8B8C0" },
    },
    bag: {
      budget: { brand: "Amazon", product: "Mini Shoulder Bag", shade: "Metallic Silver", price: 18, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Coach", product: "Swinger Bag (vintage)", shade: "Lavender", price: 95, swatch: "#C8B0D0", onSkinSwatch: "#B8A0C0" },
      splurge: { brand: "Fendi", product: "Baguette", shade: "Silver Sequin", price: 3690, swatch: "#D0D0E0", onSkinSwatch: "#C0C0D0" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Y2K Choker + Hoop Set", shade: "Silver", price: 12, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Jenny Bird", product: "Mega U-Link", shade: "Silver", price: 98, swatch: "#C8C8D0", onSkinSwatch: "#B8B8C0" },
      splurge: { brand: "Justine Clenquet", product: "Pixie Choker", shade: "Palladium", price: 155, swatch: "#D0D0D8", onSkinSwatch: "#C0C0C8" },
    },
    fragrance: {
      budget: { brand: "Aquolina", product: "Pink Sugar", shade: "Original", price: 22, swatch: "#F5B0C0", onSkinSwatch: "#E8A0B0" },
      value: { brand: "Juicy Couture", product: "Viva La Juicy", shade: "100ml", price: 62, swatch: "#F0A0B0", onSkinSwatch: "#E890A0" },
      splurge: { brand: "Prada", product: "Candy", shade: "50ml", price: 115, swatch: "#E8A0C0", onSkinSwatch: "#D890B0" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Butterfly Clip Set (90pc)", shade: "Multicolor", price: 8, swatch: "#D0B0E0", onSkinSwatch: "#C0A0D0" },
      value: { brand: "Urban Outfitters", product: "Rhinestone Hair Clips", shade: "Crystal", price: 18, swatch: "#E0E0F0", onSkinSwatch: "#D0D0E0" },
      splurge: { brand: "Lelet NY", product: "Crystal Butterfly Set", shade: "Crystal/Silver", price: 148, swatch: "#D0D0E8", onSkinSwatch: "#C0C0D8" },
    },
  },
  BC: {
    top: {
      budget: { brand: "Amazon", product: "Wrap Front Ballet Top", shade: "Ballet Pink", price: 22, swatch: "#F5C0C8", onSkinSwatch: "#E8B0B8" },
      value: { brand: "Capezio", product: "Long Sleeve Wrap Top", shade: "Petal Pink", price: 42, swatch: "#F0B8C0", onSkinSwatch: "#E5A8B0" },
      splurge: { brand: "Khaite", product: "Tate Wrap Top", shade: "Blush", price: 480, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
    },
    bottom: {
      budget: { brand: "Amazon", product: "Tulle Midi Skirt", shade: "Dusty Pink", price: 28, swatch: "#E8B0B8", onSkinSwatch: "#D8A0A8" },
      value: { brand: "Urban Outfitters", product: "Tulle Midi Skirt", shade: "Ballet", price: 79, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
      splurge: { brand: "Simone Rocha", product: "Tulle Midi Skirt", shade: "Rose", price: 695, swatch: "#E8A0B0", onSkinSwatch: "#D890A0" },
    },
    layer: {
      budget: { brand: "Amazon", product: "Wrap Cardigan", shade: "Dusty Pink", price: 28, swatch: "#E8B0B8", onSkinSwatch: "#D8A0A8" },
      value: { brand: "Free People", product: "Luna Wrap Cardigan", shade: "Ballet Slipper", price: 88, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
      splurge: { brand: "Vince", product: "Cashmere Wrap Cardigan", shade: "Rose Quartz", price: 325, swatch: "#E8A8B0", onSkinSwatch: "#D898A0" },
    },
    shoes: {
      budget: { brand: "Amazon", product: "Ribbon Tie Ballet Flat", shade: "Blush Satin", price: 25, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
      value: { brand: "Repetto", product: "Cendrillon Ballerina", shade: "Pink", price: 345, swatch: "#E8A0B0", onSkinSwatch: "#D890A0" },
      splurge: { brand: "Gianvito Rossi", product: "Ribbon Tie Ballet Flat", shade: "Praline", price: 750, swatch: "#D0B0A0", onSkinSwatch: "#C0A090" },
    },
    bag: {
      budget: { brand: "Amazon", product: "Small Satin Clutch", shade: "Pink", price: 18, swatch: "#F5C0D0", onSkinSwatch: "#E8B0C0" },
      value: { brand: "Staud", product: "Tommy Bag", shade: "Petal", price: 295, swatch: "#F0B8C0", onSkinSwatch: "#E5A8B0" },
      splurge: { brand: "The Row", product: "N/S Park Tote Small", shade: "Blush", price: 1590, swatch: "#F0C0C8", onSkinSwatch: "#E5B0B8" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Pearl Bobby Pin Set", shade: "Gold/Pearl", price: 10, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
      value: { brand: "Lelet NY", product: "Pearl Bobby Pin Pair", shade: "Gold/Pearl", price: 48, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      splurge: { brand: "Jennifer Behr", product: "Petite Pearl Bobby Pin Set", shade: "Gold/Pearl", price: 148, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
    },
    fragrance: {
      budget: { brand: "Clean Reserve", product: "Radiant Nectar", shade: "Original", price: 44, swatch: "#F5D0D8", onSkinSwatch: "#E8C0C8" },
      value: { brand: "Chloé", product: "Eau de Parfum", shade: "50ml", price: 95, swatch: "#F0D0D8", onSkinSwatch: "#E5C0C8" },
      splurge: { brand: "Maison Francis Kurkdjian", product: "À la rose", shade: "70ml", price: 265, swatch: "#E8B0C0", onSkinSwatch: "#D8A0B0" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Satin Hair Ribbon", shade: "Ballet Pink", price: 6, swatch: "#F5C0C8", onSkinSwatch: "#E8B0B8" },
      value: { brand: "Slip", product: "Pure Silk Ribbon", shade: "Pink", price: 39, swatch: "#F0B8C0", onSkinSwatch: "#E5A8B0" },
      splurge: { brand: "Jennifer Behr", product: "Satin Bow", shade: "Blush", price: 128, swatch: "#E8A0B8", onSkinSwatch: "#D890A8" },
    },
  },
  SM: {
    top: {
      budget: { brand: "Uniqlo", product: "Extra Fine Merino Turtleneck", shade: "Black", price: 40, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "COS", product: "Slim-Fit Turtleneck", shade: "Black", price: 79, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Totême", product: "Turtleneck Knit", shade: "Black", price: 350, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    bottom: {
      budget: { brand: "H&M", product: "Wide-Leg Wool Trouser", shade: "Charcoal", price: 45, swatch: "#4A4A4A", onSkinSwatch: "#3D3D3D" },
      value: { brand: "COS", product: "Wide-Leg Wool Trouser", shade: "Dark Grey", price: 135, swatch: "#3D3D3D", onSkinSwatch: "#303030" },
      splurge: { brand: "Totême", product: "Pleated Suit Trouser", shade: "Grey Melange", price: 390, swatch: "#505050", onSkinSwatch: "#434343" },
    },
    layer: {
      budget: { brand: "H&M", product: "Wool-Blend Coat", shade: "Camel", price: 100, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
      value: { brand: "COS", product: "Double-Faced Wool Coat", shade: "Black", price: 350, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Max Mara", product: "Madame Coat", shade: "Camel", price: 3990, swatch: "#C5A880", onSkinSwatch: "#B89A72" },
    },
    shoes: {
      budget: { brand: "H&M", product: "Leather Chelsea Boots", shade: "Black", price: 50, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "Vagabond", product: "Ansie Chelsea Boot", shade: "Black Leather", price: 180, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "The Row", product: "Grunge Boot", shade: "Black", price: 1390, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    bag: {
      budget: { brand: "COS", product: "Folded Leather Bag", shade: "Black", price: 89, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "Mansur Gavriel", product: "Everyday Soft Tote", shade: "Black", price: 395, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "The Row", product: "N/S Park Tote", shade: "Black", price: 1790, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    jewelry: {
      budget: { brand: "COS", product: "Geometric Drop Earring", shade: "Silver", price: 29, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Georg Jensen", product: "Offspring Ring", shade: "Sterling Silver", price: 150, swatch: "#C8C8C8", onSkinSwatch: "#B8B8B8" },
      splurge: { brand: "Sophie Buhai", product: "Large Ear Cuff", shade: "Sterling Silver", price: 365, swatch: "#D0D0D0", onSkinSwatch: "#C0C0C0" },
    },
    fragrance: {
      budget: { brand: "Clean Reserve", product: "Sueded Oud", shade: "Original", price: 44, swatch: "#8B7355", onSkinSwatch: "#7E6648" },
      value: { brand: "Byredo", product: "Gypsy Water", shade: "50ml", price: 195, swatch: "#C5B69A", onSkinSwatch: "#B8A88C" },
      splurge: { brand: "Le Labo", product: "Santal 33", shade: "50ml", price: 197, swatch: "#A08060", onSkinSwatch: "#907050" },
    },
    finishing: {
      budget: { brand: "Amazon", product: "Matte Lip Balm", shade: "Clear", price: 8, swatch: "#E8DDD0", onSkinSwatch: "#DDD0C0" },
      value: { brand: "Merit", product: "Great Skin Instant Glow Serum", shade: "Original", price: 38, swatch: "#F0E8D8", onSkinSwatch: "#E5DBC8" },
      splurge: { brand: "Victoria Beckham Beauty", product: "Cell Rejuvenating Primer", shade: "Original", price: 58, swatch: "#F5EDE0", onSkinSwatch: "#E8DFD0" },
    },
  },
  IS: {
    top: {
      budget: { brand: "Goodwill Find", product: "Vintage Band Tee", shade: "Faded Black", price: 8, swatch: "#2A2A2A", onSkinSwatch: "#1D1D1D" },
      value: { brand: "Reformation", product: "Classic Crew Tee", shade: "Washed Black", price: 48, swatch: "#3A3A3A", onSkinSwatch: "#2D2D2D" },
      splurge: { brand: "R13", product: "Boy Tee", shade: "Acid Wash Black", price: 195, swatch: "#4A4A4A", onSkinSwatch: "#3D3D3D" },
    },
    bottom: {
      budget: { brand: "Levi's", product: "501 Original Jeans", shade: "Black", price: 98, swatch: "#1A1A1A", onSkinSwatch: "#0D0D0D" },
      value: { brand: "Agolde", product: "Riley Straight Leg", shade: "Panoramic (washed black)", price: 198, swatch: "#3A3A3A", onSkinSwatch: "#2D2D2D" },
      splurge: { brand: "Saint Laurent", product: "Slim-Fit Jean", shade: "Used Black", price: 690, swatch: "#2A2A2A", onSkinSwatch: "#1D1D1D" },
    },
    layer: {
      budget: { brand: "Zara", product: "Faux Leather Biker Jacket", shade: "Black", price: 70, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "AllSaints", product: "Balfern Leather Biker", shade: "Black", price: 499, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Acne Studios", product: "Mock Leather Jacket", shade: "Black", price: 2100, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    shoes: {
      budget: { brand: "Converse", product: "Chuck Taylor All Star", shade: "Black", price: 65, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "Dr. Martens", product: "1460 Boot", shade: "Black Smooth", price: 180, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "The Kooples", product: "Leather Ankle Boot", shade: "Black", price: 495, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    bag: {
      budget: { brand: "Amazon", product: "Canvas Crossbody Bag", shade: "Black", price: 22, swatch: "#1A1A1A", onSkinSwatch: "#0D0D0D" },
      value: { brand: "Madewell", product: "The Transport Crossbody", shade: "True Black", price: 148, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Saint Laurent", product: "Lou Camera Bag", shade: "Black", price: 1350, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    jewelry: {
      budget: { brand: "Amazon", product: "Silver Ring Stack Set", shade: "Sterling Silver", price: 14, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Vitaly", product: "Kusari Chain Necklace", shade: "Stainless Steel", price: 80, swatch: "#B0B0B0", onSkinSwatch: "#A0A0A0" },
      splurge: { brand: "Maison Margiela", product: "Silver Ring Set", shade: "Sterling Silver", price: 345, swatch: "#C8C8C8", onSkinSwatch: "#B8B8B8" },
    },
    fragrance: {
      budget: { brand: "Commodity", product: "Book", shade: "10ml", price: 28, swatch: "#6B4E3D", onSkinSwatch: "#5E4130" },
      value: { brand: "D.S. & Durga", product: "I Don't Know What", shade: "50ml", price: 120, swatch: "#5A4A3A", onSkinSwatch: "#4D3D2D" },
      splurge: { brand: "Tom Ford", product: "Oud Wood", shade: "50ml", price: 280, swatch: "#3D2B1F", onSkinSwatch: "#2E1E14" },
    },
    finishing: {
      budget: { brand: "NYX", product: "Epic Ink Liner", shade: "Black", price: 9, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "MAC", product: "Ruby Woo Lipstick", shade: "Ruby Woo", price: 23, swatch: "#B82030", onSkinSwatch: "#A81828" },
      splurge: { brand: "Pat McGrath", product: "ELSON Lip", shade: "Elson", price: 40, swatch: "#C82030", onSkinSwatch: "#B81828" },
    },
  },
  TL: {
    top: {
      budget: { brand: "Uniqlo (Men's)", product: "Oxford Button-Down", shade: "White", price: 30, swatch: "#FFFFFF", onSkinSwatch: "#F5F0E8" },
      value: { brand: "COS", product: "Oversized Poplin Shirt", shade: "White", price: 89, swatch: "#FAFAFA", onSkinSwatch: "#EDEDED" },
      splurge: { brand: "The Row", product: "Big Sisea Shirt", shade: "White", price: 590, swatch: "#FFFEFA", onSkinSwatch: "#F5F0E8" },
    },
    bottom: {
      budget: { brand: "Abercrombie", product: "Sloane Tailored Pant", shade: "Charcoal", price: 90, swatch: "#4A4A4A", onSkinSwatch: "#3D3D3D" },
      value: { brand: "Reformation", product: "Mason Pant", shade: "Navy", price: 178, swatch: "#1A2744", onSkinSwatch: "#0D1A36" },
      splurge: { brand: "Stella McCartney", product: "Tailored Wide-Leg", shade: "Charcoal", price: 895, swatch: "#3D3D3D", onSkinSwatch: "#303030" },
    },
    layer: {
      budget: { brand: "Zara", product: "Double-Breasted Blazer", shade: "Charcoal", price: 90, swatch: "#3D3D3D", onSkinSwatch: "#303030" },
      value: { brand: "Anine Bing", product: "Kaia Blazer", shade: "Black", price: 450, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "The Row", product: "Viper Blazer", shade: "Navy", price: 2990, swatch: "#1A2744", onSkinSwatch: "#0D1A36" },
    },
    shoes: {
      budget: { brand: "Sam Edelman", product: "Loraine Loafer", shade: "Black Leather", price: 150, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "G.H. Bass", product: "Whitney Weejun", shade: "Black", price: 175, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Church's", product: "Shannon Oxford", shade: "Black Polished", price: 640, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    bag: {
      budget: { brand: "Mango", product: "Structured Briefcase Bag", shade: "Black", price: 60, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      value: { brand: "Cuyana", product: "Oversized Carryall", shade: "Black", price: 278, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
      splurge: { brand: "Valextra", product: "Iside Mini", shade: "Black", price: 3400, swatch: "#0D0D0D", onSkinSwatch: "#1A1A1A" },
    },
    jewelry: {
      budget: { brand: "Casio", product: "Classic Digital Watch", shade: "Silver", price: 25, swatch: "#C0C0C0", onSkinSwatch: "#B0B0B0" },
      value: { brand: "Daniel Wellington", product: "Iconic Link Watch", shade: "Silver", price: 189, swatch: "#C8C8C8", onSkinSwatch: "#B8B8B8" },
      splurge: { brand: "Cartier", product: "Tank Must", shade: "Steel", price: 3100, swatch: "#D0D0D0", onSkinSwatch: "#C0C0C0" },
    },
    fragrance: {
      budget: { brand: "Clean Reserve", product: "Skin", shade: "Original", price: 44, swatch: "#E8DDD0", onSkinSwatch: "#DDD0C0" },
      value: { brand: "Le Labo", product: "Santal 33", shade: "50ml", price: 197, swatch: "#A08060", onSkinSwatch: "#907050" },
      splurge: { brand: "Byredo", product: "Gypsy Water", shade: "50ml", price: 195, swatch: "#C5B69A", onSkinSwatch: "#B8A88C" },
    },
    finishing: {
      budget: { brand: "Maybelline", product: "SuperStay Matte Ink", shade: "Pioneer (deep red)", price: 10, swatch: "#8B2030", onSkinSwatch: "#7A1828" },
      value: { brand: "MAC", product: "Matte Lipstick", shade: "Diva", price: 23, swatch: "#6B1020", onSkinSwatch: "#5E0818" },
      splurge: { brand: "Tom Ford", product: "Lip Color", shade: "Scarlet Rouge", price: 58, swatch: "#B82030", onSkinSwatch: "#A81828" },
    },
  },
};



export function getVibeProducts(archetypeCode) {
  return vibeProducts[archetypeCode] || vibeProducts.CG;
}