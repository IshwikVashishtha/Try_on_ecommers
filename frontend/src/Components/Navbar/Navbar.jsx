import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { HiShoppingBag, HiOutlineShoppingBag } from "react-icons/hi2";
import { useStore } from "../../context/StoreContext";
import { IoIosSearch } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";
import { FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

const Navbar = () => {
  const { state, dispatch } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userImage, setUserImage] = useState(() => {
    // Try to get image from localStorage
    const savedImage = localStorage.getItem('userImage');
    return savedImage || null;
  });
  const inputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const totalItem = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const onSearch = (value) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: value });
  };

  const handleScrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // Image upload handlers
  const handleImageUpload = () => {
    document.getElementById('image-upload').click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setUserImage(imageUrl);
        localStorage.setItem('userImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow re-selecting same file
    e.target.value = '';
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        handleScrollToProducts();
      }, 500);
    } else {
      handleScrollToProducts();
    }
  };

  const navLinks = [
    { name: "SHOP", path: "/" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`bg-[var(--navbar-bg)] sticky top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b border-[var(--border-color)] ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="h-[64px] flex items-center justify-between w-full mx-auto px-6 lg:px-12 relative">
          <Link
            to="/"
            className="text-[var(--text-primary)] font-[900] uppercase text-[18px] tracking-[0.08em] cursor-pointer whitespace-nowrap"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            TRY_ON STORE
          </Link>

          {/* Desktop Nav Links (Absolutely Centered) */}
          <div className="nav-links hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-8">
            {navLinks.map((link) =>
              link.name === "SHOP" ? (
                <a
                  key={link.name}
                  href="/"
                  className="text-[12px] uppercase tracking-[0.12em] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-all duration-300 relative group font-[500]"
                  onClick={handleShopClick}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--btn-bg)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[12px] uppercase tracking-[0.12em] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-all duration-300 relative group font-[500]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--btn-bg)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ),
            )}
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex justify-end gap-x-6 items-center">
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  width: searchOpen ? "220px" : "0px",
                  transition: "width 0.4s ease",
                  marginRight: searchOpen ? "8px" : "0",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setSearchQuery("");
                      onSearch("");
                    }
                  }}
                  placeholder="SEARCH PRODUCTS..."
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid var(--text-primary)",
                    outline: "none",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    padding: "4px 0",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    color: "var(--text-primary)",
                    background: "transparent",
                  }}
                />
              </div>
                  
              <button
                onClick={() => {
                  if (searchOpen) {
                    setSearchQuery("");
                    onSearch("");
                  }
                  setSearchOpen(!searchOpen);
                }}
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  fontSize: "20px",
                }}
                aria-label="Toggle search"
              >
                {searchOpen ? "✕" : <IoIosSearch />}
              </button>
            </div>


            <button
              className="relative text-[20px] text-[var(--text-primary)] cursor-pointer hover:text-[var(--text-secondary)] transition-colors flex items-center stroke-[1.5]"
              onClick={() =>
                dispatch({ type: "SET_PANEL", payload: "wishlist" })
              }
            >
              {state.wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
              {state.wishlist.length > 0 && (
                <span className="absolute -top-[8px] -right-[8px] bg-[var(--btn-bg)] border-2 border-[var(--btn-text)] rounded-full w-[18px] h-[18px] text-[var(--btn-text)] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            <button
              className={`relative text-[20px] text-[var(--text-primary)] cursor-pointer hover:text-[var(--text-secondary)] transition-all duration-300 flex items-center stroke-[1.5] ${state.cartAddedPulse ? "scale-125" : "scale-100"}`}
              onClick={() => dispatch({ type: "SET_PANEL", payload: "cart" })}
            >
              {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
              {totalItem > 0 && (
                <span className="absolute -top-[8px] -right-[8px] bg-[var(--btn-bg)] border-2 border-[var(--btn-text)] rounded-full w-[18px] h-[18px] text-[var(--btn-text)] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
                  {totalItem}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="text-[20px] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300 flex items-center"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <GoSun /> : <FaRegMoon />}
            </button>

            {/* Upload User Image */}
            <button
              onClick={handleImageUpload}
              className="relative text-[20px] text-[var(--text-primary)] cursor-pointer hover:text-[var(--text-secondary)] transition-colors flex items-center"
              title="Upload your photo for virtual try-on"
            >
              {/* Camera icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 3a1 1 0 11-2 0 1 1 0 012 0zm5 4a1 1 0 011 1v4a1 1 0 01-1 1h-6a1 1 0 01-1-1V8a1 1 0 011-1h4a1 1 0 011 0zm-6 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                <path d="M9.5 13a5.5 5.5 0 00-4.906 9.19A3 3 0 105.996 15h8.008a3 3 0 10-1.595 5.19A5.5 5.5 0 009.5 13z" />
              </svg>
              
              {/* File input hidden */}
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              
              {/* Show uploaded image as preview */}
              {userImage && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[var(--border-color)] z-10">
                  <img src={userImage} alt="User" className="w-5 h-5 object-cover rounded-full" />
                </div>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              className="text-[20px] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300 flex items-center"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label="Toggle mobile search"
            >
              {mobileSearchOpen ? "✕" : <IoIosSearch />}
            </button>

            {/* Upload User Image - Mobile */}
            <button
              onClick={handleImageUpload}
              className="relative text-[20px] text-[var(--text-primary)] cursor-pointer hover:text-[var(--text-secondary)] transition-colors flex items-center"
              title="Upload your photo for virtual try-on"
            >
              {/* Camera icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-Rule="evenodd" d="M10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 3a1 1 0 11-2 0 1 1 0 012 0zm5 4a1 1 0 011 1v4a1 1 0 01-1 1h-6a1 1 0 01-1-1V8a1 1 0 011-1h4a1 1 0 011 0zm-6 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                <path d="M9.5 13a5.5 5.5 0 00-4.906 9.19A3 3 0 105.996 15h8.008a3 3 0 10-1.595 5.19A5.5 5.5 0 009.5 13z" />
              </svg>
              
              {/* File input hidden - reuse the same input */}
              <input
                type="file"
                accept="image/*"
                id="image-upload-mobile"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              
              {/* Show uploaded image as preview */}
              {userImage && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[var(--border-color)] z-10">
                  <img src={userImage} alt="User" className="w-5 h-5 object-cover rounded-full" />
                </div>
              )}
            </button>

            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="text-[20px] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300 flex items-center"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <GoSun /> : <FaRegMoon />}
            </button>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "22px",
                padding: "4px",
                color: "var(--text-primary)",
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-[var(--border-color)] ${
            mobileSearchOpen
              ? "max-h-[90px] opacity-100"
              : "max-h-0 opacity-0 border-b-0"
          }`}
          style={{
            background: "var(--navbar-bg)",
          }}
        >
          <div className="px-6 py-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="SEARCH PRODUCTS..."
              className="w-full border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] text-[12px] uppercase tracking-[0.1em] px-4 py-3 outline-none focus:border-[var(--text-primary)] rounded-none"
            />
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen
              ? "max-h-[340px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
          style={{
            position: "absolute",
            top: mobileSearchOpen ? "154px" : "64px",
            left: 0,
            right: 0,
            background: "var(--navbar-bg)",
            borderBottom: "1px solid var(--border-color)",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              padding: "16px 0",
            }}
          >
            {["/", "/collections", "/about", "/contact"].map((path, i) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 24px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--bg-secondary)",
                }}
              >
                {["SHOP", "COLLECTIONS", "ABOUT", "CONTACT"][i]}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;