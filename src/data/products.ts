import type { Product } from '../types/index.ts';

/**
 * =========================================================================
 * PRODUCTS CATALOGUE DATA
 * =========================================================================
 * All product information is central, transparent, and easy to edit.
 * In accordance with business rules:
 * - Prices are explicitly marked as "Price on Enquiry"
 * - No fake ratings, false discounts, or fictitious stock numbers
 * - High-definition visual assets with clear replaceable tags
 */

export const productsData: Product[] = [
  {
    id: 'prod-11-plates',
    name: '11 Plates Ceremonial Seer Ensemble',
    slug: '11-plates-ceremonial-seer-ensemble',
    category: 'wedding-seer',
    categoryName: 'Wedding Seer',
    occasions: ['wedding', 'engagement'],
    shortDescription:
      'Curated set of 11 matching handcrafted seer plates with floral, pearl, and gold brocade borders for South Indian wedding rituals.',
    fullDescription:
      'An auspicious and visually breathtaking collection of 11 coordinated ceremonial plates meticulously styled by Manha’z Hampers. Designed for traditional Tamil wedding seer rituals, each plate is individually hand-decorated with premium dupion silk base, intricate gota lace, faux pearls, and fresh or silk floral garlands. Ideal for arranging sweets, dry fruits, coconuts, bridal jewelry, garlands, and ritual offerings in perfect chromatic harmony.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    isWeddingCollection: true,
    craftsmanshipNotes: [
      'Set of 11 custom-coordinated heavy-base wooden or metal trays',
      'Hand-applied brocade fabrics, mirror-work borders, and pearl clusters',
      'Can be customized to match your wedding saree or mandap color palette',
      'Protective food-grade liners provided for all edible arrangements',
    ],
    customizationConfig: {
      allowThemeSelection: true,
      allowDateSelection: true,
      allowBudgetSelection: true,
      customizationPlaceholder:
        'Specify your wedding theme color, mandap hues, or specific plate types needed (sweets, dry fruits, fruit baskets, garland plates)...',
    },
    tags: ['Wedding Seer', '11 Plates', 'Tamil Wedding', 'Aarathi Plate', 'Traditional'],
  },
  {
    id: 'prod-just-engaged',
    name: 'Just Engaged Romantic Celebration Hamper',
    slug: 'just-engaged-romantic-celebration-hamper',
    category: 'engagement-seer',
    categoryName: 'Engagement Seer',
    occasions: ['engagement', 'anniversary'],
    shortDescription:
      'A bespoke couple’s celebration trunk featuring customized acrylic plaque, artisan confections, and scented accents.',
    fullDescription:
      'A radiant engagement hamper crafted to celebrate new beginnings. Housed in an ivory laser-cut wooden chest or velvet hamper tray, this set includes a personalized "Just Engaged" commemorative plaque with the couple’s names and date, gourmet chocolates, soy-scented candle, luxury dry fruits, and delicate dried botanicals.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    isWeddingCollection: true,
    isPersonalizedCollection: true,
    craftsmanshipNotes: [
      'Personalized acrylic plaque with gold foil lettering',
      'Curated confectionery and aroma accents',
      'Finished with champagne silk ribbon and customized wax seal',
    ],
    customizationConfig: {
      allowRecipientName: true,
      allowThemeSelection: true,
      allowDateSelection: true,
      customizationPlaceholder:
        'Enter couple names, engagement date, and preferred color palette (e.g., Blush & Gold, Sage & Ivory)...',
    },
    tags: ['Engagement', 'Just Engaged', 'Couple Gift', 'Luxury Hamper'],
  },
  {
    id: 'prod-customized-name-wallet',
    name: 'Customized Name Wallet & Accessory Gift Set',
    slug: 'customized-name-wallet-accessory-set',
    category: 'personalized-gifts',
    categoryName: 'Personalized Gifts',
    occasions: ['birthday', 'anniversary', 'personalized-surprises'],
    shortDescription:
      'Premium vegan leather bi-fold wallet personalized with metallic laser-engraved name tag and matching keychain in a luxury gift box.',
    fullDescription:
      'A classic, sophisticated personal gift crafted for birthdays, groomsmen gifts, and anniversaries. Made with high-grade textured vegan leather, personalized with a precision-embossed name bar and custom metallic charm of choice. Packaged inside a satin-lined rigid presentation box with personalized greeting card.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    isPersonalizedCollection: true,
    craftsmanshipNotes: [
      'Durable matte or pebble-grain leatherette with precision stitching',
      'Non-tarnish metal nameplate with engraved custom spelling',
      'Multiple slots for cards, bills, and coin pocket',
      'Gift-boxed with decorative tissue and ribbon tie',
    ],
    customizationConfig: {
      allowRecipientName: true,
      allowThemeSelection: true,
      customizationPlaceholder:
        'Provide the exact name to engrave (all caps or sentence case) and preferred wallet color (Tan, Classic Black, Coffee Brown, Navy)...',
    },
    tags: ['Name Wallet', 'Personalized', 'Men Gifting', 'Leatherette'],
  },
  {
    id: 'prod-wedding-seer-tray',
    name: 'Royal Brocade Wedding Seer Tray',
    slug: 'royal-brocade-wedding-seer-tray',
    category: 'wedding-seer',
    categoryName: 'Wedding Seer',
    occasions: ['wedding'],
    shortDescription:
      'Handcrafted wooden seer tray wrapped in rich Banarasi fabric, adorned with gold filigree and crystal studs.',
    fullDescription:
      'Designed to elevate ceremonial gift-giving at weddings. Each tray is constructed from sturdy seasoned wood, padded and wrapped in rich floral or geometric Banarasi brocade fabric. The edges are finished with hand-stitched zardozi borders and pearl beading. Perfect for presenting bridal sarees, groom suits, or traditional dry fruit arrangements.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    isWeddingCollection: true,
    craftsmanshipNotes: [
      'Premium Banarasi silk fabric in royal red, mustard, emerald, or ivory',
      'Sturdy wooden base capable of supporting up to 5 kg of sweets or gifts',
      'Optional protective transparent dust cover available upon request',
    ],
    customizationConfig: {
      allowQuantity: true,
      allowThemeSelection: true,
      customizationPlaceholder:
        'State quantity required, dimensions or intended items to display (saree, coconut, jewels), and fabric tone...',
    },
    tags: ['Seer Tray', 'Brocade', 'Wedding Tray', 'Trousseau'],
  },
  {
    id: 'prod-flower-bouquet',
    name: 'Artisanal Pastel Flower Bouquet',
    slug: 'artisanal-pastel-flower-bouquet',
    category: 'flower-bouquets',
    categoryName: 'Flower Bouquets',
    occasions: ['birthday', 'anniversary', 'wedding', 'personalized-surprises'],
    shortDescription:
      'Hand-arranged botanical bouquet featuring fresh or preserved pastel roses, hydrangeas, and gypsophila wrapped in matte Korean film.',
    fullDescription:
      'A poetic floral creation that radiates elegance. Carefully curated stems of premium roses, delicate baby’s breath (gypsophila), and textural greenery wrapped in waterproof dual-tone Korean wrapping sheets with layered silk ribbons. Available in fresh cut florals for Salem hand deliveries or long-lasting preserved botanicals upon request.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    craftsmanshipNotes: [
      'Freshly arranged on the day of delivery or ceremonial event',
      'Moisture-lock hydration stem wrap ensures freshness',
      'Includes handwritten calligraphy message card',
    ],
    customizationConfig: {
      allowRecipientName: true,
      allowThemeSelection: true,
      allowDateSelection: true,
      customizationPlaceholder:
        'Preferred flower colors (Soft Pink, Peach, Classic Red, White & Lavender) and card message...',
    },
    tags: ['Flower Bouquet', 'Floral', 'Fresh Roses', 'Celebration'],
  },
  {
    id: 'prod-chocolate-bouquet',
    name: 'Customized Ferrero & Truffle Chocolate Bouquet',
    slug: 'customized-ferrero-truffle-chocolate-bouquet',
    category: 'chocolate-bouquets',
    categoryName: 'Customized Chocolate Bouquets',
    occasions: ['birthday', 'anniversary', 'personalized-surprises', 'festivals'],
    shortDescription:
      'Stunning bouquet composed of gold-wrapped hazelnut truffles and luxury chocolates styled as blooming flowers.',
    fullDescription:
      'The ultimate indulgence that combines the visual romance of a flower bouquet with the delicious pleasure of premium chocolates. Each confection is mounted on artisanal stems, nested within textured tissue petals, and assembled into a lush handheld display finished with champagne gold ribbons and fairy twinkle lights upon request.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    isPersonalizedCollection: true,
    craftsmanshipNotes: [
      '100% genuine sealed branded chocolates (Ferrero Rocher, Lindt, or custom brand)',
      'Hygienically mounted without puncturing confectionery wrappers',
      'Sturdy structural base that stands upright for display',
    ],
    customizationConfig: {
      allowThemeSelection: true,
      allowBudgetSelection: true,
      customizationPlaceholder:
        'Specify preferred chocolate brand (Ferrero Rocher, Dairy Milk Silk, KitKat, etc.) and bouquet wrapping color...',
    },
    tags: ['Chocolate Bouquet', 'Ferrero Rocher', 'Sweet Gift', 'Handcrafted'],
  },
  {
    id: 'prod-chocolate-tower',
    name: 'Grand Celebration Chocolate Tower',
    slug: 'grand-celebration-chocolate-tower',
    category: 'chocolate-towers',
    categoryName: 'Chocolate Towers',
    occasions: ['birthday', 'wedding', 'anniversary', 'festivals'],
    shortDescription:
      'Multi-tiered architectural chocolate spectacle decorated with silk blooms, crystal toppers, and celebratory signage.',
    fullDescription:
      'A true centerpiece creation designed to captivate guests at birthdays, receptions, and festive gatherings. Built across 3 or 4 graduated circular tiers, this tower holds dozens of individually wrapped luxury chocolates interspersed with fresh floral sprigs or gold ribbon florets. Crowned with a customized acrylic topper or monogram.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    craftsmanshipNotes: [
      'Reinforced food-grade acrylic or wooden tiered tiers',
      'Custom topper with birthday age, couple name, or congratulations banner',
      'Delivered fully assembled and secured with protective cellophane dome',
    ],
    customizationConfig: {
      allowThemeSelection: true,
      allowDateSelection: true,
      allowBudgetSelection: true,
      customizationPlaceholder:
        'Tell us the occasion, approximate number of guests or chocolate count, and acrylic topper text...',
    },
    tags: ['Chocolate Tower', 'Centerpiece', 'Birthday', 'Luxury Confectionery'],
  },
  {
    id: 'prod-bridal-trousseau-trunk',
    name: 'Couture Velvet Bridal Trousseau Trunk',
    slug: 'couture-velvet-bridal-trousseau-trunk',
    category: 'trousseau-packing',
    categoryName: 'Trousseau Packing',
    occasions: ['wedding'],
    shortDescription:
      'Luxurious velvet-lined bridal trousseau trunk with custom gold brass latch, transparent viewing lid, and floral corsage.',
    fullDescription:
      'Elevate bridal saree and wardrobe packing with our couture trousseau chests. Hand-crafted using solid wood structure upholstered in rich velvet, featuring a crystal-clear acrylic lid to showcase exquisite Kanjivaram silk sarees, lehengas, or groom sherwanis while shielding them from dust. Finished with a lush floral corsage and personalized monogram tag.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    isWeddingCollection: true,
    craftsmanshipNotes: [
      'Available in wine burgundy, emerald green, royal navy, and blush pink velvet',
      'Scratch-resistant high-transparency acrylic display window',
      'Brass antique corner braces and lockable clasp',
    ],
    customizationConfig: {
      allowThemeSelection: true,
      allowRecipientName: true,
      customizationPlaceholder:
        'Dimensions needed, number of sarees/outfits to pack, and preferred velvet color...',
    },
    tags: ['Trousseau', 'Bridal Trunk', 'Saree Packing', 'Wedding Luxury'],
  },
  {
    id: 'prod-traditional-plate-decor',
    name: 'Artisanal Kundan & Floral Plate Decor Set',
    slug: 'artisanal-kundan-floral-plate-decor-set',
    category: 'plate-decor',
    categoryName: 'Plate Decor',
    occasions: ['wedding', 'engagement', 'festivals'],
    shortDescription:
      'Hand-embellished ceremonial aarathi and welcome plates decorated with kundan stones, mirrors, and botanical patterns.',
    fullDescription:
      'Exquisite plate decor designed to infuse sacred rituals with artisanal beauty. Each plate undergoes detailed handcrafting using gold lace borders, real mirror elements, kundan gemstone inlays, and vibrant fabric petals. Suitable for Aarathi, coconut presentation, and deity offerings in traditional functions.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    craftsmanshipNotes: [
      'Hand-crafted by experienced plate decor artisans in Salem',
      'Wipe-clean base plate for convenient handling and reuse',
      'Available as single statement pieces or coordinated ceremony sets',
    ],
    customizationConfig: {
      allowQuantity: true,
      allowThemeSelection: true,
      customizationPlaceholder:
        'Plate count, event date, and specific ceremony purpose (Aarathi, Tamboolam, Ring Platter)...',
    },
    tags: ['Plate Decor', 'Aarathi', 'Kundan', 'Traditional Art'],
  },
  {
    id: 'prod-baby-shower-hamper',
    name: 'Welcome Little One Pastel Keepsake Hamper',
    slug: 'welcome-little-one-pastel-keepsake-hamper',
    category: 'customized-hampers',
    categoryName: 'Customized Hampers',
    occasions: ['baby-shower', 'personalized-surprises'],
    shortDescription:
      'Adorable woven nursery basket styled with organic cotton essentials, customized milestone card, soft plushie, and gentle treats for mum.',
    fullDescription:
      'A heartfelt celebration of new life. Nestled in a handwoven white willow or cotton-rope basket with soft pastel ribbons, this hamper combines organic baby swaddles, personalized wooden name plaque, baby milestone discs, herbal care for the new mother, and gourmet macaron treats.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    isPersonalizedCollection: true,
    craftsmanshipNotes: [
      'Baby-safe, toxin-free materials throughout',
      'Laser-carved wooden birth plaque or "Welcome Baby" motif',
      'Lined with breathable organic cotton fabric',
    ],
    customizationConfig: {
      allowRecipientName: true,
      allowThemeSelection: true,
      customizationPlaceholder:
        'Baby name or "Baby of [Parent Name]", gender theme (Pastel Blue, Blush Pink, Gender-Neutral Sage/Cream)...',
    },
    tags: ['Baby Shower', 'Newborn Gift', 'Keepsake Hamper', 'Nursery Basket'],
  },
  {
    id: 'prod-return-gift-boxes',
    name: 'Artisanal Potli & Brass Return Gift Ensemble',
    slug: 'artisanal-potli-brass-return-gift-ensemble',
    category: 'return-gifts',
    categoryName: 'Return Gifts',
    occasions: ['return-gifts', 'wedding', 'festivals'],
    shortDescription:
      'Handcrafted silk potli pouches paired with traditional brass diya / treat boxes, customized with family monogram tags.',
    fullDescription:
      'Show genuine gratitude to wedding guests, housewarming attendees, or festive visitors. Each return gift parcel features an embroidered raw silk or brocade potli bag, coupled with a brass kumkum chimizh or organic treat box, finished with custom gold-stamped gratitude cards with host family names.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    craftsmanshipNotes: [
      'Bulk batch orders starting from 25 pieces up to 500+ pieces',
      'Custom gold foil printed gift tags with family names',
      'Pre-packed ready for instant ceremony distribution',
    ],
    customizationConfig: {
      allowQuantity: true,
      allowThemeSelection: true,
      allowBudgetSelection: true,
      customizationPlaceholder:
        'Enter approximate guest count, wedding date, and personalization text for the return tags...',
    },
    tags: ['Return Gifts', 'Potli Bags', 'Brass Favors', 'Wedding Favors'],
  },
  {
    id: 'prod-dryfruit-wooden-tray',
    name: 'Partitioned Teakwood & Brass Dry Fruit Platter',
    slug: 'partitioned-teakwood-brass-dryfruit-platter',
    category: 'wooden-trays-baskets',
    categoryName: 'Wooden Trays & Baskets',
    occasions: ['festivals', 'wedding', 'anniversary'],
    shortDescription:
      'Hand-polished sustainable wooden tray with 4 brass-lined compartments filled with premium roasted almonds, cashews, pistachios & raisins.',
    fullDescription:
      'A timeless symbol of Indian hospitality and warmth. Crafted from sustainable seasoned hardwood with hand-carved floral corners, this divided tray holds four generous airtight glass jars with brass lids, filled with hand-sorted Californian almonds, Goan cashews, Iranian pistachios, and Afghan raisins. Can be ordered filled or as empty artisanal platters for DIY seer arrangements.',
    priceDisplay: 'Price on Enquiry',
    isPriceOnEnquiry: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    craftsmanshipNotes: [
      'Solid wood with food-safe natural oil finish',
      'Brass handle accents for easy ceremonial carrying',
      'Re-usable heirloom platter for home living long after the celebration',
    ],
    customizationConfig: {
      allowQuantity: true,
      allowThemeSelection: true,
      customizationPlaceholder:
        'Do you require dry fruits included or empty display trays? Any laser engraving on the wood?...',
    },
    tags: ['Wooden Tray', 'Dry Fruits', 'Diwali Gift', 'Traditional Platter'],
  },
];
