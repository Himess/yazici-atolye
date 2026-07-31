import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <XCircle className="mx-auto mb-5 h-14 w-14 text-red-500" />
      <h1 className="font-serif text-4xl font-semibold text-stone-900">Odeme tamamlanamadi</h1>
      <p className="mx-auto mt-3 max-w-xl text-stone-600">
        Kart bilgileri, 3D Secure onayi veya banka cevabi nedeniyle islem tamamlanmamis olabilir.
      </p>
      <Button asChild className="mt-8 bg-primary text-primary-foreground">
        <Link href="/odeme">Tekrar Dene</Link>
      </Button>
    </div>
  );
}
