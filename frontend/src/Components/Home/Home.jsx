import React from "react";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";

const Home = () => {
  return (
    <>
      <SaleStickyBar />
      <Banner />
      <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Products />
      </div>
    </>
  );
};

export default Home;
