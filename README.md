# Manha’z Hampers & Plate Decor — Boutique Gifting Website

A luxury e-commerce gifting catalogue and direct WhatsApp enquiry website designed for **Manha’z Hampers & Plate Decor**, based in **Salem, Tamil Nadu, India**.

Inspired by the refined product aesthetics of Florango India & IVORA Gifting Studio and the organized catalogue experience of IGP & Liwu, this website is tailored specifically for South Indian wedding seer, bespoke hampers, plate decor, and personalized gifts.

---

## 🌸 Business Architecture & Order Flow

The business model follows a direct consultation and enquiry flow:

```
Browse Catalogue ➔ Select Creation ➔ Personalize Details ➔ Enquire on WhatsApp ➔ Owner Confirms Price, Availability, Payment & Delivery
```

- **No False Checkouts**: Avoids complex carts or artificial inventory systems.
- **Price on Enquiry**: Transparently displays "Price on Enquiry" for all handcrafted and seasonal items.
- **Direct WhatsApp Conversion**: Generates beautifully formatted, URL-encoded WhatsApp messages.
- **Verified Fallback**: Automatically connects to the verified WhatsApp catalogue (`https://wa.me/c/270698954141760`) with an automatic copy-to-clipboard backup.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Design System**: Warm Ivory (`#FAF7F2`), Deep Burgundy (`#6B1835`), Champagne Gold (`#C5A36A`), Dark Espresso (`#29221F`), Muted Rose (`#C78391`)
- **Typography**: Editorial Serif (`Cormorant Garamond`) paired with modern Sans-serif (`Plus Jakarta Sans`)
- **Icons**: Lucide React + custom SVG brand marks
- **Local Storage**: Built-in "Recently Viewed Creations" persistence and shareable URL query parameters (`?product=slug`)

---

## 📂 Project Organization

```
src/
├── data/
│   ├── siteConfig.ts     # ⭐️ CENTRAL CONFIG: Brand name, address, Instagram, WhatsApp number & URLs
│   ├── categories.ts     # 11 boutique categories & 8 celebration occasions
│   └── products.ts       # Products catalogue with descriptions, craftsmanship notes & images
├── types/
│   └── index.ts          # Type definitions for products, categories, forms & configs
├── utils/
│   ├── whatsapp.ts       # WhatsApp message generators, URL builders & clipboard helpers
│   └── storage.ts        # LocalStorage helpers for recently viewed & deep link query params
├── components/
│   ├── layout/           # AnnouncementBar, Header, Footer, FloatingWhatsApp
│   ├── home/             # HeroSection, OccasionGrid, CategoryGrid, FeaturedProducts,
│   │                     # HowItWorks, WeddingSection, PersonalizedGifts,
│   │                     # AboutSection, InstagramGallery, FAQSection, ContactSection
│   ├── catalogue/        # ProductCatalogue, ProductCard, ProductDetailsModal,
│   │                     # CustomEnquiryModal, RecentlyViewed
│   └── common/           # GoldDivider, Toast, InstagramIcon
├── App.tsx               # Root application coordinator & state management
├── main.tsx              # React DOM entrypoint
└── index.css             # Tailwind base & custom animations
```

---

## ⚙️ How to Update Content (Owner's Guide)

### 1. Updating Brand Details, Social Links or Phone Number
Open `src/data/siteConfig.ts`:
- **`whatsappBusinessNumber`**: When your direct business WhatsApp number is verified, enter it as a string (e.g. `'919876543210'`). When set to `null`, the website automatically routes enquiries to your verified WhatsApp catalogue link as a fallback.
- **`announcementText`**: Update the top announcement bar text.
- **`address`**: Edit the studio address if needed (Google Maps direction link updates automatically).

### 2. Adding or Editing Products
Open `src/data/products.ts`:
- Each product has `name`, `category`, `occasions`, `shortDescription`, `fullDescription`, `images`, `craftsmanshipNotes`, and `customizationConfig`.
- To swap an image, replace the URL in `images: ['...']` with your new photo URL or local asset path.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Production Preview
```bash
npm run preview
```

### Verification Tests
```bash
node --experimental-strip-types --test test-verification.mjs
```

---

## 📍 Business Information

- **Brand**: Manha’z Hampers & Plate Decor
- **Address**: 229/1, Natraj Rd, opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty, Salem (M.Corp.), Tamil Nadu 636008, India.
- **Instagram**: [https://www.instagram.com/manhaz_hampers/](https://www.instagram.com/manhaz_hampers/)
- **WhatsApp Catalogue**: [https://wa.me/c/270698954141760](https://wa.me/c/270698954141760)
- **Primary Market**: Salem and surrounding areas, Tamil Nadu

