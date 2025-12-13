"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("yazici-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login - in production, this would call an API
    // For now, check localStorage for registered users
    const users = JSON.parse(localStorage.getItem("yazici-users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
      };
      setUser(userData);
      localStorage.setItem("yazici-user", JSON.stringify(userData));
      setIsLoginOpen(false);
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulated registration - in production, this would call an API
    const users = JSON.parse(localStorage.getItem("yazici-users") || "[]");

    // Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In production, never store plain passwords!
    };

    users.push(newUser);
    localStorage.setItem("yazici-users", JSON.stringify(users));

    // Auto-login after registration
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    setUser(userData);
    localStorage.setItem("yazici-user", JSON.stringify(userData));
    setIsLoginOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("yazici-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isLoginOpen,
        setIsLoginOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
