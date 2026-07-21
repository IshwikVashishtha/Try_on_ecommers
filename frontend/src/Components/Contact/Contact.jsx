import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email";
    if (formData.message.length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length > 0) {
      setErrors(eObj);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[var(--bg-primary)]">
      {/* Hero Banner */}
      <div
        style={{
          width: "100%",
          height: "380px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop)",
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
            background: "rgba(0,0,0,0.55)",
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
            CONTACT US
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
            WE'D LOVE TO HEAR FROM YOU
          </p>
        </div>
      </div>

      <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-[80vh]">
        <div className="section-heading-container" data-aos="fade-up">
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="section-title">SEND US A MESSAGE</h2>
          <div className="section-underline"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 mt-8">
          {/* Left Side Info */}
          <div className="flex-1 flex flex-col" data-aos="fade-up">
            <p className="text-[var(--text-secondary)] leading-[1.8] text-[15px] mb-12 pr-4">
              Whether you have a question about our collections, need styling
              advice, or simply want to say hello, our team follows up on all
              inquiries within 24 hours.
            </p>

            <div className="flex flex-col gap-10 text-[var(--text-secondary)] text-[14px]">
              <div>
                <p className="text-[var(--text-primary)] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">
                  GENERAL INQUIRIES
                </p>
                <p className="uppercase tracking-widest">
                  INFO@TRY_ONSTORE.COM
                </p>
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">
                  PRESS & MEDIA
                </p>
                <p className="uppercase tracking-widest">
                  PRESS@TRY_ONSTORE.COM
                </p>
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-bold mb-2 uppercase tracking-[0.1em] text-[13px]">
                  HEADQUARTERS
                </p>
                <p className="uppercase tracking-widest">
                  123 MINIMALIST AVE, SUITE 400
                  <br />
                  NEW YORK, NY 10012
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex-1" data-aos="fade-up" data-aos-delay="200">
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 40px",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    border: "2px solid var(--text-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "24px",
                  }}
                >
                  ✓
                </div>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  MESSAGE SENT
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    marginBottom: "32px",
                    maxWidth: "360px",
                    margin: "0 auto 32px",
                  }}
                >
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                    setErrors({});
                  }}
                  style={{
                    background: "none",
                    border: "1px solid var(--text-primary)",
                    padding: "12px 32px",
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full border ${errors.name ? "border-red-500" : "border-[var(--border-color)]"} p-[16px] bg-transparent outline-none focus:border-[var(--text-primary)] focus:ring-0 rounded-none text-[var(--text-primary)] text-[13px] uppercase tracking-widest placeholder:text-[var(--text-secondary)] transition-colors duration-300`}
                  />
                  {errors.name && (
                    <p
                      style={{
                        color: "#cc0000",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        marginTop: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full border ${errors.email ? "border-red-500" : "border-[var(--border-color)]"} p-[16px] bg-transparent outline-none focus:border-[var(--text-primary)] focus:ring-0 rounded-none text-[var(--text-primary)] text-[13px] uppercase tracking-widest placeholder:text-[var(--text-secondary)] transition-colors duration-300`}
                  />
                  {errors.email && (
                    <p
                      style={{
                        color: "#cc0000",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        marginTop: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <textarea
                    placeholder="YOUR MESSAGE"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full border ${errors.message ? "border-red-500" : "border-[var(--border-color)]"} p-[16px] bg-transparent outline-none focus:border-[var(--text-primary)] focus:ring-0 rounded-none text-[var(--text-primary)] text-[13px] uppercase tracking-widest placeholder:text-[var(--text-secondary)] min-h-[200px] resize-y transition-colors duration-300`}
                  ></textarea>
                  {errors.message && (
                    <p
                      style={{
                        color: "#cc0000",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        marginTop: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[var(--btn-bg)] text-[var(--btn-text)] py-[18px] rounded-none uppercase font-bold tracking-[0.1em] text-[13px] hover:bg-[var(--btn-hover)] transition-all duration-300 w-full cursor-pointer mt-4"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
