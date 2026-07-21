import React, { useEffect, useState } from "react";

const tabs = ["all", "mens", "womens", "accessories", "beauty"];

const Filters = ({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  onPriceChange,
}) => {
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    onPriceChange(maxPrice);
  }, [maxPrice, onPriceChange]);

  return (
    <div className="mb-10 overflow-x-auto scroll">
      <div className="inline-flex items-end min-w-max gap-6 border-b border-[var(--border-color)] pb-4">
        <div className="inline-flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`group relative pb-2 text-[12px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                  isActive
                    ? "text-[var(--text-primary)] font-bold border-b-2 border-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[#575757]"
                }`}
              >
                {tab}
                {!isActive && (
                  <span className="absolute left-0 -bottom-[2px] h-[2px] w-0 bg-[var(--btn-bg)] transition-all duration-300 group-hover:w-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="w-px h-8 bg-[var(--border-color)]" />

        <div className="inline-flex items-end gap-2">
          <div style={{ width: "320px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "nowrap",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                PRICE
              </span>

              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  minWidth: "80px",
                  textAlign: "right",
                }}
              >
                {maxPrice === 0 ? "ALL" : ` ₹${maxPrice}`}
              </span>

              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{
                  width: "140px",
                  flexShrink: 0,
                  accentColor: "var(--btn-bg)",
                  cursor: "pointer",
                  height: "2px",
                  margin: "0",
                }}
              />

              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                ₹500
              </span>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-[var(--border-color)] px-4 py-[10px] text-[13px] uppercase tracking-[0.08em] text-[var(--text-primary)] bg-[var(--bg-primary)] focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
