import React from "react";
import styles from "./Accessory.module.scss";
import classNames from "classnames/bind";
import Heading from "../Heading/Heading";
import NameCategory from "../NameCategory/NameCategory";
import ProductItem from "../ProductItem/ProductItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import AccessoryItem from "../AccessoryItem/AccessoryItem";
const cx = classNames.bind(styles);
const ProductOnSale = () => {
  const responsive = {
    0: {
      items: 1,

    },
    500: {
      items: 1,
      nav: false,
    },
    768: {
      items: 2,
      nav: false,
    },
    1024: {
      items: 3,
      nav: true,
      loop: false,
      dots: false
    },
  };
  return (
    <div className={cx("accessory")}>
      <div className="container">
        <Heading className={cx("custom-heading")}>
          Phụ kiện cho thú cưng
        </Heading>
        <div className="">
          <OwlCarousel  className="owl-theme" items={3}  responsive={responsive}>
            <div className={cx('custom-item')}>
              <AccessoryItem></AccessoryItem>
            </div>
            <div className={cx('custom-item')}>
              <AccessoryItem></AccessoryItem>
            </div>{" "}
            <div className={cx('custom-item')}>
              <AccessoryItem></AccessoryItem>
            </div>
          </OwlCarousel>

          {/* <div className="row">
            <div className="col-lg-4 col-md-6">
              <AccessoryItem></AccessoryItem>
            </div>{" "}
            <div className="col-lg-4 col-md-6">
              <AccessoryItem></AccessoryItem>
            </div>{" "}
            <div className="col-lg-4 col-md-6">
              <AccessoryItem></AccessoryItem>
            </div>
          </div> */}
        </div>

        <div className={cx("box-seemore")}>
          <p>
            <span className={cx("see-more")}>Xem thêm sản phẩm</span>
            <FontAwesomeIcon
              className={cx("icon-seemore")}
              icon={faArrowRightLong}
            ></FontAwesomeIcon>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductOnSale;
