"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajiniz alindi! En kisa surede size donecegiz.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-stone-900 mb-2">Iletisim</h1>
          <p className="text-stone-600">Bize ulasin, sorularinizi yanitlayalim</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-6">Bize Yazin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Adiniz Soyadiniz</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="border-stone-300 focus:border-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">E-posta</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="border-stone-300 focus:border-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Telefon</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border-stone-300 focus:border-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mesajiniz</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none"
                />
              </div>
              <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white">
                Gonder
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-stone-900">Iletisim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-medium text-stone-900">Adres</h4>
                    <p className="text-stone-600">Istanbul, Turkiye</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-medium text-stone-900">Telefon</h4>
                    <p className="text-stone-600">+90 (212) 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-medium text-stone-900">E-posta</h4>
                    <p className="text-stone-600">info@yaziciatolye.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-medium text-stone-900">Calisma Saatleri</h4>
                    <p className="text-stone-600">Pazartesi - Cumartesi: 10:00 - 19:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-stone-900">WhatsApp ile Ulasin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 mb-4">Hizli iletisim icin WhatsApp uzerinden bize yazabilirsiniz.</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp ile Yaz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
