"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function AuthModal() {
  const { user, login, register, logout, isLoginOpen, setIsLoginOpen } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError("Lutfen adinizi girin");
          setIsLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (!success) {
          setError("Bu e-posta adresi zaten kullaniliyor");
        }
      } else {
        const success = await login(email, password);
        if (!success) {
          setError("E-posta veya sifre hatali");
        }
      }
    } catch {
      setError("Bir hata olustu, lutfen tekrar deneyin");
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    resetForm();
  };

  // If user is logged in, show profile
  if (user) {
    return (
      <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <SheetContent className="w-full sm:max-w-md bg-white">
          <SheetHeader>
            <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">Hesabim</SheetTitle>
          </SheetHeader>

          <div className="py-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#F7F6F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-[#095246]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-[#2B2B2B]">{user.name}</h3>
              <p className="text-sm text-[#6D6B68]">{user.email}</p>
            </div>

            <Separator className="my-6 bg-[#E5E5E5]" />

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Siparislerim (Yakinda)
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorilerim (Yakinda)
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Hesap Ayarlari (Yakinda)
              </Button>
            </div>

            <Separator className="my-6 bg-[#E5E5E5]" />

            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={logout}
            >
              Cikis Yap
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Login/Register form
  return (
    <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">
            {isRegister ? "Uye Ol" : "Giris Yap"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="py-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-[#6D6B68] mb-1">
                Ad Soyad
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adiniz Soyadiniz"
                className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#6D6B68] mb-1">
              E-posta
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6D6B68] mb-1">
              Sifre
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white py-5 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Yukleniyor..." : isRegister ? "Uye Ol" : "Giris Yap"}
          </Button>

          <Separator className="my-4 bg-[#E5E5E5]" />

          <p className="text-center text-sm text-[#6D6B68]">
            {isRegister ? "Zaten uye misiniz?" : "Henuz uye degil misiniz?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#095246] font-medium hover:text-[#BFAE8F] transition-colors"
            >
              {isRegister ? "Giris Yapin" : "Uye Olun"}
            </button>
          </p>
        </form>
      </SheetContent>
    </Sheet>
  );
}
