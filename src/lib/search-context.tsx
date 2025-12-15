"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { products, Product } from "./products";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isSearching: boolean;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      // Search in product name
      if (product.name.toLowerCase().includes(query)) return true;
      // Search in product code
      if (product.code.toLowerCase().includes(query)) return true;
      // Search in description
      if (product.description.toLowerCase().includes(query)) return true;
      // Search in category
      if (product.categoryLabel.toLowerCase().includes(query)) return true;
      // Search in material
      if (product.material.toLowerCase().includes(query)) return true;
      // Search in stone types
      if (product.stones.some((stone) => stone.type.toLowerCase().includes(query))) return true;

      return false;
    });
  }, [searchQuery]);

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSetSearchQuery,
        searchResults,
        isSearching,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
