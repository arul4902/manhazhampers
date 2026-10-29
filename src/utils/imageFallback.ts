import React from 'react';

/**
 * High-luxury SVG data URI fallback.
 * Works 100% offline without network dependency, third-party CDN, or adblocker interference.
 */
export const FALLBACK_IMAGE_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#EDE4D9" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#996515" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect x="24" y="24" width="552" height="552" rx="28" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-dasharray="6 6" />
  
  <!-- Central Emblem -->
  <g transform="translate(300, 240)">
    <circle r="60" fill="#6B1835" />
    <circle r="52" fill="none" stroke="url(#gold)" stroke-width="1.5" />
    <!-- Monogram M -->
    <path d="M-22 22 L-22 -20 L0 5 L22 -20 L22 22" fill="none" stroke="#FAF7F2" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  
  <!-- Brand Typography -->
  <text x="300" y="360" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#6B1835" text-anchor="middle" letter-spacing="1">Manha’z Hampers</text>
  <text x="300" y="395" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#C5A36A" text-anchor="middle" letter-spacing="3">PLATE DECOR &amp; BESPOKE GIFTING</text>
  <text x="300" y="425" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#78350F" opacity="0.8" text-anchor="middle">Salem, Tamil Nadu</text>
</svg>
`.trim());

/**
 * Attaches to any <img onError={handleImageError} /> to gracefully recover if an external image fails.
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (!target.src.startsWith('data:image')) {
    target.src = FALLBACK_IMAGE_DATA_URI;
  }
};

