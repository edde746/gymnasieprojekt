import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  let product = props.product;
  return (
    <Link to={"/product/" + product.id}>
      <a className="product-card">
        <div className="overlay"></div>
        <img src={product.image}></img>
        <div>
          <h3 className="text-xl font-semibold text-gray-200 uppercase">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm uppercase">starting from </p>
          <p className="text-blue-300 font-bold text-lg uppercase">
            {product.starting_at} usd
          </p>
        </div>
      </a>
    </Link>
  );
};

export default Product;
