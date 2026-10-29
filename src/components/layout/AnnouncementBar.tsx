import React from 'react';
import { siteConfig } from '../../data/siteConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      aria-label="Announcement"
      className="bg-burgundy-900 text-ivory-100 text-xs sm:text-[13px] py-2 px-4 tracking-wider text-center border-b border-gold-500/20 flex items-center justify-center gap-2"
      style={{ backgroundColor: '#2A0915' }}
    >
      <span className="text-gold-400 select-none text-xs">✨</span>
      <p className="font-light truncate max-w-xl">
        {siteConfig.brand.announcementText}
      </p>
      <span className="text-gold-400 select-none text-xs">✨</span>
    </aside>
  );
};

