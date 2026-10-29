import assert from 'node:assert';
import test from 'node:test';
import { siteConfig } from './src/data/siteConfig.ts';
import { productsData } from './src/data/products.ts';
import { categoriesData, occasionsData } from './src/data/categories.ts';
import {
  buildProductWhatsAppMessage,
  buildCartWhatsAppMessage,
  buildGeneralCustomGiftMessage,
  buildWeddingEnquiryMessage,
  getWhatsAppActionUrl,
} from './src/utils/whatsapp.ts';

test('1. Business Configuration Verification', () => {
  assert.strictEqual(siteConfig.brand.name, "Manha’z Hampers");
  assert.strictEqual(
    siteConfig.contact.whatsappCatalogueUrl,
    'https://wa.me/c/270698954141760'
  );
  assert.strictEqual(
    siteConfig.contact.instagramUrl,
    'https://www.instagram.com/manhaz_hampers/'
  );
  assert.strictEqual(siteConfig.contact.whatsappBusinessNumber, '916369926407');
  assert.strictEqual(siteConfig.contact.phoneDisplay, '+91 63699 26407');
  assert.ok(siteConfig.contact.address.includes('229/1, Natraj Rd'));
  assert.ok(siteConfig.contact.googleMapsUrl.includes('google.com/maps'));
});

test('2. Business Rules & Catalogue Integrity', () => {
  // Never invent prices: all items must have Price on Enquiry
  for (const product of productsData) {
    assert.strictEqual(product.priceDisplay, 'Price on Enquiry');
    assert.strictEqual(product.isPriceOnEnquiry, true);
    assert.ok(product.name.length > 0);
    assert.ok(product.slug.length > 0);
    assert.ok(product.shortDescription.length > 0);
    assert.ok(product.images.length > 0);
    assert.ok(product.occasions.length > 0);
  }

  // Ensure unique product slugs
  const slugs = productsData.map((p) => p.slug);
  const uniqueSlugs = new Set(slugs);
  assert.strictEqual(slugs.length, uniqueSlugs.size, 'Every product slug must be unique');

  // Verify all 11 business categories are present with slugs
  assert.strictEqual(categoriesData.length, 11);
  for (const cat of categoriesData) {
    assert.ok(cat.slug && cat.slug.length > 0);
  }
});

test('3. WhatsApp Cart Message Generator for Multiple Items', () => {
  const sampleItems = [
    {
      id: 'cart-1',
      productId: 'prod-11-plates',
      productName: '11 Plates Ceremonial Seer Ensemble',
      productSlug: '11-plates-ceremonial-seer-ensemble',
      category: 'wedding-seer',
      categoryName: 'Wedding Seer',
      image: 'https://images.unsplash.com/...',
      quantity: 1,
      priceDisplay: 'Price on Enquiry',
      customization: {
        occasion: 'Wedding',
        colorTheme: 'Maroon & Champagne Gold',
        recipientName: 'Kavitha & Vignesh',
        deliveryDate: '2026-11-20',
        instructions: 'Match mandap flowers',
      },
      addedAt: Date.now(),
    },
    {
      id: 'cart-2',
      productId: 'prod-customized-name-wallet',
      productName: 'Customized Name Wallet & Accessory Gift Set',
      productSlug: 'customized-name-wallet-accessory-set',
      category: 'personalized-gifts',
      categoryName: 'Personalized Gifts',
      image: 'https://images.unsplash.com/...',
      quantity: 2,
      priceDisplay: 'Price on Enquiry',
      customization: {
        occasion: 'Birthday',
        recipientName: 'Vignesh',
        colorTheme: 'Tan Brown',
      },
      addedAt: Date.now(),
    },
  ];

  const cartMsg = buildCartWhatsAppMessage(sampleItems, 0, true);

  assert.ok(cartMsg.includes('Hello Manha’z Hampers! ✨'));
  assert.ok(cartMsg.includes("1. 11 Plates Ceremonial Seer Ensemble"));
  assert.ok(cartMsg.includes("Quantity: 1"));
  assert.ok(cartMsg.includes("Occasion: Wedding"));
  assert.ok(cartMsg.includes("Theme: Maroon & Champagne Gold"));
  assert.ok(cartMsg.includes("For: Kavitha & Vignesh"));
  assert.ok(cartMsg.includes("2. Customized Name Wallet & Accessory Gift Set"));
  assert.ok(cartMsg.includes("Quantity: 2"));
  assert.ok(cartMsg.includes("For: Vignesh"));
  assert.ok(cartMsg.includes("Price on Enquiry"));
  assert.ok(cartMsg.includes("Please confirm the final price, product availability, payment options, and delivery details."));

  // Check URL generation
  const action = getWhatsAppActionUrl(cartMsg);
  assert.strictEqual(action.isDirectChat, true);
  assert.ok(action.url.startsWith('https://wa.me/916369926407?text='));
});

test('4. General Custom Gift and Wedding Gifting Templates', () => {
  const generalMsg = buildGeneralCustomGiftMessage();
  assert.ok(generalMsg.includes('Hello Manha’z Hampers! ✨'));
  assert.ok(generalMsg.includes("I'd like to create a customized gift."));

  const weddingMsg = buildWeddingEnquiryMessage();
  assert.ok(weddingMsg.includes('Hello Manha’z Hampers! ✨'));
  assert.ok(weddingMsg.includes('wedding & trousseau gifting arrangements'));
});

test('5. Image URLs Integrity & Non-Broken Assets', () => {
  const brokenId = '1607344645866-009c320c5ab8';
  for (const cat of categoriesData) {
    assert.ok(cat.image.startsWith('https://'), `Category ${cat.id} must have a valid HTTPS image URL`);
    assert.ok(!cat.image.includes(brokenId), `Category ${cat.id} must not use broken image ID`);
  }
  for (const occ of occasionsData) {
    assert.ok(occ.image.startsWith('https://'), `Occasion ${occ.id} must have a valid HTTPS image URL`);
    assert.ok(!occ.image.includes(brokenId), `Occasion ${occ.id} must not use broken image ID`);
  }
  for (const prod of productsData) {
    assert.ok(prod.images.length > 0, `Product ${prod.id} must have at least one image`);
    for (const img of prod.images) {
      assert.ok(img.startsWith('https://'), `Product ${prod.id} image must be HTTPS`);
      assert.ok(!img.includes(brokenId), `Product ${prod.id} must not use broken image ID`);
    }
  }
});

test('6. Tamil Text, Emojis & Special Characters Preservation', () => {
  const tamilProduct = productsData[0];
  const formData = {
    quantity: 1,
    occasion: 'திருமணம் (Wedding)',
    recipientName: 'கவிதா & விக்னேஷ் ❤️',
    colorTheme: 'சிவப்பு & பொன் நிறம் (Maroon & Gold ✨)',
    budget: '₹5,000+',
    deliveryDate: '2026-12-15',
    instructions: 'மண்டபத்திற்கு ஏற்ப பூக்கள் மற்றும் மாலை தட்டுகள் தேவை (Plate decor with fresh garland).',
  };

  const message = buildProductWhatsAppMessage(tamilProduct, formData);
  assert.ok(message.includes('கவிதா & விக்னேஷ் ❤️'));
  assert.ok(message.includes('திருமணம் (Wedding)'));
  assert.ok(message.includes('சிவப்பு & பொன் நிறம்'));

  const action = getWhatsAppActionUrl(message);
  assert.strictEqual(action.isDirectChat, true);
  assert.ok(action.url.includes(encodeURIComponent('கவிதா & விக்னேஷ் ❤️')));
});

test('7. Excessively Long Message Truncation & Clipboard Safeguard', () => {
  // Generate a mock message that exceeds 1800 characters
  const repeatText = 'Bespoke handcrafting with custom golden brocade, pearl inlays, and customized tags. ';
  const hugeText = repeatText.repeat(35); // ~2900 chars
  assert.ok(encodeURIComponent(hugeText).length > 1800);

  const action = getWhatsAppActionUrl(hugeText);
  assert.strictEqual(action.isDirectChat, true);
  assert.strictEqual(action.isTruncatedForUrl, true);
  assert.strictEqual(action.messageText, hugeText);
  assert.ok(action.url.includes('wa.me/916369926407'));
  assert.ok(action.url.length < 1800, 'URL query should remain safely below browser length limits');
});

test('8. Ready-Made Orders Without Customization', () => {
  const sampleProduct = productsData[1];
  const emptyForm = {
    quantity: 2,
    occasion: '',
    recipientName: '',
    colorTheme: '',
    budget: '',
    deliveryDate: '',
    instructions: '',
  };

  const message = buildProductWhatsAppMessage(sampleProduct, emptyForm);
  assert.ok(message.includes('Quantity: 2'));
  assert.ok(message.includes('Customization: Standard ready-made artisan arrangement'));
  assert.ok(!message.includes('Occasion:'));
  assert.ok(!message.includes('Recipient Name:'));
});
