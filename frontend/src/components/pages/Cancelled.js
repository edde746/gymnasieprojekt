import React from "react";
import Navbar from "../partials/Navbar";
import { XCircleIcon } from "@heroicons/react/outline";

const CheckedOut = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="flex w-full items-center py-24 flex-col">
        <XCircleIcon className="w-24 h-24 text-red-400" />
        <h1 className="text-xl font-semibold">Your order was cancelled.</h1>
      </div>
    </div>
  );
};

export default CheckedOut;
