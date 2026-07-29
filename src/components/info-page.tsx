import Link from "next/link";

type InfoSection = {
  title: string;
  body: readonly string[];
};

type InfoPageProps = {
  title: string;
  description: string;
  sections: readonly InfoSection[];
};

export function InfoPage({ title, description, sections }: InfoPageProps) {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="section-line">
              <h1 className="section-title">{title}</h1>
            </div>
            <p className="mt-8 text-center text-muted-foreground font-sans leading-relaxed">
              {description}
            </p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8 text-center">
              <p className="text-sm text-muted-foreground font-sans mb-4">
                Daha fazla bilgi için bizimle iletişime geçebilirsiniz.
              </p>
              <Link href="/iletisim" className="btn-outline inline-block">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
