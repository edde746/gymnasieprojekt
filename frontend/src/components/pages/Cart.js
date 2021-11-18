import React, { useState, useEffect, useContext } from "react";
import { Cart } from "../Cart";
import { toast } from "react-toastify";
import Navbar from "../partials/Navbar";
import { TrashIcon } from "@heroicons/react/solid";

const CartPage = (props) => {
  const [cart, dispatch] = useContext(Cart);
  const [products, setProducts] = useState([]);
  const [userInput, setInput] = useState({});

  const getProductById = (id, data = products) => {
    return data.filter((product) => product.id == id)[0];
  };

  useEffect(() => {
    fetch("/api/cart/", { method: "POST", body: JSON.stringify(cart) })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        var hasChanged = false;
        cart.items.forEach((item) => {
          let product = getProductById(item.id, data);
          if (product && item.quantity > product.stock) {
            hasChanged = true;
            dispatch({ type: "EDIT_ITEM", payload: { id: item.id, quantity: product.stock } });
          }
        });
        if (hasChanged) toast.error("Some item quantities were adjusted");
      });
  }, []);

  const checkout = () => {
    let order = fetch("/api/checkout/", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        email: userInput.email,
        name: userInput.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          dispatch({ type: "CLEAR_CART" });
          window.location = data.url;
        } else if (data.error) {
          throw data.error;
        }
      });

    toast.promise(order, {
      pending: "Creating order...",
      success: "Order created",
      error: {
        render({ data }) {
          return data;
        },
      },
    });
  };

  let total = 0;

  if (cart.items && cart.items.length > 0) {
    return (
      <div className="container">
        <Navbar />
        <div className="grid md:cart-layout gap-4 p-4">
          <div>
            <div className="bg-gray-800 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2 pl-4">Items</h2>
              {cart.items.length > 0 && (
                <table className="cart-table">
                  <thead>
                    <tr className="uppercase text-sm text-gray-400">
                      <td>Product</td>
                      <td>Variation</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>Total</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      cart.items.map((item) => {
                        let product = getProductById(item.id);
                        if (!product) return;
                        total += item.quantity * product.price;

                        return (
                          <tr key={item.id}>
                            <td>{product.product_name}</td>
                            <td>{product.name}</td>
                            <td>{product.price} USD</td>
                            <td>
                              <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                max={product.stock}
                                onChange={(e) =>
                                  dispatch({
                                    type: "EDIT_ITEM",
                                    payload: {
                                      id: item.id,
                                      quantity: e.target.value,
                                    },
                                  })
                                }
                              ></input>
                            </td>
                            <td>{item.quantity * product.price} USD</td>
                            <td
                              className="cursor-pointer flex justify-end"
                              onClick={(e) => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })}
                            >
                              <TrashIcon className="h-6 w-6 hover:text-blue-400 transition" />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
              <h4 className="font-bold pr-4 pb-4 text-right">Total: {total} USD</h4>
            </div>
          </div>
          <div>
            <div className="bg-gray-800 p-4 rounded-md flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Checkout</h2>
              <label htmlFor="name-input" className="checkout-label">
                Full Name
              </label>
              <input
                onChange={(e) => setInput({ ...userInput, name: e.target.value })}
                className="mb-2"
                id="name-input"
                type="text"
                placeholder="John Doe"
              />
              <label htmlFor="email-input" className="checkout-label">
                E-mail
              </label>
              <input
                onChange={(e) => setInput({ ...userInput, email: e.target.value })}
                className="mb-2"
                id="email-input"
                type="text"
                placeholder="john.doe@example.com"
              />
              <button type="submit" className="cart-button" onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Navbar />
        <div className="grid gap-4 p-4">
          <div className="bg-gray-800 p-4 rounded-md text-center">
            <h2 className="text-2xl py-4">No items in cart</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default CartPage;
