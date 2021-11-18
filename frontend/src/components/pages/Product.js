import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Cart } from "../Cart";
import Navbar from "../partials/Navbar";

const Product = props => {
  const [cart, dispatch] = useContext(Cart);
  const [product, setProduct] = useState([]);
  const [selectedVariation, selectVariation] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        selectVariation(data.variations[0]);
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      {product && (
        <>
          <div className="flex flex-col md:flex-row md:justify-between p-4 gap-4 md:gap-8">
            <div className="w-full">
              <div className="flex gap-4 flex-wrap mb-4 justify-center md:justify-start md:mb-2">
                <img
                  src={product.image}
                  className="rounded-md"
                  style={{ height: "16rem", width: "auto" }}
                ></img>
                <div className="text-center md:text-left">
                  <h1 className="font-bold text-2xl uppercase mb-2">
                    {product.name}
                  </h1>
                  <p className="uppercase font-semibold text-sm text-blue-400 mb-1">
                    Variation
                  </p>
                  <div className="flex gap-2">
                    {product.variations &&
                      product.variations.map((variation, idx) => (
                        <div key={idx}>
                          <input
                            onChange={(e) => selectVariation(variation)}
                            type="radio"
                            id={variation.id}
                            name="variation"
                            defaultChecked={idx == 0}
                          ></input>
                          <label htmlFor={variation.id}>{variation.name}</label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedVariation && (
              <div className="to-cart-card">
                <p className="text-gray-200 text-sm uppercase font-semibold">
                  Variation
                </p>
                <p className="uppercase font-semibold text-xl mb-2" id="name">
                  {selectedVariation.name}
                </p>
                <p className="text-gray-200 text-sm uppercase font-semibold">
                  Price
                </p>
                <h3 className="uppercase font-semibold text-xl mb-4">
                  <span id="price">{selectedVariation.price}</span> usd
                </h3>
                <button
                  type="submit"
                  className="cart-button"
                  onClick={(e) => {
                    dispatch({ type: "ADD_ITEM", payload: selectedVariation });
                  }}
                >
                  Add to cart
                </button>
              </div>
            )}
          </div>
          <div className="p-4">
            <h4 className="uppercase font-bold text-2xl text-gray-200">
              Product Description
            </h4>
            <hr className="mb-2"></hr>
            <div>{product.description}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
