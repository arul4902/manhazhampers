/**
 * =========================================================================
 * MANHA'Z HAMPERS — CHATBOT KNOWLEDGE BASE
 * =========================================================================
 * Verified, factual knowledge base covering customer gifting questions.
 * Grounded in real website data, studio policies, and Salem location facts.
 * Conforms strictly to business rules:
 * - Never invents prices or discounts (all custom items are "Price on Enquiry")
 * - Never promises unverified same-day delivery or inventory
 * - Directs official order confirmations and quotations to WhatsApp
 * =========================================================================
 */

import { siteConfig } from './siteConfig.ts';

export interface FAQEntry {
  id: string;
  category: 'products' | 'budget' | 'customization' | 'ordering' | 'delivery' | 'payments' | 'occasions' | 'support' | 'thanglish';
  questions: string[];
  keywords: string[];
  answer: string;
  suggestedActions?: {
    label: string;
    type: 'whatsapp' | 'category' | 'product' | 'flow' | 'reset';
    payload?: string;
  }[];
}

export const CHATBOT_KNOWLEDGE: FAQEntry[] = [
  // =========================================================================
  // A. PRODUCT DISCOVERY
  // =========================================================================
  {
    id: 'product-types-available',
    category: 'products',
    questions: [
      'What types of gifts do you make?',
      'What gifts are available?',
      'What do you sell?',
      'Can you tell me your gifting collections?',
      'Gift items list',
    ],
    keywords: ['types', 'gifts', 'available', 'sell', 'collections', 'items', 'options', 'catalogue'],
    answer:
      "At Manha’z Hampers & Plate Decor, we handcraft boutique customized gifts tailored to your celebration in Salem. Our offerings include:\n\n• **Customized Gift Hampers** (curated theme boxes & trunks)\n• **Wedding Seer Arrangements** (coordinated 11 & 21-plate sets)\n• **Plate Decor** (Aarathi, kundan, & floral ceremony trays)\n• **Engagement Seer Platters** (ring trays & acrylic trunks)\n• **Bridal Trousseau Packing** (velvet chests & saree wrapping)\n• **Personalized Keepsakes** (custom name wallets, plaques)\n• **Flower & Chocolate Bouquets** (fresh/silk florals & truffle towers)\n• **Return Gifts** (potli ensembles & brass utility sets)\n• **Wooden Trays & Baskets** (partitioned teakwood & dry fruit platters)",
    suggestedActions: [
      { label: 'Explore Wedding Seer', type: 'category', payload: 'wedding-seer' },
      { label: 'Personalized Gifts', type: 'category', payload: 'personalized-gifts' },
      { label: 'Help Me Choose a Gift', type: 'flow', payload: 'start_guided' },
    ],
  },
  {
    id: 'wedding-seer-info',
    category: 'products',
    questions: [
      'Tell me about wedding seer',
      'What is wedding seer arrangement?',
      'Do you do 11 plates or 21 plates?',
      'Wedding seer plates details',
    ],
    keywords: ['wedding seer', 'seer', '11 plates', '21 plates', 'seer plates', 'thamboolam', 'mandap'],
    answer:
      "Our **Ceremonial Wedding Seer** is our signature studio specialty in Salem! We create coordinated 11-plate and 21-plate seer ensembles for traditional Tamil weddings. Each tray is decorated with premium Banarasi brocade, dupion silk, gota lace, kundan, and coordinated florals. We can customize the fabrics and colors to match your bridal saree or mandap backdrop.",
    suggestedActions: [
      { label: 'View 11 Plates Ensemble', type: 'product', payload: '11-plates-ceremonial-seer-ensemble' },
      { label: 'Consult on WhatsApp', type: 'whatsapp', payload: 'Wedding Seer 11-Plate Enquiry' },
    ],
  },
  {
    id: 'flowers-and-chocolates',
    category: 'products',
    questions: [
      'Do you offer flower bouquets and chocolates?',
      'Can I get fresh flowers?',
      'Do you make chocolate bouquets?',
      'Are chocolates included?',
    ],
    keywords: ['flowers', 'chocolates', 'bouquet', 'chocolate tower', 'ferrero', 'roses', 'fresh flowers'],
    answer:
      "Yes! We create handcrafted **Pastel Flower Bouquets** (using fresh seasonal florals or long-lasting premium silk blooms) and luxury **Chocolate Bouquets & Towers** (featuring Ferrero Rocher, truffles, and custom confectioneries). You can also include flowers and chocolates inside any customized hamper.",
    suggestedActions: [
      { label: 'View Chocolate Bouquet', type: 'product', payload: 'customized-ferrero-truffle-chocolate-bouquet' },
      { label: 'View Flower Bouquet', type: 'product', payload: 'artisanal-pastel-flower-bouquet' },
    ],
  },
  {
    id: 'unique-gifts',
    category: 'products',
    questions: [
      'Can you suggest something unique?',
      'I want something different',
      'Gift for someone who has everything',
      'Special luxury gift idea',
    ],
    keywords: ['unique', 'different', 'special', 'has everything', 'luxury', 'creative', 'unusual'],
    answer:
      "For a truly memorable gift, we recommend our **Bespoke Keepsake Hampers** or **Custom Name Wallet & Accessory Set**. You can personalize initials, add a custom heartfelt letter, choose a theme like Royal Maroon & Champagne Gold, and hand-select artisan treats. Since every hamper is assembled by hand, no two gifts are ever identical!",
    suggestedActions: [
      { label: 'View Personalized Wallet Set', type: 'product', payload: 'customized-name-wallet-accessory-set' },
      { label: 'Create a Custom Gift', type: 'flow', payload: 'custom_gift' },
    ],
  },

  // =========================================================================
  // B. BUDGET & PRICING
  // =========================================================================
  {
    id: 'pricing-explanation',
    category: 'budget',
    questions: [
      'How much does a gift cost?',
      'Why is there no fixed price listed?',
      'Why does it say Price on Enquiry?',
      'What are your prices?',
      'How much does customization cost?',
    ],
    keywords: ['price', 'cost', 'rate', 'how much', 'enquiry', 'price on enquiry', 'charges', 'budget'],
    answer:
      "Every gift at Manha’z Hampers is bespoke! Our pricing depends on your specific selection: tray materials (acrylic, teakwood, velvet trunk), chocolate brands, fresh vs. silk florals, plate counts (e.g. 11 vs 21 plates), and name engravings. Listing **Price on Enquiry** ensures you receive an honest, transparent quotation tailored exactly to your preferred budget without hidden costs.",
    suggestedActions: [
      { label: 'Ask for Price on WhatsApp', type: 'whatsapp', payload: 'Quotation enquiry for gift hamper' },
      { label: 'Tell Me Your Budget', type: 'flow', payload: 'filter_budget' },
    ],
  },
  {
    id: 'budget-ranges-available',
    category: 'budget',
    questions: [
      'What gifts can I get under my budget?',
      'Gifts under ₹1000',
      'Gifts under ₹1500',
      'Gifts under ₹3000',
      'Gifts under ₹500',
      'Affordable gifts',
    ],
    keywords: ['under', 'budget', '1000', '1500', '2000', '3000', '500', 'cheap', 'affordable', 'low budget'],
    answer:
      "We accommodate diverse celebration budgets:\n\n• **₹800 – ₹1,500**: Personalized Name Wallets, Mini Confectionery Bouquets, Brass Potli Return Gifts\n• **₹1,500 – ₹3,000**: Curated Birthday Hampers, Ferrero Chocolate Bouquets, Kundan Plate Decor Sets\n• **₹3,000 – ₹5,000+**: Grand Celebration Chocolate Towers, Velvet Keepsake Trunks, Partitioned Teakwood Platters\n• **₹10,000+**: 11 & 21-Plate Ceremonial Wedding Seer Ensembles & Couture Bridal Trousseaux.\n\nTell me your target budget and I’ll recommend the best options!",
    suggestedActions: [
      { label: 'Gifts Under ₹1,500', type: 'flow', payload: 'budget_1500' },
      { label: '₹1,500 - ₹3,000 Range', type: 'flow', payload: 'budget_3000' },
      { label: 'Wedding Gifting (Grand)', type: 'category', payload: 'wedding-seer' },
    ],
  },

  // =========================================================================
  // C. PERSONALIZATION & CUSTOMIZATION
  // =========================================================================
  {
    id: 'personalization-options',
    category: 'customization',
    questions: [
      'Can I customize a hamper?',
      'Can I customize this hamper?',
      'Can I customize?',
      'How to customize a gift?',
      'Can I add a name or photo to the gift?',
      'Can I customize the colours and theme?',
      'Can I send reference photos from Pinterest or Instagram?',
      'Can you make something not in the catalogue?',
    ],
    keywords: ['customize', 'customise', 'customization', 'hamper', 'customize hamper', 'personalize', 'name', 'photo', 'theme', 'colour', 'color', 'pinterest', 'reference', 'bespoke'],
    answer:
      "Yes, absolutely! Customization is the heart of Manha’z Hampers. You can:\n\n1. **Personalize Names & Initials**: Laser-engraved name bars, acrylic plaques, or golden monogram tags.\n2. **Choose Color Themes**: Match your wedding attire, mandap theme, or favorite tones (e.g. Burgundy & Gold, Blush & Mint, Royal Blue).\n3. **Select Specific Treats**: Swap chocolate brands, dry fruits, or candles.\n4. **Share Reference Photos**: Send photos from Pinterest or Instagram to our WhatsApp, and our Salem artisans will handcraft it for you!",
    suggestedActions: [
      { label: 'Send Design Idea on WhatsApp', type: 'whatsapp', payload: 'Hello! I have a reference photo for a custom gift.' },
      { label: 'Design a Bespoke Gift', type: 'flow', payload: 'custom_gift' },
    ],
  },

  // =========================================================================
  // D. ORDERING PROCESS
  // =========================================================================
  {
    id: 'how-to-order',
    category: 'ordering',
    questions: [
      'How do I place an order?',
      'How does the ordering process work?',
      'Can I order directly on the website?',
      'Is my order confirmed when I send WhatsApp?',
    ],
    keywords: ['order', 'how to order', 'process', 'steps', 'checkout', 'buy', 'purchase'],
    answer:
      "Our ordering journey is simple and personal:\n\n1. **Browse & Choose**: Explore products on this website and click 'Personalize & Add to Cart' or 'Enquire on WhatsApp'.\n2. **Review Preferences**: Specify your recipient, occasion, date, and color choices.\n3. **Send to WhatsApp**: Your prefilled enquiry opens in WhatsApp. Tap **Send**.\n4. **Owner Confirmation**: Our Salem studio reviews availability, final pricing, payment, and delivery timeline with you personally before confirming the order.\n\n*Note: Opening WhatsApp or adding items to the cart does not charge you or finalize the order until our team confirms it with you.*",
    suggestedActions: [
      { label: 'Browse Collections', type: 'category', payload: 'all' },
      { label: 'Chat with Team on WhatsApp', type: 'whatsapp', payload: 'Hello Manha’z Hampers! I would like to place an order.' },
    ],
  },

  // =========================================================================
  // E. DELIVERY, PICKUP & TIMING
  // =========================================================================
  {
    id: 'delivery-location-and-timing',
    category: 'delivery',
    questions: [
      'Where are you located?',
      'Do you deliver in Salem?',
      'Can you deliver outside Salem (e.g. Coimbatore, Erode, Chennai)?',
      'Can I pick up my order in person?',
      'How long does an order take?',
      'Can you deliver directly to the recipient without bill?',
    ],
    keywords: ['location', 'address', 'where', 'salem', 'delivery', 'pickup', 'pick up', 'outside salem', 'chennai', 'erode', 'coimbatore', 'timing', 'how long', 'lead time', 'recipient'],
    answer:
      "**Studio Location**: 229/1, Natraj Rd, opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty, Salem, Tamil Nadu 636008.\n\n• **Salem Deliveries**: We coordinate personal deliveries across Salem city (Ayyanthirumaligai, Hasthampatti, Fairlands, Ammapet, Suramangalam) and in-person studio pickup.\n• **Outside Salem**: Available for select non-fragile hampers and return gift sets. Delivery arrangements and courier options are confirmed on WhatsApp.\n• **Lead Time**: We recommend 3–7 days notice for individual hampers, and 2–3 weeks notice for 11/21 wedding seer sets.\n• **Direct Recipient Delivery**: Yes! We can deliver directly to your recipient with a handwritten card and no price tag or invoice inside.",
    suggestedActions: [
      { label: 'Open Studio on Google Maps', type: 'category', payload: 'maps' },
      { label: 'Check Delivery on WhatsApp', type: 'whatsapp', payload: 'Can you deliver to my location?' },
    ],
  },
  {
    id: 'urgent-orders',
    category: 'delivery',
    questions: [
      'I need a gift urgently',
      'Can I get same-day delivery?',
      'Can you deliver tomorrow?',
      'Urgent gift enquiry',
      'Need wedding seer urgently',
    ],
    keywords: ['urgent', 'emergency', 'same day', 'today', 'tomorrow', 'fast', 'quick', 'rush'],
    answer:
      "For urgent orders or expedited wedding seer arrangements, because every creation is carefully handcrafted in our Salem studio, rush delivery depends on our active schedule and material availability. Please connect with our team directly on WhatsApp with your required celebration date, item of interest, and Salem location. We will immediately check studio slots and let you know what can be prepared right away!",
    suggestedActions: [
      { label: 'Fast WhatsApp Consultation', type: 'whatsapp', payload: 'Urgent Gift Enquiry: Need delivery in Salem soon.' },
    ],
  },

  // =========================================================================
  // F. PAYMENTS & ORDER STATUS
  // =========================================================================
  {
    id: 'payments-and-cancellation',
    category: 'payments',
    questions: [
      'What payment methods do you accept?',
      'Can I pay online (UPI / GPay / PhonePe)?',
      'Is Cash on Delivery (COD) available?',
      'Can I cancel or change an order?',
    ],
    keywords: ['payment', 'pay', 'upi', 'gpay', 'phonepe', 'bank', 'cash on delivery', 'cod', 'cancel', 'refund', 'change'],
    answer:
      "• **Payment Methods**: We accept direct UPI (Google Pay, PhonePe, Paytm) and bank transfers. Details are shared on WhatsApp once your design and price are finalized.\n• **Advance Payment**: Because our creations feature customized names, perishable flowers, and tailored materials, an advance confirmation payment is required before crafting begins.\n• **Cash on Delivery**: COD is generally not available for personalized/custom items.\n• **Changes & Cancellations**: If you need to adjust names, dates, or items, message us as early as possible on WhatsApp. Once personalization crafting has commenced, cancellations cannot be accepted.",
    suggestedActions: [
      { label: 'Discuss on WhatsApp', type: 'whatsapp', payload: 'Payment enquiry for customized gift' },
    ],
  },

  // =========================================================================
  // G. SPECIAL OCCASIONS & BULK ORDERS
  // =========================================================================
  {
    id: 'bulk-and-return-gifts',
    category: 'occasions',
    questions: [
      'Can I order return gifts in bulk?',
      'Do you accept corporate gifting orders?',
      'Return gifts for wedding or engagement',
      'Discount for bulk orders',
    ],
    keywords: ['bulk', 'return gifts', 'corporate', 'many guests', '50', '100', 'quantity', 'event gifts'],
    answer:
      "Yes! We specialize in bulk return gifts for weddings, engagements, housewarmings, and corporate events. Our popular return gift ensembles include artisanal embroidered potli bags paired with brass diyas, handcrafted dry fruit boxes, and customized mini hampers. Please connect with us on WhatsApp with your guest count and celebration date so we can provide tiered options.",
    suggestedActions: [
      { label: 'View Return Gift Ensemble', type: 'product', payload: 'artisanal-potli-brass-return-gift-ensemble' },
      { label: 'Enquire Bulk on WhatsApp', type: 'whatsapp', payload: 'Bulk / Return Gift Enquiry for celebration' },
    ],
  },

  // =========================================================================
  // H. SUPPORT & HUMAN HANDOFF
  // =========================================================================
  {
    id: 'human-handoff',
    category: 'support',
    questions: [
      'Can I speak to a real person?',
      'I want to talk to the owner',
      'Connect me to human',
      'WhatsApp phone number',
      'Customer care number',
    ],
    keywords: ['human', 'real person', 'talk to person', 'owner', 'call', 'phone', 'contact number', 'agent'],
    answer:
      `You can speak directly with our studio owner and artisans on WhatsApp or phone!\n\n📞 **Phone / WhatsApp**: ${siteConfig.contact.phoneDisplay}\n📍 **Studio**: ${siteConfig.contact.address}\n\nClick below to start a chat directly on WhatsApp. Our team will assist you with design ideas, pricing, and orders.`,
    suggestedActions: [
      { label: `WhatsApp: ${siteConfig.contact.phoneDisplay}`, type: 'whatsapp', payload: 'Hello Manha’z Hampers! I would like to speak directly with your team.' },
      { label: 'Studio on Google Maps', type: 'category', payload: 'maps' },
    ],
  },

  // =========================================================================
  // I. THANGLISH & TAMIL COMMON QUERIES
  // =========================================================================
  {
    id: 'thanglish-order-process',
    category: 'thanglish',
    questions: [
      'Order epdi panradhu?',
      'Epdi order pandrathu?',
      'Epdi order panradhu',
      'Order poduvathu epdi?',
    ],
    keywords: ['order epdi', 'epdi order', 'order panradhu', 'epdi panradhu', 'order pandrathu', 'epadi order'],
    answer:
      "Romba simple pa! ✨\n\n1. Website la ungalukku piditha gift-ah select pannunga.\n2. Quantity, theme, or name personalization details fill pannunga.\n3. **'Enquire on WhatsApp'** click pannunga — unga details pre-fill aagi WhatsApp chat open aagum.\n4. WhatsApp la **Send** click pannunga. Enga team ungalukku design availability, final price, and delivery details confirm pannuvanga!\n\nNeed help choosing right now?",
    suggestedActions: [
      { label: 'Gifts Paarkka (Collections)', type: 'category', payload: 'all' },
      { label: 'WhatsApp la Pesa', type: 'whatsapp', payload: 'Vanakkam Manha’z Hampers! Enakku oru gift order panna details venum.' },
    ],
  },
  {
    id: 'thanglish-delivery-location',
    category: 'thanglish',
    questions: [
      'Salem la delivery irukka?',
      'Salem delivery pannuvengala?',
      'Enga delivery pannuvinga?',
      'Shop enga irukku?',
    ],
    keywords: ['salem la delivery', 'delivery irukka', 'shop enga', 'location enga', 'salem shop', 'shop address'],
    answer:
      "Aama pa! Salem full-ah direct delivery and studio pickup irukku.\n\n📍 **Studio Address**: 229/1, Natraj Rd, Opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty, Salem - 636008.\n\nWedding seer sets and hampers Salem surrounding districts-kum WhatsApp discussion moolama arrange pannuvom. Unga area solunga, confirm panrom!",
    suggestedActions: [
      { label: 'Google Maps la Paarkka', type: 'category', payload: 'maps' },
      { label: 'WhatsApp la Location Check', type: 'whatsapp', payload: 'Vanakkam! Enoda area-ku delivery irukkannu check panna venum.' },
    ],
  },
  {
    id: 'thanglish-customization',
    category: 'thanglish',
    questions: [
      'Customise panna mudiyuma?',
      'Name print panna mudiyuma?',
      'Enakku oru photo reference irukku',
      'Colour change panna mudiyuma?',
    ],
    keywords: ['customise panna', 'customize panna', 'mudiyuma', 'name print', 'colour change', 'photo reference'],
    answer:
      "Kandippa mudiyum pa! ✨ Ungalukku piditha colours, names, chocolates, and flowers mathi customized hampers create pannuvom. Unga kitta Pinterest or Instagram reference photo irundhalum WhatsApp-la anuppunga, athe maadhiri ready panni tharuvom!",
    suggestedActions: [
      { label: 'WhatsApp-la Photo Anuppa', type: 'whatsapp', payload: 'Vanakkam! Enkitta oru custom gift reference photo irukku.' },
      { label: 'Personalized Gifts Paarkka', type: 'category', payload: 'personalized-gifts' },
    ],
  },
  {
    id: 'thanglish-wedding-seer',
    category: 'thanglish',
    questions: [
      'Wedding seer venum',
      'Kalyana seer plates details',
      '11 plates evlo rate?',
      'Engagement seer plates',
    ],
    keywords: ['wedding seer venum', 'kalyana seer', 'seer plates evlo', '11 plates rate', 'seer plate set'],
    answer:
      "Vanakkam! Wedding seer enga studio-vin signature specialty. Coordinated 11 plates and 21 plates traditional Banarasi brocade & floral work-oda prepare panrom. Unga wedding saree and mandap theme-ku chromatic match panni tharuvom.\n\nRates and plate options WhatsApp-la direct consultation moolama share panrom!",
    suggestedActions: [
      { label: '11 Plates Seer Paarkka', type: 'product', payload: '11-plates-ceremonial-seer-ensemble' },
      { label: 'Wedding Consultation WhatsApp', type: 'whatsapp', payload: 'Vanakkam! Wedding seer arrangement details venum.' },
    ],
  },
];
