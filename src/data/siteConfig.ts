import type { SiteConfig } from '../types/index.ts';

/**
 * =========================================================================
 * CENTRAL CONFIGURATION — MANHA’Z HAMPERS
 * =========================================================================
 * Edit all business information, URLs, contacts, notices, and theme tokens
 * here. All components dynamically consume this configuration.
 */
export const siteConfig: SiteConfig = {
  brand: {
    name: "Manha’z Hampers",
    fullName: "Manha’z Hampers & Plate Decor",
    tagline: "Thoughtfully Gifted. Beautifully Remembered.",
    subtitle: "Customized Gifting, Wedding Seer & Plate Decor Studio",
    announcementText: "Thoughtfully curated gifts for your special moments.",
    description:
      "At Manha’z Hampers, every gift is an opportunity to make a moment feel special. From customized hampers and personalized creations to elegant plate decor and wedding gifting, explore thoughtful arrangements for your meaningful occasions.",
  },

  contact: {
    address:
      "229/1, Natraj Rd, opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty, Salem (M.Corp.), Tamil Nadu 636008, India.",
    city: "Salem (M.Corp.)",
    state: "Tamil Nadu",
    pincode: "636008",
    landmark: "Opposite Nesakarangal Trust",
    // Verified Google Maps search URL with exact coordinates/address encoded
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "229/1, Natraj Rd, opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty, Salem (M.Corp.), Tamil Nadu 636008, India"
      ),
    instagramUrl: "https://www.instagram.com/manhaz_hampers/",
    instagramHandle: "@manhaz_hampers",
    whatsappCatalogueUrl: "https://wa.me/c/270698954141760",
    phoneDisplay: "+91 63699 26407",

    /**
     * Confirmed official client WhatsApp & call contact number.
     * International format without spaces/symbols for wa.me links: 916369926407
     */
    whatsappBusinessNumber: "916369926407",
  },

  businessRules: {
    priceNotice: "Price on Enquiry",
    confirmationNotice:
      "Your enquiry will be sent to WhatsApp. Product availability, final pricing, payment, and delivery will be confirmed by our team.",
    primaryServiceArea:
      "Serving Salem, Tamil Nadu and surrounding regions with bespoke handcrafting and personal delivery consultation.",
  },

  seo: {
    siteUrl: "https://manhazhampers.com",
    defaultTitle: "Manha'z Hampers | Customized Gifts in Salem",
    defaultDescription:
      "Explore customized hampers, plate decor, wedding seer, trousseau packing and personalized gifts from Manha'z Hampers in Salem, Tamil Nadu. Enquire on WhatsApp.",
    defaultOgImage:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
  },

  theme: {
    colors: {
      warmIvory: "#FAF7F2",
      pureWhite: "#FFFFFF",
      deepBurgundy: "#6B1835",
      mutedRose: "#C78391",
      champagneGold: "#C5A36A",
      darkEspresso: "#29221F",
      softBeige: "#EDE4D9",
    },
  },
};
