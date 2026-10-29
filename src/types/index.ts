export type CategoryId =
  | 'customized-hampers'
  | 'plate-decor'
  | 'wedding-seer'
  | 'engagement-seer'
  | 'trousseau-packing'
  | 'return-gifts'
  | 'flower-bouquets'
  | 'chocolate-bouquets'
  | 'chocolate-towers'
  | 'personalized-gifts'
  | 'wooden-trays-baskets';

export type OccasionId =
  | 'birthday'
  | 'wedding'
  | 'engagement'
  | 'anniversary'
  | 'baby-shower'
  | 'festivals'
  | 'return-gifts'
  | 'personalized-surprises';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Occasion {
  id: OccasionId;
  name: string;
  subtitle: string;
  image: string;
  categoryFilter?: CategoryId;
}

export interface ProductCustomizationConfig {
  allowThemeSelection?: boolean;
  allowRecipientName?: boolean;
  allowDateSelection?: boolean;
  allowBudgetSelection?: boolean;
  allowQuantity?: boolean;
  customizationPlaceholder?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  categoryName: string;
  occasions: OccasionId[];
  shortDescription: string;
  fullDescription: string;
  priceDisplay: string; // "Price on Enquiry" or provided formatted price
  unitPriceNumeric?: number; // numeric value if confirmed, undefined if "Price on Enquiry"
  isPriceOnEnquiry: boolean;
  images: string[];
  featured?: boolean;
  isWeddingCollection?: boolean;
  isPersonalizedCollection?: boolean;
  craftsmanshipNotes?: string[];
  customizationConfig?: ProductCustomizationConfig;
  tags?: string[];
}

export interface EnquiryFormData {
  quantity: number;
  occasion: string;
  recipientName: string;
  colorTheme: string;
  budget: string;
  deliveryDate: string;
  instructions: string;
}

export interface CartCustomization {
  occasion?: string;
  recipientName?: string;
  colorTheme?: string;
  budget?: string;
  deliveryDate?: string;
  instructions?: string;
}

export interface CartItem {
  id: string; // unique stable line identifier
  productId: string;
  productName: string;
  productSlug: string;
  category: CategoryId;
  categoryName: string;
  image: string;
  quantity: number;
  priceDisplay: string;
  unitPriceNumeric?: number;
  customization: CartCustomization;
  addedAt: number;
}

export interface SiteConfig {
  brand: {
    name: string;
    fullName: string;
    tagline: string;
    subtitle: string;
    announcementText: string;
    description: string;
  };
  contact: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    googleMapsUrl: string;
    instagramUrl: string;
    instagramHandle: string;
    whatsappCatalogueUrl: string;
    whatsappBusinessNumber: string | null;
    phoneDisplay: string;
  };
  businessRules: {
    priceNotice: string;
    confirmationNotice: string;
    primaryServiceArea: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
  theme: {
    colors: {
      warmIvory: string;
      pureWhite: string;
      deepBurgundy: string;
      mutedRose: string;
      champagneGold: string;
      darkEspresso: string;
      softBeige: string;
    };
  };
}
