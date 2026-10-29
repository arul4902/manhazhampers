import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { CustomEnquiryModal } from './components/catalogue/CustomEnquiryModal';
import { ProductDetailsModal } from './components/catalogue/ProductDetailsModal';
import { GiftAssistantWidget } from './components/chat/GiftAssistantWidget';
import { Toast, ToastMessage } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { productsData } from './data/products';
import { Product } from './types';
import { getRecentlyViewedIds, addRecentlyViewedId } from './utils/storage';

// Internal App Content requiring Router context
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Toast notifications
  const showToast = useCallback(
    (title: string, message?: string, type: 'success' | 'info' = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      const newToast: ToastMessage = { id, title, message, type };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Refresh recently viewed
  const refreshRecentlyViewed = useCallback(() => {
    const ids = getRecentlyViewedIds();
    const items = ids
      .map((id) => productsData.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    setRecentlyViewed(items);
  }, []);

  useEffect(() => {
    refreshRecentlyViewed();
  }, [refreshRecentlyViewed]);

  const handleViewProduct = (product: Product) => {
    addRecentlyViewedId(product.id);
    refreshRecentlyViewed();
    // Navigate to dedicated product route
    navigate(`/product/${product.slug}`);
  };

  const handleOpenProductModal = (product: Product) => {
    addRecentlyViewedId(product.id);
    refreshRecentlyViewed();
    setActiveModalProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-espresso-900 selection:bg-rose-200 selection:text-burgundy-900">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Primary Header with [LOGO] [Nav Links] [Search] [Cart] [WhatsApp] */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGeneralEnquiry={() => setIsCustomModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenCustomEnquiry={() => setIsCustomModalOpen(true)}
                onViewProductDetails={handleOpenProductModal}
                recentlyViewed={recentlyViewed}
                onShowToast={showToast}
              />
            }
          />
          <Route
            path="/category/:categoryId"
            element={
              <CategoryPage
                onViewProductDetails={handleOpenProductModal}
                onOpenCustomEnquiry={() => setIsCustomModalOpen(true)}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoryPage
                onViewProductDetails={handleOpenProductModal}
                onOpenCustomEnquiry={() => setIsCustomModalOpen(true)}
              />
            }
          />
          <Route
            path="/collections"
            element={
              <CategoryPage
                onViewProductDetails={handleOpenProductModal}
                onOpenCustomEnquiry={() => setIsCustomModalOpen(true)}
              />
            }
          />
          <Route
            path="/product/:slug"
            element={
              <ProductDetailPage
                onShowToast={showToast}
                onViewProductDetails={handleViewProduct}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage onShowToast={showToast} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Refined Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp isHidden={isChatOpen} />

      {/* AI Gifting Assistant Widget */}
      <GiftAssistantWidget
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        onShowToast={showToast}
        onOpenProductModal={handleOpenProductModal}
      />

      {/* Cart Drawer */}
      <CartDrawer onShowToast={showToast} />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onViewProduct={handleViewProduct}
      />

      {/* Custom Gifting Enquiry Modal */}
      <CustomEnquiryModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Quick View Product Customization Modal */}
      <ProductDetailsModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onShowToast={showToast}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
