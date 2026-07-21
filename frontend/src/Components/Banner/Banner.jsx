import React from "react";

const Banner = () => {
  return (
    <section 
      className="w-full min-h-[60vh] sm:min-h-[90vh] relative flex flex-col items-center justify-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0"></div>

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center gap-y-10 text-center px-5 w-full max-w-[800px]"
        data-aos="fade-up"
      >
        <h1 className="text-[var(--btn-text)] font-bold uppercase tracking-[0.15em] w-full" style={{ fontSize: "clamp(32px, 8vw, 96px)", lineHeight: 1.1 }}>
          TRY ON<br/>STORE
        </h1>

        <button 
          className="border-2 border-[var(--btn-text)] text-[var(--btn-text)] bg-transparent uppercase font-semibold text-[13px] tracking-widest px-10 py-4 transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] w-full sm:w-auto"
          onClick={(e) => {
             e.preventDefault();
             const section = document.getElementById("products-section");
             if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default Banner;
