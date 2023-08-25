import React from "react";
import styles from "./Brand.module.scss";
import classNames from "classnames/bind";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import images from "../../asset/image/img";
const cx = classNames.bind(styles);
const Brand = () => {
  return (
    <div className={cx('brand')}>
      <div className="container">
        <OwlCarousel items={5}>
          <div>
            <img className="w-auto h-auto" src={images.brand1} alt="" />
          </div>
          <div>
            <img className="w-auto h-auto" src={images.brand2} alt="" />
          </div>
          <div>
            <img className="w-auto h-auto" src={images.brand3} alt="" />
          </div>
          <div>
            <img className="w-auto h-auto" src={images.brand4} alt="" />
          </div>
          <div>
            <img className="w-auto h-auto" src={images.brand5} alt="" />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Brand;
