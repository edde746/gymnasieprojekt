import React, { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import Product from "../partials/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products/")
      .then((response) => response.json())
      .then(setProducts);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
