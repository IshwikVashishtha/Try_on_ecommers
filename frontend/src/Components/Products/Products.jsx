import React, { useEffect, useMemo, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { fetchUnifiedProducts } from "../../services/productService";
import Filters from "../Filters/Filters";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { useToast } from "../Toast/ToastContext";

const PAGE_SIZE = 20;
const MIN_SALE_PERCENT = 12;

const extractSortId = (id) => {
  const matched = String(id).match(/(\d+)$/);
  return matched ? Number(matched[1]) : 0;
};

const getSaleMeta = (product) => {
  const price = Number(product?.price) || 0;
  const discountPercentage = Number(product?.discountPercentage) || 0;
  const explicitOriginal = Number(product?.originalPrice ?? product?.oldPrice);
  const normalizedExplicitOriginal =
    Number.isFinite(explicitOriginal) && explicitOriginal > price
      ? explicitOriginal
      : null;

  const inferredOriginal =
    discountPercentage > 0 && discountPercentage < 100
      ? price / (1 - discountPercentage / 100)
      : null;

  const originalPrice =
    normalizedExplicitOriginal && normalizedExplicitOriginal > price
      ? normalizedExplicitOriginal
      : inferredOriginal && inferredOriginal > price
        ? inferredOriginal
        : null;

  const hasDiscount =
    Boolean(normalizedExplicitOriginal && normalizedExplicitOriginal > price) ||
    (discountPercentage >= MIN_SALE_PERCENT && Boolean(originalPrice));

  return {
    hasDiscount,
    price,
    originalPrice: hasDiscount ? originalPrice : null,
  };
};

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useStore();
  const { showToast } = useToast();
  const { wishlist, searchQuery } = state;

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFatalError, setIsFatalError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    setIsFatalError(false);
    try {
      const unified = await fetchUnifiedProducts();
      setAllProducts(unified);
    } catch (error) {
      setIsFatalError(true);
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      const parsed = String(category).toLowerCase();
      const legacyCategoryMap = {
        beauty: "beauty",
        grooming: "beauty",
        fragrance: "beauty",
      };
      setActiveCategory(legacyCategoryMap[parsed] || parsed);
    }
  }, [location.search]);

  useEffect(() => {
    console.log(
      "Category distribution:",
      allProducts.reduce((acc, product) => {
        const key = product.category || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    );
  }, [allProducts]);

  const matchesCategory = (productCategory, filterCategory) => {
    const productCat = String(productCategory || "")
      .toLowerCase()
      .trim();
    const filterCat = String(filterCategory || "")
      .toLowerCase()
      .trim();

    if (filterCat === "all") return true;
    return productCat === filterCat;
  };

  const filteredProducts = useMemo(() => {
    const query = String(searchQuery || "")
      .toLowerCase()
      .trim();
    const next = allProducts
      .filter((p) => matchesCategory(p.category, activeCategory))
      .filter((p) => p.title.toLowerCase().includes(query))
      .filter((p) => maxPrice === 0 || p.price <= maxPrice)
      .sort((a, b) => {
        if (sortBy === "low-high") return a.price - b.price;
        if (sortBy === "high-low") return b.price - a.price;
        if (sortBy === "newest")
          return extractSortId(b.id) - extractSortId(a.id);
        return 0;
      });
    return next;
  }, [allProducts, activeCategory, searchQuery, sortBy, maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, maxPrice]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const showingFrom =
    filteredProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(currentPage * PAGE_SIZE, filteredProducts.length);

  const jumpToPage = (page) => {
    const clamped = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(clamped);
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const inWishlist = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    if (inWishlist(product.id)) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
      return;
    }
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSortBy("default");
    setMaxPrice(0);
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
  };

  if (isFatalError) {
    return (
      <section
        id="products-section"
        className="section-wrapper w-full max-w-[1280px] mx-auto"
      >
        <div className="flex flex-col items-center justify-center text-center p-[80px] border border-[var(--border-color)]">
          <div className="w-[48px] h-[48px] border-2 border-[var(--text-primary)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-[24px] font-bold mb-5">
            !
          </div>
          <h2 className="text-[var(--text-primary)] text-[20px] font-bold uppercase tracking-[0.1em] mb-3">
            SOMETHING WENT WRONG
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] mb-8">
            We couldn't load products. Please try again.
          </p>
          <button
            onClick={loadProducts}
            className="bg-[var(--btn-bg)] text-[var(--btn-text)] px-8 py-[14px] text-[13px] uppercase tracking-[0.1em] font-bold hover:bg-[var(--btn-hover)] transition-colors cursor-pointer"
          >
            TRY AGAIN
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products-section"
      className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <div className="section-heading-container" data-aos="fade-up">
        <span className="section-label">OUR COLLECTION</span>
        <h2 className="section-title">TRENDING NOW</h2>
        <div className="section-underline" />
      </div>

      <Filters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onPriceChange={setMaxPrice}
      />

      {!loading && (
        <p className="text-[13px] text-[var(--text-secondary)] uppercase tracking-[0.1em] mb-6">
          Showing {showingFrom}-{showingTo} of {filteredProducts.length}{" "}
          products
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-[var(--border-color)]">
          <h3 className="text-[20px] text-[var(--text-primary)] uppercase tracking-[0.1em] font-bold mb-3">
            NO PRODUCTS FOUND
          </h3>
          <p className="text-[var(--text-secondary)] mb-8">
            Try a different search term or category.
          </p>
          <button
            onClick={clearFilters}
            className="border border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] px-7 py-[13px] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all cursor-pointer"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageProducts.map((product) => {
              const wishlistActive = inWishlist(product.id);
              const saleMeta = getSaleMeta(product);
              const { hasDiscount, price } = saleMeta;
              const stars = Math.min(
                5,
                Math.max(0, Math.round(Number(product.rating) || 0)),
              );

              return (
                <article
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer border border-[var(--border-color)] bg-[var(--bg-primary)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all"
                >
                  <div className="relative aspect-[3/4] bg-[var(--bg-secondary)] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {hasDiscount && (
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="bg-[var(--btn-bg)] text-[var(--btn-text)] px-2 py-1 text-[10px] uppercase tracking-[0.1em] font-bold">
                          SALE
                        </span>
                      </div>
                    )}

                    <button
                      onClick={(event) => toggleWishlist(event, product)}
                      className="absolute top-3 right-3 text-[20px] text-[var(--text-primary)] cursor-pointer"
                      aria-label="Toggle wishlist"
                    >
                      {wishlistActive ? <GoHeartFill /> : <GoHeart />}
                    </button>

                    <button
                      onClick={(event) => handleAddToCart(event, product)}
                      className={`absolute bottom-0 left-0 w-full py-[14px] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--btn-text)] bg-[var(--btn-bg)] transform transition-all duration-300 cursor-pointer ${
                        addedItems[product.id]
                          ? "translate-y-0 bg-[var(--btn-hover)]"
                          : "translate-y-full group-hover:translate-y-0"
                      }`}
                    >
                      {addedItems[product.id] ? "ADDED" : "ADD TO CART"}
                    </button>
                  </div>

                  <div
                    className="px-4 py-4"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-primary)",
                        margin: "0 0 6px 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4",
                        minHeight: "34px",
                      }}
                    >
                      {product.title}
                    </p>

                    <div className="min-h-[18px]">
                      {stars > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-[14px]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <AiFillStar
                              key={`${product.id}-star-${index}`}
                              className={
                                index < stars
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--border-color)]"
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-3 flex items-center gap-3">
                      <span className="text-[15px] text-[var(--text-primary)] font-bold">
                        ₹{price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => jumpToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-[var(--border-color)] text-[var(--text-primary)] disabled:opacity-50 cursor-pointer"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const active = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => jumpToPage(page)}
                  className={`min-w-[36px] px-3 py-2 border text-[13px] uppercase tracking-[0.08em] cursor-pointer ${
                    active
                      ? "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--text-primary)]"
                      : "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => jumpToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-[var(--border-color)] text-[var(--text-primary)] disabled:opacity-50 cursor-pointer"
            >
              →
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Products;
