import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { CartItem, CartCustomization, Product } from '../types/index.ts';
import { productsData } from '../data/products';

const CART_STORAGE_KEY = 'manhaz_cart_v2';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, customization?: CartCustomization) => CartItem;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalPriced: number;
  hasUnpricedItems: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to create a deterministic hash from customization to detect truly identical items
function generateCustomizationKey(customization: CartCustomization): string {
  const norm = {
    occasion: (customization.occasion || '').trim().toLowerCase(),
    recipientName: (customization.recipientName || '').trim().toLowerCase(),
    colorTheme: (customization.colorTheme || '').trim().toLowerCase(),
    budget: (customization.budget || '').trim().toLowerCase(),
    deliveryDate: (customization.deliveryDate || '').trim(),
    instructions: (customization.instructions || '').trim().toLowerCase(),
  };
  return JSON.stringify(norm);
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Reconcile against current catalogue data to protect data integrity
        return parsed
          .filter(
            (item) =>
              item &&
              typeof item.id === 'string' &&
              typeof item.productId === 'string'
          )
          .map((item) => {
            const currentProduct = productsData.find((p) => p.id === item.productId);
            if (currentProduct) {
              return {
                ...item,
                productName: currentProduct.name,
                productSlug: currentProduct.slug,
                category: currentProduct.category,
                categoryName: currentProduct.categoryName,
                priceDisplay: currentProduct.priceDisplay,
                unitPriceNumeric: currentProduct.unitPriceNumeric,
                image: currentProduct.images[0] || item.image,
                quantity: Math.max(1, Math.min(100, Number(item.quantity) || 1)),
                customization: item.customization || {},
              };
            }
            return item;
          });
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to local storage safely
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors in private mode
    }
  }, [items]);

  const addItem = (
    product: Product,
    quantity: number,
    customization: CartCustomization = {}
  ): CartItem => {
    const rawQty = Number(quantity);
    const validQty = isNaN(rawQty) || rawQty <= 0 ? 1 : Math.min(100, Math.floor(rawQty));
    const customKey = generateCustomizationKey(customization);

    let createdOrUpdatedItem: CartItem;

    setItems((prevItems) => {
      // Check if an existing line matches both productId AND exact customization
      const existingIndex = prevItems.findIndex(
        (i) => i.productId === product.id && generateCustomizationKey(i.customization) === customKey
      );

      if (existingIndex > -1) {
        // Update quantity of existing line
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = Math.min(100, existing.quantity + validQty);
        createdOrUpdatedItem = { ...existing, quantity: newQty };
        updated[existingIndex] = createdOrUpdatedItem;
        return updated;
      }

      // Create new distinct cart line
      const uniqueId = `cart-${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      createdOrUpdatedItem = {
        id: uniqueId,
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        category: product.category,
        categoryName: product.categoryName,
        image: product.images[0] || '',
        quantity: validQty,
        priceDisplay: product.priceDisplay,
        unitPriceNumeric: product.unitPriceNumeric,
        customization: { ...customization },
        addedAt: Date.now(),
      };

      return [createdOrUpdatedItem, ...prevItems];
    });

    return createdOrUpdatedItem!;
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const rawQty = Number(quantity);
    if (isNaN(rawQty) || rawQty <= 0) {
      removeItem(id);
      return;
    }
    const cleanQty = Math.min(100, Math.max(1, Math.floor(rawQty)));
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: cleanQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotalPriced = useMemo(() => {
    return items.reduce((sum, item) => {
      if (typeof item.unitPriceNumeric === 'number' && !isNaN(item.unitPriceNumeric) && item.unitPriceNumeric > 0) {
        return sum + item.unitPriceNumeric * item.quantity;
      }
      return sum;
    }, 0);
  }, [items]);

  const hasUnpricedItems = useMemo(() => {
    return items.some((item) => typeof item.unitPriceNumeric !== 'number' || item.unitPriceNumeric <= 0);
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotalPriced,
    hasUnpricedItems,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
