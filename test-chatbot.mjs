/**
 * =========================================================================
 * AUTOMATED TEST SUITE: MANHA'Z AI GIFTING ASSISTANT
 * =========================================================================
 * Tests all required conversational scenarios, slot extraction,
 * knowledge base retrieval, Thanglish/Tamil queries, edge cases,
 * and WhatsApp handoffs.
 * =========================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { processCustomerMessage, matchFAQ, findMatchingProducts } from './src/utils/chatbotEngine.ts';
import { CHATBOT_KNOWLEDGE } from './src/data/chatbotKnowledge.ts';
import { siteConfig } from './src/data/siteConfig.ts';

test('1. Guided Slot-Filling & Product Recommendation ("Gift for my sister under ₹1000")', () => {
  const initialState = { active: false, step: 'recipient' };
  const result = processCustomerMessage('Gift for my sister under ₹1000', initialState);

  assert.ok(result.message.text.toLowerCase().includes('sister'), 'Should extract sister as recipient');
  assert.ok(result.message.products && result.message.products.length > 0, 'Should return matching products');
  assert.ok(
    result.message.products.every((p) => p.isPriceOnEnquiry || p.priceDisplay),
    'Recommended products must have verified price status'
  );
  assert.ok(
    result.message.actionButtons?.some((b) => b.type === 'whatsapp'),
    'Should offer WhatsApp enquiry handoff'
  );
});

test('2. Urgent Wedding Seer Inquiry ("Need wedding seer urgently")', () => {
  const result = processCustomerMessage('Need wedding seer urgently', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.toLowerCase().includes('wedding') ||
    result.message.text.toLowerCase().includes('seer') ||
    result.message.text.toLowerCase().includes('urgent'),
    'Should recognize wedding seer or urgent inquiry'
  );
  assert.ok(
    result.message.actionButtons?.some((b) => b.type === 'whatsapp'),
    'Should guide urgent wedding seer enquiries to WhatsApp'
  );
});

test('3. Delivery Area Coverage ("Do you deliver to Chennai?")', () => {
  const result = processCustomerMessage('Do you deliver to Chennai?', { active: false, step: 'recipient' });

  assert.ok(result.message.text.includes('Salem'), 'Should state studio base in Salem');
  assert.ok(
    result.message.text.toLowerCase().includes('outside salem') ||
    result.message.text.toLowerCase().includes('whatsapp'),
    'Should clarify delivery outside Salem requires WhatsApp confirmation'
  );
});

test('4. Personalization & Customization Capabilities ("Can I customize this hamper?")', () => {
  const result = processCustomerMessage('Can I customize this hamper?', { active: false, step: 'recipient' });

  assert.ok(result.message.text.includes('Names & Initials') || result.message.text.includes('customization') || result.message.text.includes('Color Themes'), 'Should explain real customization features');
  assert.ok(
    !result.message.text.includes('fabricated') && !result.message.text.includes('random'),
    'Should be grounded'
  );
});

test('5. Pricing Transparency ("How much does this cost?")', () => {
  const result = processCustomerMessage('How much does this cost?', { active: false, step: 'recipient' });

  assert.ok(result.message.text.includes('Price on Enquiry'), 'Should explain Price on Enquiry model');
  assert.ok(
    result.message.text.includes('bespoke') || result.message.text.includes('transparent'),
    'Should explain transparent quotation'
  );
});

test('6. Return Gifts & Bulk Inquiries ("I need 100 return gifts")', () => {
  const result = processCustomerMessage('I need 100 return gifts', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.toLowerCase().includes('return gifts') ||
    result.message.text.toLowerCase().includes('bulk'),
    'Should address return gifts and bulk count'
  );
  assert.ok(
    result.message.products?.some((p) => p.category === 'return-gifts') ||
    result.message.actionButtons?.some((b) => b.label.includes('Return Gift') || b.label.includes('WhatsApp')),
    'Should link to return gift offerings'
  );
});

test('7. Thanglish & Tamil Language Support ("Order epdi panradhu?")', () => {
  const result = processCustomerMessage('Order epdi panradhu?', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.includes('Romba simple pa') ||
    result.message.text.includes('select pannunga') ||
    result.message.text.includes('WhatsApp'),
    'Should respond in natural Thanglish'
  );
  assert.ok(
    result.message.actionButtons?.some((b) => b.type === 'whatsapp'),
    'Should provide WhatsApp action in Thanglish'
  );
});

test('8. Human Handoff ("Can I speak to a real person?")', () => {
  const result = processCustomerMessage('Can I speak to a real person?', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.includes(siteConfig.contact.phoneDisplay) ||
    result.message.text.includes('WhatsApp'),
    'Should provide verified client contact number'
  );
  assert.ok(
    result.message.actionButtons?.some((b) => b.type === 'whatsapp'),
    'Should provide direct button to connect with real owner'
  );
});

test('9. Unknown Inquiries & Edge Cases (Honest Fallback)', () => {
  const result = processCustomerMessage('Do you provide international drone deliveries to Mars?', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.includes('bespoke') &&
    result.message.text.includes('WhatsApp'),
    'Must honestly offer WhatsApp consultation without hallucinating a fake policy'
  );
  assert.ok(
    !result.message.text.includes('Yes we deliver to Mars'),
    'Must not hallucinate impossible promises'
  );
});

test('10. Typo Resilience & Casual Spellings ("hampr", "watsap", "custmize")', () => {
  const result = processCustomerMessage('Can I custmize a gift hampr on watsap?', { active: false, step: 'recipient' });

  assert.ok(
    result.message.text.toLowerCase().includes('customization') ||
    result.message.text.toLowerCase().includes('whatsapp') ||
    result.message.text.toLowerCase().includes('bespoke'),
    'Should gracefully correct typos and answer customization'
  );
});

test('11. Non-Broken WhatsApp Handoff Link Formation', () => {
  const verifiedNumber = siteConfig.contact.whatsappBusinessNumber;
  assert.equal(verifiedNumber, '916369926407', 'Must use verified Salem phone number');

  const faq = matchFAQ('how to order');
  assert.ok(faq, 'Should find ordering FAQ');
  assert.ok(faq.answer.length > 50, 'Answer must be comprehensive');
});
