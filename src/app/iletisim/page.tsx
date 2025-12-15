"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad gereklidir";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Ad Soyad en az 2 karakter olmalidir";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Gecerli bir e-posta adresi giriniz";
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone.trim() && !/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Gecerli bir telefon numarasi giriniz";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Mesaj gereklidir";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleWhatsApp = () => {
    const text = "Merhaba, Yazici Atolye ile iletisime gecmek istiyorum.";
    window.open(`https://wa.me/902121234567?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
            Iletisim
          </h1>
          <p className="text-muted-foreground">
            Bize ulasin, sorularinizi yanitlayalim
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
              Bize Yazin
            </h2>

            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800">
                  Mesajiniz alindi! En kisa surede size donecegiz.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Adiniz Soyadiniz <span className="text-destructive">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`border-border focus:border-primary ${
                    errors.name ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  E-posta <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`border-border focus:border-primary ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Telefon
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`border-border focus:border-primary ${
                    errors.phone ? "border-destructive" : ""
                  }`}
                  placeholder="+90 (5XX) XXX XX XX"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Mesajiniz <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  rows={5}
                  className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:border-primary transition-colors ${
                    errors.message ? "border-destructive" : "border-border"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Gonderiliyor..." : "Gonder"}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Iletisim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Adres</h4>
                    <p className="text-muted-foreground">Istanbul, Turkiye</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Telefon</h4>
                    <a
                      href="tel:+902121234567"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +90 (212) 123 45 67
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">E-posta</h4>
                    <a
                      href="mailto:info@yaziciatolye.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@yaziciatolye.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Calisma Saatleri</h4>
                    <p className="text-muted-foreground">
                      Pazartesi - Cumartesi: 10:00 - 19:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">WhatsApp ile Ulasin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Hizli iletisim icin WhatsApp uzerinden bize yazabilirsiniz.
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
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
