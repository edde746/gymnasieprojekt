import React from "react";
import Navbar from "../partials/Navbar";
import { Carousel } from "react-responsive-carousel";

const Landing = () => {
  return (
    <div className="container">
      <Navbar />
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="mx-4"
      >
        <div className="card px-8 gap-4 grid md:grid-cols-2 py-20">
          <div className="flex justify-center flex-col md:text-left">
            <h2 className="font-semibold text-xl">Check out this featured product</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus ac ex in vehicula. Fusce sit amet
              sapien sit amet lorem aliquet condimentum. Nullam sit amet porta turpis.
            </p>
          </div>
          <img className="rounded-md" src="/static/slides/1.jpg" />
        </div>
        <div className="card px-8 gap-4 grid md:grid-cols-2 py-20">
          <div className="flex justify-center flex-col md:text-left">
            <h2 className="font-semibold text-xl">Another featured slide</h2>
            <p>
              Sed rhoncus ac ex in vehicula. Fusce sit amet sapien sit amet lorem aliquet condimentum. Nullam sit amet
              porta turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <img className="rounded-md" src="/static/slides/2.jpg" />
        </div>
        <div className="card px-8 gap-4 grid md:grid-cols-2 py-20">
          <div className="flex justify-center flex-col md:text-left">
            <h2 className="font-semibold text-xl">Third featured product</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus ac ex in vehicula. Fusce sit amet
              sapien sit amet lorem aliquet condimentum. Nullam sit amet porta turpis.
            </p>
          </div>
          <img className="rounded-md" src="/static/slides/3.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default Landing;
