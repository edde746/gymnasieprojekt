import React from "react";
import Navbar from "../partials/Navbar";
import { CheckCircleIcon } from "@heroicons/react/outline";

const CheckedOut = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="flex w-full items-center py-24 flex-col">
        <CheckCircleIcon className="w-24 h-24 text-green-400" />
        <h1 className="text-xl font-semibold">Thank you for purchasing!</h1>
        <p className="text-gray-400">Your products will be delivered to your e-mail shortly.</p>
      </div>
    </div>
  );
};

export default CheckedOut;
