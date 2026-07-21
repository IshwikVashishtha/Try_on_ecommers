import React from "react";

const About = () => {
  return (
    <div className="w-full bg-[var(--bg-primary)]">
      {/* Hero Banner */}
      <div
        style={{
          width: "100%",
          height: "380px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
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
            background: "rgba(0,0,0,0.45)",
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
            OUR STORY
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
            CRAFTED WITH PURPOSE
          </p>
        </div>
      </div>

      <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen">
        <div className="section-heading-container" data-aos="fade-up">
          <span className="section-label">WHO WE ARE</span>
          <h2 className="section-title">THE TRY_ON STORE STORY</h2>
          <div className="section-underline"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center mb-24">
            <div
              className="flex-1 text-[var(--text-secondary)] leading-[1.8] text-[15px]"
              data-aos="fade-up"
            >
              <p className="mb-6">
                Founded on the principles of minimalist design and
                uncompromising quality, TRY_ON Store emerged from a desire to
                create timeless pieces that transcend seasonal trends.
              </p>
              <p className="mb-6">
                We believe that true elegance lies in simplicity. Our approach
                strips away the unnecessary, focusing entirely on silhouette,
                texture, and tailoring. Every garment is a testament to the idea
                that wardrobe essentials should be both beautiful and highly
                functional.
              </p>
              <p>
                From our studio to your closet, we maintain an unwavering
                commitment to responsible sourcing and precision craftsmanship.
                We aren't just making clothes; we are defining a lifestyle built
                around purposeful aesthetic choices.
              </p>
            </div>
            <div
              className="flex-1 w-full relative aspect-[3/4] overflow-hidden bg-[var(--bg-secondary)]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"
                alt="TRY_ON Story"
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </div>

          {/* 3 Values Section */}
          <div className="w-full flex justify-center mb-16">
            <div className="section-heading-container" data-aos="fade-up">
              <span className="section-label">OUR VALUES</span>
              <h2 className="section-title">WHAT DRIVES US</h2>
              <div className="section-underline"></div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {["QUALITY", "STYLE", "SUSTAINABILITY"].map((val, idx) => (
              <div
                key={idx}
                className="border border-[var(--border-color)] p-[48px] flex items-center justify-center bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-default"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <h3 className="text-[var(--text-primary)] font-bold uppercase tracking-[0.1em] text-[14px]">
                  {val}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
