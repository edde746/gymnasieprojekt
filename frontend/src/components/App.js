import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import CheckedOut from "./pages/CheckedOut";
import Cancelled from "./pages/Cancelled";
import Contact from "./pages/Contact";
import Store from "./Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" />
      <Store>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/products/" component={Products} />
          <Route path="/product/:id" component={Product} />
          <Route path="/contact" component={Contact} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout/success" component={CheckedOut} />
          <Route path="/checkout/cancelled" component={Cancelled} />
        </Switch>
      </Store>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("app"));
