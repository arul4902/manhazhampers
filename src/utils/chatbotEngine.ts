/**
 * =========================================================================
 * MANHA'Z HAMPERS — CHATBOT CONVERSATIONAL NLP & RECOMMENDATION ENGINE
 * =========================================================================
 * Grounded conversational engine that:
 * 1. Understands English, Tamil-English (Thanglish), emojis, casual slang, and typos
 * 2. Manages a guided, step-by-step gift-finding flow (Recipient -> Occasion -> Budget)
 * 3. Extracts slots from unstructured sentences ("Birthday gift for sister under 1500")
 * 4. Grounded in real catalogue data from `productsData` and verified FAQs
 * 5. Provides honest handoff to WhatsApp for custom quotes and unlisted details
 * =========================================================================
 */

import { productsData } from '../data/products.ts';
import { siteConfig } from '../data/siteConfig.ts';
import { CHATBOT_KNOWLEDGE, type FAQEntry } from '../data/chatbotKnowledge.ts';
import type { Product, OccasionId } from '../types/index.ts';

export interface ChatActionButton {
  label: string;
  type: 'quick_reply' | 'link' | 'whatsapp' | 'view_product' | 'category' | 'reset';
  payload?: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  products?: Product[];
  actionButtons?: ChatActionButton[];
}

export interface GuidedGiftState {
  active: boolean;
  step: 'recipient' | 'occasion' | 'budget' | 'complete';
  recipient?: string;
  occasion?: string;
  budget?: string;
  notes?: string;
}

// ---------------------------------------------------------------------------
// Helpers: Normalization & Typo Tolerant Matching
// ---------------------------------------------------------------------------

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0B80-\u0BFF]/gi, ' ') // preserve alphanumeric and Tamil unicode
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Common typo mappings and phonetic substitutions
 */
const TYPO_MAP: Record<string, string> = {
  hampr: 'hamper',
  hamperss: 'hampers',
  watsapp: 'whatsapp',
  watsap: 'whatsapp',
  whatapp: 'whatsapp',
  custm: 'custom',
  customise: 'customize',
  costomize: 'customize',
  custmize: 'customize',
  weddng: 'wedding',
  weding: 'wedding',
  platter: 'plate',
  plattes: 'plates',
  delivry: 'delivery',
  deliver: 'delivery',
  salm: 'salem',
  choclate: 'chocolate',
  choclet: 'chocolate',
  bokey: 'bouquet',
  boquet: 'bouquet',
  persnalized: 'personalized',
  engagment: 'engagement',
  bday: 'birthday',
  brithday: 'birthday',
  aniversary: 'anniversary',
  anni: 'anniversary',
};

function correctTypos(text: string): string {
  const words = text.split(' ');
  const corrected = words.map((w) => TYPO_MAP[w] || w);
  return corrected.join(' ');
}

// ---------------------------------------------------------------------------
// Slot Extractors: Recipient, Occasion, Budget
// ---------------------------------------------------------------------------

const RECIPIENT_PATTERNS: { regex: RegExp; label: string }[] = [
  { regex: /\b(sister|thangachi|akka|sis)\b/i, label: 'Sister' },
  { regex: /\b(brother|thambi|annan|bro)\b/i, label: 'Brother' },
  { regex: /\b(mother|mom|amma|mummy)\b/i, label: 'Mother' },
  { regex: /\b(father|dad|appa|daddy)\b/i, label: 'Father' },
  { regex: /\b(wife|manaivi|partner|fiancee)\b/i, label: 'Wife / Partner' },
  { regex: /\b(husband|kanavan|fiance)\b/i, label: 'Husband / Partner' },
  { regex: /\b(girlfriend|gf)\b/i, label: 'Girlfriend' },
  { regex: /\b(boyfriend|bf)\b/i, label: 'Boyfriend' },
  { regex: /\b(friend|nanban|thozhan|bestie)\b/i, label: 'Friend' },
  { regex: /\b(colleague|boss|manager|client|coworker)\b/i, label: 'Colleague / Professional' },
  { regex: /\b(baby|child|newborn|kid|kulandhai)\b/i, label: 'Baby / Child' },
  { regex: /\b(bride|manapen|groom|manamagan|couple)\b/i, label: 'Bride / Groom / Couple' },
];

const OCCASION_PATTERNS: { regex: RegExp; id: OccasionId; label: string }[] = [
  { regex: /\b(birthday|bday|porandha naal)\b/i, id: 'birthday', label: 'Birthday' },
  { regex: /\b(wedding|kalyanam|marriage|nikah)\b/i, id: 'wedding', label: 'Wedding' },
  { regex: /\b(engagement|nitchayam|ring ceremony)\b/i, id: 'engagement', label: 'Engagement' },
  { regex: /\b(anniversary|wedding day)\b/i, id: 'anniversary', label: 'Anniversary' },
  { regex: /\b(baby shower|valaikappu|seemantham|welcome baby|newborn)\b/i, id: 'baby-shower', label: 'Baby Shower' },
  { regex: /\b(diwali|deepavali|eid|ramzan|pongal|christmas|festival)\b/i, id: 'festivals', label: 'Festival' },
  { regex: /\b(return gift|return gifts|thamboolam|favor|favors)\b/i, id: 'return-gifts', label: 'Return Gifts' },
  { regex: /\b(housewarming|grahapravesam|surprise)\b/i, id: 'personalized-surprises', label: 'Special Surprise' },
];

function extractRecipient(input: string): string | null {
  for (const { regex, label } of RECIPIENT_PATTERNS) {
    if (regex.test(input)) return label;
  }
  return null;
}

function extractOccasion(input: string): { id: OccasionId; label: string } | null {
  for (const item of OCCASION_PATTERNS) {
    if (item.regex.test(input)) return { id: item.id, label: item.label };
  }
  return null;
}

function extractBudget(input: string): string | null {
  const norm = input.toLowerCase();
  if (norm.includes('500') || norm.includes('under 500')) return 'Under ₹500';
  if (norm.includes('1000') || norm.includes('under 1000') || norm.includes('under 1,000') || norm.includes('1k')) return 'Around ₹1,000';
  if (norm.includes('1500') || norm.includes('under 1500') || norm.includes('1.5k')) return 'Under ₹1,500';
  if (norm.includes('2000') || norm.includes('under 2000') || norm.includes('2k')) return 'Around ₹2,000';
  if (norm.includes('3000') || norm.includes('under 3000') || norm.includes('3k')) return '₹1,500 - ₹3,000';
  if (norm.includes('5000') || norm.includes('5k')) return '₹3,000 - ₹5,000';
  if (norm.includes('10000') || norm.includes('10k') || norm.includes('grand')) return '₹10,000+ (Grand/Wedding)';
  if (norm.includes('flexible') || norm.includes('any budget') || norm.includes('no budget')) return 'Flexible';
  return null;
}

// ---------------------------------------------------------------------------
// Product Matcher
// ---------------------------------------------------------------------------

export function findMatchingProducts(params: {
  occasion?: string;
  recipient?: string;
  category?: string;
  query?: string;
  limit?: number;
}): Product[] {
  const { occasion, recipient, category, query, limit = 3 } = params;
  let matches = [...productsData];

  // 1. By Category
  if (category) {
    const catLower = category.toLowerCase();
    matches = matches.filter(
      (p) => p.category.toLowerCase().includes(catLower) || p.categoryName.toLowerCase().includes(catLower)
    );
  }

  // 2. By Occasion
  if (occasion && occasion !== 'all') {
    const occLower = occasion.toLowerCase();
    const occasionMatches = matches.filter((p) =>
      p.occasions.some((o) => o.toLowerCase().includes(occLower))
    );
    if (occasionMatches.length > 0) {
      matches = occasionMatches;
    }
  }

  // 3. By Recipient
  if (recipient) {
    const recLower = recipient.toLowerCase();
    const recipientMatches = matches.filter((p) => {
      const textBlock = `${p.name} ${p.shortDescription} ${p.tags?.join(' ') || ''}`.toLowerCase();
      if (recLower.includes('baby') || recLower.includes('child')) {
        return textBlock.includes('baby') || textBlock.includes('little one');
      }
      if (recLower.includes('brother') || recLower.includes('father') || recLower.includes('husband') || recLower.includes('groom')) {
        return textBlock.includes('wallet') || textBlock.includes('dry fruit') || textBlock.includes('seer');
      }
      if (recLower.includes('sister') || recLower.includes('mother') || recLower.includes('wife') || recLower.includes('bride')) {
        return textBlock.includes('flower') || textBlock.includes('chocolate') || textBlock.includes('platter') || textBlock.includes('trousseau') || textBlock.includes('hamper');
      }
      return true;
    });
    if (recipientMatches.length > 0) {
      matches = recipientMatches;
    }
  }

  // 3. By Recipient / Query keywords
  if (query) {
    const qLower = query.toLowerCase();
    const scored = matches.map((p) => {
      let score = 0;
      if (p.name.toLowerCase().includes(qLower)) score += 5;
      if (p.categoryName.toLowerCase().includes(qLower)) score += 4;
      if (p.shortDescription.toLowerCase().includes(qLower)) score += 2;
      if (p.tags?.some((t) => t.toLowerCase().includes(qLower))) score += 3;
      if (p.featured) score += 1;
      return { product: p, score };
    });

    const queryMatches = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
    if (queryMatches.length > 0) {
      return queryMatches.slice(0, limit).map((s) => s.product);
    }
  }

  // Fallback: If filtered set is empty, return featured products
  if (matches.length === 0) {
    matches = productsData.filter((p) => p.featured);
  }

  return matches.slice(0, limit);
}

// ---------------------------------------------------------------------------
// FAQ & Intent Matching
// ---------------------------------------------------------------------------

function scoreFAQMatch(userText: string, faq: FAQEntry): number {
  let score = 0;
  const normUser = normalizeText(userText);
  const userWords = normUser.split(' ');

  // Exact question match
  for (const q of faq.questions) {
    const normQ = normalizeText(q);
    if (normUser === normQ) return 100;
    if (normUser.includes(normQ) || normQ.includes(normUser)) score += 40;
  }

  // Keyword match
  for (const kw of faq.keywords) {
    const normKW = normalizeText(kw);
    if (normUser.includes(normKW)) {
      score += 15;
    } else {
      // Check individual words
      const kwWords = normKW.split(' ');
      const matchedAll = kwWords.every((w) => userWords.includes(w));
      if (matchedAll) score += 10;
    }
  }

  return score;
}

export function matchFAQ(userText: string): FAQEntry | null {
  const corrected = correctTypos(normalizeText(userText));
  let bestFAQ: FAQEntry | null = null;
  let highestScore = 0;

  for (const faq of CHATBOT_KNOWLEDGE) {
    const s = scoreFAQMatch(corrected, faq);
    if (s > highestScore) {
      highestScore = s;
      bestFAQ = faq;
    }
  }

  // Threshold: at least 25 points to consider a reliable match
  return highestScore >= 25 ? bestFAQ : null;
}

// ---------------------------------------------------------------------------
// Main Conversational Engine: `processCustomerMessage`
// ---------------------------------------------------------------------------

export interface EngineResult {
  message: ChatMessage;
  nextState: GuidedGiftState;
}

export function processCustomerMessage(
  userText: string,
  currentState: GuidedGiftState
): EngineResult {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const rawInput = userText.trim();
  const normalized = normalizeText(rawInput);
  const corrected = correctTypos(normalized);

  // -------------------------------------------------------------------------
  // 1. Check for Reset / Restart command
  // -------------------------------------------------------------------------
  if (
    normalized === 'reset' ||
    normalized === 'restart' ||
    normalized === 'start over' ||
    normalized === 'clear'
  ) {
    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: "I’ve refreshed our chat! ✨ How may I help you today? You can ask me to help choose a gift, explore our Salem wedding seer collections, or check prices.",
        actionButtons: [
          { label: 'Help Me Choose a Gift', type: 'quick_reply', payload: 'Help me choose a gift' },
          { label: 'Wedding Seer Collections', type: 'category', payload: 'wedding-seer' },
          { label: 'How Does Ordering Work?', type: 'quick_reply', payload: 'How do I place an order?' },
        ],
      },
      nextState: { active: false, step: 'recipient' },
    };
  }

  // -------------------------------------------------------------------------
  // 2. Direct Human / WhatsApp Hand-off triggers
  // -------------------------------------------------------------------------
  if (
    corrected.includes('human') ||
    corrected.includes('real person') ||
    corrected.includes('talk to person') ||
    corrected.includes('owner') ||
    corrected.includes('contact number') ||
    corrected.includes('call') ||
    corrected.includes('whatsapp la pesa')
  ) {
    const summary = currentState.active && currentState.recipient
      ? `Interested in gift for ${currentState.recipient} (${currentState.occasion || 'Celebration'}, Budget: ${currentState.budget || 'Flexible'})`
      : 'General gift enquiry from website assistant';

    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `You can connect directly with our studio owner and gifting team!\n\n📞 **Call / WhatsApp**: ${siteConfig.contact.phoneDisplay}\n📍 **Salem Studio**: ${siteConfig.contact.address}\n\nTap below to start your direct WhatsApp conversation:`,
        actionButtons: [
          {
            label: `Chat on WhatsApp (${siteConfig.contact.phoneDisplay})`,
            type: 'whatsapp',
            payload: `Hello Manha’z Hampers! ✨ I was speaking with your Gift Assistant. ${summary}`,
          },
          { label: 'View Studio on Google Maps', type: 'category', payload: 'maps' },
        ],
      },
      nextState: { ...currentState, active: false },
    };
  }

  // -------------------------------------------------------------------------
  // 3. Guided Gift-Finding Flow Active?
  // -------------------------------------------------------------------------
  if (currentState.active) {
    // --- Step: Recipient ---
    if (currentState.step === 'recipient') {
      const extractedRecipient = extractRecipient(rawInput) || rawInput;
      const extractedOccasion = extractOccasion(rawInput);
      const extractedBudget = extractBudget(rawInput);

      // If user provided multiple slots at once (e.g., "For my sister for her birthday under 1000")
      if (extractedOccasion && extractedBudget) {
        const matches = findMatchingProducts({
          occasion: extractedOccasion.label,
          recipient: extractedRecipient,
        });

        return {
          message: {
            id: `ast-${Date.now()}`,
            sender: 'assistant',
            timestamp,
            text: `Perfect! Here are lovely creations for your **${extractedRecipient}** celebrating **${extractedOccasion.label}** around **${extractedBudget}**:\n\nEvery item is handcrafted with premium materials in our Salem studio. Select any creation to customize details or enquire:`,
            products: matches,
            actionButtons: [
              { label: 'Customize This Gift', type: 'quick_reply', payload: 'Can I customize a hamper?' },
              {
                label: 'Enquire on WhatsApp',
                type: 'whatsapp',
                payload: `Hello Manha’z Hampers! I need a ${extractedOccasion.label} gift for my ${extractedRecipient} (Budget: ${extractedBudget}).`,
              },
            ],
          },
          nextState: {
            active: false,
            step: 'complete',
            recipient: extractedRecipient,
            occasion: extractedOccasion.label,
            budget: extractedBudget,
          },
        };
      }

      // Normal single-slot progression: Move to Occasion
      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Wonderful! Choosing a gift for your **${extractedRecipient}** is so special. ✨\n\nWhat is the celebration or occasion?`,
          actionButtons: [
            { label: '🎂 Birthday', type: 'quick_reply', payload: 'Birthday' },
            { label: '💍 Wedding / Seer', type: 'quick_reply', payload: 'Wedding' },
            { label: '🥂 Anniversary', type: 'quick_reply', payload: 'Anniversary' },
            { label: '✨ Just a Surprise', type: 'quick_reply', payload: 'Special Surprise' },
          ],
        },
        nextState: {
          ...currentState,
          step: 'occasion',
          recipient: extractedRecipient,
        },
      };
    }

    // --- Step: Occasion ---
    if (currentState.step === 'occasion') {
      const occMatch = extractOccasion(rawInput);
      const occasionLabel = occMatch ? occMatch.label : rawInput;

      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Got it — a **${occasionLabel}** gift for your **${currentState.recipient || 'recipient'}**! 🎉\n\nWhat budget range would you like to stay within?`,
          actionButtons: [
            { label: 'Under ₹1,500', type: 'quick_reply', payload: 'Under ₹1,500' },
            { label: '₹1,500 - ₹3,000', type: 'quick_reply', payload: '₹1,500 - ₹3,000' },
            { label: '₹3,000 - ₹5,000+', type: 'quick_reply', payload: '₹3,000 - ₹5,000' },
            { label: 'Flexible / Grand', type: 'quick_reply', payload: 'Flexible budget' },
          ],
        },
        nextState: {
          ...currentState,
          step: 'budget',
          occasion: occasionLabel,
        },
      };
    }

    // --- Step: Budget (Final Guided Step) ---
    if (currentState.step === 'budget') {
      const budgetValue = extractBudget(rawInput) || rawInput;
      const matches = findMatchingProducts({
        occasion: currentState.occasion,
        recipient: currentState.recipient,
      });

      const recipientText = currentState.recipient ? ` for your **${currentState.recipient}**` : '';
      const occasionText = currentState.occasion ? ` celebrating **${currentState.occasion}**` : '';

      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Here are our recommended handcrafted creations${recipientText}${occasionText} (${budgetValue}):\n\nEach creation can be personalized with custom names, preferred color themes, and special notes.`,
          products: matches,
          actionButtons: [
            {
              label: 'Enquire on WhatsApp',
              type: 'whatsapp',
              payload: `Hello Manha’z Hampers! I am looking for a ${currentState.occasion || 'celebration'} gift for my ${currentState.recipient || 'loved one'} (${budgetValue}). Please share design ideas and price!`,
            },
            { label: 'Explore All Collections', type: 'category', payload: 'all' },
            { label: 'Start Another Search', type: 'reset' },
          ],
        },
        nextState: {
          active: false,
          step: 'complete',
          recipient: currentState.recipient,
          occasion: currentState.occasion,
          budget: budgetValue,
        },
      };
    }
  }

  // -------------------------------------------------------------------------
  // 3b. High-Priority Specific Intents: Urgent Orders & Bulk Requests
  // -------------------------------------------------------------------------
  if (
    corrected.includes('urgent') ||
    corrected.includes('urgently') ||
    corrected.includes('emergency') ||
    corrected.includes('same day') ||
    corrected.includes('today delivery') ||
    corrected.includes('tomorrow delivery')
  ) {
    const faq = CHATBOT_KNOWLEDGE.find((f) => f.id === 'urgent-orders')!;
    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: faq.answer,
        actionButtons: [
          {
            label: 'Consult Urgently on WhatsApp',
            type: 'whatsapp',
            payload: `Hello Manha’z Hampers! ✨ Urgent Enquiry: "${rawInput}". Please let me know what can be crafted immediately.`,
          },
          { label: 'Explore Ready Collections', type: 'category', payload: 'all' },
        ],
      },
      nextState: { ...currentState, active: false },
    };
  }

  if (
    corrected.includes('bulk') ||
    (corrected.includes('return gift') && (/\b\d{2,}\b/.test(corrected) || corrected.includes('guest') || corrected.includes('many')))
  ) {
    const faq = CHATBOT_KNOWLEDGE.find((f) => f.id === 'bulk-and-return-gifts')!;
    const returnGiftProduct = productsData.filter((p) => p.category === 'return-gifts');
    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: faq.answer,
        products: returnGiftProduct,
        actionButtons: [
          {
            label: 'Enquire Bulk on WhatsApp',
            type: 'whatsapp',
            payload: `Hello Manha’z Hampers! I need a bulk / return gift quotation for: "${rawInput}".`,
          },
          { label: 'View Return Gift Collection', type: 'category', payload: 'return-gifts' },
        ],
      },
      nextState: { ...currentState, active: false },
    };
  }

  // -------------------------------------------------------------------------
  // 4. Gift Recommendation & Slot-Filling Intent Handler
  // -------------------------------------------------------------------------
  const rec = extractRecipient(rawInput);
  const occ = extractOccasion(rawInput);
  const bud = extractBudget(rawInput);

  const isGiftIntent =
    rec !== null ||
    occ !== null ||
    corrected.includes('gift for') ||
    corrected.includes('gifts for') ||
    corrected.includes('help me choose') ||
    corrected.includes('help me pick') ||
    corrected.includes('suggest a gift') ||
    corrected.includes('recommend a gift') ||
    corrected.includes('need a gift') ||
    corrected.includes('gift idea') ||
    corrected.includes('enakku gift venum');

  if (isGiftIntent) {
    // If recipient is known and (occasion or budget is known), give tailored recommendations!
    if (rec && (occ || bud)) {
      const occasionName = occ ? occ.label : 'Special Celebration';
      const budgetNote = bud ? ` (${bud})` : '';
      const matches = findMatchingProducts({
        occasion: occ ? occ.label : undefined,
        recipient: rec,
      });

      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `I’d love to help! For your **${rec}** celebrating **${occasionName}**${budgetNote}, here are our most cherished studio creations:\n\nEvery item is assembled by hand in Salem with premium embellishments and can be personalized:`,
          products: matches,
          actionButtons: [
            {
              label: 'Enquire on WhatsApp',
              type: 'whatsapp',
              payload: `Hello Manha’z Hampers! Looking for a ${occasionName} gift for my ${rec}${budgetNote}.`,
            },
            { label: 'Customize This Gift', type: 'quick_reply', payload: 'Can I customize a hamper?' },
            { label: 'Start Another Search', type: 'reset' },
          ],
        },
        nextState: {
          active: false,
          step: 'complete',
          recipient: rec,
          occasion: occasionName,
          budget: bud || undefined,
        },
      };
    }

    // If only recipient is known, ask for occasion
    if (rec) {
      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `A gift for your **${rec}** — how wonderful! ✨\n\nWhat celebration or occasion is this for?`,
          actionButtons: [
            { label: '🎂 Birthday', type: 'quick_reply', payload: 'Birthday' },
            { label: '💍 Wedding / Seer', type: 'quick_reply', payload: 'Wedding' },
            { label: '🥂 Anniversary', type: 'quick_reply', payload: 'Anniversary' },
            { label: '✨ Special Surprise', type: 'quick_reply', payload: 'Special Surprise' },
          ],
        },
        nextState: { active: true, step: 'occasion', recipient: rec },
      };
    }

    // If only occasion is known and budget is known
    if (occ && bud) {
      const matches = findMatchingProducts({ occasion: occ.label });
      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Here are our best creations for **${occ.label}** (${bud}):\n\nExplore below or let me know who the recipient is to refine:`,
          products: matches,
          actionButtons: [
            {
              label: 'Enquire on WhatsApp',
              type: 'whatsapp',
              payload: `Hello Manha’z Hampers! I need a ${occ.label} gift (${bud}).`,
            },
            { label: 'Explore All Collections', type: 'category', payload: 'all' },
          ],
        },
        nextState: { active: false, step: 'complete', occasion: occ.label, budget: bud },
      };
    }

    // If only occasion is known, ask who it is for
    if (occ) {
      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Celebrating a **${occ.label}** is wonderful! 🎉\n\nWho are you choosing this gift for? (e.g. Sister, Partner, Mother, Friend... or skip to see all)`,
          actionButtons: [
            { label: 'Sister / Akka', type: 'quick_reply', payload: 'My sister' },
            { label: 'Partner / Spouse', type: 'quick_reply', payload: 'My partner' },
            { label: 'Mom / Dad', type: 'quick_reply', payload: 'My parents' },
            { label: 'Show Best Sellers', type: 'quick_reply', payload: 'Show me anything' },
          ],
        },
        nextState: { active: true, step: 'recipient', occasion: occ.label },
      };
    }

    // Generic initial start: Ask step 1
    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: "I’d love to guide you to the perfect creation! ✨\n\nTo get started, **who is this special gift for?**",
        actionButtons: [
          { label: 'Sister / Akka', type: 'quick_reply', payload: 'My sister' },
          { label: 'Partner / Spouse', type: 'quick_reply', payload: 'My partner' },
          { label: 'Mom / Dad', type: 'quick_reply', payload: 'My parents' },
          { label: 'Friend / Colleague', type: 'quick_reply', payload: 'My friend' },
        ],
      },
      nextState: { active: true, step: 'recipient' },
    };
  }

  // -------------------------------------------------------------------------
  // 5. Direct Product Query Matcher (e.g. "Do you have chocolate bouquet?", "11 plates")
  // -------------------------------------------------------------------------
  for (const product of productsData) {
    const pNameNorm = normalizeText(product.name);
    if (
      normalized.includes(pNameNorm) ||
      (product.tags && product.tags.some((t) => normalized.includes(normalizeText(t))))
    ) {
      return {
        message: {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp,
          text: `Yes! Here is our **${product.name}**:\n\n${product.shortDescription}\n\n• **Category**: ${product.categoryName}\n• **Pricing**: ${product.priceDisplay} (Confirmed directly by our Salem artisans on WhatsApp)\n• **Customization**: Available with personalized names, color themes, and delivery timings.`,
          products: [product],
          actionButtons: [
            {
              label: 'Enquire on WhatsApp',
              type: 'whatsapp',
              payload: `Hello Manha’z Hampers! I am interested in: ${product.name}. Please confirm availability and price.`,
            },
            { label: 'View Collection', type: 'category', payload: product.category },
          ],
        },
        nextState: currentState,
      };
    }
  }

  // -------------------------------------------------------------------------
  // 6. Match FAQ / Knowledge Base
  // -------------------------------------------------------------------------
  const faqMatch = matchFAQ(rawInput);
  if (faqMatch) {
    const actionButtons: ChatActionButton[] = (faqMatch.suggestedActions || []).map((action) => {
      if (action.type === 'whatsapp') {
        return {
          label: action.label,
          type: 'whatsapp',
          payload: `Hello Manha’z Hampers! ${action.payload || 'I have an enquiry from the website.'}`,
        };
      }
      if (action.type === 'category') {
        return {
          label: action.label,
          type: 'category',
          payload: action.payload,
        };
      }
      if (action.type === 'product') {
        return {
          label: action.label,
          type: 'view_product',
          payload: action.payload,
        };
      }
      return {
        label: action.label,
        type: 'quick_reply',
        payload: action.payload,
      };
    });

    // If FAQ is about wedding seer or chocolate bouquet, attach relevant product!
    let relevantProducts: Product[] | undefined;
    if (faqMatch.id === 'wedding-seer-info' || faqMatch.id === 'thanglish-wedding-seer') {
      relevantProducts = productsData.filter((p) => p.category === 'wedding-seer').slice(0, 2);
    } else if (faqMatch.id === 'flowers-and-chocolates') {
      relevantProducts = productsData.filter((p) => p.category === 'chocolate-bouquets' || p.category === 'flower-bouquets').slice(0, 2);
    } else if (faqMatch.id === 'bulk-and-return-gifts') {
      relevantProducts = productsData.filter((p) => p.category === 'return-gifts').slice(0, 2);
    }

    return {
      message: {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: faqMatch.answer,
        products: relevantProducts,
        actionButtons,
      },
      nextState: currentState,
    };
  }

  // -------------------------------------------------------------------------
  // 7. Honest Intelligent Fallback
  // -------------------------------------------------------------------------
  return {
    message: {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: "I want to make sure you get the exact and accurate details! ✨\n\nBecause every creation at Manha’z Hampers is bespoke, our Salem studio team can confirm specific design ideas, custom availability, and prices for you directly.\n\nWould you like to ask our team directly on WhatsApp, or shall I help you choose a gift from our catalogue?",
      actionButtons: [
        {
          label: 'Ask Salem Team on WhatsApp',
          type: 'whatsapp',
          payload: `Hello Manha’z Hampers! I had a question on your website: "${rawInput}". Could you please guide me?`,
        },
        { label: 'Help Me Choose a Gift', type: 'quick_reply', payload: 'Help me choose a gift' },
        { label: 'Explore All Collections', type: 'category', payload: 'all' },
      ],
    },
    nextState: currentState,
  };
}
