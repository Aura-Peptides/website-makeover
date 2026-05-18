"use client";

import { useEffect, useState } from "react";

import { normalizeCartItems, type CartItemInput } from "@/lib/products";

const CART_STORAGE_KEY = "aura-peptides-cart";
const cartListeners = new Set<() => void>();

function emitCartChange() {
  for (const listener of cartListeners) {
    listener();
  }
}

function readStoredCart(): CartItemInput[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return normalizeCartItems(parsedValue);
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItemInput[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCartItems(items)));
  emitCartChange();
}

export function addCartItem(productId: string, quantity: number) {
  writeStoredCart([...readStoredCart(), { productId, quantity }]);
}

export function setCartItemQuantity(productId: string, quantity: number) {
  const nextItems = readStoredCart()
    .map((item) => (item.productId === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  writeStoredCart(nextItems);
}

export function removeCartItem(productId: string) {
  writeStoredCart(readStoredCart().filter((item) => item.productId !== productId));
}

export function clearCart() {
  writeStoredCart([]);
}

export function useCartItems() {
  const [items, setItems] = useState<CartItemInput[]>([]);

  useEffect(() => {
    function syncCart() {
      setItems(readStoredCart());
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === CART_STORAGE_KEY) {
        syncCart();
      }
    }

    syncCart();
    cartListeners.add(syncCart);
    window.addEventListener("storage", handleStorage);

    return () => {
      cartListeners.delete(syncCart);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return items;
}
