import React from 'react';

interface GoldDividerProps {
  className?: string;
  withSparkle?: boolean;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = '',
  withSparkle = true,
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-400 to-gold-400 opacity-60" />
      {withSparkle && (
        <span className="text-gold-500 text-xs select-none">✦</span>
      )}
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-gold-400 to-gold-400 opacity-60" />
    </div>
  );
};

