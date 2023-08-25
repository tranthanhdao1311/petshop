import React from "react";
import images from "../../asset/image/img";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import styles from "./Banner.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Banner = () => {
  const responsive = {
    0: {
      nav: false,
    },
    991: {
      nav: false,
    },
  };
  return (
    <div className={cx('custom-slider')}>
      <OwlCarousel
        className="owl-theme"
        nav
        dots
        items={1}
        loop
        responsive={responsive}
      >
        <div>
          <img className="w-100" src={images.imgBanner1} alt=""></img>
        </div>
        <div>
          <img className="w-100" src={images.imgBanner1} alt=""></img>
        </div>
        <div>
          <img className="w-100" src={images.imgBanner1} alt=""></img>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Banner;
