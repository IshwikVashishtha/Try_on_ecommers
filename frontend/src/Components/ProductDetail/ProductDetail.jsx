import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useStore } from "../../context/StoreContext";
import { fetchUnifiedProducts } from "../../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const [tryOnImages, setTryOnImages] = useState([]);
  const [tryOnLoading, setTryOnLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 }); // reset scroll on nav
    setLoading(true);
    setError(null);
    setTryOnImages([]); // reset try on images on new product load

    const productId = String(id || "");
    const isDummyJson = productId.startsWith("dummyjson-");
    const isFakeStore = productId.startsWith("fakestore-");
    const normalizedId = productId
      .replace("dummyjson-", "")
      .replace("fakestore-", "");

    const primaryUrl = isDummyJson
      ? `https://dummyjson.com/products/${normalizedId}`
      : isFakeStore
        ? `https://fakestoreapi.com/products/${normalizedId}`
        : null;

    const primaryRequest = primaryUrl
      ? fetch(primaryUrl)
      : Promise.reject(new Error("unsupported-primary-source"));

    primaryRequest
      .then((response) => {
        if (!response.ok) {
          throw new Error("primary-fetch-failed");
        }
        return response.json();
      })
      .then((data) => {
        const normalized = isDummyJson
          ? {
              ...data,
              id: `dummyjson-${data.id}`,
              image: data.thumbnail,
            }
          : {
              ...data,
              id: `fakestore-${data.id}`,
              image: data.image,
              images: [data.image],
              rating: Number(data.rating?.rate) || 0,
            };
        setProduct({
          ...normalized,
        });
        setActiveImage(0);
        setLoading(false);
      })
      .catch(async () => {
        try {
          const products = await fetchUnifiedProducts();
          const fallback = products.find(
            (item) => String(item.id) === String(id),
          );
          if (!fallback) {
            throw new Error("fallback-fetch-failed");
          }
          setProduct(fallback);
          setActiveImage(0);
          setLoading(false);
        } catch {
          setError(true);
          setLoading(false);
        }
      });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "1280px",
          margin: "80px auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
        }}
      >
        <div
          className="skeleton-shimmer"
          style={{
            aspectRatio: "3/4",
            width: "100%",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="skeleton-shimmer" style={{ height: "16px", width: "30%" }} />
          <div className="skeleton-shimmer" style={{ height: "32px", width: "80%" }} />
          <div className="skeleton-shimmer" style={{ height: "32px", width: "60%" }} />
          <div className="skeleton-shimmer" style={{ height: "24px", width: "25%", marginTop: "8px" }} />
          <div className="skeleton-shimmer" style={{ height: "1px", width: "100%", marginTop: "8px" }} />
          <div className="skeleton-shimmer" style={{ height: "16px", width: "100%" }} />
          <div className="skeleton-shimmer" style={{ height: "16px", width: "90%" }} />
          <div className="skeleton-shimmer" style={{ height: "16px", width: "95%" }} />
          <div className="skeleton-shimmer" style={{ height: "52px", width: "100%", marginTop: "16px" }} />
          <div className="skeleton-shimmer" style={{ height: "52px", width: "100%" }} />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center bg-[var(--bg-primary)]">
        <h2 className="text-[var(--text-primary)] font-bold uppercase text-[24px] tracking-[0.1em] mb-4">
          PRODUCT NOT FOUND
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-[var(--text-primary)] text-[13px] uppercase tracking-[0.1em] font-bold border-b-2 border-[var(--text-primary)] pb-1 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors cursor-pointer bg-transparent"
        >
          ← BACK TO SHOP
        </button>
      </div>
    );
  }

  const normalizedProduct = {
    ...product,
    name: product.title,
    image: product.image,
  };
  const isInWishlist = state.wishlist.some((p) => p.id === product.id);
  const productPrice = Number(product.price) || 0;
  const discountPercentage = Number(product.discountPercentage) || 0;
  const explicitOriginal = Number(product.originalPrice ?? product.oldPrice);
  const normalizedExplicitOriginal =
    Number.isFinite(explicitOriginal) && explicitOriginal > productPrice
      ? explicitOriginal
      : null;
  const inferredOriginal =
    discountPercentage > 0 && discountPercentage < 100
      ? productPrice / (1 - discountPercentage / 100)
      : null;
  const oldPrice =
    normalizedExplicitOriginal ||
    (inferredOriginal && inferredOriginal > productPrice
      ? inferredOriginal
      : null);
  const hasDiscount =
    discountPercentage > 0 || Boolean(oldPrice && oldPrice > productPrice);
  const displayDiscount =
    discountPercentage > 0
      ? Math.round(discountPercentage)
      : oldPrice && oldPrice > productPrice
        ? Math.round(((oldPrice - productPrice) / oldPrice) * 100)
        : 0;

  // Derive original images
  const baseImages =
    product.images?.length > 0
      ? (() => {
          const cleanedImages = product.images
            .map((img) => img.replace(/[\[\]"]/g, ""))
            .filter(Boolean);
          if (cleanedImages.length === 1) {
            return [cleanedImages[0], cleanedImages[0], cleanedImages[0]];
          }
          return cleanedImages;
        })()
      : [product.image, product.image, product.image].filter(Boolean);

  // Combine original images with generated try-on images
  const images = [...baseImages, ...tryOnImages];
  const activeImageSrc = images[activeImage] || product.image;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...normalizedProduct, quantity },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Helper to convert base64 to Blob (for sending to backend)
  const base64ToBlob = (base64) => {
    const parts = base64.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

const handleTryOn = async () => {
    const userImageBase64 = localStorage.getItem("userImage");
    
    if (!userImageBase64) {
      alert("Please upload your photo using the camera icon in the top navigation bar first!");
      return;
    }

    // --- RESTORED: Check Session Storage First ---
    const cacheKey = `tryon_${product.id}`;
    const cachedTryOn = sessionStorage.getItem(cacheKey);

    if (cachedTryOn) {
      // If the image is not currently displayed, add it and switch to it
      if (!tryOnImages.includes(cachedTryOn)) {
        setTryOnImages((prev) => [...prev, cachedTryOn]);
        setActiveImage(baseImages.length + tryOnImages.length);
      } else {
        // If it's already in the list, just switch focus to it
        setActiveImage(images.indexOf(cachedTryOn));
      }
      return; // Exit early! Saves you an API call.
    }
    // ----------------------------------------

    try {
      setTryOnLoading(true);

      // 1. Convert user's base64 image from localStorage to a Blob
      const userBlob = base64ToBlob(userImageBase64);

      // 2. Fetch the current product image and convert to Blob
      const productResponse = await fetch(baseImages[0]);
      if (!productResponse.ok) throw new Error("Failed to fetch product image from store");
      const productBlob = await productResponse.blob();

      // 3. Prepare FormData for the backend
      const formData = new FormData();
      formData.append("user_image", userBlob, "user.jpg");
      formData.append("product_image", productBlob, "product.jpg");

      // 4. Call the FastAPI backend
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const backendUrl = `${baseUrl}/tryon`; 
      
      const apiResponse = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`Backend Error ${apiResponse.status}: ${errorText}`);
      }

      // 5. Read the resulting image blob
      const resultBlob = await apiResponse.blob();
      
      // 6. INSTANT DISPLAY: Use URL.createObjectURL for speed and zero crashing
      const instantImageUrl = URL.createObjectURL(resultBlob);
      setTryOnImages((prev) => [...prev, instantImageUrl]);
      setActiveImage(baseImages.length + tryOnImages.length);

      // 7. BACKGROUND CACHE: Compress and save safely to sessionStorage
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Compress as a JPEG to massively reduce file size for mobile limits
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        
        try {
          sessionStorage.setItem(cacheKey, compressedBase64);
        } catch (storageErr) {
          // If the phone is completely out of memory, we silently catch the error
          // The image will still show on screen, it just won't survive a page refresh
          console.warn("Storage full: Could not cache image.", storageErr);
        }
      };
      img.src = instantImageUrl;

    } catch (err) {
      console.error("Virtual Try-On Failed:", err);
      alert("We're sorry, the virtual try-on service is currently experiencing high demand. Please try again later.");
    } finally {
      setTryOnLoading(false);
    }
  };

  return (
    <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left Col: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
            }}
          >
            <img
              src={activeImageSrc}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x500?text=NO+IMAGE";
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "12px",
              flexWrap: "wrap"
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                style={{
                  width: "72px",
                  height: "72px",
                  border:
                    activeImage === index
                      ? "2px solid var(--text-primary)"
                      : "1px solid var(--border-color)",
                  cursor: "pointer",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative"
                }}
              >
                <img
                  src={img}
                  alt={`view ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/72?text=?";
                  }}
                />
                {/* Visual indicator for generated try-on images */}
                {index >= baseImages.length && (
                  <div className="absolute bottom-0 w-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[8px] text-center font-bold">
                    TRY-ON
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="w-full md:w-1/2 flex flex-col py-2">
          <p className="text-[var(--text-secondary)] text-[12px] uppercase tracking-[0.15em] mb-4">
            {product.category}
          </p>
          <h1 className="text-[var(--text-primary)] font-bold text-[32px] md:text-[40px] uppercase tracking-[0.05em] mb-6 leading-[1.1]">
            {product.title}
          </h1>

          <div className="flex items-center gap-1 text-[var(--text-primary)] text-[14px] mb-6">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={
                  i < Math.round(product.rating || 0)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--border-color)]"
                }
              />
            ))}
            <span className="text-[var(--text-secondary)] text-[12px] ml-3 uppercase tracking-widest">
              ({Math.round((product.rating || 0) * 20)} rating)
            </span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-[var(--text-primary)] font-bold text-[28px] leading-none">
              ₹{productPrice.toFixed(2)}
            </span>
            {hasDiscount && oldPrice && (
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[var(--text-secondary)] text-[16px] line-through">
                  ₹{oldPrice.toFixed(2)}
                </span>
                <span className="bg-[var(--btn-bg)] text-[var(--btn-text)] text-[10px] uppercase font-bold tracking-[0.1em] px-[8px] py-[4px] rounded-none">
                  SAVE {displayDiscount}%
                </span>
              </div>
            )}
          </div>

          <div className="w-full h-[1px] bg-[var(--border-color)] mb-8"></div>

          <p className="text-[var(--text-secondary)] leading-[1.8] text-[15px] mb-8">
            {product.description ||
              "Crafted for everyday style with premium comfort and timeless TRY_ON-store detailing."}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            <p className="text-[var(--text-secondary)] text-[13px] uppercase tracking-widest">
              IN STOCK:{" "}
              <span className="text-[var(--text-primary)] font-bold">
                {product.stock || 12} UNITS
              </span>
            </p>
            <p className="text-[var(--text-secondary)] text-[13px] uppercase tracking-widest">
              BRAND:{" "}
              <span className="text-[var(--text-primary)] font-bold">
                {product.brand ||
                  product.source?.toUpperCase() ||
                  "TRY_ON STORE"}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 h-[56px]">
              {/* Quantity */}
              <div className="flex w-[140px] border border-[var(--border-color)]">
                <button
                  className="w-1/3 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <div className="w-1/3 flex items-center justify-center text-[var(--text-primary)] text-[14px] font-bold border-l border-r border-[var(--border-color)]">
                  {quantity}
                </div>
                <button
                  className="w-1/3 text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--bg-secondary)] cursor-pointer transition-colors"
                  onClick={() =>
                    setQuantity(Math.min(product.stock || 99, quantity + 1))
                  }
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className={`flex-1 bg-[var(--btn-bg)] border border-[var(--text-primary)] text-[var(--btn-text)] text-[13px] font-bold uppercase tracking-[0.1em] rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center ${added ? "bg-[var(--btn-hover)]" : "hover:bg-[var(--btn-hover)]"}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ ADDED" : "ADD TO CART"}
              </button>
            </div>

            <div className="flex gap-4">
              {/* Add to Wishlist */}
              <button
                className="flex-1 h-[56px] border border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all duration-300 rounded-none flex items-center justify-center gap-3 cursor-pointer"
                onClick={() => {
                  if (isInWishlist) {
                    dispatch({
                      type: "REMOVE_FROM_WISHLIST",
                      payload: normalizedProduct.id,
                    });
                  } else {
                    dispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: normalizedProduct,
                    });
                  }
                }}
              >
                {isInWishlist ? (
                  <GoHeartFill className="text-[20px]" />
                ) : (
                  <GoHeart className="text-[20px]" />
                )}
                {isInWishlist ? "REMOVE" : "WISHLIST"}
              </button>

              {/* Try On */}
              <button
                className={`flex-1 h-[56px] border border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-none flex items-center justify-center gap-3 ${tryOnLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] cursor-pointer'}`}
                onClick={handleTryOn}
                disabled={tryOnLoading}
              >
                {tryOnLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                    PROCESSING...
                  </>
                ) : (
                  "TRY ON"
                )}
              </button>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[var(--border-color)] mt-12 mb-8"></div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[var(--text-primary)] text-[13px] font-bold uppercase tracking-widest mb-1">
              PRODUCT DETAILS
            </h4>
            <ul className="text-[var(--text-secondary)] text-[14px] flex flex-col gap-3">
              <li>
                • SKU:{" "}
                <span className="text-[var(--text-primary)]">{product.id}</span>
              </li>
              <li>• Standard warranty and quality assurance included.</li>
              <li>• Estimated shipping in 3-5 business days.</li>
              <li>• Easy returns available based on policy terms.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;