import React from "react";

const SaleStickyBar = () => {
  return (
    <div className="bg-[var(--sale-bar-bg)] w-full overflow-hidden relative z-40 border-b border-[var(--border-color)]">
      <div className="bg-[var(--sale-bar-bg)] py-3 marquee-track">
        <p className="text-[var(--sale-bar-text)] uppercase tracking-[0.15em] text-[11px] sm:text-[12px] font-semibold whitespace-nowrap px-4">
          EXTRA 15% OFF ALL SALE ITEMS. USE CODE{" "}
          <span className="font-bold underline">TRY_ON15</span> AT CHECKOUT
          &nbsp; • &nbsp; FREE SHIPPING ON ALL ORDERS OVER $150 &nbsp; • &nbsp;
          EXTRA 15% OFF ALL SALE ITEMS. USE CODE{" "}
          <span className="font-bold underline">TRY_ON15</span> AT CHECKOUT
          &nbsp; • &nbsp; FREE SHIPPING ON ALL ORDERS OVER $150
        </p>
      </div>
    </div>
  );
};

export default SaleStickyBar;
