import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import images from "../../asset/image/img";
import { Link } from "react-router-dom";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import Heading from "../Heading/Heading";

const cx = classNames.bind(styles);

const Category: React.FC = () => {
  const reponsive = {
    0: {
      items: 1,
      dots: true,
      nav: false
    },
    500: {
      items: 2,
      nav: false,
    },
    767: {
      items: 3,
      nav: false,
    },
    991: {
      items: 4,
    },
    1200: {
      items: 5,
      dots: true
    }
  };
  return (
    <div className={cx("custom-category", "container")}>
      <Heading>Chào mừng bạn đến với Catchy Pet</Heading>
      <OwlCarousel items={4} dots nav responsive={reponsive}>
        <div className={cx("item-category")}>
          <div className={cx("item-img")}>
            <img className={cx("custom-img")} src={images.wel1} alt="" />
          </div>
          <div className={cx("item-info")}>
            <Link className={cx("item-info-title")} to={"/"}>
              Dành cho Chó
            </Link>
            <p className={cx("item-info-desc")}>
              Chó cưng, đồ chơi cho chó và các sản phẩm chuyên dành cho chó cưng
            </p>
          </div>
        </div>
        <div className={cx("item-category")}>
          <div className={cx("item-img")}>
            <img className={cx("custom-img")} src={images.wel1} alt="" />
          </div>
          <div className={cx("item-info")}>
            <Link className={cx("item-info-title")} to={"/"}>
              Dành cho Chó
            </Link>
            <p className={cx("item-info-desc")}>
              Chó cưng, đồ chơi cho chó và các sản phẩm chuyên dành cho chó cưng
            </p>
          </div>
        </div>
        <div className={cx("item-category")}>
          <div className={cx("item-img")}>
            <img className={cx("custom-img")} src={images.wel1} alt="" />
          </div>
          <div className={cx("item-info")}>
            <Link className={cx("item-info-title")} to={"/"}>
              Dành cho Chó
            </Link>
            <p className={cx("item-info-desc")}>
              Chó cưng, đồ chơi cho chó và các sản phẩm chuyên dành cho chó cưng
            </p>
          </div>
        </div>
        <div className={cx("item-category")}>
          <div className={cx("item-img")}>
            <img className={cx("custom-img")} src={images.wel1} alt="" />
          </div>
          <div className={cx("item-info")}>
            <Link className={cx("item-info-title")} to={"/"}>
              Dành cho Chó
            </Link>
            <p className={cx("item-info-desc")}>
              Chó cưng, đồ chơi cho chó và các sản phẩm chuyên dành cho chó cưng
            </p>
          </div>
        </div>
        <div className={cx("item-category")}>
          <div className={cx("item-img")}>
            <img className={cx("custom-img")} src={images.wel1} alt="" />
          </div>
          <div className={cx("item-info")}>
            <Link className={cx("item-info-title")} to={"/"}>
              Dành cho Chó
            </Link>
            <p className={cx("item-info-desc")}>
              Chó cưng, đồ chơi cho chó và các sản phẩm chuyên dành cho chó cưng
            </p>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Category;
