const hiddenPublicProductNames = new Set([
  "aden kolye",
  "alina kolye",
  "alora kolye",
  "aria 2 kolye",
  "aria kolye",
  "arya kolye",
  "clara kolye",
  "dalia kolye",
  "dora kolye",
  "ela 2 kolye",
  "ela kolye",
  "elya kolye",
  "iris kolye",
  "larin kolye",
  "lia 2 kolye",
  "lia kolye",
  "liva kolye",
  "lora kolye",
  "maya kolye",
  "melina kolye",
  "mina 2 kolye",
  "mina kolye",
  "mira 2 kolye",
  "mira kolye",
  "mona kolye",
  "narin kolye",
  "nessa kolye",
  "nila kolye",
  "nora kolye",
  "nova 2 kolye",
  "nova kolye",
  "riva 2 kolye",
  "riva kolye",
  "rosa kolye",
  "sera kolye",
  "siena kolye",
  "sonia kolye",
  "vesta kolye",
  "vina kolye",
]);

function normalizeProductName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function isPublicProductHidden(product: { name: string }) {
  return hiddenPublicProductNames.has(normalizeProductName(product.name));
}

export function filterPublicProducts<T extends { name: string }>(products: T[]) {
  return products.filter((product) => !isPublicProductHidden(product));
}
