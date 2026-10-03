"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

interface CartUIContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartUIContext = createContext<CartUIContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: Event) => {
      e.preventDefault();
      openCart();
    };
    window.addEventListener("open-cart-drawer", handler);
    return () => window.removeEventListener("open-cart-drawer", handler);
  }, [mounted, openCart]);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <CartUIContext.Provider
      value={{ cartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
      {mounted && <CartDrawer />}
    </CartUIContext.Provider>
  );
}

export function useCartUI(): CartUIContextValue | null {
  return useContext(CartUIContext);
}
