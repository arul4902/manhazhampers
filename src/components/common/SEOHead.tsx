import React, { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  schemaData?: Record<string, unknown> | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage,
  schemaData,
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | ${siteConfig.brand.name}`
      : siteConfig.seo.defaultTitle;
    document.title = fullTitle;

    // 2. Update Description
    const metaDescription = description || siteConfig.seo.defaultDescription;
    let descElement = document.querySelector('meta[name="description"]');
    if (!descElement) {
      descElement = document.createElement('meta');
      descElement.setAttribute('name', 'description');
      document.head.appendChild(descElement);
    }
    descElement.setAttribute('content', metaDescription);

    // 3. Update Canonical URL
    const canonicalUrl = `${siteConfig.seo.siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', fullTitle);
    updateOrCreateMeta('og:description', metaDescription);
    updateOrCreateMeta('og:url', canonicalUrl);
    updateOrCreateMeta('og:image', ogImage || siteConfig.seo.defaultOgImage);
    updateOrCreateMeta('og:type', 'website');

    // 5. Schema JSON-LD injection
    const scriptId = 'dynamic-seo-schema';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [title, description, canonicalPath, ogImage, schemaData]);

  return null;
};

