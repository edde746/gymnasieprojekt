import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Cart } from "../Cart";
import { ShoppingCartIcon } from "@heroicons/react/solid";

const Navbar = () => {
  const [cart, dispatch] = useContext(Cart);
  let cartCount = 0;
  cart.items.forEach((e) => {
    cartCount += e.quantity;
  });

  return (
    <nav className="flex justify-between">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          <a>Home</a>
        </NavLink>
        <NavLink to="/products" activeClassName="active">
          <a>Shop</a>
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          <a>Contact</a>
        </NavLink>
      </div>
      <div>
        <Link to="/cart">
          <a href="/checkout" className="flex gap-2">
            <ShoppingCartIcon className="h-6 w-6" />
            <p id="cart-counter">{cartCount}</p>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
