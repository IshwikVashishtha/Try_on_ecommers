import React from "react";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate();
  const collections = [
    {
      title: "MEN'S WEAR",
      subtitle: "Shirts, Jackets & More",
      image:
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop",
      category: "mens",
    },
    {
      title: "WOMEN'S WEAR",
      subtitle: "Dresses, Tops & Style",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      category: "womens",
    },
    {
      title: "ACCESSORIES",
      subtitle: "Bags, Jewelry & More",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
      category: "accessories",
    },
  ];

  return (
    <div className="w-full bg-[var(--bg-primary)] min-h-screen pb-24">
      {/* Hero Banner */}
      <div
        style={{
          width: "100%",
          height: "420px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.50)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#FFFFFF",
            padding: "0 24px",
          }}
        >
          {/* Top decorative line */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.6)",
              margin: "0 auto 20px",
            }}
          />

          {/* Main heading */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            OUR COLLECTIONS
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.65)",
              marginTop: "16px",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            EXPLORE OUR CURATED EDIT
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="section-wrapper max-w-[1280px] mx-auto">
        <div className="section-heading-container" data-aos="fade-up">
          <span className="section-label">CURATED SELECTION</span>
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <div className="section-underline"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {collections.map((cat, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[var(--bg-secondary)]"
              onClick={() => navigate(`/?category=${cat.category}`)}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
              <div className="absolute inset-x-0 bottom-10 text-center transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-[var(--btn-text)] uppercase tracking-[0.2em] font-bold text-[14px] mb-2">
                  {cat.title}
                </h3>
                <p className="text-[var(--btn-text)] text-[12px] tracking-[0.1em] uppercase opacity-90">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
