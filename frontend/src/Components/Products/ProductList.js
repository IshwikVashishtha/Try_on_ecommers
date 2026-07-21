import React from "react";
import sweaterImage from "../../assets/sweater.png";
import jeansImage from "../../assets/jeans.png";
import tshirtImage from "../../assets/tshirt.png";
import dressImage from "../../assets/dress.png";
import jacketImage from "../../assets/leather-jacket.png";
import skirtImage from "../../assets/skirt.png";
import hoodieImage from "../../assets/hoodie.png";


const ProductList = [
  {
    id: 1,
    name: "Sweater",
    price: 40,
    oldPrice: 60,
    onSale: true,
    NewArrival: false,
    category: ["Womens","Kids"],
    image: sweaterImage,
  },
  {
    id: 2,
    name: "Jeans",
    price: 55,
    oldPrice: 70,
    onSale: false,
    NewArrival: true,
    category: "Mens",
    image: jeansImage,
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 25,
    oldPrice: 35,
    onSale: true,
    NewArrival: false,
    category: "Mens",
    image: tshirtImage,
  },
  {
    id: 4,
    name: "Dress",
    price: 75,
    oldPrice: 90,
    onSale: false,
    NewArrival: true,
    category: ["Womens","Kids"],
    image: dressImage,
  },
  {
    id: 5,
    name: "Jacket",
    price: 90,
    oldPrice: 120,
    onSale: true,
    NewArrival: false,
    category: "Unisex",
    image: jacketImage,
  },
  {
    id: 6,
    name: "Skirt",
    price: 45,
    oldPrice: 60,
    onSale: false,
    NewArrival: true,
    category: ["Womens","Kids"],
    image: skirtImage,
  },
  {
    id: 7,
    name: "Hoodie",
    price: 65,
    oldPrice: 80,
    onSale: true,
    NewArrival: false,
    category: "Unisex",
    image: hoodieImage,
  },
  
];

export default ProductList;
