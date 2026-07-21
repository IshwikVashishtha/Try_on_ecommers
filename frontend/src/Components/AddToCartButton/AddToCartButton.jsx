import React, { useState } from "react";

const AddToCartButton = () => {
  const [clicked, setClicked] = useState(false);

  const cartClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <button
      onClick={cartClick}
      className={`cart-button relative px-4 py-2 w-60 h-14 border-0 rounded-md bg-primarylw 
      outline-none cursor-pointer text-white transition ease-in-out duration-300 overflow-hidden 
      font-bold hover:bg-primarylw-2 active:scale-90 font-primarylw ${clicked ? "clicked" : ""}`}
    >
      <span className="absolute z-30 left-1/2 top-1/2 text-lg text-white transform 
      -translate-x-1/2 -translate-y-1/2 add-to-cart opacity-100">
        Add to cart
      </span>

      <span className="flex gap-1 absolute z-30 left-1/2 top-1/2 text-lg text-white transform 
      -translate-x-1/2 -translate-y-1/2 added opacity-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth="1.5" stroke="currentColor" className="size-6 fa-solid fa-circle-check">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Z" />
        </svg>
        Done
      </span>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth="1.5" stroke="currentColor"
        className="size-8 fa-solid cart-shopping-svg absolute z-20 top-1/2 left-[-10%] 
        text-2xl transform -translate-x-1/2 -translate-y-1/2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 3h1.386M7.5 14.25H18"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg"
        style={{ fill: "rgb(255,167,4)" }} viewBox="0 0 448 512"
        className="size-5 fas cart-box-svg absolute z-30 top-[-20%] left-[52%] text-xl 
        transform -translate-x-1/2 -translate-y-1/2">
        <path d="M50.7 58.5L0 160h208V32H93.7C75.5 32 58.9 42.3 50.7 58.5z" />
      </svg>
    </button>
  );
};

export default AddToCartButton;
