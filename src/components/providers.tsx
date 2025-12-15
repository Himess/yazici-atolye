"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { SearchProvider } from "@/lib/search-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <SearchProvider>{children}</SearchProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
