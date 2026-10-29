import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { siteConfig } from '../../data/siteConfig';
import { GoldDivider } from '../common/GoldDivider';
import { handleImageError } from '../../utils/imageFallback';

export const InstagramGallery: React.FC = () => {
  const galleryItems = [
    {
      title: 'Ceremonial Seer Trays',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Pastel Flower Bouquets',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Engagement Ring Platter',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Gourmet Chocolate Bouquet',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Kundan Plate Decor',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Curated Birthday Hamper',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-50 border-b border-espresso-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-300 text-burgundy-900 text-xs font-semibold tracking-wider uppercase mb-2">
            <InstagramIcon className="w-3.5 h-3.5 text-burgundy-700" />
            <span>{siteConfig.contact.instagramHandle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy-900 mt-1">
            More Beautiful Creations
          </h2>
          <GoldDivider />
          <p className="text-sm sm:text-base text-espresso-700/80 leading-relaxed font-light">
            Discover more gifting inspiration on Instagram and explore our daily handcrafted orders in Salem.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-10">
          {galleryItems.map((item, idx) => (
            <a
              key={idx}
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-espresso-100 border border-gold-300/40 shadow-xs hover:shadow-luxury transition-all duration-300 block"
            >
              <img
                src={item.image}
                alt={item.title}
                onError={handleImageError}
                loading="lazy"
                width={300}
                height={300}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-ivory-100">
                <InstagramIcon className="w-5 h-5 text-gold-300 mb-1" />
                <span className="text-[11px] font-medium leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] text-ivory-300 flex items-center gap-0.5 mt-1">
                  <span>View on IG</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Instagram Profile CTA */}
        <div className="text-center">
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-ivory-50 text-burgundy-900 border border-gold-400 font-semibold text-xs sm:text-sm shadow-soft hover:shadow-md transition"
          >
            <InstagramIcon className="w-4 h-4 text-burgundy-600" />
            <span>Explore Our Instagram ({siteConfig.contact.instagramHandle})</span>
            <ArrowUpRight className="w-4 h-4 text-gold-600" />
          </a>
        </div>
      </div>
    </section>
  );
};
