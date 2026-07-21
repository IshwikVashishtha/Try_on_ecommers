import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { useToast } from "../Toast/ToastContext";

const Footer = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setMsg("Please enter your email address.");
      setMsgType("error");
      return;
    }
    if (!emailRegex.test(email)) {
      setMsg("Please enter a valid email address.");
      setMsgType("error");
      return;
    }
    setMsg("Thank you for subscribing!");
    setMsgType("success");
    showToast("Subscribed successfully!", "success");
    setEmail("");
    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };

  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-[64px] pb-[32px] px-6 lg:px-12 mt-auto">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-[64px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[var(--text-primary)] font-[900] uppercase text-[18px] tracking-[0.08em]">
            TRY_ON STORE
          </h2>
          <p className="text-[var(--text-secondary)] italic text-[14px] leading-[1.8] max-w-sm">
            Defining a lifestyle built around purposeful aesthetic choices and
            uncompromising quality.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://www.instagram.com/ishwik_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ishwik-vashishtha-2440701a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <FaPinterest size={20} />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[var(--text-primary)] font-bold text-[13px] uppercase tracking-[0.1em]">
            QUICK LINKS
          </h3>
          <ul className="flex flex-col gap-4 text-[var(--text-secondary)] text-[13px] uppercase tracking-widest">
            {["SHOP", "COLLECTIONS", "ABOUT US", "CONTACT", "FAQ"].map(
              (link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "SHOP"
                        ? "/"
                        : link === "FAQ"
                          ? "/faq"
                          : `/${link.replace(" US", "").toLowerCase()}`
                    }
                    className="hover:text-[var(--text-primary)] transition-colors relative group w-fit inline-block"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--btn-bg)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[var(--text-primary)] font-bold text-[13px] uppercase tracking-[0.1em]">
            JOIN OUR MAILING LIST
          </h3>
          <p className="text-[var(--text-secondary)] text-[13px] leading-[1.6]">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-0 w-full mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-[var(--border-color)] p-[14px] outline-none focus:border-[var(--text-primary)] text-[var(--text-primary)] text-[12px] uppercase tracking-widest placeholder:text-[var(--text-secondary)] shadow-none rounded-none"
            />
            <button
              type="submit"
              className="bg-[var(--btn-bg)] text-[var(--btn-text)] px-6 py-[14px] font-bold uppercase tracking-[0.1em] text-[12px] hover:bg-[var(--btn-hover)] transition-colors border border-[var(--text-primary)] min-w-[120px] rounded-none sm:ml-[-1px]"
            >
              SUBSCRIBE
            </button>
          </form>
          {msg && (
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "8px",
                color: msgType === "error" ? "#cc0000" : "var(--text-primary)",
              }}
            >
              {msg}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto border-t border-[var(--border-color)] pt-[32px] text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[var(--text-secondary)] text-[12px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} TRY_ON STORE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-[var(--text-secondary)] text-[12px] uppercase tracking-widest">
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            PRIVACY
          </a>
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            TERMS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
