import { siteConfig } from '../data/siteConfig.ts';
import type { Product, EnquiryFormData, CartItem } from '../types/index.ts';

/**
 * Builds the structured WhatsApp enquiry message for a specific product.
 * Omits empty or unselected fields dynamically.
 */
export function buildProductWhatsAppMessage(
  product: Product,
  formData: EnquiryFormData
): string {
  const lines: string[] = [
    'Hello Manha’z Hampers! ✨',
    '',
    "I'm interested in this creation from your website.",
    '',
    `Product: ${product.name}`,
    `Category: ${product.categoryName}`,
  ];

  if (formData.quantity && formData.quantity > 0) {
    lines.push(`Quantity: ${formData.quantity}`);
  }

  const customParts: string[] = [];
  if (formData.occasion && formData.occasion.trim()) {
    lines.push(`Occasion: ${formData.occasion.trim()}`);
    customParts.push('Occasion');
  }

  if (formData.recipientName && formData.recipientName.trim()) {
    lines.push(`Recipient Name: ${formData.recipientName.trim()}`);
    customParts.push('Recipient');
  }

  if (formData.colorTheme && formData.colorTheme.trim()) {
    lines.push(`Preferred Theme/Colours: ${formData.colorTheme.trim()}`);
    customParts.push('Theme');
  }

  if (formData.budget && formData.budget.trim()) {
    lines.push(`Budget: ${formData.budget.trim()}`);
    customParts.push('Budget');
  }

  if (formData.deliveryDate && formData.deliveryDate.trim()) {
    lines.push(`Preferred Delivery Date: ${formData.deliveryDate.trim()}`);
    customParts.push('Date');
  }

  if (formData.instructions && formData.instructions.trim()) {
    lines.push(`Customization Details: ${formData.instructions.trim()}`);
    customParts.push('Notes');
  }

  if (customParts.length === 0) {
    lines.push('Customization: Standard ready-made artisan arrangement');
  }

  lines.push(`Price: ${product.priceDisplay}`);
  lines.push('');
  lines.push('Please confirm availability, custom themes, final pricing, and delivery details.');
  lines.push('');
  lines.push('Thank you!');

  return lines.join('\n');
}

/**
 * Builds the structured WhatsApp enquiry message for the ENTIRE CART.
 * Adheres strictly to the specification in Section 6.
 */
export function buildCartWhatsAppMessage(
  items: CartItem[],
  subtotalPriced: number,
  hasUnpricedItems: boolean
): string {
  const lines: string[] = [
    'Hello Manha’z Hampers! ✨',
    '',
    "I'd like to enquire about the following products from your website:",
    '',
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.productName}`);
    lines.push(`   Quantity: ${item.quantity}`);

    const customParts: string[] = [];
    if (item.customization.occasion && item.customization.occasion.trim()) {
      customParts.push(`Occasion: ${item.customization.occasion.trim()}`);
    }
    if (item.customization.recipientName && item.customization.recipientName.trim()) {
      customParts.push(`For: ${item.customization.recipientName.trim()}`);
    }
    if (item.customization.colorTheme && item.customization.colorTheme.trim()) {
      customParts.push(`Theme: ${item.customization.colorTheme.trim()}`);
    }
    if (item.customization.budget && item.customization.budget.trim()) {
      customParts.push(`Budget: ${item.customization.budget.trim()}`);
    }
    if (item.customization.deliveryDate && item.customization.deliveryDate.trim()) {
      customParts.push(`Date: ${item.customization.deliveryDate.trim()}`);
    }
    if (item.customization.instructions && item.customization.instructions.trim()) {
      customParts.push(`Notes: ${item.customization.instructions.trim()}`);
    }

    if (customParts.length > 0) {
      lines.push(`   Customization: ${customParts.join(' | ')}`);
    } else {
      lines.push('   Customization: Standard ready-made creation');
    }

    lines.push(`   Price: ${item.priceDisplay}`);
    lines.push('');
  });

  if (subtotalPriced > 0) {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(subtotalPriced);
    lines.push(`Subtotal of priced items: ${formatted}`);
  } else {
    lines.push('Subtotal of priced items: Price on Enquiry');
  }

  if (hasUnpricedItems) {
    lines.push('Note: Custom items and bespoke arrangements will be priced by the owner.');
  }

  lines.push('');
  lines.push('Please confirm the final price, product availability, payment options, and delivery details.');
  lines.push('');
  lines.push('Thank you!');

  return lines.join('\n');
}

/**
 * Builds the general custom gifting enquiry message.
 */
export function buildGeneralCustomGiftMessage(): string {
  return [
    'Hello Manha’z Hampers! ✨',
    '',
    "I'd like to create a customized gift.",
    '',
    'Occasion:',
    'Preferred Gift:',
    'Budget:',
    'Preferred Theme/Colours:',
    'Additional Details:',
    '',
    'Please help me explore the available options.',
    '',
    'Thank you!',
  ].join('\n');
}

/**
 * Builds the wedding & trousseau consultation message.
 */
export function buildWeddingEnquiryMessage(): string {
  return [
    'Hello Manha’z Hampers! ✨',
    '',
    "I'm enquiring about wedding & trousseau gifting arrangements for our upcoming celebration.",
    '',
    'Event Type: Wedding / Engagement / Trousseau',
    'Preferred Services: Plate Decor / Seer Trays / Trousseau Packing',
    'Estimated Date:',
    'Location: Salem / Surrounding Area',
    '',
    'Please share your available catalogue designs and consultation details.',
    '',
    'Thank you!',
  ].join('\n');
}

/**
 * Generates the WhatsApp URL:
 * - If verified business phone number is configured, uses direct chat: https://wa.me/<number>?text=<encoded>
 * - If query text exceeds URL length limits, delivers summary in URL and copies full manifest to clipboard
 * - If no verified number is available, falls back to the supplied catalogue link
 */
export function getWhatsAppActionUrl(messageText: string): {
  url: string;
  isDirectChat: boolean;
  messageText: string;
  isTruncatedForUrl: boolean;
} {
  const number = siteConfig.contact.whatsappBusinessNumber;

  if (number && number.trim().length > 0) {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);

    // If encoded string is longer than 1800 chars, send concise summary in URL and rely on clipboard
    if (encoded.length > 1800) {
      const summaryText = [
        'Hello Manha’z Hampers! ✨',
        '',
        'I am sending an order enquiry from your website.',
        '(My full customized order details have been copied to my clipboard and I am pasting them here now.)',
        '',
        'Thank you!',
      ].join('\n');

      return {
        url: `https://wa.me/${cleanNumber}?text=${encodeURIComponent(summaryText)}`,
        isDirectChat: true,
        messageText,
        isTruncatedForUrl: true,
      };
    }

    return {
      url: `https://wa.me/${cleanNumber}?text=${encoded}`,
      isDirectChat: true,
      messageText,
      isTruncatedForUrl: false,
    };
  }

  // Fallback to supplied catalogue URL
  return {
    url: siteConfig.contact.whatsappCatalogueUrl,
    isDirectChat: false,
    messageText,
    isTruncatedForUrl: false,
  };
}

/**
 * Copies message text to clipboard with modern navigator.clipboard or textarea fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}
