const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800/F5F5F5/757575?text=No+Image";

const DUMMYJSON_MENS_SHIRTS_URL =
  import.meta.env.VITE_DUMMYJSON_MENS_SHIRTS_URL ||
  "https://dummyjson.com/products/category/mens-shirts";
const DUMMYJSON_MENS_SHOES_URL =
  import.meta.env.VITE_DUMMYJSON_MENS_SHOES_URL ||
  "https://dummyjson.com/products/category/mens-shoes";
const DUMMYJSON_WOMENS_DRESSES_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_DRESSES_URL ||
  "https://dummyjson.com/products/category/womens-dresses";
const DUMMYJSON_WOMENS_SHOES_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_SHOES_URL ||
  "https://dummyjson.com/products/category/womens-shoes";
const DUMMYJSON_WOMENS_BAGS_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_BAGS_URL ||
  "https://dummyjson.com/products/category/womens-bags";
const DUMMYJSON_WOMENS_JEWELLERY_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_JEWELLERY_URL ||
  "https://dummyjson.com/products/category/womens-jewellery";
const DUMMYJSON_SUNGLASSES_URL =
  import.meta.env.VITE_DUMMYJSON_SUNGLASSES_URL ||
  "https://dummyjson.com/products/category/sunglasses";
const DUMMYJSON_MENS_WATCHES_URL =
  import.meta.env.VITE_DUMMYJSON_MENS_WATCHES_URL ||
  "https://dummyjson.com/products/category/mens-watches";
const DUMMYJSON_WOMENS_WATCHES_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_WATCHES_URL ||
  "https://dummyjson.com/products/category/womens-watches";
const DUMMYJSON_TOPS_URL =
  import.meta.env.VITE_DUMMYJSON_TOPS_URL ||
  "https://dummyjson.com/products/category/tops";
const DUMMYJSON_BEAUTY_URL =
  import.meta.env.VITE_DUMMYJSON_BEAUTY_URL ||
  "https://dummyjson.com/products/category/beauty";
const DUMMYJSON_FRAGRANCES_URL =
  import.meta.env.VITE_DUMMYJSON_FRAGRANCES_URL ||
  "https://dummyjson.com/products/category/fragrances";
const FAKESTORE_MEN_URL =
  import.meta.env.VITE_FAKESTORE_MEN_URL ||
  "https://fakestoreapi.com/products/category/men's clothing";
const FAKESTORE_WOMEN_URL =
  import.meta.env.VITE_FAKESTORE_WOMEN_URL ||
  "https://fakestoreapi.com/products/category/women's clothing";
const FAKESTORE_JEWELRY_URL =
  import.meta.env.VITE_FAKESTORE_JEWELRY_URL ||
  "https://fakestoreapi.com/products/category/jewelery";
const ESCUELAJS_URL =
  import.meta.env.VITE_ESCUELAJS_URL ||
  "https://api.escuelajs.co/api/v1/products";

void ESCUELAJS_URL;

const normalizeCategory = (rawCategory, fallbackText = "") => {
  const category = String(rawCategory || "").toLowerCase();
  const text = `${category} ${String(fallbackText || "").toLowerCase()}`;

  if (
    text.includes("bag") ||
    text.includes("jewel") ||
    text.includes("watch") ||
    text.includes("sunglass") ||
    text.includes("accessor")
  ) {
    return "accessories";
  }

  if (
    text.includes("beauty") ||
    text.includes("lipstick") ||
    text.includes("makeup") ||
    text.includes("cosmetic") ||
    text.includes("fragrance") ||
    text.includes("skin")
  ) {
    return "beauty";
  }

  if (/\bwomen\b|\bwomens\b|\bwoman\b/.test(text)) return "womens";
  if (/\bmen\b|\bmens\b|\bman\b/.test(text)) return "mens";

  return "accessories";
};

const normalizeDummyJson = (p) => ({
  id: `dummyjson-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.thumbnail || p.images?.[0] || FALLBACK_IMAGE,
  images:
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : [p.thumbnail || FALLBACK_IMAGE],
  category: normalizeCategory(p.category, p.title),
  source: "dummyjson",
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand,
  description: p.description,
});

const normalizeFakeStore = (p) => ({
  id: `fakestore-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.image || FALLBACK_IMAGE,
  images: [p.image || FALLBACK_IMAGE],
  category: normalizeCategory(p.category, p.title),
  source: "fakestore",
  rating: Number(p.rating?.rate) || 0,
  description: p.description,
});

const hasValidImage = (image) =>
  typeof image === "string" &&
  /^https?:\/\//i.test(image.trim()) &&
  image.trim().length > 10;

const isBlockedProduct = (product) => {
  const text = `${product.title || ""} ${product.description || ""} ${
    product.category || ""
  }`
    .toLowerCase()
    .trim();

  const blockedWords = [
    "vegetable",
    "grocer",
    "food",
    "fruit",
    "kitchen",
    "beverage",
  ];

  return blockedWords.some((word) => text.includes(word));
};

const titleKey = (title) =>
  String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const fetchUnifiedProducts = async () => {
  const calls = [
    {
      apiName: "dummyjson-mens-shirts",
      run: async () => {
        const res = await fetch(DUMMYJSON_MENS_SHIRTS_URL);
        if (!res.ok) throw new Error(`DummyJSON mens-shirts ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-mens-shoes",
      run: async () => {
        const res = await fetch(DUMMYJSON_MENS_SHOES_URL);
        if (!res.ok) throw new Error(`DummyJSON mens-shoes ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-dresses",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_DRESSES_URL);
        if (!res.ok) {
          throw new Error(`DummyJSON womens-dresses ${res.status}`);
        }
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-shoes",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_SHOES_URL);
        if (!res.ok) {
          throw new Error(`DummyJSON womens-shoes ${res.status}`);
        }
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-bags",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_BAGS_URL);
        if (!res.ok) throw new Error(`DummyJSON womens-bags ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-jewellery",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_JEWELLERY_URL);
        if (!res.ok) {
          throw new Error(`DummyJSON womens-jewellery ${res.status}`);
        }
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-sunglasses",
      run: async () => {
        const res = await fetch(DUMMYJSON_SUNGLASSES_URL);
        if (!res.ok) throw new Error(`DummyJSON sunglasses ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-mens-watches",
      run: async () => {
        const res = await fetch(DUMMYJSON_MENS_WATCHES_URL);
        if (!res.ok) throw new Error(`DummyJSON mens-watches ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-watches",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_WATCHES_URL);
        if (!res.ok) {
          throw new Error(`DummyJSON womens-watches ${res.status}`);
        }
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-tops",
      run: async () => {
        const res = await fetch(DUMMYJSON_TOPS_URL);
        if (!res.ok) throw new Error(`DummyJSON tops ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-beauty",
      run: async () => {
        const res = await fetch(DUMMYJSON_BEAUTY_URL);
        if (!res.ok) throw new Error(`DummyJSON beauty ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-fragrances",
      run: async () => {
        const res = await fetch(DUMMYJSON_FRAGRANCES_URL);
        if (!res.ok) throw new Error(`DummyJSON fragrances ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "fakestore-mens",
      run: async () => {
        const res = await fetch(FAKESTORE_MEN_URL);
        if (!res.ok) throw new Error(`FakeStore mens ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
      },
    },
    {
      apiName: "fakestore-womens",
      run: async () => {
        const res = await fetch(FAKESTORE_WOMEN_URL);
        if (!res.ok) throw new Error(`FakeStore womens ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
      },
    },
    {
      apiName: "fakestore-jewelry",
      run: async () => {
        const res = await fetch(FAKESTORE_JEWELRY_URL);
        if (!res.ok) throw new Error(`FakeStore jewelry ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
      },
    },
  ];

  const results = await Promise.allSettled(calls.map((item) => item.run()));

  const successful = [];
  let failures = 0;

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      successful.push(...result.value);
      return;
    }
    failures += 1;
    console.warn("API failed:", calls[index].apiName, result.reason);
  });

  if (failures === calls.length) {
    throw new Error("ALL_APIS_FAILED");
  }

  const dedupe = new Set();
  const unified = successful
    .filter((p) => Boolean(p.title))
    .filter((p) => hasValidImage(p.image))
    .filter((p) => Number(p.price) > 0)
    .filter((p) => !isBlockedProduct(p))
    .filter((p) => {
      const key = titleKey(p.title);
      if (!key || dedupe.has(key)) {
        return false;
      }
      dedupe.add(key);
      return true;
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  return unified;
};
