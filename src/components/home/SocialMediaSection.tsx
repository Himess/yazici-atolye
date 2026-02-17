"use client";

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function SocialMediaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">SOSYAL MEDYADA BİZ</h2>
          <p className="text-muted-foreground font-sans">
            Bizi sosyal medyada takip edin, yeni koleksiyonlardan ve kampanyalardan haberdar olun
          </p>
        </div>

        {/* Facebook Embed */}
        <div className={`flex justify-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-white rounded-lg shadow-lg border border-border p-4 md:p-6 inline-block">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fyaziciatolye&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="500"
              height="400"
              className="max-w-full rounded"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Facebook Sayfamız"
            />
          </div>
        </div>

        {/* Sosyal Medya Butonları */}
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <a
            href="https://facebook.com/yaziciatolye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1664d9] transition-colors shadow-md font-sans font-semibold"
          >
            <Facebook className="w-5 h-5" />
            <span>Facebook&apos;ta Takip Et</span>
          </a>

          <a
            href="https://instagram.com/yaziciatolye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md font-sans font-semibold"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram&apos;da Takip Et</span>
          </a>

          <a
            href="https://youtube.com/@yaziciatolye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors shadow-md font-sans font-semibold"
          >
            <Youtube className="w-5 h-5" />
            <span>YouTube&apos;da Abone Ol</span>
          </a>
        </div>
      </div>
    </section>
  );
}
