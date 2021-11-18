import React from "react";
import Navbar from "../partials/Navbar";

const Contact = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2>Contact Information</h2>
          <p>
            E-mail <strong>info@example.com</strong>
          </p>
          <p>
            Phone <strong>+1 (123) 456-7890</strong>
          </p>
          <p>Address</p>
          <p>
            <strong>
              2880 Broadway
              <br />
              New York, NY 10025
              <br />
              USA
            </strong>
          </p>
        </div>
        <iframe
          width="100%"
          height="100%"
          className="rounded-md"
          src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        />
      </div>
    </div>
  );
};

export default Contact;
