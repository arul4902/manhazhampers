import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Sparkles } from 'lucide-react';
import { GoldDivider } from '../components/common/GoldDivider';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 bg-ivory-50 text-center min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-700 flex items-center justify-center mb-4">
        <Sparkles className="w-7 h-7 text-gold-600" />
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-burgundy-900">
        Page Not Found
      </h1>
      <GoldDivider />
      <p className="text-xs sm:text-sm text-espresso-700/80 max-w-md mx-auto mb-8 font-light leading-relaxed">
        We couldn't find the page you were looking for. Explore our handcrafted collections or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-ivory-50 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/category/all"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-ivory-100 text-burgundy-900 border border-espresso-200 text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4 text-gold-600" />
        </Link>
      </div>
    </div>
  );
};

