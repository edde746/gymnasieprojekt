import React, { createContext, useReducer, useEffect } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      let existingItem = state.items.find(
        (cartItem) => cartItem.id == action.payload.id
      );

      if (existingItem) existingItem.quantity += 1;
      else {
        state.items.push({ id: action.payload.id, quantity: 1 });
      }

      return { ...state };
    case "EDIT_ITEM":
      let existentItem = state.items.find(
        (item) => item.id == action.payload.id
      );
      if (!existentItem) return;
      existentItem.quantity = Number(action.payload?.quantity) || 0;
      return { ...state };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id != action.payload.id),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

const initialState = JSON.parse(localStorage.getItem("cart")) || { items: [] };

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return <Cart.Provider value={[state, dispatch]}>{children}</Cart.Provider>;
};

export const Cart = createContext(initialState);
export default Store;
