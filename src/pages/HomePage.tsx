import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { OccasionGrid } from '../components/home/OccasionGrid';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { HowItWorks } from '../components/home/HowItWorks';
import { WeddingSection } from '../components/home/WeddingSection';
import { PersonalizedGifts } from '../components/home/PersonalizedGifts';
import { AboutSection } from '../components/home/AboutSection';
import { InstagramGallery } from '../components/home/InstagramGallery';
import { FAQSection } from '../components/home/FAQSection';
import { ContactSection } from '../components/home/ContactSection';
import { RecentlyViewed } from '../components/catalogue/RecentlyViewed';
import { SEOHead } from '../components/common/SEOHead';
import { siteConfig } from '../data/siteConfig';
import type { Product } from '../types/index.ts';

interface HomePageProps {
  onOpenCustomEnquiry: () => void;
  onViewProductDetails: (product: Product) => void;
  recentlyViewed: Product[];
  onShowToast: (title: string, message?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenCustomEnquiry,
  onViewProductDetails,
  recentlyViewed,
  onShowToast,
}) => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.brand.fullName,
    alternateName: siteConfig.brand.name,
    description: siteConfig.brand.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '229/1, Natraj Rd, opposite Nesakarangal Trust, Ayyanthirumaligai, Periyakollappatty',
      addressLocality: 'Salem (M.Corp.)',
      addressRegion: 'Tamil Nadu',
      postalCode: '636008',
      addressCountry: 'IN',
    },
    url: siteConfig.seo.siteUrl,
    sameAs: [siteConfig.contact.instagramUrl, siteConfig.contact.whatsappCatalogueUrl],
    priceRange: '$$',
  };

  return (
    <>
      <SEOHead
        title="Customized Gifts, Wedding Seer &amp; Plate Decor in Salem"
        description={siteConfig.seo.defaultDescription}
        canonicalPath="/"
        schemaData={localBusinessSchema}
      />
      <HeroSection onOpenCustomEnquiry={onOpenCustomEnquiry} />
      <OccasionGrid />
      <CategoryGrid />
      <FeaturedProducts onViewProductDetails={onViewProductDetails} />
      <HowItWorks />
      <WeddingSection onShowToast={onShowToast} />
      <PersonalizedGifts
        onViewProductDetails={onViewProductDetails}
        onOpenCustomEnquiry={onOpenCustomEnquiry}
      />
      <AboutSection />
      <InstagramGallery />
      <FAQSection />
      <ContactSection onShowToast={onShowToast} />
      <RecentlyViewed
        products={recentlyViewed}
        onViewProductDetails={onViewProductDetails}
      />
    </>
  );
};
